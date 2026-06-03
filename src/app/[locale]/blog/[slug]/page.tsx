import Link from "next/link";
import { notFound } from "next/navigation";
import { localizedPath } from "@/lib/locale";
import { getPost, getPosts } from "@/lib/blog";
import type { Metadata } from "next";
import BlogBody from "@/components/BlogBody";

type Props = { params: Promise<{ slug: string; locale: string }> };

export function generateStaticParams() {
  const slugs: { slug: string; locale: string }[] = [];
  for (const locale of ["en", "zh", "ja", "ru"]) {
    const posts = getPosts({ locale });
    posts.forEach((p) => slugs.push({ slug: p.slug, locale }));
  }
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPost(slug, locale);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — BEJADY Gelato Blog`,
    description: post.excerpt || `Read about ${post.title}`,
    openGraph: post.excerpt ? { title: post.title, description: post.excerpt } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();

  const isZh = locale === "zh";

  return (
    <>
      <nav className="max-w-4xl mx-auto px-4 pt-6 text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href={localizedPath(locale, "/")} className="hover:text-brand-600">{isZh ? "首页" : "Home"}</Link></li>
          <li>/</li>
          <li><Link href={localizedPath(locale, "/blog")} className="hover:text-brand-600">{isZh ? "博客" : "Blog"}</Link></li>
          <li>/</li>
          <li className="text-slate-800 font-medium truncate max-w-[300px]">{post.title}</li>
        </ol>
      </nav>

      <article className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(
                locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "ru" ? "ru-RU" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
            {post.author && <span>· {post.author}</span>}
            {post.categories?.map((cat: string) => (
              <span key={cat} className="bg-slate-100 px-2 py-0.5 rounded text-xs">{cat}</span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{post.title}</h1>

          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-slate-600 leading-relaxed mb-8 border-l-4 border-brand-500 pl-4 italic">{post.excerpt}</p>
          )}

          {post.body ? (
            <div className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-brand-600">
              <BlogBody body={post.body} />
            </div>
          ) : (
            <p className="text-slate-400 italic">{isZh ? "内容即将更新" : "Content coming soon"}</p>
          )}
        </div>
      </article>

      {/* Article Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: "BEJADY Gelato" },
        }),
      }} />
    </>
  );
}
