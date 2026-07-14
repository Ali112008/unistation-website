import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-data";
import { destinationsContent } from "@/data/destinations-content";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { LibrarySection } from "@/components/LibrarySection";
import {
  ArrowRight,
  MapPin,
  GraduationCap,
  Globe2,
  Users,
  Zap,
  BookOpen,
  Euro,
  Clock,
  CheckCircle2,
  ArrowRightLeft,
  UserCheck,
} from "lucide-react";

const ALL_DESTINATIONS = [
  ...siteConfig.topDestinations.map((d) => ({ ...d, category: "Top Destination" as const })),
  ...siteConfig.budgetDestinations.map((d) => ({ ...d, category: "Budget Friendly" as const })),
];

function getDestination(slug: string) {
  return ALL_DESTINATIONS.find(
    (d) =>
      d.name.toLowerCase().replace(/\s+/g, "-") === slug ||
      d.name.toLowerCase() === slug
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  const richContent = destinationsContent[slug];
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `Study in ${dest.name} | UniStation`,
    description: richContent?.heroDescription || `Explore study opportunities in ${dest.name} with UniStation. Get expert guidance for university admissions, visa support, and more.`,
  };
}

export function generateStaticParams() {
  const slugs = ALL_DESTINATIONS.map((d) => ({
    slug: d.name.toLowerCase().replace(/\s+/g, "-"),
  }));
  return slugs;
}

/* ───────── Rich Spain Page ───────── */
function SpainPage({ dest }: { dest: (typeof ALL_DESTINATIONS)[number] }) {
  const content = destinationsContent.spain;

  const twoPathsSection = content.additionalSections.find(
    (s) => s.type === "two-paths"
  )?.data as {
    pathOne: {
      title: string;
      subtitle: string;
      description: string;
      highlights: string[];
      majors: string[];
      costLabel: string;
      costNote: string;
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
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
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
            <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-3">
              {content.heroSubtitle}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              Study in{" "}
              <span className="text-teal-gradient">{dest.name}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              {content.heroDescription}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <ScrollAnimator delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {content.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
                >
                  <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollAnimator>
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
          <ScrollAnimator delay={100}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 md:pl-6">
              <Button
                asChild
                size="lg"
                className="bg-brand-teal hover:bg-brand-teal-dark text-white btn-primary-hover rounded-lg"
              >
                <Link href="/packages/spain-foundation-year">
                  View Foundation Year Package
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white rounded-lg"
              >
                <a
                  href="https://calendly.com/unistation-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Free Consultation
                </a>
              </Button>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Two Paths Section */}
      {twoPathsSection && (
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

            <div className="grid lg:grid-cols-2 gap-8">
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
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-brand-teal" />
                      <span className="font-bold text-brand-navy text-lg">
                        {twoPathsSection.pathOne.costLabel}
                      </span>
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
                    <span className="ml-auto px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-bold rounded-full uppercase">
                      Best Value
                    </span>
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
                      Academic Tracks
                    </p>
                    <div className="space-y-2">
                      {twoPathsSection.pathTwo.tracks.map((track) => (
                        <div key={track.name} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                          <span className="font-medium text-brand-navy text-sm">{track.name}</span>
                          <span className="text-gray-500 text-xs">{track.subjects}</span>
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
          </div>
        </section>
      )}

      {/* Comparison Table */}
      {comparisonSection && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-12">
                <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                  Side by Side
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                  The Two Paths, Compared
                </h2>
                <div className="brand-line mx-auto" />
              </div>
            </ScrollAnimator>
            <ScrollAnimator delay={100}>
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
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Who Fits Which Path */}
      {whoFitsSection && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <div className="text-center mb-12">
                <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                  Find Your Fit
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                  Which Path Actually Fits You?
                </h2>
                <div className="brand-line mx-auto" />
              </div>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollAnimator>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-brand-teal" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy">Choose the private path if you&apos;re...</h3>
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
                    <h3 className="text-lg font-bold text-brand-navy">Choose the public path if you&apos;re...</h3>
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
                  href="/packages/spain-foundation-year"
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

      <CTASection />
    </>
  );
}

/* ───────── Generic Destination Page (fallback) ───────── */
function GenericDestinationPage({ dest }: { dest: (typeof ALL_DESTINATIONS)[number] }) {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Study in{" "}
              <span className="text-teal-gradient">{dest.name}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Discover world-class universities, vibrant student life, and
              endless opportunities in {dest.name}. Let UniStation guide you
              through every step of your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Destination Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimator>
              <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                <p>
                  {dest.name} is one of the most sought-after study destinations
                  for international students, offering a unique blend of
                  academic excellence, cultural diversity, and career
                  opportunities. Whether you are looking for undergraduate,
                  graduate, or language programs, {dest.name} has something to
                  offer every ambitious student.
                </p>
                <p>
                  At UniStation, we have helped hundreds of students
                  successfully navigate the admission process for universities in{" "}
                  {dest.name}. Our experienced advisors provide personalized
                  guidance tailored to your academic background, career goals,
                  and budget — ensuring you find the perfect program and
                  institution.
                </p>
                <p>
                  From application preparation and document review to visa
                  guidance and pre-departure orientation, we are with you at
                  every step. Start your journey today and let us help you turn
                  your dream of studying in {dest.name} into reality.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white btn-primary-hover rounded-lg"
                >
                  <Link href="/packages">
                    View Packages
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white rounded-lg"
                >
                  <a
                    href="https://calendly.com/unistation-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Free Consultation
                  </a>
                </Button>
              </div>
            </ScrollAnimator>
            <ScrollAnimator delay={200}>
              <div className="relative rounded-2xl overflow-hidden h-[450px] group">
                <Image
                  src={dest.image}
                  alt={`Study in ${dest.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-4 py-1.5 bg-brand-teal text-white text-sm font-semibold rounded-full mb-2">
                    {dest.category}
                  </span>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                Quick Facts
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
                Why Study in {dest.name}?
              </h2>
            </div>
          </ScrollAnimator>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "World-Class Universities",
                desc: `${dest.name} is home to globally ranked institutions known for academic excellence and research.`,
              },
              {
                icon: Globe2,
                title: "Global Recognition",
                desc: `Degrees from ${dest.name} are recognized worldwide, opening doors to international career opportunities.`,
              },
              {
                icon: Users,
                title: "Diverse Community",
                desc: `Join a vibrant, multicultural student community from around the world.`,
              },
              {
                icon: MapPin,
                title: "UniStation Support",
                desc: `End-to-end guidance from application to arrival — we handle the details so you can focus on your studies.`,
              },
            ].map((item, i) => (
              <ScrollAnimator key={item.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full card-hover">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-brand-navy text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

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
  const dest = getDestination(slug);

  if (!dest) notFound();

  // Use rich content for destinations that have it, generic fallback otherwise
  if (destinationsContent[slug]) {
    return <SpainPage dest={dest} />;
  }

  return <GenericDestinationPage dest={dest} />;
}