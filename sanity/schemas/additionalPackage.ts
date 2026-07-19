// sanity/schemas/additionalPackage.ts
export default {
  name: "additionalPackage",
  title: "الحزمة الإضافية (المرافقة)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "العنوان",
      type: "string",
      initialValue: "خدمة المرافقة والاستقبال في جورجيا",
    },
    {
      name: "description",
      title: "الوصف",
      type: "text",
      rows: 4,
    },
    {
      name: "note",
      title: "ملاحظة الرسوم",
      type: "text",
      rows: 3,
    },
    {
      name: "services",
      title: "خدمات المرافقة",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: { title: "title" },
  },
};
