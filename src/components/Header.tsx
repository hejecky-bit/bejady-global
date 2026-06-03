"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { localizedPath } from "@/lib/locale";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/oem-odm", label: t("oem") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={localizedPath(locale, "/")} className="flex items-center gap-3">
          <img src="/assets/baijiadi.png" alt="BEJADY" className="h-9 w-9 object-contain" />
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            BEJADY<span className="text-brand-600"> Gelato</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localizedPath(locale, link.href)}
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={localizedPath(locale, "/contact")}
            className="bg-brand-600 text-white px-5 py-2 text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            {t("quote")}
          </Link>
          <LanguageSwitcher />
        </nav>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={localizedPath(locale, link.href)}
                className="block text-sm font-medium text-slate-600 hover:text-brand-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
