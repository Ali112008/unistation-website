import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import { Star, Quote } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    { name: "Sara M.", country: "UAE", program: "Medicine, UK", text: "UniStation made my dream of studying medicine in the UK a reality. Their guidance through the UCAT and application process was invaluable. I couldn't have done it without their support.", avatar: "SM" },
    { name: "Ahmed K.", country: "Syria", program: "Engineering, Germany", text: "I was overwhelmed by the German university system, but UniStation's team broke everything down for me. From language preparation to application, they were with me every step.", avatar: "AK" },
    { name: "Lina R.", country: "Oman", program: "Business, Canada", text: "The team at UniStation truly cares about their students. They helped me find the perfect program in Canada and even assisted with my visa application. Highly recommended!", avatar: "LR" },
    { name: "Omar J.", country: "Jordan", program: "Computer Science, USA", text: "Applying to US universities seemed impossible until I found UniStation. Their expertise in SAT preparation and university selection made all the difference.", avatar: "OJ" },
    { name: "Fatima H.", country: "Egypt", program: "Pharmacy, Ireland", text: "UniStation's personalized approach set them apart. They understood my goals and helped me find a pharmacy program in Ireland that was the perfect fit.", avatar: "FH" },
    { name: "Youssef T.", country: "Lebanon", program: "Architecture, Italy", text: "From portfolio review to university applications, UniStation provided comprehensive support. Their knowledge of European universities is impressive.", avatar: "YT" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=600&fit=crop" alt="Testimonials" fill className="object-cover" />
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
                      <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy text-sm">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.program}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
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

      <CTASection />
    </>
  );
}