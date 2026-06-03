"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { localizedPath } from "@/lib/locale";

type Product = {
  slug: string;
  name: string;
  desc: string;
  image: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations("products");
  const locale = useLocale();

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">{t("title")}</h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">{t("subtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={localizedPath(locale, `/products/${product.slug}`)}
              className="group bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{product.desc}</p>
                <span className="text-brand-600 text-sm font-semibold group-hover:underline">
                  {t("view_detail")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
