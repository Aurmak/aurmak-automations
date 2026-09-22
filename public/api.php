<?php
declare(strict_types=1);

/**
 * AURMAK AUTOMATIONS: the lead endpoint. One route, two sources.
 *
 * The site is a static export, so there is no Node server in the request path and no API
 * route. Apache runs this file instead, exactly as cyber.aurmak.com and aurmak.com do: same
 * Azure app, same no-reply shared mailbox, same Microsoft Graph sendMail call. If you are
 * changing how mail leaves this site, change it in both places or write down why not.
 *
 * src/lib/leads.ts already sends one shape for both the contact form and the scope wizard
 * — {source: 'contact'|'wizard', name, email, company?, message?, answers?, estimate?} — so
 * this is one endpoint, not two, branching on `source`.
 *
 * It ships inside public/ so it lands in the build. The deploy mirrors with --delete, which
 * would remove a copy placed on the server by hand.
 *
 * Per submission:
 *   contact: 2 emails — the enquiry to contact_to (Reply-To the visitor), and an
 *            acknowledgement to the visitor (Reply-To contact_to).
 *   wizard:  2 emails — the SAME full results (stat estimate + every answer) to both the
 *            visitor and contact_to, not a receipt for one and a summary for the other.
 *            Per management: designed, not a plain-text/table dump — see mail-templates.php.
 *
 * Nothing is stored. The mailbox is the record.
 *
 * SECURITY NOTES, because this is the one file on the site that accepts input from the
 * internet:
 *   - No secret is in this file or in the repository. The config is read from Hestia's
 *     private/ directory, which is inside PHP's open_basedir and outside the docroot.
 *   - Every value that reaches HTML goes through html_value(). Nothing is interpolated raw.
 *   - Header injection is not possible: Graph takes a JSON object, not a header block.
 *   - Rate limited per IP, with a honeypot in front of it, so the mailbox is not an open
 *     relay for anyone who finds the URL.
 *   - The error log holds Graph responses, which carry tenant and app identifiers, so it
 *     lives beside the config and never under the docroot.
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
// Same origin only. The form is on this host and nothing else may post here, so there is
// no Access-Control-Allow-Origin: a browser refuses a cross-origin request without one.
header('Vary: Origin');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$baseDir        = dirname(__DIR__) . '/private';
$configPath     = $baseDir . '/graph_config.php';
$tokenCachePath = $baseDir . '/graph_token_cache.json';
$logPath        = $baseDir . '/api_error.log';

/* -------------------------------------------------------------------------- */
/* Plumbing                                                                    */
/* -------------------------------------------------------------------------- */

function log_msg(string $msg): void {
    global $logPath;
    @file_put_contents($logPath, date('[Y-m-d H:i:s] ') . $msg . "\n", FILE_APPEND);
}

function fail(int $status, string $publicMessage, ?string $logDetail = null, ?string $field = null): void {
    http_response_code($status);
    echo json_encode(array_filter(['message' => $publicMessage, 'field' => $field]));
    if ($logDetail !== null) {
        log_msg($logDetail);
    }
    exit;
}

/** Per-IP submission cap. Every request sends two emails from our own mailbox, so an
 *  unthrottled endpoint is an open relay. */
