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
  return { title: t("oem_title"), description: t("oem_desc") };
}

export default async function OEMPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "oem" });

  const steps = [t("step_1"), t("step_2"), t("step_3"), t("step_4"), t("step_5"), t("step_6")];

  return (
    <>
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-slate-300">{t("subtitle")}</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center text-slate-800">{t("why_title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-sm font-bold text-brand-700">0{i}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-800">{t(`why_${i}_title`)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(`why_${i}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM Process */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center text-slate-800">{t("process_title")}</h2>
          <div className="space-y-0 relative">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm z-10">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 bg-slate-200 flex-1 absolute top-10" />}
                </div>
                <div className="pt-2 text-lg text-slate-700 font-medium">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-slate-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("cta")}</h2>
          <p className="text-slate-300 mb-8">
            {t("cta_desc")}
          </p>
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-block bg-brand-600 text-white px-10 py-3 font-semibold hover:bg-brand-700 transition"
          >
            {t("cta_button")}
          </Link>
        </div>
      </section>

      {/* OEM Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Gelato Machine OEM/ODM Services",
            provider: { "@type": "Organization", name: "BEJADY Gelato" },
            description: "End-to-end OEM/ODM manufacturing for commercial gelato machines.",
            areaServed: "Worldwide",
          }),
        }}
      />
    </>
  );
}
