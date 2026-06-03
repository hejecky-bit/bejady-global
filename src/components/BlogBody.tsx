type Block = {
  style: string;
  children: { text: string }[];
};

export default function BlogBody({ body }: { body: Block[] }) {
  if (!body || !Array.isArray(body)) return null;

  // Group consecutive bullet/number blocks into lists
  const grouped: (Block | Block[])[] = [];
  let currentList: Block[] | null = null;

  for (const block of body) {
    if (block.style === "bullet" || block.style === "number") {
      if (!currentList) currentList = [];
      currentList.push(block);
    } else {
      if (currentList) {
        grouped.push(currentList);
        currentList = null;
      }
      grouped.push(block);
    }
  }
  if (currentList) grouped.push(currentList);

  return (
    <>
      {grouped.map((item, i) => {
        if (Array.isArray(item)) {
          // List group
          const isOrdered = item[0].style === "number";
          const Tag = isOrdered ? "ol" : "ul";
          return (
            <Tag key={i} className={`${isOrdered ? "list-decimal" : "list-disc"} pl-6 text-slate-600 space-y-1 mb-4`}>
              {item.map((li, j) => (
                <li key={j}>{li.children?.map((c) => c.text).join("")}</li>
              ))}
            </Tag>
          );
        }

        const text = item.children?.map((c) => c.text).join("") || "";
        switch (item.style) {
          case "h2":
            return <h2 key={i} className="text-2xl font-bold text-slate-800 mt-10 mb-4">{text}</h2>;
          case "h3":
            return <h3 key={i} className="text-xl font-bold text-slate-800 mt-8 mb-3">{text}</h3>;
          case "blockquote":
            return <blockquote key={i} className="border-l-4 border-brand-500 pl-4 italic text-slate-600 my-6">{text}</blockquote>;
          default:
            return <p key={i} className="text-slate-600 leading-relaxed mb-4">{text}</p>;
        }
      })}
    </>
  );
}
