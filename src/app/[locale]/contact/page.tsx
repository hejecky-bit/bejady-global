import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import { routing } from "@/lib/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("contact_title"), description: t("contact_desc") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-slate-300">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">{t("form_title")}</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">{t("info_title")}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-sm font-bold">A</div>
                <div>
                  <h3 className="font-semibold text-slate-800">{t("address_label")}</h3>
                  <p className="text-slate-600">{t("address")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-sm font-bold">P</div>
                <div>
                  <h3 className="font-semibold text-slate-800">{t("phone_label")}</h3>
                  <p className="text-slate-600">{t("phone")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-sm font-bold">E</div>
                <div>
                  <h3 className="font-semibold text-slate-800">{t("email_label")}</h3>
                  <p className="text-slate-600">{t("email")}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg mt-8">
                <h3 className="font-bold text-slate-800 mb-2">{t("hours_title")}</h3>
                <p className="text-slate-600 text-sm">{t("hours_weekday")}</p>
                <p className="text-slate-600 text-sm">{t("hours_saturday")}</p>
                <p className="text-slate-500 text-sm mt-2">{t("hours_note")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
