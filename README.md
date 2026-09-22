# AURMAK Automations

The marketing site for AURMAK Automations — a static React/Vite/TypeScript app, styled
with Tailwind. Two pieces of it (the contact form and the scope wizard) post to a small
PHP endpoint that emails the submission through Microsoft Graph; everything else is plain
static content.

- **Staging:** https://staging.automations.aurmak.com (`staging` branch, deploys on push)
- **Production:** https://automations.aurmak.com (`main` branch, deploys on push)

## First-time setup

You need Node 20+ and [pnpm](https://pnpm.io) (`corepack enable` will get you the right
pnpm version automatically — `package.json` pins it via `packageManager`).

```bash
pnpm install
```

## Running it locally

```bash
pnpm dev
```

Opens at http://localhost:3000. Everything works — browsing, the wizard's questions and
its estimate — **except actually submitting** the contact form or the wizard, which needs
the PHP backend described below.

## Do you need to run the PHP server?

**Only if you're testing the contact form or the scope wizard's final submit step.**
Nothing else on the site touches PHP.

Vite's dev server is pure JavaScript — it has no idea how to run `public/api.php`, and it
doesn't read `public/.htaccess` (that rewrite is Apache's job, and only exists once the
site is deployed to the real server). So `vite.config.ts` proxies `/api/lead` to a PHP
server you run yourself:

```bash
php -S 127.0.0.1:8788 -t public
```

Run that in a second terminal, alongside `pnpm dev`, and form submissions will reach the
real `api.php`. Without it, a submit attempt will fail with a connection error instead of
silently doing nothing — that's deliberate, so a missing PHP server is obvious rather than
a form that looks like it worked but never sent anything.

### Sending a real test email

`api.php` reads its Microsoft Graph credentials from `private/graph_config.php`, one level
above `public/` — the same place it lives on the server (see the comment at the top of
`graph-config.example.php` for the full picture, including why the secret is never
committed). To send real test emails locally:

```bash
mkdir -p private
cp graph-config.example.php private/graph_config.php
# then edit private/graph_config.php: fill in the real tenant_id/client_id/client_secret
# (ask whoever holds the shared Azure app credentials — the same app cyber.aurmak.com and
# aurmak.com use), and consider pointing contact_to at your own address while testing so
# you're not filling info@aurmak.com with test submissions.
```

Both `private/` and `graph-config.*.local.php` are gitignored — nothing here can end up in
a commit by accident. Without this file in place, submitting a form still works end to end
(no crash), it just returns a clear "This form is not configured on this server" error
instead of sending mail.

## Building

```bash
pnpm build
```

Type-checks with `tsc`, then builds a static export to `dist/`. Both the staging and
production GitHub Actions workflows run this same command before deploying — see
`.github/workflows/staging.yml` and `.github/workflows/deploy.yml` for exactly what ships
and how.
