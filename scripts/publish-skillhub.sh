#!/bin/bash

# Publish all SignalDig skills to SkillHub via the official SkillHub CLI.
# Reference: https://skillhub.cn/tutorials#publish-via-cli
#
# Requirements:
#   1. skillhub CLI installed (see the tutorial above for installation)
#   2. SKILLHUB_API_KEY environment variable set to your SkillHub API key
#      (used for publish permission) - or run `skillhub login` once
#   3. API host defaults to https://api.skillhub.cn, override with --host
#
# The script runs `skillhub publish` in --dry-run mode by default.
# Pass `--publish` to actually publish after the dry run passes.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="${PROJECT_ROOT}/skills"

SKILLS=(
    research-seo-signals
    research-social-signals
    decide-content-opportunities
)

HOST="${SKILLHUB_API_HOST:-https://api.skillhub.cn}"
DRY_RUN=true
CHANGELOG=""

usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --host URL       SkillHub API host (default: \$SKILLHUB_API_HOST or https://api.skillhub.cn)"
    echo "  --publish        Actually publish (default is a dry run)"
    echo "  --changelog TXT  Release note for this publish (required with --publish)"
    echo "  -h, --help       Show this help message"
    echo ""
    echo "Environment:"
    echo "  SKILLHUB_API_KEY    SkillHub API key for publish permission (used to auto-login)"
    echo "  SKILLHUB_API_HOST   API host, used when --host is not passed"
    echo ""
    echo "Examples:"
    echo "  $0                                  # Dry run against the default API host"
    echo "  $0 --publish --changelog \"Fix x\"  # Publish all skills"
}

while [[ $# -gt 0 ]]; do
    case $1 in
        --host)
            HOST="${2:?Missing value for --host}"
            shift 2
            ;;
        --publish)
            DRY_RUN=false
            shift
            ;;
        --changelog)
            CHANGELOG="${2:?Missing value for --changelog}"
            shift 2
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
if ! command -v skillhub >/dev/null 2>&1; then
    echo "Error: 'skillhub' CLI not found. Install it first, see:" >&2
    echo "  https://skillhub.cn/tutorials#publish-via-cli" >&2
    exit 1
fi

echo "=== SignalDig Skills -> SkillHub Publisher ==="
echo "Host:    ${HOST}"
echo "Skills:  ${SKILLS[*]}"
if [ "$DRY_RUN" = true ]; then
    echo "Mode:    dry-run (pass --publish to publish)"
else
    echo "Mode:    publish"
    echo "Changelog: ${CHANGELOG}"
fi
echo ""

# Login if a key is available and not already logged in
if [ -n "${SKILLHUB_API_KEY:-}" ]; then
    echo "=== Logging in with SKILLHUB_API_KEY ==="
    skillhub login --key "$SKILLHUB_API_KEY" --host "$HOST" || \
        skillhub auth login --token "$SKILLHUB_API_KEY" --host "$HOST"
    echo ""
fi

PUBLISH_FAILED=0

for SKILL in "${SKILLS[@]}"; do
    SKILL_DIR="${SKILLS_DIR}/${SKILL}"
    if [ ! -f "${SKILL_DIR}/SKILL.md" ]; then
        echo "Warning: ${SKILL_DIR}/SKILL.md not found, skipping" >&2
        continue
    fi

    echo "=== ${SKILL} ==="
    # The official CLI requires the skill directory as the `path` positional
    # argument (it locates SKILL.md inside it).
    SKILL_PATH="$SKILL_DIR"

    # Always run the dry-run validation first
    if ! skillhub publish "$SKILL_PATH" --host "$HOST" --dry-run; then
        echo "Error: dry-run failed for ${SKILL}, fix the issues above before publishing" >&2
        PUBLISH_FAILED=1
        continue
    fi

    if [ "$DRY_RUN" = true ]; then
        echo "OK: ${SKILL} passed the dry run"
        echo ""
        continue
    fi

    if ! skillhub publish "$SKILL_PATH" --host "$HOST" --changelog "$CHANGELOG"; then
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
    echo "All skills published to SkillHub: https://skillhub.cn/"
fi

echo ""
echo "Official site: https://signaldig.com/"
