import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export default function EnglishCoursePage() {
  const course = siteConfig.languageCourses.find((c) => c.slug === "english")!;
  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1543165796-5426273eaab3?w=1920&h=600&fit=crop" alt="English language" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <span className="text-4xl mb-4 block">🇬🇧</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">English Courses</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">IELTS & TOEFL preparation for university admission</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">{course.levels}</span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">{course.format}</span>
            <span className="px-4 py-2 bg-brand-teal/20 backdrop-blur-sm rounded-full text-brand-teal-light text-sm">{course.priceRange}</span>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">{course.description}</p>
            </div>
          </ScrollAnimator>

          <ScrollAnimator delay={200}>
            <h2 className="text-2xl font-bold text-brand-navy mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
              {course.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-gray-800 hover:text-brand-teal">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimator>

          <ScrollAnimator delay={300}>
            <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-brand-navy mb-2">Ready to Start?</h3>
              <p className="text-gray-500 mb-6">Fill out the form below and we&apos;ll get back to you with a personalized study plan.</p>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-lg btn-primary-hover transition-colors">
                Enroll Now
              </Link>
            </div>
          </ScrollAnimator>
        </div>
      </section>
      <CTASection />
    </>
  );
}