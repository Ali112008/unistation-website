// sanity/schemas/university.ts
export default {
  name: "university",
  title: "جامعة",
  type: "document",
  fields: [
    {
      name: "rank",
      title: "الترتيب",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "name",
      title: "الاسم بالإنجليزية",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "nameAr",
      title: "الاسم بالعربية",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "abbr",
      title: "الاختصار",
      type: "string",
    },
    {
      name: "fee",
      title: "الرسوم السنوية",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "type",
      title: "النوع",
      type: "string",
      options: {
        list: ["حكومية", "خاصة"],
        layout: "radio",
      },
    },
    {
      name: "desc",
      title: "الوصف",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "features",
      title: "المميزات",
      type: "array",
      of: [{ type: "string" }],
      options: {
        of: { type: "string" },
      },
    },
    {
      name: "highlight",
      title: "الخيار الأفضل",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: { title: "nameAr", subtitle: "fee" },
  },
};
