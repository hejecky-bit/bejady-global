export const schema = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "中文", value: "zh" },
          { title: "日本語", value: "ja" },
          { title: "Русский", value: "ru" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "BEJADY Team",
    },
    {
      name: "excerpt",
      title: "Excerpt (for SEO & preview)",
      type: "text",
      rows: 3,
      description: "A short summary for search engines and blog listing.",
    },
    {
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Gelato Guide", value: "gelato-guide" },
          { title: "Industry Insights", value: "industry" },
          { title: "Machine Tips", value: "machine-tips" },
          { title: "OEM/ODM", value: "oem" },
          { title: "Business", value: "business" },
        ],
      },
    },
    {
      name: "body",
      title: "Body Content",
      type: "blockContent",
    },
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "language" },
  },
};
