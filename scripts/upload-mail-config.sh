#!/bin/bash
#
# Put the Graph config on the server, outside the docroot.
#
#   scripts/upload-mail-config.sh staging      (default)
#   scripts/upload-mail-config.sh production
#
# The secret never goes through git or through the deploy. The deploy mirrors dist/ with
# --delete, so anything it could reach would be wiped on the next push anyway; private/
# is not in that path, which is the other half of why the config lives there.
#
# Reads graph-config.<target>.local.php from the repository root (falls back to
# graph-config.local.php). That file is gitignored. Start from graph-config.example.php.
set -euo pipefail

TARGET="${1:-staging}"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# One file per target, so both can sit side by side and neither has to be edited in place
# on the way to the other host. The two differ only in site_url, which is what the emails
# link back to: a staging result that sends its reader to production, or the reverse, is
# the exact mistake an in-place edit makes.
LOCAL_CONFIG="$PROJECT_DIR/graph-config.$TARGET.local.php"
[ -f "$LOCAL_CONFIG" ] || LOCAL_CONFIG="$PROJECT_DIR/graph-config.local.php"

case "$TARGET" in
  staging)    DOMAIN="staging.automations.aurmak.com" ;;
  production) DOMAIN="automations.aurmak.com" ;;
  *) echo "Unknown target '$TARGET'. Use staging or production." >&2; exit 1 ;;
esac

REMOTE_DIR="/home/webuser/web/$DOMAIN/private"
REMOTE_CONFIG="$REMOTE_DIR/graph_config.php"

if [ ! -f "$LOCAL_CONFIG" ]; then
  echo "Missing $LOCAL_CONFIG" >&2
  echo "Copy graph-config.example.php to graph-config.$TARGET.local.php, set site_url to" >&2
  echo "https://$DOMAIN, and fill in the secret." >&2
  exit 1
fi

if grep -q "REPLACE_WITH_" "$LOCAL_CONFIG"; then
  echo "$LOCAL_CONFIG still contains REPLACE_WITH_ placeholders." >&2
  exit 1
fi

# Cheap guard against pointing a staging config at production, or the other way round.
if ! grep -q "$DOMAIN" "$LOCAL_CONFIG"; then
  echo "site_url in $LOCAL_CONFIG does not name $DOMAIN. Refusing to upload." >&2
  exit 1
fi

echo "Uploading to $DOMAIN"
scp -q "$LOCAL_CONFIG" "ionos-vps:$REMOTE_CONFIG"

# 640 webuser:www-data, which is what cyber.aurmak.com's config carries.
#
# OWNERSHIP IS THE PART THAT BITES. This runs over SSH as root, so everything it touches is
# root-owned by default, and PHP-FPM runs as webuser: a root-owned 640 file is unreadable
# to it and api.php returns "not configured on this server" with nothing in the log to say
# why. chown, not just chmod.
#
# The log and the rate limit directory are written by PHP, so they are 660 and 770.
ssh ionos-vps "
  set -e
  touch '$REMOTE_DIR/api_error.log'
  mkdir -p '$REMOTE_DIR/ratelimit'
  chown webuser:www-data '$REMOTE_CONFIG' '$REMOTE_DIR/api_error.log' '$REMOTE_DIR/ratelimit'
  chmod 640 '$REMOTE_CONFIG'
  chmod 660 '$REMOTE_DIR/api_error.log'
  chmod 770 '$REMOTE_DIR/ratelimit'
  ls -la '$REMOTE_DIR'
"

echo "Done. $REMOTE_CONFIG is in place and is not reachable over HTTP."
