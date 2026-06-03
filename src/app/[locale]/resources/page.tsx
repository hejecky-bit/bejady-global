import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });

  const articles = [
    {
      title: "The Complete Guide to Starting a Gelato Business",
      excerpt: "Everything you need to know about equipment, recipes, costs, and marketing for your gelato shop.",
      readTime: "8 min read",
    },
    {
      title: "OEM vs ODM: Which Manufacturing Model Is Right for Your Brand?",
      excerpt: "Understanding the differences between OEM and ODM partnerships for ice cream equipment.",
      readTime: "5 min read",
    },
    {
      title: "How to Choose the Right Gelato Machine for Your Business",
      excerpt: "A comprehensive guide to cylinder count, capacity, compressor types, and budget considerations.",
      readTime: "10 min read",
    },
  ];

  return (
    <>
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-slate-300">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {articles.map((article, i) => (
              <article
                key={i}
                className="border border-slate-200 rounded-lg p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span>📄 Guide</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">{article.title}</h2>
                <p className="text-slate-600">{article.excerpt}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-12 py-12 bg-slate-50 rounded-lg">
            <p className="text-slate-500">{t("coming_soon")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
