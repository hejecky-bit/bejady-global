import { getTranslations } from "next-intl/server";

export default async function TrustBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  const trustItems = [
    { label: t("stats_years"), mark: "20Y" },
    { label: t("stats_machines"), mark: "15K" },
    { label: t("stats_countries"), mark: "60+" },
    { label: t("trust_certifications"), mark: "QC" },
    { label: t("trust_oem"), mark: "OEM" },
    { label: t("trust_support"), mark: "TS" },
  ];

  return (
    <section className="py-6 px-4 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-slate-600">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-brand-700 bg-brand-100 px-2 py-1 rounded">
                {item.mark}
              </span>
              <span className="font-medium whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
