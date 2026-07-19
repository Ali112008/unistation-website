// sanity/schemas/registration.ts
export default {
  name: "registration",
  title: "خطوات التسجيل",
  type: "document",
  fields: [
    {
      name: "title",
      title: "العنوان",
      type: "string",
      initialValue: "التسجيل",
    },
    {
      name: "description",
      title: "الوصف",
      type: "string",
    },
    {
      name: "docs",
      title: "المستندات المطلوبة",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "عنوان المستند", type: "string" },
            { name: "desc", title: "الوصف", type: "string" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title" },
  },
};
