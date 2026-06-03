"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ru", label: "Русский" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === locale) || languages[0];

  function switchTo(code: string) {
    // Check if path already has a locale prefix
    const hasLocale = /^\/(en|zh|ja|ru)(?=\/|$)/.test(pathname);
    if (hasLocale) {
      const nextPath = pathname.replace(/^\/(en|zh|ja|ru)/, `/${code}`);
      router.replace(nextPath);
    } else {
      router.replace(`/${code}${pathname}`);
    }
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors px-2 py-1 border border-slate-300 rounded flex items-center gap-1"
      >
        {current.label}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg z-50 min-w-[130px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchTo(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                lang.code === locale ? "text-brand-600 font-semibold" : "text-slate-600"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </div>
  );
}
