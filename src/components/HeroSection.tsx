"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { localizedPath } from "@/lib/locale";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const l = (path: string) => localizedPath(locale, path);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-bg">
      {/* Decorative blobs */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-brand-400/10 blur-[120px] -top-40 -right-40 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-400/10 blur-[120px] -bottom-40 -left-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div className="animate-fade-up pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-300 tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Since 2006 — Made in China
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
              Engineering the <br />
              <span className="gradient-text">Future</span> of Gelato
            </h1>

            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mb-10">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={l("/products")}
                className="inline-flex items-center justify-center gap-2 bg-brand-400 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-brand-500 transition-all hover:-translate-y-0.5"
              >
                {t("cta_products")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={l("/contact")}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/5 transition-all"
              >
                {t("cta_quote")}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-14">
              {[
                { value: "20+", label: t("stats_years") },
                { value: "15K+", label: t("stats_machines") },
                { value: "60+", label: t("stats_countries") },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-extrabold text-white">{s.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hidden lg:flex justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-cyan-400/5" />
              <div className="relative text-center">
                <div className="text-7xl mb-4 opacity-30">🏭</div>
                <p className="text-sm text-white/20 font-light">Product Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
