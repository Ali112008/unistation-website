import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, SectionHeading } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { LibrarySection } from "@/components/LibrarySection";
import { pageFaqs as tsPageFaqs } from "@/data/page-faqs";
import { getFaqs } from "@/lib/site-content";
import {
  GraduationCap, FileText, BookOpen, Stethoscope, Award, Brain, FlaskConical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tests & Exams",
  description: "Prepare for standardized tests and exams required for university admission. IELTS, TOEFL, SAT, and more with UniStation.",
};

const examIcons: Record<string, React.ElementType> = {
  SAT: GraduationCap,
  UCAT: Stethoscope,
  GRE: BookOpen,
  GMAT: Award,
  UEMS: Stethoscope,
  IB: Brain,
  AP: FlaskConical,
};

export const dynamic = "force-dynamic";

export default async function TestsExamsPage() {
  // Read FAQs from Turso (live-editable) with TS fallback
  const allFaqs = await getFaqs();
  const testsExamsFaqs = (allFaqs as any)["tests-exams"] || tsPageFaqs["tests-exams"];
  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&h=600&fit=crop" alt="Exam preparation" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">Prepare for Success</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Tests &amp; Exams</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">Comprehensive preparation for the standardized tests required by top universities worldwide.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading subtitle="Standardized Tests" title="Exam Preparation" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We provide guidance and preparation resources for the key standardized tests required for university admissions across different countries and programs.
            </p>
          </ScrollAnimator>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {siteConfig.examTypes.map((exam, i) => {
              const Icon = examIcons[exam.name] || FileText;
              return (
                <ScrollAnimator key={exam.name} delay={i * 100}>
                  <Link href={`/tests-exams/${exam.slug}`}>
                    <Card className="border-0 shadow-sm card-hover h-full">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-brand-teal" />
                        </div>
                        <h3 className="text-lg font-bold text-brand-navy">{exam.name}</h3>
                        <p className="text-brand-teal text-sm font-medium">{exam.fullName}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mt-3">{exam.description}</p>
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-xs text-gray-500">
                            <span className="font-semibold text-brand-navy">Best for:</span> {exam.whoFor}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollAnimator>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimator>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">Need Test Prep Help?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">Our language courses include IELTS and TOEFL preparation. For other exams, our advisors can connect you with the right resources.</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-lg btn-primary-hover transition-colors">
              Get Expert Guidance
            </Link>
          </ScrollAnimator>
        </div>
      </section>

      <FAQSection faqs={testsExamsFaqs} />
      <LibrarySection />
    </>
  );
}