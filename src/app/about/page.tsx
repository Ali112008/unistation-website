import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=600&fit=crop"
            alt="University campus"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate">
            <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
              Get to Know Us
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              About Us
            </h1>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimator>
              <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                {siteConfig.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white btn-primary-hover rounded-lg"
                >
                  <Link href="/contact">
                    Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </ScrollAnimator>
            <ScrollAnimator delay={200}>
              <div className="relative rounded-2xl overflow-hidden h-[500px]">
                <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=500&fit=crop"
                  alt="Students celebrating graduation"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Legacy Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              subtitle="Our Journey"
              title="A Legacy of Global Education"
            />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Guiding students to success since 2014, our organization has been a
              trusted partner in international education.
            </p>
          </ScrollAnimator>
          <div className="mt-16 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-teal/20 -translate-x-1/2 hidden md:block" />
            {siteConfig.timeline.map((item, i) => (
              <ScrollAnimator key={i} delay={i * 150}>
                <div
                  className={`flex items-center gap-8 mb-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm card-hover">
                      <span className="text-brand-teal font-bold text-2xl">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-brand-navy mt-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-brand-teal rounded-full shrink-0 relative z-10 ring-4 ring-gray-50" />
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading subtitle="Our People" title="The Team" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Founder of UniStation | Study Abroad & Education Advisor
            </p>
          </ScrollAnimator>

          {/* Featured: Basel Fayad */}
          <div className="mt-12">
            <ScrollAnimator>
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-start">
                <div className="relative rounded-xl overflow-hidden h-80 md:h-96">
                  <Image
                    src={siteConfig.team[0].image}
                    alt={siteConfig.team[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-brand-navy">
                    {siteConfig.team[0].name}
                  </h3>
                  <p className="text-brand-teal font-medium mt-1">
                    {siteConfig.team[0].role}
                  </p>
                  <div className="brand-line mt-3 mb-6" />
                  <p className="text-gray-600 leading-relaxed">
                    {siteConfig.team[0].fullBio}
                  </p>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}