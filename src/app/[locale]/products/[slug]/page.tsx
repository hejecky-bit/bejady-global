import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localizedPath } from "@/lib/locale";
import ProductVideo from "@/components/ProductVideo";
import ProductGallery from "@/components/ProductGallery";
import type { Metadata } from "next";

const validSlugs = ["single-cylinder", "double-cylinder", "triple-cylinder", "four-cylinder", "six-cylinder"];

const slugToMsgKey: Record<string, string> = {
  "single-cylinder": "single",
  "double-cylinder": "double",
  "triple-cylinder": "triple",
  "four-cylinder": "four",
  "six-cylinder": "six",
};

type ProductData = {
  cylinders: number;
  capacity: string;
  power: string;
  weight: string;
  mainImage: string;
  galleryImages: string[];
  videoId: string;
  features: { en: string[]; zh: string[] };
  faqs: { en: { q: string; a: string }[]; zh: { q: string; a: string }[] };
};

const productData: Record<string, ProductData> = {
  "single-cylinder": {
    cylinders: 1, capacity: "10-14 L/h", power: "1.5 kW", weight: "80 kg",
    mainImage: "/assets/machines/single-tank.png",
    galleryImages: [
      "/assets/machines/single-tank.png",
      "/assets/machines/double-tank-front.png",
      "/assets/machines/tank-detail.png",
    ],
    videoId: "dUxdwO1Tyl0",
    features: {
      en: ["Compact countertop design", "Digital temperature control", "Energy-saving compressor", "Easy-clean stainless steel body", "Ideal for startups and cafes"],
      zh: ["紧凑台式结构", "数字温控系统", "节能压缩机", "易清洁不锈钢机身", "适合创业门店和咖啡馆"],
    },
    faqs: {
      en: [
        { q: "What is the production capacity of the single-cylinder model?", a: "The single-cylinder BEJADY machine produces 10-14 liters per hour, ideal for cafes, startups, and small-batch artisanal gelato production." },
        { q: "What space does the single-cylinder machine require?", a: "It features a compact countertop design requiring minimal footprint — just 80 kg weight and fits on any standard commercial counter." },
        { q: "Can I make different flavors with one cylinder?", a: "Yes, you can produce batch after batch of different flavors. Each batch takes approx. 25-35 minutes from mix to ready-to-serve gelato." },
      ],
      zh: [
        { q: "单缸型号的产能是多少？", a: "单缸 BEJADY 机器每小时产能 10-14 升，适合咖啡馆、创业门店和小批量手工 Gelato 生产。" },
        { q: "单缸机器需要多大空间？", a: "紧凑台式设计，重量仅 80 kg，适合任何标准商用台面。" },
        { q: "单缸可以制作不同口味吗？", a: "可以。每批制作时间约 25-35 分钟，一批完成后即可制作下一批不同口味。" },
      ],
    },
  },
  "double-cylinder": {
    cylinders: 2, capacity: "20-28 L/h", power: "2.8 kW", weight: "140 kg",
    mainImage: "/assets/machines/double-tank-front.png",
    galleryImages: [
      "/assets/machines/double-tank-front.png",
      "/assets/machines/double-tank-gelato-bar.png",
      "/assets/machines/tank-detail.png",
    ],
    videoId: "dUxdwO1Tyl0",
    features: {
      en: ["Dual independent cylinders", "Two-flavor simultaneous production", "Touch screen control panel", "Automatic wash cycle", "Medium-volume shop solution"],
      zh: ["双独立缸体", "双口味同时出品", "触控操作面板", "自动清洗流程", "适合中等销量门店"],
    },
    faqs: {
      en: [
        { q: "Can I produce two different flavors at the same time?", a: "Yes, the dual independent cylinders allow simultaneous production of two different flavors, doubling your serving capacity." },
        { q: "Is the double-cylinder machine easy to clean between batches?", a: "Yes, it features an automatic wash cycle and easy-clean stainless steel body, minimizing downtime between flavor changes." },
        { q: "What type of businesses is the double-cylinder model best for?", a: "It's ideal for medium-volume gelato shops, restaurants, and cafes that need two consistent flavors available at all times." },
      ],
      zh: [
        { q: "可以同时制作两种不同口味吗？", a: "可以。双独立缸体支持同时生产两种不同口味，出品效率翻倍。" },
        { q: "换口味时清洗方便吗？", a: "方便。配备自动清洗流程和不锈钢机身，换口味时的停机时间最短。" },
        { q: "双缸适合什么样的门店？", a: "适合中等销量的 Gelato 店、餐厅和咖啡馆，确保两种口味持续供应。" },
      ],
    },
  },
  "triple-cylinder": {
    cylinders: 3, capacity: "30-40 L/h", power: "4.2 kW", weight: "200 kg",
    mainImage: "/assets/machines/triple-tank.png",
    galleryImages: [
      "/assets/machines/triple-tank.png",
      "/assets/machines/four-tank-gelato-machine.png",
      "/assets/machines/tank-detail.png",
    ],
    videoId: "dUxdwO1Tyl0",
    features: {
      en: ["Three independent cylinders", "High-efficiency condensing unit", "Recipe memory storage", "Pre-cooling function", "Dedicated gelato parlor solution"],
      zh: ["三独立缸体", "高效冷凝系统", "配方记忆存储", "预冷功能", "适合 Gelato 专门店"],
    },
    faqs: {
      en: [
        { q: "How many flavors can I display at once with the triple-cylinder machine?", a: "Three flavors simultaneously, making it perfect for a dedicated gelato parlor with a variety of offerings." },
        { q: "Does the machine save recipes?", a: "Yes, it comes with recipe memory storage that can save multiple recipes for consistent results across batches and operators." },
      ],
      zh: [
        { q: "三缸机器可以同时展示多少种口味？", a: "三种口味同时出品，非常适合需要品种丰富的 Gelato 专门店。" },
        { q: "机器可以保存配方吗？", a: "可以。配备配方记忆存储功能，可保存多种配方，确保每批次出品一致。" },
      ],
    },
  },
  "four-cylinder": {
    cylinders: 4, capacity: "40-55 L/h", power: "5.6 kW", weight: "260 kg",
    mainImage: "/assets/machines/four-tank-gelato-machine.png",
    galleryImages: [
      "/assets/machines/four-tank-gelato-machine.png",
      "/assets/machines/six-tank-front.png",
      "/assets/machines/tank-detail.png",
    ],
    videoId: "dUxdwO1Tyl0",
    features: {
      en: ["Four independent cylinders", "Rapid cooling system", "Multi-stage filtration", "Heavy-duty commercial build", "High-volume store & chain solution"],
      zh: ["四独立缸体", "快速制冷系统", "多级过滤结构", "重载商用机身", "适合高销量门店和连锁品牌"],
    },
    faqs: {
      en: [
        { q: "What is the ideal business size for the four-cylinder model?", a: "This model is designed for high-volume stores and chains that need 4 flavors consistently available with capacity of 40-55 L/h." },
        { q: "Does the four-cylinder machine have rapid cooling?", a: "Yes, it features a rapid cooling system that reduces downtime between batches and ensures optimal serving temperature." },
      ],
      zh: [
        { q: "四缸机器适合什么样的门店？", a: "适合高销量的门店和连锁品牌，4 种口味持续供应，产能 40-55 升/小时。" },
        { q: "四缸机器有快速制冷功能吗？", a: "有。配备快速制冷系统，缩短批次间隔时间，确保最佳出品温度。" },
      ],
    },
  },
  "six-cylinder": {
    cylinders: 6, capacity: "60-80 L/h", power: "8.4 kW", weight: "380 kg",
    mainImage: "/assets/machines/six-tank-front.png",
    galleryImages: [
      "/assets/machines/six-tank-front.png",
      "/assets/machines/six-tank-angle.png",
      "/assets/machines/four-tank-gelato-machine.png",
    ],
    videoId: "dUxdwO1Tyl0",
    features: {
      en: ["Six independent cylinders", "Industrial-grade compressor", "Programmable production scheduling", "Remote diagnostics capable", "Flagship industrial model"],
      zh: ["六独立缸体", "工业级压缩机", "可编程生产计划", "支持远程诊断", "旗舰级工业机型"],
    },
    faqs: {
      en: [
        { q: "What makes the six-cylinder model BEJADY's flagship?", a: "It's our largest and most capable machine with industrial-grade compressor, programmable scheduling, and remote diagnostics." },
        { q: "Can the six-cylinder machine integrate with existing production lines?", a: "Yes, it features programmable production scheduling that can be integrated into larger production workflows and chains." },
      ],
      zh: [
        { q: "六缸机器为什么是旗舰机型？", a: "它是我们最大、功能最强的机器，配备工业级压缩机、可编程生产计划和远程诊断功能。" },
        { q: "六缸机器可以对接现有生产线吗？", a: "可以。具备可编程生产计划，可对接更大规模的生产流程和连锁体系。" },
      ],
    },
  },
};

