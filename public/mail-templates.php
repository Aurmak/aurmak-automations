<?php
declare(strict_types=1);

/**
 * AURMAK AUTOMATIONS: the emails the contact form and the scope wizard send.
 *
 * Kept apart from public/api.php so the messages can be rendered and looked at without
 * sending anything (see scripts/preview-emails.sh).
 *
 * Nothing in this file talks to the network, reads config, or touches $_POST. It takes an
 * array and returns a string. That is the whole contract, and it is what makes the
 * preview honest.
 *
 * NOT REACHABLE OVER HTTP: public/.htaccess denies every .php file in the docroot except
 * api.php, and this one defines functions and outputs nothing even if that were bypassed.
 */

/*
  Written to look like the site, inside what an email client will actually render.

  Constraints, none of them negotiable: tables rather than flex or grid, because Outlook
  on Windows lays out through Word; every style inline, because Gmail strips <style> from
  the head on forwarded mail; no web font (Space Grotesk / IBM Plex do not load in a mail
  client), so headings fall back to a bold system sans; no SVG, because Gmail drops it; and
  nothing that depends on an image loading, because most clients block images until the
  reader asks for them. So the lockup is set in type, and the only graphics are coloured
  table cells.

  The palette is the site's own "Teal & Magenta" theme, read from src/index.css.
  THESE ARE A PAIR. If the palette moves in index.css, move it here.
*/

const MAIL_BG          = '#F4F8F8'; // aurmak-bg
const MAIL_SURFACE     = '#FFFFFF'; // aurmak-surface
const MAIL_BORDER      = '#D5E6E5'; // aurmak-border
const MAIL_NAVY        = '#123634'; // aurmak-navy (header band, headings)
const MAIL_NAVY_DEEP   = '#081D1B'; // aurmak-navyDeep
const MAIL_TEXT        = '#33403E'; // aurmak-text
const MAIL_TEXT_MUTED  = '#566360'; // aurmak-textMuted
const MAIL_TEXT_DIM    = '#7C8A87'; // aurmak-textDim
const MAIL_ACTION      = '#2BB8B3'; // aurmak-action (bright teal, for rules/accents)
const MAIL_ACTION_TEXT = '#0F766E'; // aurmak-actionText (AA-safe teal for links/text)
const MAIL_CTA         = '#FED43F'; // aurmak-cta (yellow button)
const MAIL_CTA_INK     = '#123634'; // dark ink on the yellow button
const MAIL_SUCCESS     = '#10B981'; // aurmak-success
const MAIL_SUCCESS_BG  = '#ECFDF5'; // light tint of aurmak-success
const MAIL_SUCCESS_BD  = '#A7F3D0'; // border for the success tint
const MAIL_HUMAN       = '#E151AF'; // aurmak-human (magenta accent)
const MAIL_HUMAN_SOFT  = '#FBEAF5'; // aurmak-humanSoft
const MAIL_SANS        = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MAIL_MONO        = "'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace";

