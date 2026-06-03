type VideoEmbedProps = {
  youTubeId: string;
  bilibiliId?: string;
  title?: string;
};

export default function VideoEmbed({ youTubeId, bilibiliId, title }: VideoEmbedProps) {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-200">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeId}?rel=0&modestbranding=1`}
          title={title || "BEJADY Gelato Machine"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      {title && <p className="mt-2 text-sm text-slate-500 text-center">{title}</p>}
    </div>
  );
}
