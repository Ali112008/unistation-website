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
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";

export default function DestinationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&h=600&fit=crop"
            alt="World map"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
            Explore the World
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Study Destinations
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            Explore UniStation&apos;s global education hubs. Connect with top
            universities worldwide and unlock your international study
            opportunities.
          </p>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading subtitle="Popular Choices" title="Top Destinations" />
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {siteConfig.topDestinations.map((dest, i) => (
              <ScrollAnimator key={dest.name} delay={i * 100}>
                <div className="relative group rounded-2xl overflow-hidden h-72 card-hover">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      {dest.description}
                    </p>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Friendly */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              subtitle="Affordable Options"
              title="Budget-Friendly Destinations"
            />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Unlock your global education with personalized counseling, access to
              world-class programs, and a network of ambitious students.
            </p>
          </ScrollAnimator>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
            {siteConfig.budgetDestinations.map((dest, i) => (
              <ScrollAnimator key={dest.name} delay={i * 50}>
                <div className="bg-white rounded-xl p-5 text-center card-hover shadow-sm">
                  <span className="text-3xl mb-2 block">{dest.flag}</span>
                  <p className="font-semibold text-brand-navy text-sm">
                    {dest.name}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading subtitle="Side by Side" title="Comparison Table" />
          </ScrollAnimator>
          <ScrollAnimator delay={200}>
            <div className="mt-12 overflow-x-auto rounded-xl border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-brand-navy hover:bg-brand-navy">
                    {siteConfig.comparisonTable.headers.map((h) => (
                      <TableHead
                        key={h}
                        className="text-white font-semibold text-sm"
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {siteConfig.comparisonTable.rows.map((row, i) => (
                    <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                      {row.map((cell, j) => (
                        <TableCell
                          key={j}
                          className={
                            j === 0
                              ? "font-semibold text-brand-navy text-sm"
                              : "text-gray-600 text-sm"
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