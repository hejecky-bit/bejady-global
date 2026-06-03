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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-white text-lg font-bold mb-4">
              BEJADY<span className="text-brand-500"> Gelato</span>
            </div>
            <p className="text-sm leading-relaxed">{t("about")}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t("products_title")}</h4>
            <ul className="space-y-2 text-sm">
              {products.map(([slug, key]) => (
                <li key={slug}>
                  <Link href={localizedPath(locale, `/products/${slug}`)} className="hover:text-white transition-colors">
                    {productT(`${key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t("company_title")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={localizedPath(locale, "/about")} className="hover:text-white transition-colors">{navT("about")}</Link></li>
              <li><Link href={localizedPath(locale, "/oem-odm")} className="hover:text-white transition-colors">{navT("oem")}</Link></li>
              <li><Link href={localizedPath(locale, "/resources")} className="hover:text-white transition-colors">{navT("resources")}</Link></li>
              <li><Link href={localizedPath(locale, "/faq")} className="hover:text-white transition-colors">{navT("faq")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t("contact_title")}</h4>
            <ul className="space-y-2 text-sm">
              <li>{contactT("address")}</li>
              <li>{contactT("email")}</li>
              <li>{contactT("phone")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
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
