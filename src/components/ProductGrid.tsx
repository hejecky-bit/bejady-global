"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { localizedPath } from "@/lib/locale";
import VideoModal from "./VideoModal";

type Product = { slug: string; name: string; desc: string; image: string };

const productVideos: Record<string, string> = {
  "single-cylinder": "dUxdwO1Tyl0",
  "double-cylinder": "dUxdwO1Tyl0",
  "triple-cylinder": "dUxdwO1Tyl0",
  "four-cylinder": "dUxdwO1Tyl0",
  "six-cylinder": "dUxdwO1Tyl0",
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations("products");
  const locale = useLocale();
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-3">
              {t("title")}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-4">
              Precision Gelato Machines
            </h2>
            <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.slug} className="group">
              {/* Image container */}
              <Link
                href={localizedPath(locale, `/products/${product.slug}`)}
                className="block relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden border border-slate-100 mb-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 transition duration-500 group-hover:scale-105"
                />
                {/* Video play button overlay */}
                {productVideos[product.slug] && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPlayingVideo(productVideos[product.slug]);
                    }}
                    className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur text-slate-700 text-sm font-medium shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="w-6 h-6 rounded-full bg-brand-400 text-white flex items-center justify-center text-xs">▶</span>
                    Play Video
                  </button>
                )}
                {/* View details badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-xs font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details →
                </div>
              </Link>

              {/* Text info */}
              <Link
                href={localizedPath(locale, `/products/${product.slug}`)}
                className="block"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-brand-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {product.desc}
                </p>
              </Link>
            </div>
          ))}

          {/* OEM CTA */}
          <Link
            href={localizedPath(locale, "/oem-odm")}
            className="flex flex-col items-center justify-center text-center rounded-2xl p-10 bg-gradient-to-br from-slate-800 to-slate-900 text-white card-hover group"
          >
            <p className="text-sm text-white/50 mb-2">Need a custom solution?</p>
            <span className="text-xl font-bold">OEM/ODM Partnership →</span>
          </Link>
        </div>
      </div>

      {playingVideo && (
        <VideoModal
          videoId={playingVideo}
          title="Product Demo"
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </section>
  );
}
