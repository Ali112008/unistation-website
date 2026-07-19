// sanity/schemas/faq.ts
export default {
  name: "faq",
  title: "سؤال شائع",
  type: "document",
  fields: [
    {
      name: "question",
      title: "السؤال",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "answer",
      title: "الإجابة",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "order",
      title: "الترتيب",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "question" },
  },
};
