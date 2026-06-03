"use client";

import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="bg-slate-100 rounded-lg h-96 p-8 flex items-center justify-center">
        <img
          src={images[selected]}
          alt={alt}
          className="h-full w-full object-contain transition duration-300"
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden p-2 transition ${
                i === selected ? "border-brand-600 bg-brand-50" : "border-slate-200 bg-white hover:border-slate-400"
              }`}
            >
              <img src={img} alt={`${alt} - view ${i + 1}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
