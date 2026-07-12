import type { Metadata } from "next";
import { siteConfig } from "@/data/site-data";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { ScrollAnimator } from "@/components/shared";

// Generate static params for all exams
export function generateStaticParams() {
  return siteConfig.examTypes.map((exam) => ({
    slug: exam.slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exam = siteConfig.examTypes.find((e) => e.slug === slug);
  if (!exam) return { title: "Exam Not Found" };
  return {
    title: `${exam.name} Preparation`,
    description: exam.description,
  };
}

export default async function ExamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = siteConfig.examTypes.find((e) => e.slug === slug);

  if (!exam) notFound();

  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <Link href="/tests-exams" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to All Tests
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-teal/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-brand-teal" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{exam.name}</h1>
              <p className="text-brand-teal-light mt-1">{exam.fullName}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <p className="text-gray-600 text-lg leading-relaxed">{exam.description}</p>
          </ScrollAnimator>

          <ScrollAnimator delay={200}>
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-bold text-brand-navy mb-2">Who Is This Test For?</h3>
              <p className="text-gray-600">{exam.whoFor}</p>
            </div>
          </ScrollAnimator>

          <ScrollAnimator delay={300}>
            <div className="mt-12 p-8 bg-brand-teal/5 border border-brand-teal/20 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-brand-navy mb-2">Need Help Preparing?</h3>
              <p className="text-gray-500 mb-6">Our advisors can help you find the right preparation resources and create a study plan.</p>
              <a
                href="https://calendly.com/unistation-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-lg btn-primary-hover transition-colors"
              >
                Book a Free Consultation
              </a>
            </div>
          </ScrollAnimator>

          {/* Placeholder for future content */}
          <ScrollAnimator delay={400}>
            <div className="mt-16 text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400 text-sm">Detailed preparation content coming soon.</p>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}