export const productSchema = {
  name: "product",
  title: "Products / 产品管理",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name / 产品名称",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug / URL 标识",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "order",
      title: "Sort Order / 排序",
      type: "number",
      initialValue: 0,
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description / 简短描述",
      type: "text",
      rows: 3,
    },
    {
      name: "images",
      title: "Product Images / 产品图片",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload multiple product photos / 上传多张产品图片",
    },
    {
      name: "videoUrl",
      title: "YouTube Video URL / 视频链接",
      type: "url",
      description: "e.g. https://www.youtube.com/watch?v=xxx",
    },
    {
      name: "specifications",
      title: "Specifications / 技术参数",
      type: "object",
      fields: [
        { name: "capacity", title: "Capacity / 产能", type: "string" },
        { name: "power", title: "Power / 功率", type: "string" },
        { name: "weight", title: "Weight / 重量", type: "string" },
        { name: "cylinders", title: "Cylinders / 缸数", type: "number" },
      ],
    },
    {
      name: "features",
      title: "Features / 产品特点",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "faqs",
      title: "FAQs / 常见问题",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question / 问题", type: "string" },
            { name: "answer", title: "Answer / 答案", type: "text" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "language", media: "images.0" },
  },
};