function rate_limit(string $bucket, int $maxPerHour): void {
    global $baseDir;

    $dir = $baseDir . '/ratelimit';
    if (!is_dir($dir) && !@mkdir($dir, 0770, true) && !is_dir($dir)) {
        log_msg("Rate limit dir unavailable: $dir");
        return; // Never block a real lead because of a storage problem.
    }

    $ip    = (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    $file  = $dir . '/' . $bucket . '_' . hash('sha256', $ip) . '.json';
    $now   = time();
    $since = $now - 3600;

    $hits = [];
    if (is_file($file)) {
        $decoded = json_decode((string)@file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = array_filter($decoded, static fn($t) => is_int($t) && $t > $since);
        }
    }

    if (count($hits) >= $maxPerHour) {
        fail(429, 'Too many submissions have been sent from this connection. Please try again in an hour, or write to ' . ($GLOBALS['contactTo'] ?? 'info@aurmak.com') . '.');
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);

    if (random_int(1, 50) === 1) {
        foreach (glob($dir . '/*.json') ?: [] as $stale) {
            if (@filemtime($stale) < $since) {
                @unlink($stale);
            }
        }
    }
}

if (!file_exists($configPath)) {
    fail(500, 'This form is not configured on this server.', "Graph config missing at $configPath");
}

$config = require $configPath;
foreach (['tenant_id', 'client_id', 'client_secret', 'sender_mailbox'] as $key) {
    if (empty($config[$key]) || str_starts_with((string)$config[$key], 'REPLACE_WITH_')) {
        fail(500, 'This form is not configured on this server.', "Graph config missing/placeholder key: $key");
    }
}

$senderMailbox = (string)$config['sender_mailbox'];
$contactTo     = (string)($config['contact_to'] ?? $senderMailbox);
$siteUrl       = rtrim((string)($config['site_url'] ?? 'https://automations.aurmak.com'), '/');

class GraphMailer {
    private string $tenantId;
    private string $clientId;
    private string $clientSecret;
    private string $cachePath;

    public function __construct(string $tenantId, string $clientId, string $clientSecret, string $cachePath) {
        $this->tenantId     = $tenantId;
        $this->clientId     = $clientId;
        $this->clientSecret = $clientSecret;
        $this->cachePath    = $cachePath;
    }

    private function token(): string {
        $cached = $this->readCache();
        if ($cached !== null && $cached['expires_at'] > time() + 60) {
            return $cached['access_token'];
        }

        $url  = "https://login.microsoftonline.com/{$this->tenantId}/oauth2/v2.0/token";
        $body = http_build_query([
            'client_id'     => $this->clientId,
            'client_secret' => $this->clientSecret,
            'grant_type'    => 'client_credentials',
            'scope'         => 'https://graph.microsoft.com/.default',
        ]);

        [$status, $resp] = $this->httpPost($url, $body, [
            'Content-Type: application/x-www-form-urlencoded',
        ]);

        if ($status < 200 || $status >= 300) {
            log_msg("Graph token request failed: status=$status body=" . substr($resp, 0, 500));
            throw new RuntimeException("Token request failed ({$status}).");
        }

        $data = json_decode($resp, true);
        if (empty($data['access_token'])) {
            log_msg('Graph token response missing access_token: ' . substr($resp, 0, 500));
            throw new RuntimeException('Token response missing access_token.');
        }

        $this->writeCache([
            'access_token' => $data['access_token'],
            'expires_at'   => time() + (int)($data['expires_in'] ?? 3600),
        ]);

        return $data['access_token'];
    }

    public function sendMail(string $fromMailbox, array $message): void {
        $token = $this->token();
        $url   = 'https://graph.microsoft.com/v1.0/users/' . rawurlencode($fromMailbox) . '/sendMail';
        $body  = json_encode(
            ['message' => $message, 'saveToSentItems' => true],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        [$status, $resp] = $this->httpPost($url, (string)$body, [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
        ]);

        if ($status < 200 || $status >= 300) {
            $subject = $message['subject'] ?? '(no subject)';
            log_msg("Graph sendMail failed: status=$status sender=$fromMailbox subject=\"$subject\" body=" . substr($resp, 0, 1000));
            throw new RuntimeException("Graph sendMail failed ({$status}).");
        }
    }

    private function readCache(): ?array {
        if (!file_exists($this->cachePath)) return null;
        $raw = @file_get_contents($this->cachePath);
        if ($raw === false || $raw === '') return null;
        $data = json_decode($raw, true);
        if (!is_array($data) || empty($data['access_token']) || empty($data['expires_at'])) return null;
        return $data;
    }

    private function writeCache(array $data): void {
        $fh = @fopen($this->cachePath, 'c+');
        if (!$fh) {
            log_msg('Token cache write failed: cannot open ' . $this->cachePath);
            return;
        }
        if (flock($fh, LOCK_EX)) {
            ftruncate($fh, 0);
            rewind($fh);
            fwrite($fh, (string)json_encode($data));
            fflush($fh);
            flock($fh, LOCK_UN);
        }
        fclose($fh);
        @chmod($this->cachePath, 0660);
    }

    private function httpPost(string $url, string $body, array $headers): array {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $body,
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_TIMEOUT        => 60,
            CURLOPT_CONNECTTIMEOUT => 10,
        ]);
        $resp   = curl_exec($ch);
        $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err    = curl_error($ch);
        // No curl_close(): a no-op since PHP 8.0 (CurlHandle closes itself when $ch goes
        // out of scope), and calling it is deprecated as of PHP 8.5.
        if ($resp === false) {
            log_msg("HTTP request error: $err url=$url");
            throw new RuntimeException("HTTP transport error: $err");
        }
        return [$status, (string)$resp];
    }
}

