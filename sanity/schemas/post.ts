export const postSchema = {
  name: "post",
  title: "Blog Posts / 文章管理",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title / 标题",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug / URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "language",
      title: "Language / 语言",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "中文", value: "zh" },
          { title: "日本語", value: "ja" },
          { title: "Русский", value: "ru" },
        ],
      },
    },
    {
      name: "publishedAt",
      title: "Published At / 发布日期",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "author",
      title: "Author / 作者",
      type: "string",
      initialValue: "BEJADY Team",
    },
    {
      name: "excerpt",
      title: "Excerpt / 摘要（SEO）",
      type: "text",
      rows: 2,
      description: "Short summary for search engines / 搜索引擎摘要",
    },
    {
      name: "coverImage",
      title: "Cover Image / 封面图",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "categories",
      title: "Categories / 分类",
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
      title: "Content / 正文内容",
      type: "array",
      of: [
        { type: "block", styles: [{ title: "H2", value: "h2" }, { title: "H3", value: "h3" }, { title: "Quote", value: "blockquote" }], lists: [{ title: "Bullet", value: "bullet" }] },
        { type: "image", options: { hotspot: true } },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "language" },
  },
};
