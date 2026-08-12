#!/bin/bash

# Release package builder for SEO Signal Skills
# Creates a zip file containing only the skill subdirectories
# Supports auto tagging and pushing to remote

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="${PROJECT_ROOT}/skills"
OUTPUT_DIR="${PROJECT_ROOT}/dist"

# Parse arguments
VERSION=""
AUTO_TAG=false
PUSH_REMOTE=""

usage() {
    echo "Usage: $0 [OPTIONS] [VERSION]"
    echo ""
    echo "Options:"
    echo "  -t, --tag          Create and push git tag automatically"
    echo "  -p, --push REMOTE  Push tag to specified remote (default: origin)"
    echo "  -h, --help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 v1.0.0                    # Build package with version v1.0.0"
    echo "  $0 --tag v1.1.0              # Build and create git tag v1.1.0"
    echo "  $0 --tag --push origin v2.0  # Build, tag, and push to origin"
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--tag)
            AUTO_TAG=true
            shift
            ;;
        -p|--push)
            PUSH_REMOTE="${2:-origin}"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        v*)
            VERSION="$1"
            shift
            ;;
        *)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Version from argument or git tag or default
VERSION="${VERSION:-$(git describe --tags --abbrev=0 2>/dev/null || echo 'dev')}"
PACKAGE_NAME="seo-signal-skills-${VERSION}"
OUTPUT_FILE="${OUTPUT_DIR}/${PACKAGE_NAME}.zip"

echo "=== SEO Signal Skills Package Builder ==="
echo "Version: ${VERSION}"
echo "Output: ${OUTPUT_FILE}"

# Validate version format for tagging
if [ "$AUTO_TAG" = true ]; then
    if ! [[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "Error: Version must match format vMAJOR.MINOR.PATCH (e.g., v1.0.0)"
        exit 1
    fi

    RELEASE_VERSION="${VERSION#v}"
    if ! grep -Fq "## [${RELEASE_VERSION}]" "${PROJECT_ROOT}/CHANGELOG.md" || \
       ! grep -Fq "## [${RELEASE_VERSION}]" "${PROJECT_ROOT}/CHANGELOG-zh.md"; then
        echo "Error: prepare both reviewed CHANGELOG entries before tagging ${VERSION}" >&2
        echo "Run: bash scripts/prepare-release-notes.sh ${VERSION}" >&2
        exit 1
    fi

    if ! git diff --quiet -- CHANGELOG.md CHANGELOG-zh.md || \
       ! git diff --cached --quiet -- CHANGELOG.md CHANGELOG-zh.md; then
        echo "Error: commit both reviewed CHANGELOG files before tagging ${VERSION}" >&2
        exit 1
    fi
    
    # Check if tag already exists
    if git rev-parse "${VERSION}" >/dev/null 2>&1; then
        echo "Warning: Tag ${VERSION} already exists"
        read -p "Delete existing tag and recreate? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git tag -d "${VERSION}"
            if [ -n "$PUSH_REMOTE" ] && git ls-remote --tags "$PUSH_REMOTE" | grep -q "refs/tags/${VERSION}$"; then
                git push "$PUSH_REMOTE" ":refs/tags/${VERSION}" 2>/dev/null || true
            fi
        else
            echo "Aborting"
            exit 1
        fi
    fi
fi

# Create output directory
mkdir -p "${OUTPUT_DIR}"

# Create zip with only skill subdirectories (excluding README.md)
cd "${SKILLS_DIR}"
zip -r "${OUTPUT_FILE}" \
    research-seo-signals/ \
    research-social-signals/ \
    decide-content-opportunities/ \
    -x "*.DS_Store" \
    -x "*__pycache__/*"

# Show package contents
echo ""
echo "Package created successfully!"
echo "File: ${OUTPUT_FILE}"
echo "Size: $(du -h "${OUTPUT_FILE}" | cut -f1)"
echo ""
echo "Contents:"
unzip -l "${OUTPUT_FILE}" | tail -n +4 | head -20

if [ "$(unzip -l "${OUTPUT_FILE}" | wc -l)" -gt 24 ]; then
    echo "... and $(( $(unzip -l "${OUTPUT_FILE}" | wc -l) - 24 )) more files"
fi

# Auto create and push tag
if [ "$AUTO_TAG" = true ]; then
    echo ""
    echo "=== Creating Git Tag ==="
    
    # Commit any uncommitted changes if present
    if ! git diff-index --quiet HEAD --; then
        echo "Detected uncommitted changes"
        read -p "Commit changes before tagging? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add -A
            git commit -m "chore: release ${VERSION}"
        fi
    fi
    
    # Create annotated tag
    git tag -a "${VERSION}" -m "Release ${VERSION}
    
Skills Package:
- research-seo-signals
- research-social-signals  
- decide-content-opportunities
"
    echo "Created tag: ${VERSION}"
    
    # Push tag to remote
    if [ -n "$PUSH_REMOTE" ]; then
        echo ""
        echo "=== Pushing Tag to ${PUSH_REMOTE} ==="
        git push "${PUSH_REMOTE}" "${VERSION}"
        echo "Tag pushed successfully!"
        echo ""
        echo "GitHub Actions will now:"
        echo "  1. Build the release zip"
        echo "  2. Create GitHub Release"
        echo "  3. Upload package as release asset"
        echo ""
        echo "View releases at: https://github.com/daily-growth-signals/seo-signal-skills/releases"
    else
        echo ""
        echo "Tag created locally. To push manually:"
        echo "  git push origin ${VERSION}"
    fi
fi
