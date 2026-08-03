import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { pageFaqs as tsPageFaqs } from "@/data/page-faqs";
import { getFaqs, getTestimonials } from "@/lib/site-content";
import { Star, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Testimonials",
  description: "Read success stories from UniStation students who achieved their dream of studying abroad at top universities worldwide.",
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  // Read testimonials + FAQs from Turso (live-editable) with TS fallback
  const [tursoTestimonials, allFaqs] = await Promise.all([
    getTestimonials(),
    getFaqs(),
  ]);
  const testimonialsFaqs = (allFaqs as any).testimonials || tsPageFaqs.testimonials;
  const testimonials = tursoTestimonials.map((t: any, i: number) => ({
    ...t,
    avatar: t.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
    program: t.program || t.university || "",
    country: t.country || "",
    university: t.university || "",
    source: t.source || "",
    photo: t.photo || "",
  }));

  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=600&fit=crop" alt="Testimonials" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">Success Stories</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Student Testimonials</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">Hear from students who achieved their dream of studying abroad with UniStation&apos;s guidance.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollAnimator key={t.name} delay={i * 100}>
                <Card className="border-0 shadow-sm card-hover h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-8 h-8 text-brand-teal/20 mb-4" />
                    <p className="text-gray-600 leading-relaxed flex-1">{t.text}</p>
                    <div className="mt-6 pt-4 border-t flex items-center gap-3">
                      {t.photo ? (
                        <Image
                          src={t.photo}
                          alt={t.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                          unoptimized={t.photo.startsWith("http")}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {t.avatar}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-brand-navy text-sm truncate">{t.name}</p>
                        <p className="text-brand-teal text-xs truncate">{t.program}{t.country ? ` — ${t.country}` : ""}</p>
                        {t.university && t.program && t.university !== t.program && (
                          <p className="text-gray-400 text-xs truncate">{t.university}</p>
                        )}
                        {t.source && t.source !== "Website" && (
                          <p className="text-gray-300 text-xs">{t.source} Review</p>
                        )}
                      </div>
                      <div className="ml-auto flex shrink-0">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < (t.rating || 5) ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={testimonialsFaqs} />
      <CTASection />
    </>
  );
}