"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { localizedPath } from "@/lib/locale";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[86vh] flex items-center bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/machines/18max-front.png"
          alt="BEJADY commercial gelato machine"
          className="h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-block border border-brand-500 text-brand-400 text-xs font-semibold px-3 py-1 mb-6 tracking-wider uppercase">
            Since 2006 — Made in China
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={localizedPath(locale, "/products")}
              className="bg-brand-600 text-white px-8 py-3 font-semibold text-center hover:bg-brand-700 transition duration-300"
            >
              {t("cta_products")}
            </Link>
            <Link
              href={localizedPath(locale, "/contact")}
              className="border-2 border-white text-white px-8 py-3 font-semibold text-center hover:bg-white hover:text-slate-800 transition duration-300"
            >
              {t("cta_quote")}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
          {[
            { value: "15,000+", label: t("stats_machines") },
            { value: "60+", label: t("stats_countries") },
            { value: "20", label: t("stats_years") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-brand-400">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
