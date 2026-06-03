import Link from "next/link";
import { localizedPath } from "@/lib/locale";
import { getPosts } from "@/lib/blog";
import { routing } from "@/lib/routing";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const pageMeta: Record<string, { title: string; desc: string }> = {
  en: { title: "BEJADY Gelato Blog — Industry Insights & Expert Guides", desc: "Expert guides, industry insights, and tips for gelato business success." },
  zh: { title: "BEJADY Gelato 博客 — 行业洞察与专家指南", desc: "来自百佳迪的专业指南、行业洞察和 Gelato 商业成功技巧。" },
  ja: { title: "BEJADY Gelato ブログ — 業界インサイトと専門ガイド", desc: "業務用ジェラートマシンメーカーBEJADYの専門ガイド。" },
  ru: { title: "Блог BEJADY Gelato — Отраслевые инсайты и руководства", desc: "Экспертные руководства и советы для бизнеса." },
};

const pageTitle: Record<string, string> = {
  en: "Gelato Knowledge Hub", zh: "Gelato 知识中心", ja: "ジェラート知識ハブ", ru: "Центр знаний о джелато",
};
const pageDesc: Record<string, string> = {
  en: "Expert guides, industry insights, and tips for gelato business success.",
  zh: "专业指南、行业洞察和 Gelato 商业成功技巧。",
  ja: "専門ガイド、業界インサイト、ジェラートビジネス成功のヒント。",
  ru: "Экспертные руководства и советы для бизнеса.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: pageMeta[locale]?.title || pageMeta.en.title, description: pageMeta[locale]?.desc || pageMeta.en.desc };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = getPosts({ locale });

  return (
    <>
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageTitle[locale] || pageTitle.en}</h1>
          <p className="text-xl text-slate-300">{pageDesc[locale] || pageDesc.en}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">{locale === "zh" ? "暂无文章，敬请期待" : "No articles yet. Coming soon!"}</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="border border-slate-200 rounded-lg p-8 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
                    <span className="uppercase">· {post.language}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    <Link href={localizedPath(locale, `/blog/${post.slug}`)} className="hover:text-brand-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && <p className="text-slate-600 mb-4">{post.excerpt}</p>}
                  <Link href={localizedPath(locale, `/blog/${post.slug}`)} className="text-brand-600 text-sm font-semibold hover:underline">
                    {locale === "zh" ? "阅读更多 →" : "Read More →"}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
