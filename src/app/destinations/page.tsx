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
import { ArrowRight } from "lucide-react";

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
            {siteConfig.topDestinations.map((dest, i) => (
              <ScrollAnimator key={dest.name} delay={i * 80}>
                <div className="relative group overflow-hidden rounded-2xl h-[280px] sm:h-[320px] lg:h-[350px] cursor-pointer">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-xl sm:text-2xl font-bold">
                      {dest.name}
                    </h3>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
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
                {siteConfig.budgetDestinations.map((dest, i) => (
                  <ScrollAnimator key={dest.name} delay={i * 50}>
                    <div className="relative group overflow-hidden rounded-2xl break-inside-avoid h-[180px] sm:h-[200px] cursor-pointer">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-lg font-bold">
                          {dest.name}
                        </h3>
                      </div>
                    </div>
                  </ScrollAnimator>
                ))}
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