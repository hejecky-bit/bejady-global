export const settingSchema = {
  name: "setting",
  title: "Site Settings / 网站设置",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title / 标题",
      type: "string",
    },
    {
      name: "value",
      title: "Value / 值",
      type: "text",
    },
  ],
};
