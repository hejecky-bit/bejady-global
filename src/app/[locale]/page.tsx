import { getTranslations } from "next-intl/server";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import TrustBar from "@/components/TrustBar";
import VideoEmbed from "@/components/VideoEmbed";
import { localizedPath } from "@/lib/locale";

export const dynamic = "force-static";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const products = [
    { slug: "single-cylinder", name: t("products.single.name"), desc: t("products.single.desc"), image: "/assets/machines/single-tank.png" },
    { slug: "double-cylinder", name: t("products.double.name"), desc: t("products.double.desc"), image: "/assets/machines/double-tank-gelato-bar.png" },
    { slug: "triple-cylinder", name: t("products.triple.name"), desc: t("products.triple.desc"), image: "/assets/machines/triple-tank.png" },
    { slug: "four-cylinder", name: t("products.four.name"), desc: t("products.four.desc"), image: "/assets/machines/four-tank-gelato-machine.png" },
    { slug: "six-cylinder", name: t("products.six.name"), desc: t("products.six.desc"), image: "/assets/machines/six-tank-front.png" },
  ];

  return (
    <>
      <HeroSection />
      <TrustBar locale={locale} />
      <ProductGrid products={products} />
      <AboutPreview locale={locale} />
      <OEMSection locale={locale} />
      <VideoSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}

function AboutPreview({ locale }: { locale: string }) {
  const milestones = locale === "zh"
    ? [["2006", "精密零件车间成立"], ["2010", "首台 Gelato 机原型"], ["2014", "获 CE 认证，首单出口"], ["2018", "第 10,000 台交付"], ["2022", "扩建至 15,000㎡"], ["2026", "服务全球 60+ 国家"]]
    : [["2006", "Founded as workshop"], ["2010", "First machine prototype"], ["2014", "CE certified, first export"], ["2018", "10,000th delivery"], ["2022", "15,000㎡ expansion"], ["2026", "60+ countries served"]];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-3">Since 2006</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-6">
            {locale === "zh" ? "从广州出发，走向世界" : "From Guangzhou to the World"}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            {locale === "zh"
              ? "从精密零件车间到 15,000㎡ 现代化工厂，百佳迪把 20 年出口制造经验沉淀到每一台机器中。"
              : "What started as a precision parts workshop has grown into a 15,000㎡ global facility — serving 60+ countries with Italian-quality gelato machines."}
          </p>
          <div className="space-y-0">
            {milestones.map(([year, event], i) => (
              <div key={i} className="flex gap-4 py-3 border-b border-slate-100">
                <span className="font-bold text-brand-400 text-sm min-w-[60px]">{year}</span>
                <span className="text-slate-600 text-sm">{event}</span>
              </div>
            ))}
          </div>
          <Link
            href={localizedPath(locale, "/about")}
            className="inline-flex items-center gap-2 text-brand-400 font-semibold text-sm mt-8 hover:underline underline-offset-4"
          >
            {locale === "zh" ? "了解完整故事" : "Learn Our Story"} →
          </Link>
        </div>
        <div className="bg-slate-100 rounded-2xl min-h-80 flex items-center justify-center">
          <img src="/assets/machines/six-tank-angle.png" alt="BEJADY machine" className="max-h-72 w-full object-contain p-8" />
        </div>
      </div>
    </section>
  );
}

function OEMSection({ locale }: { locale: string }) {
  const items = locale === "zh"
    ? [
        { icon: "🎨", title: "外观定制", desc: "品牌标识、配色、电压、控制系统和包装按目标市场定制。" },
        { icon: "✅", title: "全球认证", desc: "CE、UL、RoHS、FDA 食品接触材料，适配欧美、中东和亚洲市场。" },
        { icon: "🔧", title: "全流程支持", desc: "从打样、量产到物流和售后，按 OEM 项目节奏交付。" },
        { icon: "🧪", title: "配方研发", desc: "结合当地口味、门店模型和品牌定位，提供 Gelato 配方支持。" },
      ]
    : [
        { icon: "🎨", title: "Full Customization", desc: "Branding, colors, voltage, control systems and packaging tailored to your market." },
        { icon: "✅", title: "Global Certifications", desc: "CE, UL, RoHS and FDA food-contact materials for Europe, Americas, Middle East and Asia." },
        { icon: "🔧", title: "End-to-End Support", desc: "From prototyping to mass production, logistics and after-sales support." },
        { icon: "🧪", title: "Recipe Development", desc: "Gelato recipe support for local taste preferences, business models and brand positioning." },
      ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-3">
          {locale === "zh" ? "OEM/ODM" : "OEM / ODM"}
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-4">
          {locale === "zh" ? "你的品牌，我们的工程能力" : "Your Brand, Our Engineering"}
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-14">
          {locale === "zh"
            ? "从产品定义、外观定制到批量生产，帮你做出能进入目标市场的 Gelato 设备。"
            : "End-to-end manufacturing partnership — from concept to global delivery."}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {items.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 border border-slate-100 card-hover">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link
          href={localizedPath(locale, "/oem-odm")}
          className="inline-flex items-center gap-2 bg-brand-400 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-brand-500 transition-all"
        >
          {locale === "zh" ? "查看 OEM 服务" : "Explore OEM Services"} →
        </Link>
      </div>
    </section>
  );
}

function VideoSection({ locale }: { locale: string }) {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-3">
          {locale === "zh" ? "产品演示" : "In Action"}
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-4">
          {locale === "zh" ? "看我们的机器在运作" : "See the Precision"}
        </h2>
        <p className="text-slate-500 text-lg mb-12">
          {locale === "zh" ? "点击播放，观看 BEJADY Gelato 机器的实际生产演示。" : "Watch how BEJADY gelato machines perform in real production."}
        </p>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <VideoEmbed
            youTubeId="dUxdwO1Tyl0"
            title={locale === "zh" ? "BEJADY Gelato 机器演示" : "BEJADY Gelato Machine Demo"}
          />
        </div>
      </div>
    </section>
  );
}

function CTASection({ locale }: { locale: string }) {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {locale === "zh" ? "准备开启你的 Gelato 事业？" : "Ready to Build Your Gelato Legacy?"}
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            {locale === "zh"
              ? "无论你需要一台设备，还是完整的 OEM/ODM 合作方案——联系我们开始。"
              : "Whether you need one machine or a full OEM partnership — let's talk."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={localizedPath(locale, "/contact")}
              className="inline-flex items-center gap-2 bg-white text-slate-800 px-8 py-4 rounded-full font-semibold text-sm hover:bg-slate-100 transition-all"
            >
              {locale === "zh" ? "联系咨询" : "Contact Our Team"} →
            </Link>
            <Link
              href={localizedPath(locale, "/products")}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/5 transition-all"
            >
              {locale === "zh" ? "查看产品" : "View Products"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
