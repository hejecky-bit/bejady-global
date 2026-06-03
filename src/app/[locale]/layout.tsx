import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return ["en", "zh", "ja", "ru"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("home_title"),
    description: t("home_desc"),
    keywords: "gelato machine, commercial ice cream machine, OEM gelato manufacturer, BEJADY",
    metadataBase: new URL("https://www.bejady.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
        ja: "/ja",
        ru: "/ru",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : locale === "ja" ? "ja_JP" : locale === "ru" ? "ru_RU" : "en_US",
      siteName: "BEJADY Gelato",
      title: t("home_title"),
      description: t("home_desc"),
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/assets/baijiadi.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StructuredData />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
