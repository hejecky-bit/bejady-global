import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  title: string;
  slug: string;
  language: string;
  publishedAt: string;
  author?: string;
  excerpt?: string;
  image?: string;
  categories?: string[];
  body?: { style: string; children: { text: string }[] }[];
};

export function getPosts({ locale, limit }: { locale?: string; limit?: number } = {}): BlogPost[] {
  const langDir = locale ? path.join(CONTENT_DIR, locale) : CONTENT_DIR;

  if (!fs.existsSync(langDir)) return [];

  const files = fs.readdirSync(langDir).filter((f) => f.endsWith(".json"));

  const posts: BlogPost[] = files
    .map((file) => {
      try {
        const content = fs.readFileSync(path.join(langDir, file), "utf-8");
        return JSON.parse(content) as BlogPost;
      } catch {
        return null;
      }
    })
    .filter((p): p is BlogPost => p !== null && (!locale || p.language === locale))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return limit ? posts.slice(0, limit) : posts;
}

export function getPost(slug: string, locale: string): BlogPost | null {
  const posts = getPosts({ locale });
  return posts.find((p) => p.slug === slug) || null;
}
