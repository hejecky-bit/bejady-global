import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { routing } from "@/lib/routing";
import { localizedPath } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("products_title"), description: t("products_desc") };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const productList = [
    { slug: "single-cylinder", specs: "10-14L/h, 1.5kW, 80kg", image: "/assets/machines/single-tank.png" },
    { slug: "double-cylinder", specs: "20-28L/h, 2.8kW, 140kg", image: "/assets/machines/double-tank-front.png" },
    { slug: "triple-cylinder", specs: "30-40L/h, 4.2kW, 200kg", image: "/assets/machines/triple-tank.png" },
    { slug: "four-cylinder", specs: "40-55L/h, 5.6kW, 260kg", image: "/assets/machines/four-tank-gelato-machine.png" },
    { slug: "six-cylinder", specs: "60-80L/h, 8.4kW, 380kg", image: "/assets/machines/six-tank-front.png" },
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
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {productList.map((p, idx) => (
              <div
                key={p.slug}
                className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="bg-slate-100 rounded-lg h-72 p-8 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.slug.replace("-", " ")}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    {p.slug === "single-cylinder" && t("single.name")}
                    {p.slug === "double-cylinder" && t("double.name")}
                    {p.slug === "triple-cylinder" && t("triple.name")}
                    {p.slug === "four-cylinder" && t("four.name")}
                    {p.slug === "six-cylinder" && t("six.name")}
                  </h2>
                  <p className="text-slate-600 mb-4 text-lg leading-relaxed">
                    {p.slug === "single-cylinder" && t("single.desc")}
                    {p.slug === "double-cylinder" && t("double.desc")}
                    {p.slug === "triple-cylinder" && t("triple.desc")}
                    {p.slug === "four-cylinder" && t("four.desc")}
                    {p.slug === "six-cylinder" && t("six.desc")}
                  </p>
                  <div className="inline-block bg-slate-100 px-4 py-2 rounded text-sm font-mono text-slate-600 mb-6">
                    {p.specs}
                  </div>
                  <div>
                    <Link
                      href={localizedPath(locale, `/products/${p.slug}`)}
                      className="inline-block bg-brand-600 text-white px-6 py-2 font-semibold hover:bg-brand-700 transition"
                    >
                      {t("view_detail")} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
