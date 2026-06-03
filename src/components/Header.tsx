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
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/oem-odm", label: t("oem") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href={localizedPath(locale, "/")} className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            BEJADY<span className="text-brand-400">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localizedPath(locale, link.href)}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href={localizedPath(locale, "/contact")}
            className="bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            {t("quote")}
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass-dark border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={localizedPath(locale, link.href)}
                className="block text-sm font-medium text-slate-300 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
