// sanity/schemas/stat.ts
export default {
  name: "stat",
  title: "إحصائية",
  type: "document",
  fields: [
    {
      name: "label",
      title: "الوصف",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "target",
      title: "الرقم",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "prefix",
      title: "بادئة (مثل +)",
      type: "string",
    },
    {
      name: "suffix",
      title: "لاحقة (مثل % أو +)",
      type: "string",
    },
    {
      name: "divisor",
      title: "قسمة (اتركها 1 إذا لا تريد قسمة)",
      type: "number",
      initialValue: 1,
    },
    {
      name: "order",
      title: "الترتيب",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "label", subtitle: "target" },
  },
};
