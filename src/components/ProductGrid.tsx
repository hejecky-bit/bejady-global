"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { localizedPath } from "@/lib/locale";

type Product = { slug: string; name: string; desc: string; image: string };

const iconColors: Record<string, { bg: string; text: string }> = {
  "single-cylinder": { bg: "bg-purple-50", text: "text-purple-600" },
  "double-cylinder": { bg: "bg-rose-50", text: "text-rose-500" },
  "triple-cylinder": { bg: "bg-sky-50", text: "text-sky-500" },
  "four-cylinder": { bg: "bg-emerald-50", text: "text-emerald-500" },
  "six-cylinder": { bg: "bg-amber-50", text: "text-amber-500" },
};

const icons = ["❶", "❷", "❸", "❹", "❻"];

export default function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations("products");
  const locale = useLocale();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-3">
              {t("title")}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-4">
              Precision Gelato Machines
            </h2>
            <p className="text-slate-500 max-w-xl text-lg leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => {
            const colors = iconColors[product.slug] || { bg: "bg-slate-50", text: "text-slate-600" };
            return (
              <Link
                key={product.slug}
                href={localizedPath(locale, `/products/${product.slug}`)}
                className="group bg-white rounded-2xl p-8 border border-slate-100 card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center text-lg font-bold mb-5`}>
                  {icons[idx] || "⚙️"}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {product.desc}
                </p>
                <span className="text-sm font-semibold text-brand-400 group-hover:underline underline-offset-4">
                  {t("view_detail")} →
                </span>
              </Link>
            );
          })}

          {/* OEM CTA Card */}
          <Link
            href={localizedPath(locale, "/oem-odm")}
            className="rounded-2xl p-8 bg-brand-400 text-white flex flex-col items-center justify-center text-center card-hover"
          >
            <p className="text-sm text-white/70 mb-2">Need a custom solution?</p>
            <span className="text-lg font-bold">OEM/ODM Inquiry →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
