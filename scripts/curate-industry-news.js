/**
 * Industry News Curator — 每日搜集 Gelato 行业专业资讯
 *
 * 每天运行一次，搜索最新行业文章，归档到 content/industry-news/
 * 供 AI 写文章时引用，保证内容有专业出处。
 *
 * 用法: node scripts/curate-industry-news.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const NEWS_DIR = path.join(process.cwd(), "content", "industry-news");
fs.mkdirSync(NEWS_DIR, { recursive: true });

// ─── 搜索主题 ──────────────────────────────────────────
const TOPICS = [
  // 英文搜索
  { query: "gelato market growth 2026", lang: "en", category: "market" },
  { query: "ice cream machine technology innovation", lang: "en", category: "technology" },
  { query: "commercial ice cream equipment trends", lang: "en", category: "industry" },
  { query: "gelato industry forecast", lang: "en", category: "market" },
  { query: "artisan gelato business trends", lang: "en", category: "trends" },
  { query: "plant based gelato innovation", lang: "en", category: "trends" },
  // 中文搜索
  { query: "Gelato 冰淇淋 市场 2026", lang: "zh", category: "market" },
  { query: "商用冰淇淋机 行业 趋势", lang: "zh", category: "industry" },
  { query: "意式冰淇淋 设备 技术", lang: "zh", category: "technology" },
];

// ─── 用 SerpAPI / Google Web Search ──────────────────
// 通过 Brave Search API 获取结果
function searchBrave(query) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.BRAVE_SEARCH_API_KEY;
    if (!apiKey) {
      // Fallback: 没有 API key 时返回提示
      resolve([]);
      return;
    }

    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5&freshness=day`;

    https.get(url, {
      headers: { "Accept": "application/json", "Accept-Encoding": "gzip", "X-Subscription-Token": apiKey }
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const results = (json.web?.results || []).map(r => ({
            title: r.title,
            url: r.url,
            description: r.description,
            age: r.age,
          }));
          resolve(results);
        } catch {
          resolve([]);
        }
      });
    }).on("error", reject);
  });
}

// ─── 用 WebSearch 的简易替代 ──────────────────────────
// 如果 Brave API key 没有配置，fallback 使用预置的搜索链接
function getFallbackSources(query, category, lang) {
  return {
    query,
    category,
    lang,
    searchedAt: new Date().toISOString(),
    note: "No API key configured. Set BRAVE_SEARCH_API_KEY for live search results.",
    suggestedSources: [
      { name: "Grand View Research", url: "https://www.grandviewresearch.com/industry/food-service", type: "Market Research" },
      { name: "Google Scholar", url: "https://scholar.google.com/scholar?q=" + encodeURIComponent(query), type: "Academic" },
      { name: "Food Industry News", url: "https://www.foodnavigator.com/search?q=" + encodeURIComponent(query), type: "Industry News" },
      { name: "Google News", url: "https://news.google.com/search?q=" + encodeURIComponent(query), type: "News" },
    ],
  };
}

// ─── 主函数 ────────────────────────────────────────────
async function main() {
  console.log(`🔍 Industry News Curation — ${new Date().toLocaleDateString()}`);
  console.log("=".repeat(60));

  const results = [];

  for (const topic of TOPICS) {
    process.stdout.write(`  Searching: ${topic.query}... `);
    const items = await searchBrave(topic.query);
    if (items.length > 0) {
      results.push({
        topic: topic.query,
        category: topic.category,
        lang: topic.lang,
        searchedAt: new Date().toISOString(),
        results: items,
      });
      console.log(`✓ ${items.length} results`);
    } else {
      // 用 fallback
      results.push(getFallbackSources(topic.query, topic.category, topic.lang));
      console.log(`⚠ fallback (no API key)`);
    }
  }

  // 保存到文件
  const today = new Date().toISOString().split("T")[0];
  const filePath = path.join(NEWS_DIR, `${today}.json`);
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2), "utf-8");

  console.log("=".repeat(60));
  console.log(`✅ Curation saved: ${filePath}`);
  console.log(`   Total topics: ${results.length}`);
  const withResults = results.filter(r => r.results?.length > 0).length;
  console.log(`   Topics with live results: ${withResults}`);
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
