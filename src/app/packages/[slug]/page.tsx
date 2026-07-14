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
  GraduationCap,
  FileCheck,
  MessageSquare,
  ShieldCheck,
  Handshake,
  BookOpen,
  TrendingUp,
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
  "spain-foundation-year": ["spain", "europe"],
};

/* ───────── Stats for each package ───────── */
const PACKAGE_STATS: Record<string, { label: string; value: string; icon: React.ElementType }[]> = {
  uk: [
    { label: "Partner Universities", value: "50+", icon: GraduationCap },
    { label: "Acceptance Rate", value: "95%", icon: TrendingUp },
    { label: "Students Placed", value: "2,000+", icon: Users },
    { label: "Years of Experience", value: "10+", icon: ShieldCheck },
  ],
  "uk-medicine": [
    { label: "Medical Schools", value: "30+", icon: GraduationCap },
    { label: "UCAT Prep Success", value: "92%", icon: TrendingUp },
    { label: "Students Placed", value: "500+", icon: Users },
    { label: "Years of Experience", value: "10+", icon: ShieldCheck },
  ],
  usa: [
    { label: "Partner Universities", value: "80+", icon: GraduationCap },
    { label: "Scholarship Rate", value: "70%", icon: TrendingUp },
    { label: "Students Placed", value: "1,500+", icon: Users },
    { label: "SAT Prep Avg Gain", value: "+200", icon: FileCheck },
  ],
  canada: [
    { label: "Partner Universities", value: "40+", icon: GraduationCap },
    { label: "Visa Success Rate", value: "98%", icon: TrendingUp },
    { label: "Students Placed", value: "1,200+", icon: Users },
    { label: "Immigration Support", value: "Full", icon: ShieldCheck },
  ],
  europe: [
    { label: "Countries Covered", value: "13+", icon: Globe },
    { label: "Tuition From", value: "€1,500/yr", icon: TrendingUp },
    { label: "Students Placed", value: "3,000+", icon: Users },
    { label: "Scholarship Rate", value: "60%", icon: Sparkles },
  ],
  asia: [
    { label: "Countries Covered", value: "5+", icon: Globe },
    { label: "Affordable From", value: "AED 3,499", icon: TrendingUp },
    { label: "Students Placed", value: "800+", icon: Users },
    { label: "English Programs", value: "100+", icon: BookOpen },
  ],
  "early-bird": [
    { label: "Early Applications", value: "500+", icon: FileCheck },
    { label: "Higher Acceptance", value: "3x", icon: TrendingUp },
    { label: "Scholarship Wins", value: "AED 2M+", icon: Sparkles },
    { label: "Deadline Alerts", value: "Real-time", icon: MessageSquare },
  ],
  australia: [
    { label: "Partner Universities", value: "35+", icon: GraduationCap },
    { label: "Visa Success Rate", value: "97%", icon: TrendingUp },
    { label: "Students Placed", value: "900+", icon: Users },
    { label: "Top QS 100 Schools", value: "8", icon: Star },
  ],
  "new-zealand": [
    { label: "Partner Universities", value: "8", icon: GraduationCap },
    { label: "Visa Success Rate", value: "99%", icon: TrendingUp },
    { label: "Students Placed", value: "400+", icon: Users },
    { label: "Work-Study Options", value: "Full", icon: Handshake },
  ],
  "spain-foundation-year": [
    { label: "Foundation Year Cost", value: "€4,500", icon: TrendingUp },
    { label: "Program Duration", value: "8–10 Months", icon: BookOpen },
    { label: "Public Uni Tuition", value: "€1K–4K/yr", icon: GraduationCap },
  ],
};

