import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site-data";
import { packagesContent } from "@/data/packages-content";
import { CTASection } from "@/components/shared";
import { LibrarySection } from "@/components/LibrarySection";
import { ScrollAnimator } from "@/components/shared";
import {
  ArrowRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  Star,
  Users,
  Globe,
} from "lucide-react";

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

/* ───────── Feature Card Component ───────── */
function FeatureCard({
  feature,
  index,
}: {
  feature: { title: string; description: string };
  index: number;
}) {
  return (
    <ScrollAnimator delay={index * 60}>
      <div className="flex gap-4 p-4 rounded-xl bg-white/50 border border-gray-100 hover:border-brand-teal/30 hover:shadow-md transition-all duration-300">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center mt-0.5">
          <CheckCircle2 className="w-4 h-4 text-brand-teal" />
        </div>
        <div>
          <h4 className="font-semibold text-brand-navy text-sm mb-1">
            {feature.title}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </ScrollAnimator>
  );
}

/* ───────── Tier Card Component ───────── */
function TierCard({
  tier,
  index,
  totalTiers,
}: {
  tier: {
    name: string;
    subtitle: string;
    features: { title: string; description: string }[];
    idealFor: string;
    badge?: "popular" | "best-value";
    price?: string;
  };
  index: number;
  totalTiers: number;
}) {
  const isSingle = totalTiers === 1;
  const isPopular = tier.badge === "popular";
  const isBestValue = tier.badge === "best-value";

  return (
    <ScrollAnimator delay={index * 150}>
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
          isSingle
            ? "bg-white border border-gray-200 shadow-lg"
            : "bg-white border border-gray-200 shadow-md hover:border-brand-teal/40"
        } ${isPopular ? "ring-2 ring-brand-teal" : ""}`}
      >
        {/* Badge */}
        {isPopular && (
          <div className="absolute top-0 right-0 bg-brand-teal text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" fill="white" /> MOST POPULAR
            </span>
          </div>
        )}
        {isBestValue && (
          <div className="absolute top-0 right-0 bg-brand-amber text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> BEST VALUE
            </span>
          </div>
        )}

        {/* Header */}
        <div className={`p-6 pb-4 ${isPopular ? "bg-brand-teal/5" : ""} ${isBestValue ? "bg-brand-amber/5" : ""}`}>
          <h3 className="text-xl font-bold text-brand-navy">{tier.name}</h3>
          <p className="text-brand-teal font-medium text-sm mt-1">
            {tier.subtitle}
          </p>
          {tier.price && (
            <div className="mt-3">
              <span className="text-3xl font-bold text-brand-navy">{tier.price}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Features */}
        <div className="p-6 space-y-3">
          {tier.features.map((feature, i) => (
            <div key={i} className="flex gap-3">
              <CheckCircle2 className="w-4.5 h-4.5 text-brand-teal flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-brand-navy text-sm">{feature.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Ideal For */}
        <div className="p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Ideal For
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {tier.idealFor}
          </p>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <Link
            href="/contact"
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
              isPopular
                ? "bg-brand-teal hover:bg-brand-teal-dark text-white shadow-lg shadow-brand-teal/20"
                : "bg-brand-navy hover:bg-brand-navy-light text-white"
            }`}
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </ScrollAnimator>
  );
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
  const content = packagesContent[slug];

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

      {/* ── Package Content ── */}
      {content ? (
        <>
          {/* Intro Section */}
          {content.intro && (
            <section className="py-20 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                  <p className="text-gray-600 text-lg leading-relaxed text-center">
                    {content.intro}
                  </p>
                </ScrollAnimator>
                {content.countries && (
                  <ScrollAnimator delay={100}>
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Globe className="w-4 h-4 text-brand-teal" />
                      <p className="text-brand-teal font-medium text-sm">
                        Covered Countries: {content.countries}
                      </p>
                    </div>
                  </ScrollAnimator>
                )}
              </div>
            </section>
          )}

          {/* Packages Tiers Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimator>
                <div className="text-center mb-14">
                  <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                    Choose Your Plan
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                    Admission Packages
                  </h2>
                  <div className="brand-line mx-auto" />
                </div>
              </ScrollAnimator>

              <div
                className={`grid gap-8 ${
                  content.tiers.length === 1
                    ? "max-w-3xl mx-auto"
                    : content.tiers.length === 2
                    ? "md:grid-cols-2"
                    : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {content.tiers.map((tier, i) => (
                  <TierCard
                    key={tier.name}
                    tier={tier}
                    index={i}
                    totalTiers={content.tiers.length}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Features Section (for packages with single tier) */}
          {content.tiers.length === 1 && (
            <section className="py-20 bg-white">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                  <div className="text-center mb-12">
                    <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                      What&apos;s Included
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                      Complete Package Breakdown
                    </h2>
                    <div className="brand-line mx-auto" />
                  </div>
                </ScrollAnimator>
                <div className="grid gap-3">
                  {content.tiers[0].features.map((feature, i) => (
                    <FeatureCard key={feature.title} feature={feature} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* ── Placeholder for pages without PDF content (Australia, NZ) ── */
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
      )}

      {/* ── Library Section (filtered by relevant tags) ── */}
      <LibrarySection topicName={pkg.name} tags={tags} />

      <CTASection />
    </>
  );
}