require __DIR__ . '/mail-templates.php';

/* -------------------------------------------------------------------------- */
/* Shared field cleaning + validation                                         */
/* -------------------------------------------------------------------------- */

function clean_field($value, int $max): string {
    // Control characters out first: they are invisible in a mailbox and are how a payload
    // hides in a field that looks empty.
    $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string)$value) ?? '';
    return mb_substr(trim($text), 0, $max);
}

/** Clean a wizard answer: a single string, or an array of strings (multi-select). */
function clean_answer($value) {
    if (is_array($value)) {
        $out = [];
        foreach (array_slice($value, 0, 20) as $item) {
            $cleaned = clean_field($item, 120);
            if ($cleaned !== '') $out[] = $cleaned;
        }
        return $out;
    }
    return clean_field($value, 120);
}

const WIZARD_ANSWER_IDS = ['role', 'industry', 'size', 'pain', 'automate', 'volume', 'system'];

try {
    $raw   = (string)file_get_contents('php://input');
    $input = json_decode($raw, true);
    if (!is_array($input)) {
        fail(400, 'We could not read that. Please try again.', 'Empty / non-JSON lead payload');
    }

    // Honeypot. A bot fills every field it finds, so this one being non-empty is proof
    // enough. Accepted quietly rather than rejected: a rejection tells the author which
    // field gave them away.
    if (!empty($input['website'])) {
        echo json_encode(['message' => 'Received.']);
        exit;
    }

    $source = clean_field($input['source'] ?? '', 20);
    if (!in_array($source, ['contact', 'wizard'], true)) {
        fail(400, 'Unrecognised submission type.', 'Unknown source: ' . $source);
    }

    rate_limit($source, 10);

    $name    = clean_field($input['name']    ?? '', 120);
    $email   = clean_field($input['email']   ?? '', 160);
    $company = clean_field($input['company'] ?? '', 160);

    if ($name === '')                              fail(400, 'Enter your name.', null, 'name');
    if ($email === '')                             fail(400, 'Enter your email address.', null, 'email');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail(400, 'That email address does not look complete.', null, 'email');

    $submittedAt = (new DateTimeImmutable('now', new DateTimeZone('Europe/London')))
        ->format('j F Y, H:i') . ' London';

    $mailer = new GraphMailer(
        (string)$config['tenant_id'],
        (string)$config['client_id'],
        (string)$config['client_secret'],
        $tokenCachePath
    );

    if ($source === 'contact') {
        $message = clean_field($input['message'] ?? '', 4000);

        $common = [
            'name'        => $name,
            'email'       => $email,
            'company'     => $company,
            'message'     => $message,
            'submittedAt' => $submittedAt,
            'siteUrl'     => $siteUrl,
        ];

        $mailer->sendMail($senderMailbox, [
            'subject'      => 'Automations enquiry: ' . $name . ($company !== '' ? ', ' . $company : ''),
            'body'         => ['contentType' => 'HTML', 'content' => contact_team_email($common)],
            'toRecipients' => [['emailAddress' => ['address' => $contactTo]]],
            'replyTo'      => [['emailAddress' => ['address' => $email, 'name' => $name]]],
        ]);

        // Its own try/catch: a missing acknowledgement is a poor first impression; losing
        // the enquiry because the acknowledgement failed is a lost lead. Only one of those
        // is worth failing the request over.
        try {
            $mailer->sendMail($senderMailbox, [
                'subject'      => 'We have your message | AURMAK Automations',
                'body'         => ['contentType' => 'HTML', 'content' => contact_ack_email($common + ['contactTo' => $contactTo])],
                'toRecipients' => [['emailAddress' => ['address' => $email, 'name' => $name]]],
                'replyTo'      => [['emailAddress' => ['address' => $contactTo]]],
            ]);
        } catch (Throwable $e) {
            log_msg('Contact acknowledgement failed: ' . $e->getMessage());
        }
    } else {
        // wizard
        $rawAnswers = is_array($input['answers'] ?? null) ? $input['answers'] : [];
        $answers    = [];
        foreach (WIZARD_ANSWER_IDS as $id) {
            if (array_key_exists($id, $rawAnswers)) {
                $answers[$id] = clean_answer($rawAnswers[$id]);
            }
        }

        $estimate = null;
        $rawEstimate = $input['estimate'] ?? null;
        if (is_array($rawEstimate)
            && isset($rawEstimate['hoursMonth'], $rawEstimate['pct'], $rawEstimate['moneyYear'])
            && is_numeric($rawEstimate['hoursMonth']) && is_numeric($rawEstimate['pct'])
        ) {
            $estimate = [
                'hoursMonth' => (int)$rawEstimate['hoursMonth'],
                'pct'        => (int)$rawEstimate['pct'],
                // Pre-formatted client side (e.g. "$48k") so this file doesn't duplicate
                // the currency/rounding rules in src/components/wizard/ScopeWizard.tsx.
                'moneyYear'  => clean_field($rawEstimate['moneyYear'], 20),
            ];
        }

        $common = [
            'name'        => $name,
            'email'       => $email,
            'company'     => $company,
            'answers'     => $answers,
            'estimate'    => $estimate,
            'submittedAt' => $submittedAt,
            'siteUrl'     => $siteUrl,
            'contactTo'   => $contactTo,
        ];

        // Required: losing the wizard's results is a lost lead.
        $mailer->sendMail($senderMailbox, [
            'subject'      => $name . '\'s scope wizard results',
            'body'         => ['contentType' => 'HTML', 'content' => wizard_results_email($common, 'team')],
            'toRecipients' => [['emailAddress' => ['address' => $contactTo]]],
            'replyTo'      => [['emailAddress' => ['address' => $email, 'name' => $name]]],
        ]);

        // Best-effort: the visitor's own copy of their results, same content, different
        // opening line. A bounce here must not fail the submission that already landed.
        try {
            $mailer->sendMail($senderMailbox, [
                'subject'      => 'Your automation plan | AURMAK Automations',
                'body'         => ['contentType' => 'HTML', 'content' => wizard_results_email($common, 'visitor')],
                'toRecipients' => [['emailAddress' => ['address' => $email, 'name' => $name]]],
                'replyTo'      => [['emailAddress' => ['address' => $contactTo]]],
            ]);
        } catch (Throwable $e) {
            log_msg('Wizard visitor copy failed: ' . $e->getMessage());
        }
    }

    echo json_encode(['message' => 'Received.']);
    exit;
} catch (Throwable $e) {
    log_msg('Handler error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'message' => 'We could not send that just now. Please try again, or write to ' . $contactTo . '.',
    ]);
    exit;
}
