import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { pageFaqs } from "@/data/page-faqs";

export const metadata: Metadata = {
  title: "Language Courses",
  description: "Master new languages with UniStation. IELTS, TOEFL, German, Turkish, and Spanish courses for university admission preparation.",
};

export default function LanguageCoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=600&fit=crop"
            alt="Language learning"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
            Master New Languages
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Language Courses
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            Prepare for your study abroad journey with our comprehensive language
            programs. From IELTS to German academic preparation, we have you
            covered.
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {siteConfig.languageCourses.map((course, i) => (
              <ScrollAnimator key={course.slug} delay={i * 100}>
                <Link href={course.slug === "english" ? "/ielts" : `/${course.slug}`} className="block h-80 md:h-96 group rounded-2xl overflow-hidden relative">
                  {/* Background Image */}
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Base gradient overlay — always visible for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />

                  {/* Extra dark overlay on hover */}
                  <div className="absolute inset-0 bg-brand-navy/0 transition-colors duration-500 group-hover:bg-brand-navy/30" />

                  {/* Flag badge — top-left */}
                  <span className="absolute top-4 left-4 text-2xl drop-shadow-lg z-10">
                    {course.flag}
                  </span>

                  {/* Bottom content — always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                      {course.name}
                    </h3>

                    {/* Hover-reveal details */}
                    <div className="mt-3 opacity-0 translate-y-4 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
                        {course.shortDescription}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          {course.levels}
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          {course.format}
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          {course.priceRange}
                        </span>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 text-brand-teal text-sm font-semibold">
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={pageFaqs["language-courses"]} />
      <CTASection />
    </>
  );
}