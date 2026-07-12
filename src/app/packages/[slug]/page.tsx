import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site-data";
import { CTASection } from "@/components/shared";
import { LibrarySection } from "@/components/LibrarySection";
import { ArrowRight, MapPin } from "lucide-react";

/* ───────── Tag mapping for each package slug ───────── */
const PACKAGE_TAGS: Record<string, string[]> = {
  "early-bird": ["early-bird", "application", "scholarship"],
  canada: ["canada"],
  asia: ["asia", "malaysia", "china"],
  australia: ["australia"],
  "new-zealand": ["new-zealand"],
  europe: [
    "europe", "germany", "italy", "finland", "spain", "czech-republic",
    "hungary", "poland", "malta", "cyprus", "georgia", "russia", "romania",
  ],
  "uk-medicine": ["uk", "medicine", "ucat"],
  uk: ["uk"],
  usa: ["usa", "sat"],
};

/* ───────── Static params for all package slugs ───────── */
export function generateStaticParams() {
  return siteConfig.packages.map((pkg) => ({ slug: pkg.slug }));
}

/* ───────── Dynamic metadata ───────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = siteConfig.packages.find((p) => p.slug === slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.name} — UniStation`,
    description: pkg.description,
  };
}

/* ───────── Page ───────── */
export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = siteConfig.packages.find((p) => p.slug === slug);

  if (!pkg) notFound();

  const tags = PACKAGE_TAGS[slug] || [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/70 to-brand-navy/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/packages" className="hover:text-white transition-colors">
              Our Packages
            </Link>
            <span>/</span>
            <span className="text-white">{pkg.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{pkg.icon}</span>
            <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider">
              {pkg.tagline}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {pkg.name}
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">{pkg.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg btn-primary-hover transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971522732589"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Placeholder Content ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Detailed Information
            </h2>
            <div className="brand-line mx-auto mb-8" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We are preparing comprehensive details about our {pkg.name} package,
              including universities, programs, requirements, pricing, and more.
              Stay tuned or contact us directly for immediate assistance.
            </p>
          </div>
        </div>
      </section>

      {/* ── Library Section (filtered by relevant tags) ── */}
      <LibrarySection topicName={pkg.name} tags={tags} />

      <CTASection />
    </>
  );
}