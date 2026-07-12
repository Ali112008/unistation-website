import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Study Destinations",
  description: "Discover 25+ study destinations worldwide. Find the perfect country and university for your academic journey with UniStation.",
};

export default function DestinationsPage() {
  return (
    <>
      {/* Section 1: TOP DESTINATIONS Hero */}
      <section className="relative pt-32 pb-16 bg-brand-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none">
                <span className="text-teal-gradient">TOP</span>
                <br />
                <span>DESTINATIONS</span>
              </h1>
              <div className="brand-line mx-auto mt-6" />
            </div>
          </ScrollAnimator>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {siteConfig.topDestinations.map((dest, i) => {
              const isExternal = dest.link.startsWith("http");
              const Wrapper = isExternal ? "a" : Link;
              const linkProps = isExternal
                ? { href: dest.link, target: "_blank" as const, rel: "noopener noreferrer" }
                : { href: dest.link };
              return (
              <ScrollAnimator key={dest.name} delay={i * 80}>
                <Wrapper {...linkProps} className="block group">
                  <div className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[320px] lg:h-[350px]">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent transition-opacity duration-500 group-hover:from-brand-navy/90" />

                    {/* Hover border glow */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-brand-teal/60 group-hover:shadow-[0_0_20px_rgba(240,180,20,0.3)]" />

                    {/* Content */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <h3 className="text-white text-xl sm:text-2xl font-bold transition-transform duration-300 group-hover:-translate-y-1">
                        {dest.name}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-brand-teal/0 flex items-center justify-center transition-all duration-500 group-hover:bg-brand-teal group-hover:shadow-lg group-hover:shadow-brand-teal/30">
                        <ArrowUpRight className="w-4 h-4 text-white opacity-0 -translate-x-1 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                      </div>
                    </div>
                  </div>
                </Wrapper>
              </ScrollAnimator>
            );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: BUDGET FRIENDLY DESTINATIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: Heading, Description, CTA */}
            <div className="lg:col-span-2">
              <ScrollAnimator>
                <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                  Affordable Options
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
                  BUDGET FRIENDLY
                  <br />
                  <span className="text-teal-gradient">DESTINATIONS</span>
                </h2>
                <div className="brand-line mb-6" />
                <p className="text-gray-600 leading-relaxed mb-8">
                  Unlock your global education with personalized counseling, access
                  to world-class programs, and a network of ambitious students.
                  Quality education doesn&apos;t have to break the bank.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white btn-primary-hover rounded-lg"
                >
                  <Link href="/contact">
                    START TODAY
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </ScrollAnimator>
            </div>

            {/* Right: Masonry Grid of Destination Cards */}
            <div className="lg:col-span-3">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {siteConfig.budgetDestinations.map((dest, i) => {
                  const isExternal = dest.link.startsWith("http");
                  const Wrapper = isExternal ? "a" : Link;
                  const linkProps = isExternal
                    ? { href: dest.link, target: "_blank" as const, rel: "noopener noreferrer" }
                    : { href: dest.link };
                  return (
                  <ScrollAnimator key={dest.name} delay={i * 50}>
                    <Wrapper {...linkProps} className="block group">
                      <div className="relative overflow-hidden rounded-2xl break-inside-avoid h-[180px] sm:h-[200px]">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent transition-opacity duration-500 group-hover:from-brand-navy/90" />

                        {/* Hover border glow */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-brand-teal/60 group-hover:shadow-[0_0_20px_rgba(240,180,20,0.3)]" />

                        {/* Content */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                          <h3 className="text-white text-lg font-bold transition-transform duration-300 group-hover:-translate-y-1">
                            {dest.name}
                          </h3>
                          <div className="w-7 h-7 rounded-full bg-brand-teal/0 flex items-center justify-center transition-all duration-500 group-hover:bg-brand-teal group-hover:shadow-lg group-hover:shadow-brand-teal/30">
                            <ArrowUpRight className="w-3.5 h-3.5 text-white opacity-0 -translate-x-1 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                          </div>
                        </div>
                      </div>
                    </Wrapper>
                  </ScrollAnimator>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: COMPARISON TABLE */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                Side by Side
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Comparison Table
              </h2>
              <div className="brand-line mx-auto" />
            </div>
          </ScrollAnimator>
          <ScrollAnimator delay={200}>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-brand-navy hover:bg-brand-navy">
                    {siteConfig.comparisonTable.headers.map((h) => (
                      <TableHead
                        key={h}
                        className="text-white font-semibold text-sm py-4"
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {siteConfig.comparisonTable.rows.map((row, i) => (
                    <TableRow
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    >
                      {row.map((cell, j) => (
                        <TableCell
                          key={j}
                          className={
                            j === 0
                              ? "font-semibold text-brand-navy text-sm py-3.5"
                              : "text-gray-600 text-sm py-3.5"
                          }
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      <CTASection />
    </>
  );
}