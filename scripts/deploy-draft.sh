#!/bin/bash
# 审核通过后，运行此脚本发布草稿到网站
# 用法: bash scripts/deploy-draft.sh

set -e

cd /var/www/html/bejady-global

echo "=========================================="
echo "🚀 Publishing approved draft..."
echo "=========================================="

# Step 1: Show draft info
echo "📋 Latest draft:"
cat content/notifications/latest-draft.json 2>/dev/null || echo "   (no draft info)"
echo ""

# Step 2: Copy drafts to blog
echo "📁 Moving drafts to blog..."
mkdir -p content/blog/en content/blog/zh content/blog/ja content/blog/ru
for f in content/drafts/*.json; do
  lang=$(grep -o '"language": "[^"]*"' "$f" | head -1 | cut -d'"' -f4)
  if [ -n "$lang" ]; then
    cp "$f" "content/blog/$lang/"
    echo "   -> content/blog/$lang/$(basename $f)"
  fi
done

# Step 3: Build site
echo "🏗️  Building site..."
npm run build

# Step 4: Copy content to standalone
echo "📁 Copying content..."
mkdir -p .next/standalone/content
cp -r content/* .next/standalone/content/ 2>/dev/null

# Step 5: Generate LinkedIn post
echo "📝 Generating LinkedIn post..."
node scripts/linkedin-poster.js 2>/dev/null || echo "   (linkedin post skipped)"

# Step 6: Restart
echo "🔄 Restarting server..."
pm2 restart bejady

# Step 7: Clean up
echo "🧹 Cleaning up drafts..."
rm -f content/drafts/*.json 2>/dev/null
rm -f content/notifications/latest-draft.json 2>/dev/null

echo ""
echo "✅ 文章已发布！"
echo "=========================================="
