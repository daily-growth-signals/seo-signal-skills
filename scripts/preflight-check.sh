#!/bin/bash
#
# preflight-check.sh — 发布前检查（打 tag / 推送 tag 前运行）
#
# 校验内容：
#   1. 对比远程最新 tag 与本地代码的 diff（列出 skills/ 变更，防止"改了但没记录"）
#   2. 版本规范：各 skill version 符合 semver，且不相对已发布版本倒退（各 skill 独立管理，不强制统一）
#   3. SKILL.md frontmatter 必需字段 + slug 唯一性
#   4. CHANGELOG 中英文双语同步、目标版本条目非空
#   5. (可选 --dry-run) 调用 hub CLI 做预发布 dry-run
#
# 用法：
#   bash scripts/preflight-check.sh                   # 完整校验（含 fetch）
#   bash scripts/preflight-check.sh v1.4.0            # 指定即将发布版本
#   bash scripts/preflight-check.sh v1.4.0 --dry-run  # 额外跑 hub dry-run
#   bash scripts/preflight-check.sh --no-fetch --light # 离线轻量校验（供 pre-commit 用）
#
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="$PROJECT_ROOT/skills"
CHANGELOG_EN="$PROJECT_ROOT/CHANGELOG.md"
CHANGELOG_ZH="$PROJECT_ROOT/CHANGELOG-zh.md"

TARGET_VERSION=""
TARGET_VER=""
RUN_DRY_RUN=false
NO_FETCH=false
LIGHT=false

for a in "$@"; do
    case "$a" in
        --dry-run) RUN_DRY_RUN=true ;;
        --no-fetch) NO_FETCH=true ;;
        --light) LIGHT=true ;;
        v*) TARGET_VERSION="$a" ;;
    esac
done
TARGET_VER="${TARGET_VERSION#v}"

PASS=0
FAIL=0
ok()   { printf '  [OK]   %s\n' "$*"; PASS=$((PASS + 1)); }
err()  { printf '  [FAIL] %s\n' "$*"; FAIL=$((FAIL + 1)); }
warn() { printf '  [WARN] %s\n' "$*"; }

# 收集 skill 目录（存在 SKILL.md 的子目录）
SKILLS=()
for d in "$SKILLS_DIR"/*/; do
    [ -f "${d}SKILL.md" ] && SKILLS+=("$(basename "$d")")
done

# 从 SKILL.md frontmatter 提取字段值
extract_field() {
    local file="$1" field="$2"
    awk -v key="${field}:" '
        $0 ~ ("^" key "[[:space:]]") {
            sub(/^[^:]+:[[:space:]]*/, "")
            gsub(/^["'"'"']|["'"'"']$/, "")
            print
            exit
        }
    ' "$file"
}

# semver 数值比较：$1 < $2 返回 0，否则返回 1（x.y.z 均无 v 前缀）
ver_lt() {
    [ "$(printf '%s\n%s\n' "$1" "$2" | sort -t. -k1,1n -k2,2n -k3,3n | head -n1)" = "$1" ] && [ "$1" != "$2" ]
}

echo "=== 1. Diff: 远程最新 tag vs 本地 HEAD ==="
LATEST_TAG=""
SKILL_CHANGED=0
if [ "$LIGHT" = true ]; then
    warn "轻量模式，跳过远程 diff 对比"
else
    if [ "$NO_FETCH" = true ]; then
        warn "跳过 git fetch（--no-fetch）"
    else
        git fetch origin --tags --quiet 2>/dev/null || warn "git fetch 失败，回退到本地 tag"
    fi
    LATEST_TAG="$(git tag --list 'v*' --sort=-version:refname 2>/dev/null | head -n1 || true)"
    if [ -z "$LATEST_TAG" ]; then
        warn "未发现任何 v* tag，无法做 diff 对比"
    else
        echo "  最新已发布 tag: ${LATEST_TAG}"
        changed="$(git diff --name-only "${LATEST_TAG}...HEAD" 2>/dev/null || true)"
        if [ -z "$changed" ]; then
            ok "本地相对 ${LATEST_TAG} 无代码变更"
        else
            echo "  相对 ${LATEST_TAG} 的变更文件："
            while IFS= read -r f; do
                [ -z "$f" ] && continue
                case "$f" in
                    skills/*)
                        printf '    [skill] %s\n' "$f"
                        SKILL_CHANGED=1
                        ;;
                    *) printf '    [other] %s\n' "$f" ;;
                esac
            done <<< "$changed"
            warn "skills/ 有变更时，变更内容必须已记录到 CHANGELOG"
        fi
    fi
fi
echo ""

echo "=== 2. 版本规范 ==="
for skill in "${SKILLS[@]}"; do
    v="$(extract_field "$SKILLS_DIR/$skill/SKILL.md" version)"
    printf '  %-30s version=%s\n' "$skill" "${v:-<缺失>}"
    if ! [[ "$v" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        err "$skill 的 version 不是 semver (x.y.z)"
    fi
done

# 各 skill 版本独立管理，不强制统一；仅对比远程最新 tag 中各自的历史版本，防止版本倒退
if [ "$LIGHT" != true ] && [ -n "$LATEST_TAG" ]; then
    for skill in "${SKILLS[@]}"; do
        v="$(extract_field "$SKILLS_DIR/$skill/SKILL.md" version)"
        [ -z "$v" ] && continue
        prev="$(git show "${LATEST_TAG}:skills/${skill}/SKILL.md" 2>/dev/null | awk -v key="version:" '
            $0 ~ ("^" key "[[:space:]]") { sub(/^[^:]+:[[:space:]]*/, ""); gsub(/^["'"'"']|["'"'"']$/, ""); print; exit }
        ')"
        if [ -z "$prev" ]; then
            if git cat-file -e "${LATEST_TAG}:skills/${skill}/SKILL.md" 2>/dev/null; then
                ok "$skill 在 ${LATEST_TAG} 中无 version 字段（version 为本次新增），当前=${v}"
            else
                ok "$skill 为新增技能（${LATEST_TAG} 中不存在），version=${v}"
            fi
        elif ver_lt "$v" "$prev"; then
            err "$skill 版本倒退：当前 ${v} < ${LATEST_TAG} 的 ${prev}"
        elif [ "$v" = "$prev" ]; then
            ok "$skill 版本未变（${v}）"
        else
            ok "$skill 版本提升：${prev} -> ${v}"
        fi
    done
