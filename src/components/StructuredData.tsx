export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.bejady.com/#organization",
    name: "Guangzhou BEJADY Intelligent Equipment Co., Ltd.",
    alternateName: "BEJADY Gelato",
    url: "https://www.bejady.com/",
    logo: "https://www.bejady.com/assets/baijiadi.png",
    description:
      "BEJADY is a leading manufacturer of commercial gelato machines, serving global brands with OEM/ODM solutions since 2006.",
    foundingDate: "2006",
    areaServed: "Worldwide",
    knowsAbout: [
      "Commercial Gelato Machines",
      "OEM Manufacturing",
      "Italian Ice Cream Equipment",
      "Frozen Dessert Technology",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@bejady.com",
      contactType: "sales",
      availableLanguage: ["English", "Chinese"],
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.bejady.com/#website",
    url: "https://www.bejady.com/",
    name: "BEJADY Gelato",
    description:
      "Premium commercial gelato machines for global businesses. 20 years of manufacturing expertise.",
    inLanguage: ["en", "zh"],
    publisher: { "@id": "https://www.bejady.com/#organization" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, webSiteSchema]),
      }}
    />
  );
}
