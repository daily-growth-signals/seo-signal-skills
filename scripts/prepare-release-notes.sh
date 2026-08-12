#!/bin/bash

# 将已审核的 Unreleased 内容固化为指定版本的发布说明。

set -euo pipefail

VERSION="${1:-}"
if ! [[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Usage: $0 vMAJOR.MINOR.PATCH" >&2
    exit 1
fi

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHANGELOG_FILE="${PROJECT_ROOT}/CHANGELOG.md"
RELEASE_VERSION="${VERSION#v}"
RELEASE_DATE="$(date -u +%Y-%m-%d)"

if grep -Fq "## [${RELEASE_VERSION}]" "$CHANGELOG_FILE"; then
    echo "Error: ${RELEASE_VERSION} already exists in CHANGELOG.md" >&2
    exit 1
fi

UNRELEASED_BODY="$(awk '
    /^## \[Unreleased\]$/ { capture = 1; next }
    capture && /^## \[/ { exit }
    capture { print }
' "$CHANGELOG_FILE")"

if ! printf '%s\n' "$UNRELEASED_BODY" | grep -Eq '^- .+'; then
    echo "Error: [Unreleased] must contain at least one user-facing bullet" >&2
    exit 1
fi

if printf '%s\n' "$UNRELEASED_BODY" | grep -q -- '- 待补充。'; then
    echo "Error: replace the placeholder before preparing a release" >&2
    exit 1
fi

TEMP_FILE="$(mktemp)"
trap 'rm -f "$TEMP_FILE"' EXIT
awk -v version="$RELEASE_VERSION" -v release_date="$RELEASE_DATE" '
    /^## \[Unreleased\]$/ {
        print
        print ""
        print "### 更新内容"
        print ""
        print "- 待补充。"
        print ""
        print "## [" version "] - " release_date
        next
    }
    { print }
' "$CHANGELOG_FILE" > "$TEMP_FILE"
chmod 644 "$TEMP_FILE"
mv "$TEMP_FILE" "$CHANGELOG_FILE"

echo "Prepared CHANGELOG.md for ${VERSION}. Review and commit it before tagging."
