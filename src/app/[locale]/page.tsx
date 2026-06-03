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
  const stats = [
    { num: "15,000+", label: locale === "zh" ? "累计交付" : "Machines Delivered" },
    { num: "60+", label: locale === "zh" ? "出口国家" : "Countries Exported" },
    { num: "20", label: locale === "zh" ? "年经验" : "Years Expertise" },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-brand-600 font-semibold text-sm tracking-widest uppercase">Since 2006</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-slate-800">
            {locale === "zh" ? "20 年专注 Gelato 商用设备" : "20 Years of Gelato Excellence"}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            {locale === "zh"
              ? "从广州的精密制造能力出发，百佳迪把商用 Gelato 机器、出品稳定性和 OEM/ODM 交付能力结合在一起，服务全球品牌和餐饮门店。"
              : "From a precision workshop in Guangzhou to a 15,000㎡ global manufacturing facility. Every BEJADY machine is engineered for consistency, durability, and authentic Italian gelato quality."}
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-600">{s.num}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <Link
            href={localizedPath(locale, "/about")}
            className="inline-block border-2 border-slate-800 text-slate-800 px-8 py-3 font-semibold hover:bg-slate-800 hover:text-white transition duration-300"
          >
            {locale === "zh" ? "了解品牌故事" : "Learn Our Story"}
          </Link>
        </div>
        <div className="bg-slate-100 rounded-lg min-h-80 p-8 flex items-center justify-center">
          <img
            src="/assets/machines/six-tank-angle.png"
            alt="BEJADY six-cylinder gelato machine"
            className="max-h-80 w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function OEMSection({ locale }: { locale: string }) {
  const items = locale === "zh"
    ? [
        { title: "外观定制", desc: "品牌标识、配色、电压、控制系统和包装按目标市场定制。" },
        { title: "全球认证", desc: "CE、UL、RoHS、FDA 食品接触材料，适配欧美、中东和亚洲市场。" },
        { title: "全流程支持", desc: "从打样、量产到物流和售后，按 OEM 项目节奏交付。" },
        { title: "配方研发", desc: "结合当地口味、门店模型和品牌定位，提供 Gelato 配方支持。" },
      ]
    : [
        { title: "Full Customization", desc: "Branding, colors, voltage, control systems and packaging tailored to your market." },
        { title: "Global Certifications", desc: "CE, UL, RoHS and FDA food-contact materials for Europe, Americas, Middle East and Asia." },
        { title: "End-to-End Support", desc: "From prototyping to mass production, logistics and after-sales support." },
        { title: "Recipe Development", desc: "Gelato recipe support for local taste preferences, business models and brand positioning." },
      ];

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
          {locale === "zh" ? "OEM/ODM 合作能力" : "OEM & ODM Partnerships"}
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto mb-12 text-lg">
          {locale === "zh"
            ? "你的品牌，我们的制造与交付能力。从产品定义、外观定制到批量生产，帮你做出能进入目标市场的 Gelato 设备。"
            : "Your brand, our manufacturing expertise. From concept to global delivery, we partner with you to create gelato machines that represent your brand perfectly."}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((item) => (
            <div key={item.title} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link
          href={localizedPath(locale, "/oem-odm")}
          className="inline-block bg-brand-600 text-white px-10 py-3 font-semibold hover:bg-brand-700 transition duration-300"
        >
          {locale === "zh" ? "查看 OEM 服务" : "Explore OEM Services"}
        </Link>
      </div>
    </section>
  );
}

function VideoSection({ locale }: { locale: string }) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
          {locale === "zh" ? "看我们的机器在运作" : "See Our Machines in Action"}
        </h2>
        <p className="text-slate-600 mb-10 text-lg">
          {locale === "zh" ? "点击播放，观看 BEJADY Gelato 机器的实际生产演示。" : "Watch how BEJADY gelato machines perform in real production."}
        </p>
        <VideoEmbed
          youTubeId="dUxdwO1Tyl0"
          title={locale === "zh" ? "BEJADY Gelato 机器演示" : "BEJADY Gelato Machine Demo"}
        />
      </div>
    </section>
  );
}

function CTASection({ locale }: { locale: string }) {
  return (
    <section className="py-20 px-4 bg-slate-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {locale === "zh" ? "准备开始你的 Gelato 项目了吗？" : "Ready to Start Your Gelato Business?"}
        </h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          {locale === "zh"
            ? "无论你需要一台设备，还是完整的 OEM/ODM 合作方案，我们都可以从选型和项目判断开始。"
            : "Whether you need a single machine or a full OEM partnership, our team is ready to help you succeed."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={localizedPath(locale, "/contact")}
            className="inline-block bg-brand-600 text-white px-10 py-3 font-semibold hover:bg-brand-700 transition duration-300"
          >
            {locale === "zh" ? "联系咨询" : "Contact Us"}
          </Link>
          <Link
            href={localizedPath(locale, "/products")}
            className="inline-block border-2 border-white text-white px-10 py-3 font-semibold hover:bg-white hover:text-slate-800 transition duration-300"
          >
            {locale === "zh" ? "查看产品" : "View Products"}
          </Link>
        </div>
      </div>
    </section>
  );
}