function html_value($value): string {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

/** A field row: mono label on the left, value on the right, hairline under both. */
function field_row(string $label, $value, bool $last = false): string {
    $shown  = ($value !== '' && $value !== null) ? $value : 'Not provided';
    $border = $last ? 'none' : '1px solid ' . MAIL_BORDER;

    return '<tr>'
        . '<td class="fld-label" style="padding:14px 16px 14px 0;border-bottom:' . $border . ';vertical-align:top;width:32%;'
        . 'font-family:' . MAIL_MONO . ';font-size:11px;line-height:1.5;letter-spacing:0.09em;'
        . 'text-transform:uppercase;color:' . MAIL_TEXT_DIM . ';">' . html_value($label) . '</td>'
        // overflow-wrap, so one long unbroken token (an email, a URL) can't push the table wider.
        . '<td class="fld-value" style="padding:14px 0;border-bottom:' . $border . ';vertical-align:top;'
        . 'word-break:break-word;overflow-wrap:break-word;'
        . 'font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.6;color:' . MAIL_TEXT . ';">'
        . nl2br(html_value($shown)) . '</td>'
        . '</tr>';
}

/** table-layout:fixed + percentage widths, so the label column lines up across blocks
 *  and stays legible on a ~290px-wide phone message body. See field_row(). */
function field_table(string $rows): string {
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="width:100%;table-layout:fixed;border-collapse:collapse;">' . $rows . '</table>';
}

/** A small caps label above a block. */
function mail_label(string $text): string {
    return '<p style="margin:0 0 10px;font-family:' . MAIL_MONO . ';font-size:11px;line-height:1.5;'
        . 'letter-spacing:0.09em;text-transform:uppercase;color:' . MAIL_TEXT_DIM . ';">'
        . html_value($text) . '</p>';
}

/** A paragraph in body copy. */
function mail_p(string $html, string $extra = ''): string {
    return '<p style="margin:0 0 16px;font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.7;'
        . 'color:' . MAIL_TEXT_MUTED . ';' . $extra . '">' . $html . '</p>';
}

/** The yellow CTA button, matching the site's primary button. */
function mail_button(string $href, string $label): string {
    return '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
        . '<td style="background-color:' . MAIL_CTA . ';border-radius:8px;">'
        . '<a href="' . html_value($href) . '" style="display:inline-block;padding:12px 22px;'
        . 'font-family:' . MAIL_SANS . ';font-size:14px;font-weight:700;color:' . MAIL_CTA_INK . ';'
        . 'text-decoration:none;">' . html_value($label) . '</a>'
        . '</td></tr></table>';
}

/**
 * The shell every message sits in.
 *
 * Header band in the site's navy with the lockup set in type, a teal rule under it because
 * that is the accent the site uses to mark the start of something, then the content on
 * white, then a quiet footer strip.
 */
function email_shell(string $eyebrow, string $title, string $inner, string $footer): string {
    return '<!doctype html><html lang="en"><head>'
        . '<meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="color-scheme" content="light only">'
        . '<meta name="supported-color-schemes" content="light only">'
        . '<title>' . html_value($title) . '</title>'
        /*
          Below 480px the field label/value pair stacks instead of sitting in two columns,
          which is the only way a 32% label column stays readable on a phone once the
          shell's padding is off the width. Clients that honour media queries take it;
          Gmail strips <style> in some cases and those readers get the percentage layout,
          which is a worse but perfectly legible fallback. Progressive enhancement.
        */
        . '<style>'
        . '@media only screen and (max-width:480px){'
        . '.fld-label,.fld-value{display:block !important;width:auto !important;}'
        . '.fld-label{padding:14px 0 0 0 !important;border-bottom:none !important;}'
        . '.fld-value{padding:2px 0 14px 0 !important;}'
        . '.pad-x{padding-left:20px !important;padding-right:20px !important;}'
        . '.stat-cell{display:block !important;width:100% !important;padding:8px 0 !important;}'
        . '}'
        . '</style>'
        . '</head>'
        . '<body style="margin:0;padding:0;background-color:' . MAIL_BG . ';">'
        // A preheader, so the client's inbox preview shows this instead of the header band.
        . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' . html_value($title) . '</div>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
        . ' style="background-color:' . MAIL_BG . ';">'
        . '<tr><td align="center" style="padding:32px 16px;">'
        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"'
        . ' style="width:100%;max-width:600px;background-color:' . MAIL_SURFACE . ';border:1px solid ' . MAIL_BORDER . ';">'

        /* Header band: the lockup, in type (no SVG/image — see the note above). */
        . '<tr><td class="pad-x" style="padding:24px 32px;background-color:' . MAIL_NAVY . ';">'
        . '<span style="font-family:' . MAIL_SANS . ';font-size:18px;font-weight:700;'
        . 'letter-spacing:0.12em;color:#ffffff;">AURMAK</span>'
        . '<span style="font-family:' . MAIL_SANS . ';font-size:15px;font-weight:500;'
        . 'letter-spacing:0.06em;color:' . MAIL_ACTION . ';"> AUTOMATIONS</span>'
        . '</td></tr>'
        . '<tr><td style="font-size:0;line-height:0;height:3px;background-color:' . MAIL_ACTION . ';">&nbsp;</td></tr>'

        /* Title block. */
        . '<tr><td class="pad-x" style="padding:34px 32px 0;">'
        . '<p style="margin:0 0 12px;font-family:' . MAIL_MONO . ';font-size:11px;line-height:1.5;'
        . 'letter-spacing:0.09em;text-transform:uppercase;color:' . MAIL_ACTION_TEXT . ';">'
        . html_value($eyebrow) . '</p>'
        . '<h1 style="margin:0;font-family:' . MAIL_SANS . ';font-size:24px;line-height:1.25;'
        . 'font-weight:700;letter-spacing:-0.01em;color:' . MAIL_NAVY . ';">' . html_value($title) . '</h1>'
        . '</td></tr>'

        /* Body. */
        . '<tr><td class="pad-x" style="padding:26px 32px 34px;">' . $inner . '</td></tr>'

        /* Footer strip. */
        . '<tr><td class="pad-x" style="padding:22px 32px;background-color:' . MAIL_BG . ';border-top:1px solid ' . MAIL_BORDER . ';'
        . 'font-family:' . MAIL_SANS . ';font-size:12px;line-height:1.65;color:' . MAIL_TEXT_DIM . ';">'
        . $footer
        . '</td></tr>'

        . '</table>'
        . '</td></tr></table></body></html>';
}

/* -------------------------------------------------------------------------- */
/* Contact form                                                                */
/* -------------------------------------------------------------------------- */

/** The enquiry, as it arrives at info@aurmak.com. */
function contact_team_email(array $d): string {
    $rows = field_row('Name', $d['name'])
        . field_row('Email', $d['email'])
        . field_row('Company', $d['company'] ?? '')
        . field_row('Submitted', $d['submittedAt'], true);

    $inner = field_table($rows)
        . '<div style="height:24px;"></div>'
        . mail_label('Message')
        . '<div style="padding:16px;background-color:' . MAIL_BG . ';border:1px solid ' . MAIL_BORDER . ';border-radius:8px;'
        . 'font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.7;color:' . MAIL_TEXT . ';">'
        . nl2br(html_value($d['message'] ?: 'Not provided'))
        . '</div>'
        . '<div style="height:20px;"></div>'
        . mail_p('Reply to this email to answer ' . html_value($d['name']) . ' directly, Reply-To is already set to their address.');

    $footer = 'AURMAK Automations &middot; This enquiry was submitted from the contact form at '
        . '<a href="' . html_value($d['siteUrl']) . '" style="color:' . MAIL_ACTION_TEXT . ';">' . html_value($d['siteUrl']) . '</a>.';

    return email_shell('New enquiry', $d['name'] . ' from ' . ($d['company'] ?: 'no company given'), $inner, $footer);
}

/** The acknowledgement, sent to the visitor. */
function contact_ack_email(array $d): string {
    $inner = mail_p('Hi ' . html_value($d['name']) . ',')
        . mail_p('Thanks for getting in touch. We\'ve received your message and someone from our team will reply within one business day.')
        . '<div style="padding:16px;background-color:' . MAIL_BG . ';border:1px solid ' . MAIL_BORDER . ';border-radius:8px;'
        . 'font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.7;color:' . MAIL_TEXT . ';margin-bottom:16px;">'
        . nl2br(html_value($d['message'] ?: 'Not provided'))
        . '</div>'
        . mail_p('If anything changes in the meantime, just reply to this email, it reaches us directly.');

    $footer = 'AURMAK Automations &middot; <a href="' . html_value($d['siteUrl']) . '" style="color:' . MAIL_ACTION_TEXT . ';">' . html_value($d['siteUrl']) . '</a>'
        . ' &middot; <a href="mailto:' . html_value($d['contactTo']) . '" style="color:' . MAIL_ACTION_TEXT . ';">' . html_value($d['contactTo']) . '</a>';

    return email_shell('Message received', 'We\'ve got your message', $inner, $footer);
}

/* -------------------------------------------------------------------------- */
/* Scope wizard                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Short section labels for the wizard's answers, kept in the same order the wizard asks
 * them. PAIRED with QUESTIONS in src/components/wizard/ScopeWizard.tsx — the frontend
 * already sends the human-readable option labels (not ids), so this file only needs to
 * know the question order and a short heading per id, not a value lookup.
 */
const WIZARD_SECTIONS = [
    'role'      => 'Role',
    'industry'  => 'Industry',
    'size'      => 'Team size',
    'pain'      => "What's eating their time",
    'automate'  => 'What they want automated',
    'volume'    => 'Monthly volume',
    'system'    => 'Systems of record',
];

/** One answer, single or multi, rendered as a value or a row of small pills. */
function wizard_answer_block(string $heading, $value): string {
    $label = mail_label($heading);

    if (is_array($value)) {
        if (empty($value)) {
            return $label . mail_p('Not answered', 'margin-bottom:20px;');
        }
        $pills = '';
        foreach ($value as $item) {
            $pills .= '<span style="display:inline-block;margin:0 8px 8px 0;padding:6px 12px;'
                . 'background-color:' . MAIL_HUMAN_SOFT . ';border-radius:999px;'
                . 'font-family:' . MAIL_SANS . ';font-size:13px;font-weight:600;color:' . MAIL_NAVY . ';">'
                . html_value($item) . '</span>';
        }
        return $label . '<div style="margin:0 0 20px;">' . $pills . '</div>';
    }

    $shown = ($value !== '' && $value !== null) ? (string)$value : 'Not answered';
    return $label . '<p style="margin:0 0 20px;font-family:' . MAIL_SANS . ';font-size:16px;font-weight:600;'
        . 'line-height:1.4;color:' . MAIL_NAVY . ';">' . html_value($shown) . '</p>';
}

/** One stat tile in the impact row (hours saved, % less manual work, $ saved a year). */
function wizard_stat_cell(string $value, string $label): string {
    return '<td class="stat-cell" width="33%" align="center" valign="top" style="padding:4px;">'
        . '<div style="background-color:' . MAIL_SURFACE . ';border-radius:10px;padding:16px 8px;">'
        . '<div style="font-family:' . MAIL_SANS . ';font-size:26px;font-weight:800;line-height:1;color:' . MAIL_SUCCESS . ';">'
        . html_value($value) . '</div>'
        . '<div style="margin-top:6px;font-family:' . MAIL_SANS . ';font-size:12px;line-height:1.35;color:' . MAIL_TEXT_MUTED . ';">'
        . html_value($label) . '</div>'
        . '</div></td>';
}

/**
 * The full wizard results, designed rather than tabulated — the impact estimate as three
 * stat tiles (matching the "Here's what automating this could do for you" card in the
 * wizard's own UI), then every answer as a labelled block with pills for multi-select
 * questions. SAME markup for both audiences: the visitor and info@aurmak.com both see the
 * complete plan, not a receipt. $audience only changes the opening line and eyebrow.
 */
function wizard_results_email(array $d, string $audience): string {
    $estimate = $d['estimate'] ?? null;
    $answers  = $d['answers'] ?? [];

    $inner = '';

    if ($audience === 'visitor') {
        $inner .= mail_p('Hi ' . html_value($d['name']) . ',')
            . mail_p('Here\'s what you told us, and what it could mean for your team. We\'ll follow up within one business day with a plan built around this.');
    } else {
        $inner .= mail_p(html_value($d['name']) . ' (' . html_value($d['email'])
            . ($d['company'] ? ', ' . html_value($d['company']) : '') . ') just completed the scope wizard.');
    }

    if (is_array($estimate) && isset($estimate['hoursMonth'], $estimate['pct'], $estimate['moneyYear'])) {
        $stats = wizard_stat_cell('~' . $estimate['hoursMonth'], 'hours saved a month')
            . wizard_stat_cell('~' . $estimate['pct'] . '%', 'less manual work')
            . wizard_stat_cell((string)$estimate['moneyYear'], 'saved a year');

        $inner .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;'
            . 'background-color:' . MAIL_SUCCESS_BG . ';border:1px solid ' . MAIL_SUCCESS_BD . ';border-radius:12px;">'
            . '<tr><td style="padding:16px 12px 4px;">'
            . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
            . $stats
            . '</tr></table>'
            . '</td></tr>'
            . '<tr><td style="padding:4px 20px 16px;font-family:' . MAIL_SANS . ';font-size:12px;line-height:1.5;color:' . MAIL_TEXT_MUTED . ';">'
            . 'Projected from the answers below. We\'ll confirm the details in the plan.'
            . '</td></tr></table>';
    }

    $inner .= '<div style="height:12px;"></div>';

    foreach (WIZARD_SECTIONS as $id => $heading) {
        if (!array_key_exists($id, $answers)) continue;
        $inner .= wizard_answer_block($heading, $answers[$id]);
    }

    if ($audience === 'visitor') {
        $inner .= '<div style="height:8px;"></div>' . mail_button($d['siteUrl'], 'Visit AURMAK Automations');
    } else {
        $inner .= '<div style="height:8px;"></div>'
            . mail_p('Reply to this email to answer ' . html_value($d['name']) . ' directly, Reply-To is already set to their address.');
    }

    $footer = 'AURMAK Automations &middot; <a href="' . html_value($d['siteUrl']) . '" style="color:' . MAIL_ACTION_TEXT . ';">' . html_value($d['siteUrl']) . '</a>'
        . ($audience === 'visitor'
            ? ' &middot; <a href="mailto:' . html_value($d['contactTo']) . '" style="color:' . MAIL_ACTION_TEXT . ';">' . html_value($d['contactTo']) . '</a>'
            : '');

    $eyebrow = $audience === 'visitor' ? 'Your results' : 'Wizard submission';
    $title   = $audience === 'visitor' ? 'Your automation plan' : $d['name'] . '\'s automation plan';

    return email_shell($eyebrow, $title, $inner, $footer);
}
