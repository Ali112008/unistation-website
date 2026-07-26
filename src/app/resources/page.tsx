import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { LibrarySection } from "@/components/LibrarySection";
import { pageFaqs as tsPageFaqs } from "@/data/page-faqs";
import { getFaqs } from "@/lib/site-content";
import { Video, BookOpen, FileText, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free resources and guides for studying abroad. Scholarships, visa guides, and more from UniStation.",
};

const resourceCategories = [
  { id: "webinars", title: "Webinars", description: "Live and recorded sessions with education experts covering admission strategies, country guides, and student Q&A.", icon: Video, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", items: ["Upcoming Webinars", "Recorded Sessions", "Expert Panels"] },
  { id: "tutorials", title: "Tutorials", description: "Step-by-step guides for admissions, visa applications, and university life preparation.", icon: FileText, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop", items: ["Admission Tutorials", "Visa Tutorials", "University Life"] },
  { id: "blog", title: "Blog", description: "Insights, tips, and stories about studying abroad, scholarships, and career opportunities.", icon: BookOpen, image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop", items: ["Study Abroad Guide", "Countries & Universities", "Student Tips"] },
  { id: "podcast", title: "Podcast", description: "Coming soon — listen to conversations with students, educators, and industry professionals.", icon: Headphones, image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop", items: ["Coming Soon"] },
];

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  // Read FAQs from Turso (live-editable) with TS fallback
  const allFaqs = await getFaqs();
  const resourcesFaqs = (allFaqs as any).resources || tsPageFaqs.resources;
  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=600&fit=crop" alt="Resources" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">Learn & Grow</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Resources</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            Access webinars, tutorials, blog articles, and more to support your study abroad journey.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {resourceCategories.map((cat, i) => (
              <div key={cat.id} id={cat.id}>
                <ScrollAnimator>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4">
                        <cat.icon className="w-6 h-6 text-brand-teal" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">{cat.title}</h2>
                      <p className="text-gray-600 mt-4 leading-relaxed">{cat.description}</p>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {cat.items.map((item) => (
                          <span key={item} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">{item}</span>
                        ))}
                      </div>
                      {cat.id !== "podcast" && (
                        <Link href="/library" className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg text-sm font-semibold mt-6 btn-primary-hover transition-colors">
                          Browse {cat.title}
                        </Link>
                      )}
                      {cat.id === "podcast" && (
                        <span className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-200 text-gray-500 rounded-lg text-sm font-semibold mt-6">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="relative rounded-2xl overflow-hidden h-72">
                        <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={resourcesFaqs} />
      <LibrarySection />
      <CTASection />
    </>
  );
}