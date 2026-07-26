import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { pageFaqs } from "@/data/page-faqs";
import { ArrowRight } from "lucide-react";
import { LibrarySection } from "@/components/LibrarySection";

export const metadata: Metadata = {
  title: "University Admission Packages",
  description: "Explore UniStation's comprehensive university admission packages designed to help you reach your dream university effortlessly.",
};

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=600&fit=crop"
            alt="University admission"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
            Admission Support
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Our Packages
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            <strong>University admission packages</strong>
            <br />
            designed to help you reach your dream university — effortlessly,
            seamlessly and professionally.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg btn-primary-hover transition-colors"
          >
            Start today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Package Cards Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {siteConfig.packages.map((pkg, i) => (
              <ScrollAnimator key={pkg.name} delay={i * 80}>
                <li>
                  <Link href={`/${pkg.slug}`} className="group block relative h-80 md:h-96 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500">
                  {/* Image */}
                  <Image
                    src={pkg.image}
                    alt={pkg.tagline}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    unoptimized
                  />

                  {/* Base gradient overlay — always visible for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/30 to-brand-navy/10" />

                  {/* Extra dark overlay on hover */}
                  <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-all duration-500 ease-out" />

                  {/* Content - always visible name, description on hover */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-7">
                    {/* Package Name - always visible */}
                    <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg transition-all duration-500 group-hover:-translate-y-4">
                      {pkg.name}
                    </h3>

                    {/* Description - only on hover */}
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-3 line-clamp-4">
                        {pkg.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-brand-teal font-semibold text-sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  </Link>
                </li>
              </ScrollAnimator>
            ))}
          </ul>
        </div>
      </section>

      {/* Library Section — general (no filter) */}
      <LibrarySection />

      <FAQSection faqs={pageFaqs.packages} />
      <CTASection />
    </>
  );
}
