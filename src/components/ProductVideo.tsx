type ProductVideoProps = {
  youTubeId: string;
  title: string;
};

export default function ProductVideo({ youTubeId, title }: ProductVideoProps) {
  if (!youTubeId) return null;

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">{title}</h2>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-200 shadow-lg">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}?rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
