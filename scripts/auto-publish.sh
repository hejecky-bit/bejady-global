#!/bin/bash
# Auto Publish Script — runs daily via crontab
# This script generates an AI article, builds the site, and deploys
#
# Setup crontab (run once every morning):
#   0 8 * * * cd /var/www/html/bejady-global && bash scripts/auto-publish.sh >> /var/log/bejady-blog.log 2>&1
#
# Or run daily at a random minute to avoid congestion:
#   23 7 * * * cd /var/www/html/bejady-global && bash scripts/auto-publish.sh >> /var/log/bejady-blog.log 2>&1

set -e

echo ""
echo "=========================================="
echo "🚀 BEJADY Auto Publish — $(date)"
echo "=========================================="

cd /var/www/html/bejady-global

# Step 1: Pull latest code
echo "📥 Pulling latest code..."
git pull origin main 2>/dev/null || echo "   (no git repo, using local files)"

# Step 2: Decide language (rotate: Mon English, Tue Chinese, etc.)
DAY=$(date +%u)
case $DAY in
  1|3|5) LANG="en" ;;  # Mon/Wed/Fri → English
  2|4)   LANG="zh" ;;  # Tue/Thu → Chinese
  6)     LANG="ja" ;;  # Sat → Japanese
  7)     LANG="ru" ;;  # Sun → Russian
esac

echo "🌐 Language: $LANG"

# Step 3: Generate article with AI
echo "✍️  Generating article..."
BLOG_LOCALE=$LANG node scripts/generate-post.js

# Step 4: Build the site
echo "🏗️  Building site..."
npm install --omit=dev --silent 2>/dev/null
npm run build

# Step 5: Copy content directory to standalone build
echo "📁 Copying content to build..."
cp -r content .next/standalone/content 2>/dev/null || echo "   (content copy done)"

# Step 6: Restart the server
echo "🔄 Restarting server..."
pm2 restart bejady

echo "✅ Done! Article published at $(date)"
echo "=========================================="
