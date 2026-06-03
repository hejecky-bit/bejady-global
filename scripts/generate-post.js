/**
 * AI Blog Post Generator
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/generate-post.js
 *   # or
 *   OPENAI_API_KEY=sk-... node scripts/generate-post.js
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY  — Anthropic Claude API key
 *   OPENAI_API_KEY     — OpenAI API key (fallback)
 *   BLOG_LOCALE        — Language: en, zh, ja, ru (default: en)
 *   BLOG_TOPIC         — Specific topic (optional, random picked if omitted)
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

// Load BEJADY knowledge base
const KB = JSON.parse(fs.readFileSync(path.join(__dirname, "knowledge-base.json"), "utf-8"));

// Load .env.auto if exists
const envFile = path.join(__dirname, "..", ".env.auto");
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, "utf-8").split("\n");
  for (const line of lines) {
    const match = line.match(/^\s*(ANTHROPIC_API_KEY|OPENAI_API_KEY)=(.+)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  }
}

// ─── Topics Calendar ────────────────────────────────────────────
const TOPICS = {
  en: [
    { topic: "How to start a gelato business from scratch", keywords: "starting gelato business, gelato shop equipment", category: "business" },
    { topic: "Commercial gelato machine maintenance tips", keywords: "gelato machine cleaning, ice cream machine maintenance", category: "machine-tips" },
    { topic: "Gelato vs ice cream: what's the difference", keywords: "gelato vs ice cream, Italian gelato, gelato ingredients", category: "gelato-guide" },
    { topic: "OEM manufacturing: how to choose a gelato machine factory", keywords: "OEM gelato manufacturer, ice cream machine factory China", category: "oem" },
    { topic: "Which gelato machine size do I need", keywords: "choose gelato machine size, commercial ice cream machine capacity", category: "gelato-guide" },
    { topic: "Gelato business profit margins explained", keywords: "gelato shop profit, ice cream business profitability", category: "business" },
    { topic: "Global gelato market trends 2026", keywords: "gelato market trends, ice cream industry growth", category: "industry" },
  ],
  zh: [
    { topic: "开一家Gelato店需要多少钱", keywords: "开冰淇淋店成本,Gelato创业投资", category: "business" },
    { topic: "商用冰淇淋机选购完全指南", keywords: "冰淇淋机选购,商用冰淇淋机推荐", category: "gelato-guide" },
    { topic: "Gelato和普通冰淇淋的区别", keywords: "Gelato和冰淇淋区别,意式冰淇淋特点", category: "gelato-guide" },
    { topic: "冰淇淋OEM代工怎么选工厂", keywords: "冰淇淋OEM代工,冰淇淋机代工厂", category: "oem" },
    { topic: "冰淇淋机日常维护保养方法", keywords: "冰淇淋机清洗,冰淇淋机维护保养", category: "machine-tips" },
    { topic: "2026年中国Gelato市场分析", keywords: "中国Gelato市场,冰淇淋行业趋势", category: "industry" },
  ],
};

// ─── API Call ────────────────────────────────────────────────────
function callAPI(prompt) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      reject(new Error("Set ANTHROPIC_API_KEY or OPENAI_API_KEY environment variable"));
      return;
    }

    const isAnthropic = !!process.env.ANTHROPIC_API_KEY;
    const data = isAnthropic
      ? JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }],
        })
      : JSON.stringify({
          model: "gpt-4o",
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }],
        });

    const options = {
      hostname: isAnthropic ? "api.anthropic.com" : "api.openai.com",
      path: isAnthropic ? "/v1/messages" : "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        ...(isAnthropic ? { "anthropic-version": "2023-06-01" } : {}),
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          const text = isAnthropic
            ? json.content?.[0]?.text || ""
            : json.choices?.[0]?.message?.content || "";
          resolve(text);
        } catch {
          reject(new Error(`API parse error: ${body.slice(0, 200)}`));
        }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// ─── Article Generator ──────────────────────────────────────────
function buildPrompt(topic, locale, lang) {
  const kb = KB;
  const productsText = kb.productLines.map((p) =>
    `- ${p.name}: ${p.capacity}, ${p.power}, ${p.weight}, best for: ${p.bestFor}`
  ).join("\n");

  return `You are a professional content writer for BEJADY Gelato.

## About BEJADY
- Founded: ${kb.company.founded} in ${kb.company.location}
- Full name: ${kb.company.fullName}
- Factory: ${kb.company.factorySize} facility with ${kb.company.employees} employees
- Track record: ${kb.company.machinesDelivered.toLocaleString()}+ machines delivered to ${kb.company.exportCountries}+ countries
- Certifications: ${kb.certifications.join(", ")}
- Compressor partners: ${kb.compressorBrands.join(", ")}

## Product Line
${productsText}

## OEM/ODM Services
${kb.oemServices.join(", ")}.

## Writing Task
Write a blog article in ${lang} with the following topic: ${topic.topic}
SEO keywords to include naturally: ${topic.keywords}

## Requirements
- Title: compelling and SEO-optimized
- Use REAL company data from the About section above (factory size, certifications, numbers)
- Link to products naturally (use text references like "our single-cylinder machine" or "for high volume our six-cylinder model")
- Include specific, actionable advice — not generic fluff
- Minimum 5 sections with h2 headings
- 800+ words worth of content

Output as JSON with this structure:
{
  "title": "Article title",
  "slug": "url-friendly-slug",
  "language": "${locale}",
  "publishedAt": "${new Date().toISOString().split("T")[0]}T00:00:00Z",
  "author": "BEJADY Team",
  "excerpt": "SEO summary (max 160 chars)",
  "categories": ["${topic.category}"],
  "body": [
    { "style": "h2", "children": [{ "text": "Section heading" }] },
    { "style": "normal", "children": [{ "text": "Paragraph text" }] },
    { "style": "bullet", "children": [{ "text": "List item" }] }
  ]
}

Return ONLY valid JSON. No markdown, no explanation.`;
}

// ─── Main ────────────────────────────────────────────────────────
async function main() {
  const locale = process.env.BLOG_LOCALE || "en";
  const langNames = { en: "English", zh: "Chinese", ja: "Japanese", ru: "Russian" };
  const lang = langNames[locale] || "English";

  const topics = TOPICS[locale] || TOPICS.en;
  const useTopic = process.env.BLOG_TOPIC
    ? { topic: process.env.BLOG_TOPIC, keywords: "gelato machine", category: "gelato-guide" }
    : topics[Math.floor(Math.random() * topics.length)];

  console.log(`📝 Generating article | Language: ${lang} | Topic: ${useTopic.topic}`);

  const prompt = buildPrompt(useTopic, locale, lang);
  const result = await callAPI(prompt);

  let article;
  try {
    // Try to extract JSON from the response
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    article = JSON.parse(jsonMatch ? jsonMatch[0] : result);
  } catch {
    console.error("❌ Failed to parse AI response as JSON");
    console.error("Raw response:", result.slice(0, 500));
    process.exit(1);
  }

  // Save to content directory
  const contentDir = path.join(process.cwd(), "content", "blog", locale);
  fs.mkdirSync(contentDir, { recursive: true });

  const filePath = path.join(contentDir, `${article.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(article, null, 2), "utf-8");

  console.log(`✅ Article saved: ${filePath}`);
  console.log(`   Title: ${article.title}`);
  console.log(`   Word count: ~${JSON.stringify(article.body).length} chars`);
  console.log(`   URL: /blog/${article.slug}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
