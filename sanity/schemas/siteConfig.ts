// sanity/schemas/siteConfig.ts
export default {
  name: "siteConfig",
  title: "إعدادات الموقع",
  type: "document",
  fields: [
    {
      name: "name",
      title: "اسم الشركة",
      type: "string",
      initialValue: "UniStation",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tagline",
      title: "الشعار النصي",
      type: "string",
      initialValue: "YOUR GATEWAY TO STUDY ABROAD",
    },
    {
      name: "whatsapp",
      title: "رقم الواتساب",
      type: "string",
      initialValue: "+971522732589",
    },
    {
      name: "email",
      title: "البريد الإلكتروني",
      type: "string",
      initialValue: "info@unistation.org",
    },
    {
      name: "phone",
      title: "رقم الهاتف",
      type: "string",
      initialValue: "+971 52 273 2589",
    },
    {
      name: "instagram",
      title: "رابط الإنستاجرام",
      type: "url",
      initialValue: "https://www.instagram.com/unistation1/",
    },
  ],
  preview: {
    select: { title: "name" },
  },
};
