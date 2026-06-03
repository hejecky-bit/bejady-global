"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-slate-800 hover:bg-slate-50 transition"
          >
            <span>{faq.q}</span>
            <svg
              className={`w-5 h-5 text-slate-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4 text-slate-600 leading-relaxed">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
