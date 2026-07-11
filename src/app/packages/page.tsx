import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";

export default function PackagesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=600&fit=crop" alt="University admission" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">Admission Support</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Our Packages</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            University admission packages designed to help you reach your dream university — effortlessly, seamlessly and professionally.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.packages.map((pkg, i) => (
              <ScrollAnimator key={pkg.name} delay={i * 100}>
                <Card className="border-0 shadow-sm card-hover h-full group relative overflow-hidden">
                  {i === 0 && (
                    <div className="absolute top-0 right-0 bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <span className="text-3xl mb-4">{pkg.icon}</span>
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-brand-teal text-sm font-medium mt-1">{pkg.tagline}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mt-3 flex-1">{pkg.description}</p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center justify-center w-full py-2.5 border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      Get Started
                    </Link>
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