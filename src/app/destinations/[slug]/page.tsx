import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig as fallbackData } from "@/data/site-data";
import { destinationsContent as tsDestinationsContent } from "@/data/destinations-content";
import { pageFaqs as tsPageFaqs } from "@/data/page-faqs";
import { getDestinations, getFaqs, getTopDestinations, getBudgetDestinations } from "@/lib/site-content";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { LibrarySection } from "@/components/LibrarySection";
import {
  ArrowRight,
  MapPin,
  GraduationCap,
  Globe2,
  Users,
  Zap,
  CheckCircle2,
  UserCheck,
  DollarSign,
  Building2,
  Briefcase,
  AlertTriangle,
  Heart,
  BookOpen,
  Star,
} from "lucide-react";

const FALLBACK_ALL_DESTINATIONS = [
  ...fallbackData.topDestinations.map((d) => ({ ...d, category: "Top Destination" as const })),
  ...fallbackData.budgetDestinations.map((d) => ({ ...d, category: "Budget Friendly" as const })),
];

function getDestinationFromList(allDests: any[], slug: string) {
  return allDests.find(
    (d) =>
      d.name.toLowerCase().replace(/\s+/g, "-") === slug ||
      d.name.toLowerCase() === slug
  );
}

async function getAllDestinations() {
  try {
    const [top, budget] = await Promise.all([getTopDestinations(), getBudgetDestinations()]);
    return [
      ...(top || fallbackData.topDestinations).map((d: any) => ({ ...d, category: "Top Destination" as const })),
      ...(budget || fallbackData.budgetDestinations).map((d: any) => ({ ...d, category: "Budget Friendly" as const })),
    ];
  } catch {
    return FALLBACK_ALL_DESTINATIONS;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const allDests = await getAllDestinations();
  const dest = getDestinationFromList(allDests, slug);
  // Read rich content from Turso (live-editable) with TS fallback
  const allDest = await getDestinations();
  const richContent = (allDest as any)[slug] || tsDestinationsContent[slug];
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `Study in ${dest.name} | UniStation`,
    description: richContent?.heroDescription || `Explore study opportunities in ${dest.name} with UniStation. Get expert guidance for university admissions, visa support, and more.`,
  };
}

