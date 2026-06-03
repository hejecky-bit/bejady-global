import { getTranslations } from "next-intl/server";

export default async function TrustBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  const stats = [
    { value: "15,000+", label: t("stats_machines") },
    { value: "60+", label: t("stats_countries") },
    { value: "20", label: t("stats_years") },
    { value: "99.9%", label: locale === "zh" ? "可靠运行" : "Uptime Reliability" },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{s.value}</div>
                <div className="text-sm text-slate-400 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
