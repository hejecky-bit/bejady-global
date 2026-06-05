#!/bin/bash
# Auto Publish Script (Draft Mode) — 生成草稿，等你审核后再发布
#
# 每天自动运行流程：
#   生成文章 → 保存为草稿 → 通知你审核 → 你确认后我才发布
#
# Setup crontab:
#   23 8 * * * cd /var/www/html/bejady-global && bash scripts/auto-publish.sh >> /var/log/bejady-blog.log 2>&1

set -e

echo ""
echo "=========================================="
echo "📝 BEJADY Draft Generator — $(date)"
echo "=========================================="

cd /var/www/html/bejady-global

# Step 1: Decide language (rotate)
DAY=$(date +%u)
case $DAY in
  1|3|5) LANG="en" ;;
  2|4)   LANG="zh" ;;
  6)     LANG="ja" ;;
  7)     LANG="ru" ;;
esac

echo "🌐 Language: $LANG"

# Step 2: Generate article with AI
echo "✍️  Generating article..."
BLOG_LOCALE=$LANG node scripts/generate-post.js

# Step 3: Save to drafts
echo "📁 Saving to drafts..."
DRAFTS_DIR="content/drafts"
mkdir -p "$DRAFTS_DIR"
cp content/blog/$LANG/*.json "$DRAFTS_DIR/" 2>/dev/null

# Step 4: Create notification
NOTES_DIR="content/notifications"
mkdir -p "$NOTES_DIR"
cat > "$NOTES_DIR/latest-draft.json" << EOF
{
  "date": "$(date -u +%Y-%m-%d)",
  "language": "$LANG",
  "status": "pending_review",
  "message": "今天的新文章草稿已生成，请检查后告诉我发布"
}
EOF

echo ""
echo "✅ 草稿已生成！"
echo "   语言: $LANG"
echo "   位置: content/drafts/"
echo "   ＞ 请检查文章内容，确认后告诉我发布"
echo "=========================================="
