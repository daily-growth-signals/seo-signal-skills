#!/bin/bash

# 将已审核的中英文 Unreleased 内容同时固化为指定版本的发布说明。

set -euo pipefail

VERSION="${1:-}"
if ! [[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Usage: $0 vMAJOR.MINOR.PATCH" >&2
    exit 1
fi

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHANGELOG_EN="${PROJECT_ROOT}/CHANGELOG.md"
CHANGELOG_ZH="${PROJECT_ROOT}/CHANGELOG-zh.md"
RELEASE_VERSION="${VERSION#v}"
RELEASE_DATE="$(date -u +%Y-%m-%d)"

validate_changelog() {
    local changelog_file="$1"
    local placeholder="$2"
    local unreleased_body

    if grep -Fq "## [${RELEASE_VERSION}]" "$changelog_file"; then
        echo "Error: ${RELEASE_VERSION} already exists in ${changelog_file}" >&2
        exit 1
    fi

    unreleased_body="$(awk '
        /^## \[Unreleased\]$/ { capture = 1; next }
        capture && /^## \[/ { exit }
        capture { print }
    ' "$changelog_file")"

    if ! printf '%s\n' "$unreleased_body" | grep -Eq '^- .+'; then
        echo "Error: [Unreleased] must contain at least one bullet in ${changelog_file}" >&2
        exit 1
    fi

    if printf '%s\n' "$unreleased_body" | grep -Fq -- "$placeholder"; then
        echo "Error: replace the placeholder in ${changelog_file}" >&2
        exit 1
    fi
}

prepare_changelog() {
    local changelog_file="$1"
    local section_title="$2"
    local placeholder="$3"
    local output_file="$4"

    awk \
        -v version="$RELEASE_VERSION" \
        -v release_date="$RELEASE_DATE" \
        -v section_title="$section_title" \
        -v placeholder="$placeholder" '
        /^## \[Unreleased\]$/ {
            print
            print ""
            print section_title
            print ""
            print placeholder
            print ""
            print "## [" version "] - " release_date
            next
        }
        { print }
    ' "$changelog_file" > "$output_file"
}

validate_changelog "$CHANGELOG_EN" "- To be added."
validate_changelog "$CHANGELOG_ZH" "- 待补充。"

TEMP_EN="$(mktemp)"
TEMP_ZH="$(mktemp)"
trap 'rm -f "$TEMP_EN" "$TEMP_ZH"' EXIT

prepare_changelog "$CHANGELOG_EN" "### Changes" "- To be added." "$TEMP_EN"
prepare_changelog "$CHANGELOG_ZH" "### 更新内容" "- 待补充。" "$TEMP_ZH"
chmod 644 "$TEMP_EN" "$TEMP_ZH"
mv "$TEMP_EN" "$CHANGELOG_EN"
mv "$TEMP_ZH" "$CHANGELOG_ZH"

echo "Prepared CHANGELOG.md and CHANGELOG-zh.md for ${VERSION}. Review and commit both files before tagging."
