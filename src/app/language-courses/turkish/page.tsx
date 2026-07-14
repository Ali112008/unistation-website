import Image from "next/image";
import Link from "next/link";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { LibrarySection } from "@/components/LibrarySection";
import { FAQSection } from "@/components/FAQSection";
import { pageFaqs } from "@/data/page-faqs";

export default function TurkishCoursePage() {
  const course = siteConfig.languageCourses.find((c) => c.slug === "turkish")!;
  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <Image src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&h=600&fit=crop" alt="Istanbul skyline and Bosphorus" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/70 to-brand-navy/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <span className="text-4xl mb-4 block">🇹🇷</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Turkish Courses</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">A1–C1 Turkish for university studies and daily life</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">{course.levels}</span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">{course.format}</span>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <p className="text-gray-600 leading-relaxed text-lg">{course.description}</p>
          </ScrollAnimator>

          {course.whatYouLearn && (
            <ScrollAnimator delay={100}>
              <h2 className="text-2xl font-bold text-brand-navy mt-12 mb-6">What You Will Learn</h2>
              <div className="grid gap-3">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollAnimator>
          )}

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
              <p className="text-gray-500 mb-6">Fill out the form below and we&apos;ll get back to you.</p>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-lg btn-primary-hover transition-colors">Enroll Now</Link>
            </div>
          </ScrollAnimator>
        </div>
      </section>
      <LibrarySection topicName="Turkish" tags={["turkish", "turkey"]} />

      <FAQSection faqs={pageFaqs["language-courses/turkish"]} />
      <CTASection />
    </>
  );
}