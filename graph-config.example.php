<?php
/**
 * Template for the Microsoft Graph config that public/api.php reads on the server.
 *
 * THE REAL FILE IS NEVER COMMITTED. It holds a client secret, it lives outside the
 * docroot, and .gitignore covers every working copy. One file per target, because the two
 * differ in site_url and editing one in place on the way to the other host is how a
 * staging acknowledgement ends up linking a reader to production:
 *
 *   graph-config.staging.local.php      site_url https://staging.automations.aurmak.com
 *   graph-config.production.local.php   site_url https://automations.aurmak.com
 *
 * Then run scripts/upload-mail-config.sh staging, or production.
 *
 * On the server it belongs in the Hestia private/ directory beside public_html, which is
 * inside PHP's open_basedir and is not served by Apache or nginx:
 *
 *   /home/webuser/web/staging.automations.aurmak.com/private/graph_config.php   (staging)
 *   /home/webuser/web/automations.aurmak.com/private/graph_config.php           (production)
 *
 * chmod 640, owned webuser:www-data, so PHP can read it and nothing else can. The upload
 * script does that for you.
 *
 * Two files are created next to it at runtime and are not managed here:
 *   graph_token_cache.json   a 60 minute access token, so we do not hit the token
 *                            endpoint on every email
 *   api_error.log            Graph failures. It records tenant and app identifiers, which
 *                            is exactly why it is not under the docroot.
 *   ratelimit/               one small JSON file per hashed client address
 *
 * The Azure app is the same one aurmak.com and cyber.aurmak.com use (client credentials,
 * Mail.Send limited to the no-reply mailbox by an application access policy). Nothing new
 * had to be registered for this site, and nothing here grants access to any other mailbox.
 */

return [
    // Azure AD app, client credentials flow. Shared with aurmak.com and cyber.aurmak.com.
    'tenant_id'     => 'REPLACE_WITH_TENANT_ID',
    'client_id'     => 'REPLACE_WITH_CLIENT_ID',
    'client_secret' => 'REPLACE_WITH_CLIENT_SECRET',

    // The shared mailbox PHP authenticates as. Both messages are sent from here.
    'sender_mailbox' => 'no-reply@aurmak.com',

    // Where a lead lands. An inbox the team shares, not a person, so nothing is lost to
    // one person's holiday.
    'contact_to' => 'info@aurmak.com',

    // Set this per host so a staging result does not send its reader to production.
    'site_url'  => 'https://staging.automations.aurmak.com',   // or https://automations.aurmak.com
];