// Force dynamic rendering — read fresh data from Turso on every request
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const allDests = await getAllDestinations();
  return allDests.map((d) => ({
    slug: d.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

/* ───────── Rich Spain Page ───────── */
function SpainPage({
  dest,
  content,
  faqs,
}: {
  dest: (typeof ALL_DESTINATIONS)[number];
  content: typeof tsDestinationsContent.spain;
  faqs: { q: string; a: string }[];
}) {

  const twoPathsSection = content.additionalSections.find(
    (s) => s.type === "two-paths"
  )?.data as {
    pathOne: {
      title: string;
      subtitle: string;
      description: string;
      highlights: string[];
      majors: string[];
      costItems: { label: string; value: string }[];
    };
    pathTwo: {
      title: string;
      subtitle: string;
      description: string;
      steps: { num: string; title: string; desc: string }[];
      tracks: { name: string; subjects: string }[];
      costItems: { label: string; value: string }[];
    };
  };

  const comparisonSection = content.additionalSections.find(
    (s) => s.type === "comparison-table"
  )?.data as {
    headers: string[];
    rows: string[][];
  };

  const whoFitsSection = content.additionalSections.find(
    (s) => s.type === "who-fits"
  )?.data as {
    privateFits: string[];
    publicFits: string[];
  };

  const ctaSection = content.additionalSections.find(
    (s) => s.type === "cta"
  )?.data as {
    title: string;
    description: string;
    disclaimer: string;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={dest.image}
            alt={dest.name}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate">
            <div className="flex items-center gap-2 text-brand-teal-light text-sm font-medium mb-4">
              <Link href="/destinations" className="hover:text-white transition-colors">
                Study Destinations
              </Link>
              <span className="text-white/40">/</span>
              <span>{dest.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              Study in{" "}
              <span className="text-teal-gradient">{dest.name}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              {content.heroDescription}
            </p>
          </div>
          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
              >
                <p className="text-brand-teal font-bold text-2xl md:text-3xl">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview — Which Door with highlighted path names */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-teal to-brand-teal/20 rounded-full hidden md:block" />
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6 md:pl-6">
                {content.overviewTitle}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg md:pl-6">
                {content.overviewParagraphs.map((p, i) => {
                  // Highlight path names in the text
                  const parts = p.split(/(private university route|public university route via a foundation year)/gi);
                  return (
                    <p key={i}>
                      {parts.map((part, j) => {
                        const isMatch = /private university route|public university route via a foundation year/i.test(part);
                        if (isMatch) {
                          return (
                            <span key={j} className="font-bold text-brand-navy bg-brand-teal/10 px-1.5 py-0.5 rounded">
                              {part}
                            </span>
                          );
                        }
                        return <span key={j}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Combined: Two Paths + Comparison + Who Fits — One Section */}
      {twoPathsSection && comparisonSection && whoFitsSection && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-14">
                <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                  Two Pathways
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                  Choose Your Route to Spain
                </h2>
                <div className="brand-line mx-auto" />
              </div>
            </ScrollAnimator>

            {/* Path Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Path 1: Private */}
              <ScrollAnimator>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-brand-teal" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy">
                      {twoPathsSection.pathOne.title}
                    </h3>
                  </div>
                  <p className="text-brand-teal font-semibold text-sm mb-4">
                    {twoPathsSection.pathOne.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {twoPathsSection.pathOne.description}
                  </p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {twoPathsSection.pathOne.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                      Available Majors
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {twoPathsSection.pathOne.majors.map((m) => (
                        <span
                          key={m}
                          className="px-3 py-1 bg-brand-navy/5 text-brand-navy text-xs font-medium rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">
                      What It Costs
                    </p>
                    <div className="space-y-2">
                      {twoPathsSection.pathOne.costItems.map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">{item.label}</span>
                          <span className="font-bold text-brand-navy text-sm">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollAnimator>

              {/* Path 2: Public via Foundation */}
              <ScrollAnimator delay={150}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-teal/20 h-full flex flex-col ring-1 ring-brand-teal/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy">
                      {twoPathsSection.pathTwo.title}
                    </h3>
                  </div>
                  <p className="text-brand-teal font-semibold text-sm mb-4">
                    {twoPathsSection.pathTwo.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {twoPathsSection.pathTwo.description}
                  </p>
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">
                      How It Works
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {twoPathsSection.pathTwo.steps.map((step) => (
                        <div key={step.num} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 rounded-md bg-brand-teal text-white text-xs font-bold flex items-center justify-center">
                              {step.num}
                            </span>
                            <span className="font-semibold text-brand-navy text-xs">
                              {step.title}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">
                      Available Majors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {twoPathsSection.pathTwo.tracks.map((track) => (
                        <div
                          key={track.name}
                          className="px-3 py-1.5 bg-gray-50 text-brand-navy text-xs font-medium rounded-full"
                        >
                          <span className="font-semibold">{track.name}</span>
                          {track.subjects && (
                            <span className="text-gray-400 ml-1">— {track.subjects}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-5 mt-auto">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">
                      What It Costs
                    </p>
                    <div className="space-y-2">
                      {twoPathsSection.pathTwo.costItems.map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">{item.label}</span>
                          <span className="font-bold text-brand-navy text-sm">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            </div>

            {/* Comparison Table — embedded in same section */}
            <ScrollAnimator>
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-brand-navy mb-6 text-center">
                  The Two Paths, Compared
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        {comparisonSection.headers.map((h, i) => (
                          <th key={i} className="text-left px-5 py-4 font-semibold first:rounded-tl-2xl last:rounded-tr-2xl">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonSection.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-5 py-4 ${
                                ci === 0
                                  ? "font-semibold text-brand-navy"
                                  : "text-gray-600"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollAnimator>

            {/* Who Fits — embedded in same section */}
            <ScrollAnimator>
              <h3 className="text-2xl font-bold text-brand-navy mb-8 text-center">
                Which Path Actually Fits You?
              </h3>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollAnimator>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-brand-teal" />
                    </div>
                    <h4 className="text-lg font-bold text-brand-navy">Choose the private path if you&apos;re...</h4>
                  </div>
                  <ul className="space-y-3">
                    {whoFitsSection.privateFits.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <UserCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimator>
              <ScrollAnimator delay={150}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-teal/20 h-full ring-1 ring-brand-teal/10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-brand-navy">Choose the public path if you&apos;re...</h4>
                  </div>
                  <ul className="space-y-3">
                    {whoFitsSection.publicFits.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <UserCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimator>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <section className="py-20 bg-brand-navy">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimator>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {ctaSection.title}
              </h3>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                {ctaSection.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/unistation-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-xl btn-primary-hover transition-colors text-lg shadow-lg hover:shadow-xl hover:shadow-brand-teal/20"
                >
                  Book a Free Consultation
                </a>
                <Link
                  href="/spain-foundation-year"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 text-lg"
                >
                  View Foundation Year Package
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <p className="text-gray-500 text-xs mt-6 max-w-2xl mx-auto">
                {ctaSection.disclaimer}
              </p>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Library Section */}
      <LibrarySection topicName="Spain" tags={["spain", "europe"]} />

      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}

/* ───────── Rich Turkey Page ───────── */
function TurkeyPage({
  dest,
  content,
  faqs,
}: {
  dest: (typeof ALL_DESTINATIONS)[number];
  content: typeof tsDestinationsContent.turkey;
  faqs: { q: string; a: string }[];
}) {

  const keyAdvantages = content.additionalSections.find(
    (s) => s.type === "key-advantages"
  )?.data as { title: string; items: string[] } | undefined;

  const studentCities = content.additionalSections.find(
    (s) => s.type === "student-cities"
  )?.data as { title: string; cities: { name: string; image: string; description: string }[] } | undefined;

  const whyUniversities = content.additionalSections.find(
    (s) => s.type === "why-universities"
  )?.data as { title: string; description: string } | undefined;

  const thingsToConsider = content.additionalSections.find(
    (s) => s.type === "things-to-consider"
  )?.data as { title: string; intro?: string; items: { title: string; description: string }[] } | undefined;

  const tuitionTable = content.additionalSections.find(
    (s) => s.type === "tuition-table"
  )?.data as { title: string; headers: string[]; rows: string[][]; note: string } | undefined;

  const livingCosts = content.additionalSections.find(
    (s) => s.type === "living-costs"
  )?.data as { title: string; amount: string; factors: string[]; note: string } | undefined;

  const postGraduation = content.additionalSections.find(
    (s) => s.type === "post-graduation"
  )?.data as { title: string; description: string; items: string[] } | undefined;

  const popularMajors = content.additionalSections.find(
    (s) => s.type === "majors"
  )?.data as { title: string; description: string; majors: string[] } | undefined;

  const whyUnistation = content.additionalSections.find(
    (s) => s.type === "why-unistation"
  )?.data as { title: string; description: string; services: string[]; closing?: string } | undefined;

  const ctaSection = content.additionalSections.find(
    (s) => s.type === "cta"
  )?.data as { title: string; description: string; disclaimer: string } | undefined;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={dest.image}
            alt={dest.name}
            fill
            className="object-cover opacity-30"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate">
            <div className="flex items-center gap-2 text-brand-teal-light text-sm font-medium mb-4">
              <Link href="/destinations" className="hover:text-white transition-colors">
                Study Destinations
              </Link>
              <span className="text-white/40">/</span>
              <span>{dest.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              Study in{" "}
              <span className="text-teal-gradient">{dest.name}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              {content.heroDescription}
            </p>
          </div>
          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
              >
                <p className="text-brand-teal font-bold text-2xl md:text-3xl">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-teal to-brand-teal/20 rounded-full hidden md:block" />
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6 md:pl-6">
                {content.overviewTitle}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg md:pl-6">
                {content.overviewParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Key Advantages */}
      {keyAdvantages && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-8 text-center">
                {keyAdvantages.title}
              </h2>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 gap-4">
              {keyAdvantages.items.map((item, i) => (
                <ScrollAnimator key={i} delay={i * 50}>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Cities */}
      {studentCities && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-10 text-center">
                {studentCities.title}
              </h2>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-6">
              {studentCities.cities.map((city, i) => (
                <ScrollAnimator key={city.name} delay={i * 100}>
                  <div className="relative rounded-2xl overflow-hidden h-72 group">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold mb-2">{city.name}</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">{city.description}</p>
                    </div>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Turkish Universities */}
      {whyUniversities && (
        <section className="py-20 bg-brand-navy">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimator>
              <div className="w-14 h-14 bg-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-7 h-7 text-brand-teal" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {whyUniversities.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                {whyUniversities.description}
              </p>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Things to Consider */}
      {thingsToConsider && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4 text-center">
                {thingsToConsider.title}
              </h2>
              {thingsToConsider.intro && (
                <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                  {thingsToConsider.intro}
                </p>
              )}
            </ScrollAnimator>
            <div className="space-y-6">
              {thingsToConsider.items.map((item, i) => (
                <ScrollAnimator key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-navy text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tuition Fees Table */}
      {tuitionTable && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
                  {tuitionTable.title}
                </h2>
              </div>
            </ScrollAnimator>
            <ScrollAnimator delay={100}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <thead>
                    <tr className="bg-brand-navy text-white">
                      {tuitionTable.headers.map((h, i) => (
                        <th key={i} className="px-6 py-4 text-left text-sm font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tuitionTable.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4 text-sm text-gray-700">
                            {j === 0 ? <span className="font-semibold text-brand-navy">{cell}</span> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {tuitionTable.note && (
                <p className="text-gray-500 text-xs mt-4 text-center">{tuitionTable.note}</p>
              )}
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Living Costs */}
      {livingCosts && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                  {livingCosts.title}
                </h2>
                <p className="text-4xl md:text-5xl font-bold text-brand-teal mb-6">
                  {livingCosts.amount}
                </p>
                <p className="text-gray-500 text-sm mb-2">Most international students spend between these amounts depending on:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {livingCosts.factors.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 bg-brand-navy/5 text-brand-navy text-sm rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                {livingCosts.note && (
                  <p className="text-gray-400 text-xs mt-4">{livingCosts.note}</p>
                )}
              </div>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Post-Graduation */}
      {postGraduation && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-7 h-7 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                  {postGraduation.title}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">{postGraduation.description}</p>
              </div>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {postGraduation.items.map((item, i) => (
                <ScrollAnimator key={i} delay={i * 80}>
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Majors */}
      {popularMajors && (
        <section className="py-20 bg-brand-navy">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                  Available Majors
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {popularMajors.title}
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">{popularMajors.description}</p>
              </div>
            </ScrollAnimator>
            <div className="flex flex-wrap justify-center gap-3">
              {popularMajors.majors.map((major, i) => (
                <ScrollAnimator key={major} delay={i * 40}>
                  <span className="px-4 py-2.5 bg-white/10 border border-white/10 text-white text-sm rounded-xl backdrop-blur-sm hover:bg-brand-teal/20 hover:border-brand-teal/30 transition-all duration-300">
                    {major}
                  </span>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why UniStation */}
      {whyUnistation && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                  {whyUnistation.title}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">{whyUnistation.description}</p>
              </div>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyUnistation.services.map((service, i) => (
                <ScrollAnimator key={i} delay={i * 60}>
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <Star className="w-5 h-5 text-brand-teal mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{service}</span>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
            {whyUnistation.closing && (
              <p className="text-center text-gray-500 mt-8 text-sm italic">
                {whyUnistation.closing}
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimator>
              <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                {ctaSection.title}
              </h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                {ctaSection.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/unistation-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-xl btn-primary-hover transition-colors text-lg shadow-lg hover:shadow-xl hover:shadow-brand-teal/20"
                >
                  Book a Free Consultation
                </a>
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center px-8 py-4 border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold rounded-xl transition-all duration-300 text-lg"
                >
                  View Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <p className="text-gray-400 text-xs mt-6 max-w-2xl mx-auto">
                {ctaSection.disclaimer}
              </p>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Library Section */}
      <LibrarySection topicName="Turkey" tags={["turkey"]} />

      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}

/* ───────── Generic Destination Page (fully admin-driven) ───────── */
function GenericDestinationPage({
  dest,
  genericFaqs,
  slugForTags,
  destContent,
}: {
  dest: (typeof ALL_DESTINATIONS)[number];
  genericFaqs: { q: string; a: string }[];
  slugForTags: string;
  destContent?: any;
}) {
  // Use admin-edited content if available, otherwise use defaults
  const heroSubtitle = destContent?.heroSubtitle || `${dest.name} — Your Next Study Destination`;
  const heroDescription = destContent?.heroDescription
    || `Discover world-class universities, vibrant student life, and endless opportunities in ${dest.name}. Let UniStation guide you through every step of your journey.`;
  const overviewTitle = destContent?.overviewTitle || `Why Study in ${dest.name}?`;
  const overviewParagraphs = (destContent?.overviewParagraphs?.length ? destContent.overviewParagraphs : [
    `${dest.name} is one of the most sought-after study destinations for international students, offering a unique blend of academic excellence, cultural diversity, and career opportunities. Whether you are looking for undergraduate, graduate, or language programs, ${dest.name} has something to offer every ambitious student.`,
    `At UniStation, we have helped hundreds of students successfully navigate the admission process for universities in ${dest.name}. Our experienced advisors provide personalized guidance tailored to your academic background, career goals, and budget — ensuring you find the perfect program and institution.`,
    `From application preparation and document review to visa guidance and pre-departure orientation, we are with you at every step. Start your journey today and let us help you turn your dream of studying in ${dest.name} into reality.`,
  ]);
  const stats = (destContent?.stats?.length ? destContent.stats : undefined);
  const additionalSections: any[] = destContent?.additionalSections || [];

  // Extract additional sections (same pattern as TurkeyPage)
  const keyAdvantages = additionalSections.find((s: any) => s.type === "key-advantages")?.data as { title: string; items: string[] } | undefined;
  const quickFacts = additionalSections.find((s: any) => s.type === "quick-facts")?.data as { title: string; subtitle: string; items: { title: string; description: string }[] } | undefined;
  const studentCities = additionalSections.find((s: any) => s.type === "student-cities")?.data as { title: string; cities: { name: string; image: string; description: string }[] } | undefined;
  const whyUniversities = additionalSections.find((s: any) => s.type === "why-universities")?.data as { title: string; description: string } | undefined;
  const thingsToConsider = additionalSections.find((s: any) => s.type === "things-to-consider")?.data as { title: string; intro?: string; items: { title: string; description: string }[] } | undefined;
  const tuitionTable = additionalSections.find((s: any) => s.type === "tuition-table")?.data as { title: string; headers: string[]; rows: string[][]; note?: string } | undefined;
  const livingCosts = additionalSections.find((s: any) => s.type === "living-costs")?.data as { title: string; amount: string; factors: string[]; note?: string } | undefined;
  const postGraduation = additionalSections.find((s: any) => s.type === "post-graduation")?.data as { title: string; description: string; items: string[] } | undefined;
  const popularMajors = additionalSections.find((s: any) => s.type === "majors")?.data as { title: string; description: string; majors: string[] } | undefined;
  const whyUnistation = additionalSections.find((s: any) => s.type === "why-unistation")?.data as { title: string; description: string; services: string[]; closing?: string } | undefined;
  const ctaSection = additionalSections.find((s: any) => s.type === "cta")?.data as { title: string; description: string; disclaimer: string } | undefined;

  // If no admin content at all, use a minimal default quickFacts section
  const defaultQuickFacts = !quickFacts ? {
    title: `Why Study in ${dest.name}?`,
    subtitle: "Quick Facts",
    items: [
      { title: "World-Class Universities", description: `${dest.name} is home to globally ranked institutions known for academic excellence and research.` },
      { title: "Global Recognition", description: `Degrees from ${dest.name} are recognized worldwide, opening doors to international career opportunities.` },
      { title: "Diverse Community", description: `Join a vibrant, multicultural student community from around the world.` },
      { title: "UniStation Support", description: `End-to-end guidance from application to arrival — we handle the details so you can focus on your studies.` },
    ],
  } : quickFacts;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={dest.image}
            alt={dest.name}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate">
            <div className="flex items-center gap-2 text-brand-teal-light text-sm font-medium mb-4">
              <Link href="/destinations" className="hover:text-white transition-colors">
                Study Destinations
              </Link>
              <span className="text-white/40">/</span>
              <span>{dest.name}</span>
            </div>
            <p className="text-brand-teal-light text-sm font-medium mb-2">{heroSubtitle}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Study in{" "}
              <span className="text-teal-gradient">{dest.name}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              {heroDescription}
            </p>
          </div>
          {/* Stats bar (if admin provided stats) */}
          {stats && stats.length > 0 && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat: any) => (
                <div
                  key={stat.label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
                >
                  <p className="text-brand-teal font-bold text-2xl md:text-3xl">{stat.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-teal to-brand-teal/20 rounded-full hidden md:block" />
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6 md:pl-6">
                {overviewTitle}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg md:pl-6">
                {overviewParagraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Quick Facts (admin-driven) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                {defaultQuickFacts.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
                {defaultQuickFacts.title}
              </h2>
            </div>
          </ScrollAnimator>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultQuickFacts.items.map((item, i) => (
              <ScrollAnimator key={item.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full card-hover">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-brand-navy text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      {keyAdvantages && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-8 text-center">
                {keyAdvantages.title}
              </h2>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 gap-4">
              {keyAdvantages.items.map((item, i) => (
                <ScrollAnimator key={i} delay={i * 50}>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Cities */}
      {studentCities && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-10 text-center">
                {studentCities.title}
              </h2>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-6">
              {studentCities.cities.map((city, i) => (
                <ScrollAnimator key={city.name} delay={i * 100}>
                  <div className="relative rounded-2xl overflow-hidden h-72 group">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold mb-2">{city.name}</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">{city.description}</p>
                    </div>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Universities */}
      {whyUniversities && (
        <section className="py-20 bg-brand-navy">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimator>
              <div className="w-14 h-14 bg-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-7 h-7 text-brand-teal" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {whyUniversities.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                {whyUniversities.description}
              </p>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Things to Consider */}
      {thingsToConsider && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4 text-center">
                {thingsToConsider.title}
              </h2>
              {thingsToConsider.intro && (
                <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                  {thingsToConsider.intro}
                </p>
              )}
            </ScrollAnimator>
            <div className="space-y-6">
              {thingsToConsider.items.map((item, i) => (
                <ScrollAnimator key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-navy text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tuition Fees Table */}
      {tuitionTable && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
                  {tuitionTable.title}
                </h2>
              </div>
            </ScrollAnimator>
            <ScrollAnimator delay={100}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <thead>
                    <tr className="bg-brand-navy text-white">
                      {tuitionTable.headers.map((h, i) => (
                        <th key={i} className="px-6 py-4 text-left text-sm font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tuitionTable.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4 text-sm text-gray-700">
                            {j === 0 ? <span className="font-semibold text-brand-navy">{cell}</span> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {tuitionTable.note && (
                <p className="text-gray-500 text-xs mt-4 text-center">{tuitionTable.note}</p>
              )}
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Living Costs */}
      {livingCosts && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                  {livingCosts.title}
                </h2>
                <p className="text-4xl md:text-5xl font-bold text-brand-teal mb-6">
                  {livingCosts.amount}
                </p>
                <p className="text-gray-500 text-sm mb-2">Most international students spend between these amounts depending on:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {livingCosts.factors.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 bg-brand-navy/5 text-brand-navy text-sm rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                {livingCosts.note && (
                  <p className="text-gray-400 text-xs mt-4">{livingCosts.note}</p>
                )}
              </div>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Post-Graduation */}
      {postGraduation && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-7 h-7 text-brand-teal" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                  {postGraduation.title}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">{postGraduation.description}</p>
              </div>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {postGraduation.items.map((item, i) => (
                <ScrollAnimator key={i} delay={i * 80}>
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Majors */}
      {popularMajors && (
        <section className="py-20 bg-brand-navy">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                  Available Majors
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {popularMajors.title}
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">{popularMajors.description}</p>
              </div>
            </ScrollAnimator>
            <div className="flex flex-wrap justify-center gap-3">
              {popularMajors.majors.map((major, i) => (
                <ScrollAnimator key={major} delay={i * 40}>
                  <span className="px-4 py-2.5 bg-white/10 border border-white/10 text-white text-sm rounded-xl backdrop-blur-sm hover:bg-brand-teal/20 hover:border-brand-teal/30 transition-all duration-300">
                    {major}
                  </span>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why UniStation */}
      {whyUnistation && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                  {whyUnistation.title}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">{whyUnistation.description}</p>
              </div>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyUnistation.services.map((service, i) => (
                <ScrollAnimator key={i} delay={i * 60}>
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <Star className="w-5 h-5 text-brand-teal mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{service}</span>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
            {whyUnistation.closing && (
              <p className="text-center text-gray-500 mt-8 text-sm italic">
                {whyUnistation.closing}
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimator>
              <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                {ctaSection.title}
              </h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                {ctaSection.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/unistation-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-xl btn-primary-hover transition-colors text-lg shadow-lg hover:shadow-xl hover:shadow-brand-teal/20"
                >
                  Book a Free Consultation
                </a>
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center px-8 py-4 border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold rounded-xl transition-all duration-300 text-lg"
                >
                  View Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <p className="text-gray-400 text-xs mt-6 max-w-2xl mx-auto">
                {ctaSection.disclaimer}
              </p>
            </ScrollAnimator>
          </div>
        </section>
      )}

      <LibrarySection topicName={dest.name} tags={[slugForTags]} />
      <FAQSection faqs={genericFaqs} />
      <CTASection />
    </>
  );
}

/* ───────── Main Page Component ───────── */
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [allDests, allDest, allFaqs] = await Promise.all([getAllDestinations(), getDestinations(), getFaqs()]);
  const dest = getDestinationFromList(allDests, slug);
  if (!dest) notFound();
  const turkishContent = (allDest as any).turkey || tsDestinationsContent.turkey;
  const spainContent = (allDest as any).spain || tsDestinationsContent.spain;
  const spainFaqs = (allFaqs as any).spain || tsPageFaqs.spain;
  const turkeyFaqs = (allFaqs as any).turkey || tsPageFaqs.turkey;
  const destinationsFaqs = (allFaqs as any).destinations || tsPageFaqs.destinations;

  // Build tags for LibrarySection — slug is already the canonical name e.g. "usa", "uk", "australia"
  const slugForTags = slug.toLowerCase();

  // Use rich content for destinations that have it, generic fallback otherwise
  if (slug === "turkey" && turkishContent) {
    return <TurkeyPage dest={dest} content={turkishContent} faqs={turkeyFaqs} />;
  }
  if ((allDest as any)[slug]) {
    return <SpainPage dest={dest} content={spainContent} faqs={spainFaqs} />;
  }

  return <GenericDestinationPage dest={dest} genericFaqs={destinationsFaqs} slugForTags={slugForTags} destContent={(allDest as any)[slug]} />;
}