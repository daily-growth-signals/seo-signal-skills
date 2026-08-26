#!/bin/bash

# Publish all SignalDig skills to ClawHub via the official ClawHub CLI.
# Reference: https://openclaw-docs.dx3n.cn/tutorials/tools/clawhub-publishing
#
# Requirements:
#   1. clawhub CLI installed: npm i -g clawhub
#   2. Logged in once (run `clawhub login`), or provide a token via
#      CLAWHUB_TOKEN (auto-login is attempted with `--token`/`auth login`).
#   3. Each SKILL.md frontmatter must contain a `version:` field; the script
#      reads it automatically so the published version always matches the file.
#
# The script runs in dry-run mode by default. Pass `--publish` to actually
# publish after the dry run passes.
#
# Note: ClawHub does NOT auto-sync from GitHub. Every release must be
# published explicitly; new version numbers create new ClawHub releases.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="${PROJECT_ROOT}/skills"

SKILLS=(
    research-seo-signals
    research-social-signals
    decide-content-opportunities
)

DRY_RUN=true
OWNER="${CLAUWHUB_OWNER:-}"
CHANGELOG=""

usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --owner OWNER     Publish as this ClawHub owner (default: \$CLAUWHUB_OWNER)"
    echo "  --changelog TXT   Release note for this publish (required with --publish)"
    echo "  --publish         Actually publish (default is a dry run)"
    echo "  -h, --help        Show this help message"
    echo ""
    echo "Environment:"
    echo "  CLAWHUB_TOKEN     ClawHub token for auto-login (otherwise run 'clawhub login')"
    echo "  CLAWHUB_OWNER     Default owner, used when --owner is not passed"
    echo ""
    echo "Examples:"
    echo "  $0                                    # Dry run"
    echo "  $0 --publish --changelog \"Fix x\"    # Publish all skills"
    echo "  $0 --owner daily-growth-signals --publish --changelog \"Fix x\""
}

while [[ $# -gt 0 ]]; do
    case $1 in
        --owner)
            OWNER="${2:?Missing value for --owner}"
            shift 2
            ;;
        --changelog)
            CHANGELOG="${2:?Missing value for --changelog}"
            shift 2
            ;;
        --publish)
            DRY_RUN=false
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Validate changelog when publishing for real
if [ "$DRY_RUN" = false ] && [ -z "$CHANGELOG" ]; then
    echo "Error: --changelog is required when using --publish" >&2
    exit 1
fi

# Check CLI availability
if ! command -v clawhub >/dev/null 2>&1; then
    echo "Error: 'clawhub' CLI not found. Install it first:" >&2
    echo "  npm i -g clawhub" >&2
    exit 1
fi

# Extract the version field from a SKILL.md frontmatter
extract_version() {
    awk -F': ' '/^version:/ { gsub(/["'"'"']/, "", $2); print $2; exit }' "$1/SKILL.md"
}

echo "=== SignalDig Skills -> ClawHub Publisher ==="
echo "Skills:  ${SKILLS[*]}"
[ -n "$OWNER" ] && echo "Owner:   ${OWNER}"
if [ "$DRY_RUN" = true ]; then
    echo "Mode:    dry-run (pass --publish to publish)"
else
    echo "Mode:    publish"
    echo "Changelog: ${CHANGELOG}"
fi
echo ""

# Auto-login with a token if provided
if [ -n "${CLAUWHUB_TOKEN:-}" ]; then
    echo "=== Logging in with CLAWHUB_TOKEN ==="
    if ! clawhub login --token "$CLAUWHUB_TOKEN" >/dev/null 2>&1; then
        clawhub auth login --token "$CLAUWHUB_TOKEN" >/dev/null 2>&1 || \
            echo "Warning: auto-login failed; run 'clawhub login' manually if needed" >&2
    fi
    echo ""
elif [ "$DRY_RUN" = false ]; then
    echo "Note: no CLAWHUB_TOKEN set; make sure 'clawhub login' was already run."
    echo ""
fi

PUBLISH_FAILED=0

for SKILL in "${SKILLS[@]}"; do
    SKILL_DIR="${SKILLS_DIR}/${SKILL}"
    if [ ! -f "${SKILL_DIR}/SKILL.md" ]; then
        echo "Warning: ${SKILL_DIR}/SKILL.md not found, skipping" >&2
        continue
    fi

    VERSION="$(extract_version "$SKILL_DIR")"
    if [ -z "$VERSION" ]; then
        echo "Error: no 'version:' field in ${SKILL_DIR}/SKILL.md, skipping" >&2
        PUBLISH_FAILED=1
        continue
    fi

    echo "=== ${SKILL} v${VERSION} ==="
    echo "ClawHub page will be: https://clawhub.ai/${OWNER:-<owner>}/${SKILL}"

    # The official CLI requires the skill directory as the positional argument
    # (it locates SKILL.md inside it). Always run the dry-run validation first.
    if [ "$DRY_RUN" = true ]; then
        clawhub skill publish "$SKILL_DIR" --version "$VERSION" --dry-run
        echo "OK: ${SKILL} passed the dry run"
        echo ""
        continue
    fi

    CMD=(clawhub skill publish "$SKILL_DIR" --version "$VERSION")
    [ -n "$OWNER" ] && CMD+=(--owner "$OWNER")
    [ -n "$CHANGELOG" ] && CMD+=(--changelog "$CHANGELOG")

    if ! "${CMD[@]}"; then
        echo "Error: publish failed for ${SKILL}" >&2
        PUBLISH_FAILED=1
    fi
    echo ""

    # 并发安全：skill 平台对连续发布有限流/冲突风险，每个发布之间间隔 3s
    sleep 3
done

if [ "$DRY_RUN" = true ]; then
    echo "Dry run finished. To publish for real:"
    echo "  $0 --publish --changelog \"Release note...\""
elif [ "$PUBLISH_FAILED" -ne 0 ]; then
    echo "Publish completed with errors, see above." >&2
    exit 1
else
    echo "All skills published to ClawHub: https://clawhub.ai/"
fi

echo ""
echo "Official site: https://signaldig.com/"