/* ───────── Process steps ───────── */
const PROCESS_STEPS = [
  { step: "01", title: "Free Consultation", desc: "Book a free session with our expert advisors to discuss your goals, budget, and preferred destinations." },
  { step: "02", title: "University Matching", desc: "We analyze your academic profile and match you with the best-fit universities and programs." },
  { step: "03", title: "Application & Docs", desc: "Our team handles your applications, personal statements, and all required documentation." },
  { step: "04", title: "Visa & Pre-departure", desc: "Full visa support, accommodation assistance, and pre-departure orientation to get you ready." },
];

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
      <div className="flex gap-4 p-5 rounded-xl bg-white border border-gray-100 hover:border-brand-teal/30 hover:shadow-lg transition-all duration-300">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-teal/10 flex items-center justify-center mt-0.5">
          <CheckCircle2 className="w-4.5 h-4.5 text-brand-teal" />
        </div>
        <div>
          <h4 className="font-semibold text-brand-navy text-sm mb-1">
            {feature.title}
          </h4>
          <p className="text-gray-500 text-sm leading-relaxed">
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
        className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
          isSingle
            ? "bg-white border border-gray-200 shadow-lg"
            : "bg-white border border-gray-200 shadow-md hover:border-brand-teal/40"
        } ${isPopular ? "ring-2 ring-brand-teal" : ""}`}
      >
        {/* Badge */}
        {isPopular && (
          <div className="absolute top-0 right-0 bg-brand-teal text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" fill="white" /> MOST POPULAR
            </span>
          </div>
        )}
        {isBestValue && (
          <div className="absolute top-0 right-0 bg-brand-teal-dark text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> BEST VALUE
            </span>
          </div>
        )}

        {/* Header — sticky top */}
        <div className={`flex-shrink-0 p-6 pb-4 ${isPopular ? "bg-brand-teal/5" : ""} ${isBestValue ? "bg-brand-teal-dark/5" : ""}`}>
          <h3 className="text-xl font-bold text-brand-navy">{tier.name}</h3>
          <p className="text-brand-teal font-medium text-sm mt-1">
            {tier.subtitle}
          </p>
          {tier.price && (
            <div className="mt-3">
              <span className="text-3xl font-bold text-brand-navy">{tier.price}</span>
            </div>
          )}
          {/* Feature count badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 bg-gray-50 rounded-full px-3 py-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-xs font-medium text-gray-500">{tier.features.length} Services Included</span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex-shrink-0 mx-6 border-t border-gray-100" />

        {/* Features — grows to fill space, scrollable if needed */}
        <div className="flex-grow overflow-y-auto p-6 space-y-3 max-h-[400px] scrollbar-thin">
          {tier.features.map((feature, i) => (
            <div key={i} className="flex gap-3 group/item">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-teal/10 flex items-center justify-center mt-0.5 group-hover/item:bg-brand-teal/20 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-brand-navy text-sm leading-snug">{feature.title}</p>
                <p className="text-gray-400 text-xs leading-relaxed mt-0.5 line-clamp-2">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex-shrink-0 mx-6 border-t border-gray-100" />

        {/* Ideal For */}
        <div className="flex-shrink-0 p-6 pt-4">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
            Ideal For
          </p>
          <p className="text-gray-500 text-xs leading-relaxed">
            {tier.idealFor}
          </p>
        </div>

        {/* CTA — always at bottom */}
        <div className="flex-shrink-0 px-6 pb-6">
          <Link
            href="/contact"
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              isPopular
                ? "bg-brand-teal hover:bg-brand-teal-dark text-white shadow-lg shadow-brand-teal/25 hover:shadow-brand-teal/40"
                : isBestValue
                ? "bg-brand-teal-dark hover:bg-brand-teal text-white shadow-lg shadow-brand-teal-dark/20 hover:shadow-brand-teal-dark/40"
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
  const stats = PACKAGE_STATS[slug] || PACKAGE_STATS["uk"];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/packages" className="hover:text-white transition-colors">
              Our Packages
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{pkg.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl">{pkg.icon}</span>
            <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider">
              {pkg.tagline}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {pkg.name}
          </h1>
          <p className="text-gray-300 mt-5 max-w-2xl text-lg leading-relaxed">{pkg.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-xl btn-primary-hover transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971522732589"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative -mt-12 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className={`grid gap-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 ${stats.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className={slug === "spain-foundation-year" && i === 0 ? "" : "text-center"}>
                    {slug === "spain-foundation-year" && i === 0 ? (
                      <>
                        <div className="flex items-center gap-3 mb-1">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 shrink-0">
                            <Icon className="w-5 h-5 text-brand-teal" />
                          </div>
                          <div>
                            <p className="text-2xl md:text-3xl font-bold text-brand-navy text-left">{stat.value}</p>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider text-left">{stat.label}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 mb-3">
                          <Icon className="w-5 h-5 text-brand-teal" />
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-brand-navy">{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ── Package Content ── */}
      {content ? (
        <>
          {/* Intro Section */}
          {content.intro && (
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-teal to-brand-teal/20 rounded-full hidden md:block" />
                    <p className="text-gray-600 text-lg leading-relaxed md:pl-6">
                      {content.intro}
                    </p>
                  </div>
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
          <section className="py-20 bg-gray-50/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimator>
                <div className="text-center mb-14">
                  <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                    {content.tiers.length === 1 ? "Program Package" : "Choose Your Plan"}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                    {content.tiers.length === 1 ? content.tiers[0].name : "Admission Packages"}
                  </h2>
                  <div className="brand-line mx-auto" />
                  {content.tiers.length > 1 && (
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                      Select the package that best fits your needs. All plans include dedicated advisor support throughout your journey.
                    </p>
                  )}
                </div>
              </ScrollAnimator>

              <div
                className={`grid gap-6 lg:gap-8 ${
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

          {/* Detailed Features Section (for packages with single tier, skip Spain — already shown in tier card) */}
          {content.tiers.length === 1 && slug !== "spain-foundation-year" && (
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
                <div className="grid gap-4">
                  {content.tiers[0].features.map((feature, i) => (
                    <FeatureCard key={feature.title} feature={feature} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Spain-specific: Not Included + How to Enroll */}
          {slug === "spain-foundation-year" && (
            <>
              <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ScrollAnimator>
                    <div className="text-center mb-10">
                      <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                        Good to Know
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                        What&apos;s Not Included
                      </h2>
                      <div className="brand-line mx-auto" />
                    </div>
                  </ScrollAnimator>
                  <ScrollAnimator delay={100}>
                    <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {[
                        "Visa and embassy fees",
                        "Health insurance",
                        "Flights",
                        "Housing and living costs",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100"
                        >
                          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <span className="text-gray-400 text-xs font-bold">—</span>
                          </div>
                          <span className="text-gray-600 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollAnimator>
                </div>
              </section>

              <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ScrollAnimator>
                    <div className="text-center mb-10">
                      <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                        Get Started
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                        How to Enroll
                      </h2>
                      <div className="brand-line mx-auto" />
                      <p className="text-gray-500 mt-4">
                        Send us the following documents via WhatsApp or email at{" "}
                        <a
                          href="mailto:info@unistation.org"
                          className="text-brand-teal hover:underline font-medium"
                        >
                          info@unistation.org
                        </a>
                      </p>
                    </div>
                  </ScrollAnimator>
                  <ScrollAnimator delay={100}>
                    <div className="grid gap-4 max-w-xl mx-auto">
                      {[
                        { label: "A copy of your passport", icon: "1" },
                        { label: "A personal photo", icon: "2" },
                        { label: "Your most recent academic transcript", icon: "3" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-4 bg-gray-50 rounded-xl px-6 py-5"
                        >
                          <span className="w-8 h-8 rounded-lg bg-brand-teal text-white text-sm font-bold flex items-center justify-center shrink-0">
                            {item.icon}
                          </span>
                          <span className="text-gray-700 font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollAnimator>
                  <ScrollAnimator delay={200}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                      <a
                        href="https://wa.me/971522732589"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/30"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Send Documents via WhatsApp
                      </a>
                      <a
                        href="mailto:info@unistation.org"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-white font-semibold rounded-xl transition-all duration-300"
                      >
                        <MapPin className="w-4 h-4" />
                        Send via Email
                      </a>
                    </div>
                  </ScrollAnimator>
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        /* ── Placeholder for pages without content (Australia, NZ) ── */
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-teal/10 mb-6">
                <Globe className="w-8 h-8 text-brand-teal" />
              </div>
              <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-3">
                Coming Soon
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Detailed Package Information
              </h2>
              <div className="brand-line mx-auto mb-8" />
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                We are preparing comprehensive details about our {pkg.name} package,
                including universities, programs, requirements, pricing, and more.
                Stay tuned or contact us directly for immediate assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/971522732589"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 border-2 border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── How It Works (skip for Spain) ── */}
      {slug !== "spain-foundation-year" && (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                Simple Process
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                How It Works
              </h2>
              <div className="brand-line mx-auto" />
            </div>
          </ScrollAnimator>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollAnimator key={step.step} delay={i * 100}>
                <div className="relative text-center group">
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-brand-teal/30 to-transparent" />
                  )}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-navy text-white text-xl font-bold mb-5 group-hover:bg-brand-teal transition-colors duration-300">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </ScrollAnimator>
            ))}
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