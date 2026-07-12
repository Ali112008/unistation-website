import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { ArrowRight, MapPin, GraduationCap, Globe2, Users } from "lucide-react";

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
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `Study in ${dest.name} | UniStation`,
    description: `Explore study opportunities in ${dest.name} with UniStation. Get expert guidance for university admissions, visa support, and more.`,
  };
}

export function generateStaticParams() {
  const slugs = ALL_DESTINATIONS.map((d) => ({
    slug: d.name.toLowerCase().replace(/\s+/g, "-"),
  }));
  return slugs;
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestination(slug);

  if (!dest) notFound();

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
              <Link
                href="/destinations"
                className="hover:text-white transition-colors"
              >
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