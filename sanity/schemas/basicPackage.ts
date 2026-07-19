// sanity/schemas/basicPackage.ts
export default {
  name: "basicPackage",
  title: "الحزمة الأساسية",
  type: "document",
  fields: [
    {
      name: "title",
      title: "العنوان",
      type: "string",
      initialValue: "الحزمة الأساسية",
    },
    {
      name: "badge",
      title: "الشارة",
      type: "string",
      initialValue: "أفضل قيمة",
    },
    {
      name: "description",
      title: "الوصف",
      type: "string",
    },
    {
      name: "totalPrice",
      title: "السعر الإجمالي",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "currency",
      title: "العملة",
      type: "string",
      initialValue: "درهم",
    },
    {
      name: "priceNote",
      title: "ملاحظة السعر",
      type: "string",
    },
    {
      name: "installments",
      title: "الدفعات",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "عنوان الدفعة", type: "string" },
            { name: "amount", title: "المبلغ", type: "string" },
            { name: "note", title: "ملاحظة", type: "string" },
          ],
        },
      ],
    },
    {
      name: "services",
      title: "الخدمات المشمولة",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "totalPrice" },
  },
};
