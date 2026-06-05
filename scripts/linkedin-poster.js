/**
 * LinkedIn Auto-Poster
 * 每次新文章发布后，生成 LinkedIn 帖子文案并保存。
 * 可手动复制发布，也可后续接入 LinkedIn API 自动发布。
 *
 * 用法: node scripts/linkedin-poster.js
 */

const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const OUT_DIR = path.join(process.cwd(), "content", "linkedin");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Get the latest blog post
function getLatestPost() {
  const locales = ["en", "zh", "ja", "ru"];
  let latest = null;

  for (const locale of locales) {
    const dir = path.join(POSTS_DIR, locale);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      try {
        const post = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
        if (!latest || new Date(post.publishedAt) > new Date(latest.publishedAt)) {
          latest = { ...post, locale };
        }
      } catch {}
    }
  }
  return latest;
}

// Generate LinkedIn post text
function generateLinkedInPost(post) {
  if (!post || !post.title) return null;

  const url = `https://81.71.91.161/bejady/${post.language}/blog/${post.slug}`;
  const hashtags = "#Gelato #IceCreamMachine #OEM #FoodTech #BEJADY #GelatoBusiness";

  const templates = [
    // English
    {
      lang: "en",
      text: `🚀 New article on our blog!\n\n${post.title}\n\n${post.excerpt || ""}\n\nRead the full article 👇\n${url}\n\n${hashtags}`
    },
    // Chinese
    {
      lang: "zh",
      text: `📝 新文章发布！\n\n${post.title}\n\n${post.excerpt || ""}\n\n阅读全文 👇\n${url}\n\n#Gelato #冰淇淋 #商用设备 #OEM代工`
    },
    // Japanese
    {
      lang: "ja",
      text: `📝 新着記事！\n\n${post.title}\n\n${post.excerpt || ""}\n\n記事を読む 👇\n${url}\n\n${hashtags}`
    },
    // Russian
    {
      lang: "ru",
      text: `📝 Новая статья!\n\n${post.title}\n\n${post.excerpt || ""}\n\nЧитать далее 👇\n${url}\n\n${hashtags}`
    },
  ];

  const template = templates.find((t) => t.lang === post.language) || templates[0];
  return { ...template, slug: post.slug, publishedAt: post.publishedAt };
}

// Run
console.log("📝 Generating LinkedIn posts...");
const post = getLatestPost();

if (!post) {
  console.log("❌ No blog posts found");
  process.exit(0);
}

const linkedinPost = generateLinkedInPost(post);
if (!linkedinPost) {
  console.log("❌ Failed to generate post");
  process.exit(0);
}

// Save to file
const filename = `linkedin-${post.slug}-${post.language}.md`;
const content = `---
title: ${post.title}
language: ${post.language}
slug: ${post.slug}
publishedAt: ${post.publishedAt}
generatedAt: ${new Date().toISOString()}
---

${linkedinPost.text}

---
📋 Copy the text above and paste it into LinkedIn.
`;

fs.writeFileSync(path.join(OUT_DIR, filename), content, "utf-8");
console.log(`✅ LinkedIn post saved: content/linkedin/${filename}`);
console.log("\n📋 Post preview:");
console.log(linkedinPost.text);
