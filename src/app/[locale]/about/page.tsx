import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/lib/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("about_title"), description: t("about_desc") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const milestones = [
    t("milestone_1"), t("milestone_2"), t("milestone_3"),
    t("milestone_4"), t("milestone_5"), t("milestone_6"),
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-slate-300">{t("subtitle")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-slate-800">{t("story_title")}</h2>
          <div className="prose max-w-none text-slate-600 space-y-4 text-lg leading-relaxed">
            <p>{t("story_p1")}</p>
            <p>{t("story_p2")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: "/assets/machines/18max-front.png", alt: "BEJADY front machine" },
              { src: "/assets/machines/tank-detail.png", alt: "BEJADY tank detail" },
              { src: "/assets/machines/double-tank-gelato-bar.png", alt: "BEJADY double tank machine" },
              { src: "/assets/machines/six-tank-angle.png", alt: "BEJADY six tank machine" },
            ].map((image) => (
              <div key={image.src} className="bg-white rounded-lg h-64 p-8 flex items-center justify-center">
                <img src={image.src} alt={image.alt} className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-slate-800">{t("milestones")}</h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-brand-600 ring-4 ring-brand-100 z-10" />
                  {i < milestones.length - 1 && <div className="w-0.5 bg-slate-200 flex-1 absolute top-4" />}
                </div>
                <div className="text-slate-700 font-medium pt-0.5">{m}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center text-slate-800">{t("values_title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-3 text-slate-800">{t(`value_${i}_title`)}</h3>
                <p className="text-slate-600 leading-relaxed">{t(`value_${i}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
