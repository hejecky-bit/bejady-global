import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { localizedPath } from "@/lib/locale";

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const navT = await getTranslations({ locale, namespace: "nav" });
  const productT = await getTranslations({ locale, namespace: "products" });
  const contactT = await getTranslations({ locale, namespace: "contact" });
  const products = [
    ["single-cylinder", "single"],
    ["double-cylinder", "double"],
    ["triple-cylinder", "triple"],
    ["four-cylinder", "four"],
    ["six-cylinder", "six"],
  ] as const;

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-white text-xl font-extrabold tracking-tight mb-5">
              BEJADY<span className="text-brand-400">.</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">{t("about")}</p>
          </div>
          <div>
            <h5 className="text-white font-semibold text-sm mb-5">{t("products_title")}</h5>
            <ul className="space-y-3 text-sm">
              {products.map(([slug, key]) => (
                <li key={slug}>
                  <Link href={localizedPath(locale, `/products/${slug}`)} className="text-slate-400 hover:text-white transition-colors">
                    {productT(`${key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold text-sm mb-5">{t("company_title")}</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href={localizedPath(locale, "/about")} className="text-slate-400 hover:text-white transition-colors">{navT("about")}</Link></li>
              <li><Link href={localizedPath(locale, "/oem-odm")} className="text-slate-400 hover:text-white transition-colors">{navT("oem")}</Link></li>
              <li><Link href={localizedPath(locale, "/blog")} className="text-slate-400 hover:text-white transition-colors">{navT("blog")}</Link></li>
              <li><Link href={localizedPath(locale, "/faq")} className="text-slate-400 hover:text-white transition-colors">{navT("faq")}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold text-sm mb-5">{t("contact_title")}</h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>{contactT("address")}</li>
              <li>{contactT("email")}</li>
              <li>{contactT("phone")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <Link href={localizedPath(locale, "/privacy")} className="hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href={localizedPath(locale, "/terms")} className="hover:text-white transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
