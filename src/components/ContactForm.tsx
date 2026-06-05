"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="text-green-800 font-semibold text-lg">{t("form_success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("form_name")} *</label>
          <input name="name" required className="w-full px-4 py-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("form_email")} *</label>
          <input name="email" type="email" required className="w-full px-4 py-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("form_company")}</label>
          <input name="company" className="w-full px-4 py-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("form_country")}</label>
          <input name="country" className="w-full px-4 py-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{t("form_message")} *</label>
        <textarea name="message" required rows={5} className="w-full px-4 py-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">Failed to send. Please try again or email us directly at info@bejady.com.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-brand-600 text-white px-8 py-3 font-semibold hover:bg-brand-700 transition w-full sm:w-auto disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : t("form_submit")}
      </button>
    </form>
  );
}