fi
echo ""

echo "=== 3. SKILL.md frontmatter ==="
REQUIRED=(name description slug displayName version summary license tags)
seen_slugs=""
for skill in "${SKILLS[@]}"; do
    f="$SKILLS_DIR/$skill/SKILL.md"
    for field in "${REQUIRED[@]}"; do
        if ! grep -Eq "^${field}:[[:space:]]" "$f"; then
            err "$skill 缺少必需字段: ${field}"
        fi
    done
    slug="$(extract_field "$f" slug)"
    case " $seen_slugs " in
        *" $slug "*) err "slug 重复: ${slug}" ;;
        *) seen_slugs="$seen_slugs $slug" ;;
    esac
done
ok "frontmatter 必需字段与 slug 唯一性检查完成"
echo ""

echo "=== 4. CHANGELOG 双语同步 ==="
en_ver_count="$(grep -c '^## \[' "$CHANGELOG_EN" || true)"
zh_ver_count="$(grep -c '^## \[' "$CHANGELOG_ZH" || true)"
if [ "$en_ver_count" != "$zh_ver_count" ]; then
    err "CHANGELOG 版本条目数不一致: EN=${en_ver_count} ZH=${zh_ver_count}"
else
    ok "CHANGELOG 版本条目数一致 (${en_ver_count})"
fi

# 提取某版本段落的 body
section_body() {
    awk -v v="## [$1]" '
        index($0, v) == 1 && ($0 == v || $0 ~ / - [0-9]{4}-[0-9]{2}-[0-9]{2}$/) { cap = 1; next }
        cap && /^## \[/ { exit }
        cap { print }
    ' "$2"
}

check_section() {
    local ver="$1" file="$2" placeholder="$3"
    local body
    body="$(section_body "$ver" "$file")"
    if ! printf '%s\n' "$body" | grep -Eq '^- .+'; then
        err "$(basename "$file") 的 [${ver}] 无有效条目"
    elif printf '%s\n' "$body" | grep -Fq -- "$placeholder"; then
        err "$(basename "$file") 的 [${ver}] 仍是占位符，请填写"
    else
        ok "$(basename "$file") [${ver}] 条目已填写"
    fi
}

if [ "$LIGHT" != true ]; then
    if [ -n "$TARGET_VER" ]; then
        check_section "$TARGET_VER" "$CHANGELOG_EN" "- To be added."
        check_section "$TARGET_VER" "$CHANGELOG_ZH" "- 待补充。"
        # skills 有变更 → 目标版本条目必须有效（由 check_section 保证）
        if [ "$SKILL_CHANGED" = 1 ]; then
            ok "skills/ 有变更，且已要求 CHANGELOG [${TARGET_VER}] 非空"
        fi
    else
        warn "未指定目标版本，仅校验 [Unreleased] 是否有待记录内容"
        unreleased_en="$(section_body "Unreleased" "$CHANGELOG_EN")"
        if printf '%s\n' "$unreleased_en" | grep -Eq '^- .+'; then
            warn "[Unreleased] 有未固化的变更，发版前请用 prepare-release-notes.sh 固化"
        fi
    fi
fi
echo ""

if [ "$RUN_DRY_RUN" = true ] && [ "$LIGHT" != true ]; then
    echo "=== 5. 预发布 dry-run ==="
    for skill in "${SKILLS[@]}"; do
        d="$SKILLS_DIR/$skill"
        v="$(extract_field "$d/SKILL.md" version)"
        if command -v clawhub >/dev/null 2>&1; then
            echo "  clawhub dry-run: ${skill}"
            if clawhub skill publish "$d" --version "$v" --dry-run >/dev/null 2>&1; then
                ok "clawhub dry-run 通过: ${skill}"
            else
                err "clawhub dry-run 失败: ${skill}"
            fi
        else
            warn "clawhub CLI 未安装，跳过 dry-run"
        fi
        if command -v skillhub >/dev/null 2>&1; then
            echo "  skillhub dry-run: ${skill}"
            if skillhub publish "$d" --host "${SKILLHUB_API_HOST:-https://api.skillhub.cn}" --dry-run >/dev/null 2>&1; then
                ok "skillhub dry-run 通过: ${skill}"
            else
                err "skillhub dry-run 失败: ${skill}"
            fi
        else
            warn "skillhub CLI 未安装，跳过 dry-run"
        fi
    done
    echo ""
fi

echo "=== 结果: ${PASS} 通过, ${FAIL} 失败 ==="
if [ "$FAIL" -ne 0 ]; then
    echo "发布前检查未通过，请修复上方 [FAIL] 项。" >&2
    exit 1
fi
echo "发布前检查全部通过。"
