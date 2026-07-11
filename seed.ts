import { createClient } from "@sanity/client";
import siteConfig from "./src/data/site-config.json";

// Write client with token for creating documents
const writeClient = createClient({
  projectId: "vjffgnh8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN || "skV38pt7PaG6XwTq8pKPSQ6YBosXlhMTnKyjbFzfSgfH5mbR8JDjNqa0SNBGNKYDHvaQPWyCBB2IUtwhvSSPzAQXXKMApRBFcWXDxI9kLFxmJGlcMjLiWiSCvsElbx30TTV3Y9RQEsZp6BWFHiJ7xICxvZoYqtSqB8VXENdi6ygkoipwez6x",
});

async function seed() {
  console.log("🌱 Seeding Sanity with current data...\n");

  // 1. Site Config
  console.log("📝 Creating siteConfig...");
  const existingConfig = await writeClient.fetch(`*[_type == "siteConfig"][0]`);
  if (existingConfig) {
    console.log("   → siteConfig already exists, skipping.");
  } else {
    await writeClient.createIfNotExists({
      _id: "siteConfig-main",
      _type: "siteConfig",
      name: siteConfig.site.name,
      tagline: siteConfig.site.tagline,
      whatsapp: siteConfig.site.whatsapp,
      email: siteConfig.site.email,
      phone: siteConfig.site.phone,
      instagram: siteConfig.site.social.instagram,
    });
    console.log("   ✅ siteConfig created.");
  }

  // 2. Stats
  console.log("\n📊 Creating stats...");
  for (let i = 0; i < siteConfig.stats.length; i++) {
    const s = siteConfig.stats[i];
    const id = `stat-${i}`;
    await writeClient.createIfNotExists({
      _id: id,
      _type: "stat",
      label: s.label,
      target: s.target,
      prefix: s.prefix || "",
      suffix: s.suffix || "",
      divisor: s.divisor || 1,
      order: i + 1,
    });
    console.log(`   ✅ stat: ${s.label}`);
  }

  // 3. Universities
  console.log("\n🎓 Creating universities...");
  for (const u of siteConfig.universities) {
    const id = `university-${u.rank}`;
    await writeClient.createIfNotExists({
      _id: id,
      _type: "university",
      rank: u.rank,
      name: u.name,
      nameAr: u.nameAr,
      abbr: u.abbr,
      fee: u.fee,
      type: u.type,
      desc: u.desc,
      features: u.features,
      highlight: u.highlight || false,
    });
    console.log(`   ✅ university: ${u.nameAr}`);
  }

  // 4. Basic Package
  console.log("\n📦 Creating basicPackage...");
  await writeClient.createIfNotExists({
    _id: "basicPackage-main",
    _type: "basicPackage",
    title: siteConfig.basicPackage.title,
    badge: siteConfig.basicPackage.badge,
    description: siteConfig.basicPackage.description,
    totalPrice: siteConfig.basicPackage.totalPrice,
    currency: siteConfig.basicPackage.currency,
    priceNote: siteConfig.basicPackage.priceNote,
    installments: siteConfig.basicPackage.installments.map((inst: any) => ({
      _type: "installment",
      _key: inst.label,
      label: inst.label,
      amount: inst.amount,
      note: inst.note,
    })),
    services: siteConfig.basicPackage.services,
  });
  console.log("   ✅ basicPackage created.");

  // 5. Additional Package
  console.log("\n✈️ Creating additionalPackage...");
  await writeClient.createIfNotExists({
    _id: "additionalPackage-main",
    _type: "additionalPackage",
    title: siteConfig.additionalPackage.title,
    description: siteConfig.additionalPackage.description,
    note: siteConfig.additionalPackage.note,
    services: siteConfig.additionalPackage.services,
  });
  console.log("   ✅ additionalPackage created.");

  // 6. FAQs
  console.log("\n❓ Creating FAQs...");
  for (let i = 0; i < siteConfig.faqs.length; i++) {
    const f = siteConfig.faqs[i];
    const id = `faq-${i}`;
    await writeClient.createIfNotExists({
      _id: id,
      _type: "faq",
      question: f.q,
      answer: f.a,
      order: i + 1,
    });
    console.log(`   ✅ FAQ: ${f.q.substring(0, 40)}...`);
  }

  // 7. Registration
  console.log("\n📋 Creating registration...");
  await writeClient.createIfNotExists({
    _id: "registration-main",
    _type: "registration",
    title: siteConfig.registration.title,
    description: siteConfig.registration.description,
    docs: siteConfig.registration.docs.map((doc: any) => ({
      _type: "doc",
      _key: doc.title,
      title: doc.title,
      desc: doc.desc,
    })),
  });
  console.log("   ✅ registration created.");

  console.log("\n🎉 Seed complete! All data pushed to Sanity.");
}

seed().catch(console.error);