export function generateStaticParams() {
  return validSlugs.flatMap((slug) => [
    { slug, locale: "en" },
    { slug, locale: "zh" },
  ]);
}

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!validSlugs.includes(slug)) notFound();
  const t = await getTranslations({ locale, namespace: "products" });
  const mk = slugToMsgKey[slug];
  const name = t(`${mk}.name`);
  const desc = t(`${mk}.desc`);
  return {
    title: `${name} — BEJADY Gelato`,
    description: desc,
    openGraph: {
      title: `${name} — BEJADY Gelato`,
      description: desc,
      images: [{ url: productData[slug].mainImage }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  if (!validSlugs.includes(slug)) notFound();

  const t = await getTranslations("products");
  const data = productData[slug];
  const mk = slugToMsgKey[slug];
  const name = t(`${mk}.name`);
  const desc = t(`${mk}.desc`);
  const isZh = locale === "zh";
  const features = data.features[isZh ? "zh" : "en"];
  const faqs = data.faqs[isZh ? "zh" : "en"];
  const specs = [
    { label: isZh ? "产能" : "Capacity", value: data.capacity },
    { label: isZh ? "功率" : "Power", value: data.power },
    { label: isZh ? "重量" : "Weight", value: data.weight },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-6 text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href={localizedPath(locale, "/")} className="hover:text-brand-600">{isZh ? "首页" : "Home"}</Link></li>
          <li>/</li>
          <li><Link href={localizedPath(locale, "/products")} className="hover:text-brand-600">{isZh ? "产品中心" : "Products"}</Link></li>
          <li>/</li>
          <li className="text-slate-800 font-medium">{name}</li>
        </ol>
      </nav>

      {/* Product Main Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div>
              <ProductGallery images={data.galleryImages} alt={name} />
            </div>

            {/* Info */}
            <div>
              <span className="text-brand-600 text-sm font-semibold tracking-widest uppercase">
                {data.cylinders}-{isZh ? "缸" : "Cylinder"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-800">{name}</h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">{desc}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {specs.map((s) => (
                  <div key={s.label} className="bg-slate-50 p-4 rounded text-center">
                    <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                    <div className="text-sm font-bold text-slate-800">{s.value}</div>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-slate-800 mb-3">{isZh ? "核心特点" : "Key Features"}</h3>
              <ul className="space-y-2 mb-8">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <span className="text-brand-600 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={localizedPath(locale, "/contact")}
                className="inline-block bg-brand-600 text-white px-8 py-3 font-semibold hover:bg-brand-700 transition"
              >
                {isZh ? "咨询这款机型" : "Inquire About This Model"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section — GEO: product demo video enhances engagement */}
      {data.videoId && (
        <ProductVideo
          youTubeId={data.videoId}
          title={isZh ? `${name} — 产品演示视频` : `${name} — Product Demo Video`}
        />
      )}

      {/* FAQ Section — GEO goldmine: AI search engines love FAQ content */}
      {faqs.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">
              {isZh ? "常见问题" : `Frequently Asked Questions`}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group border border-slate-200 rounded-lg overflow-hidden">
                  <summary className="px-6 py-4 font-medium text-slate-800 cursor-pointer hover:bg-slate-50 list-none flex justify-between items-center">
                    {faq.q}
                    <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-slate-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            {isZh ? "对这款机器感兴趣？" : "Interested in this model?"}
          </h2>
          <p className="text-slate-600 mb-6">
            {isZh ? "我们的团队随时为您提供详细参数、报价和 OEM 定制方案。" : "Our team is ready to provide detailed specs, pricing, and OEM customization."}
          </p>
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-block bg-brand-600 text-white px-10 py-3 font-semibold hover:bg-brand-700 transition"
          >
            {isZh ? "立即咨询" : "Get a Quote"}
          </Link>
        </div>
      </section>

      {/* Combined Structured Data: Product + VideoObject + FAQPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "@id": `https://www.bejady.com/products/${slug}#product`,
              name,
              description: desc,
              image: data.galleryImages.map((img) => `https://www.bejady.com${img}`),
              brand: { "@type": "Brand", name: "BEJADY" },
              manufacturer: {
                "@type": "Organization",
                name: "Guangzhou BEJADY Intelligent Equipment Co., Ltd.",
              },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                },
              },
            },
            ...(data.videoId
              ? [{
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  name: `${name} — Product Demo`,
                  description: `Product demonstration video for the ${name} by BEJADY Gelato.`,
                  thumbnailUrl: [`https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg`],
                  embedUrl: `https://www.youtube.com/embed/${data.videoId}`,
                  contentUrl: `https://www.youtube.com/watch?v=${data.videoId}`,
                }]
              : []),
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bejady.com/" },
                { "@type": "ListItem", position: 2, name: "Products", item: "https://www.bejady.com/products" },
                { "@type": "ListItem", position: 3, name },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
