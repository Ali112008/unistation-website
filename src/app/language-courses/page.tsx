import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";

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
                <Link href={`/language-courses/${course.slug}`}>
                  <div className="bg-white rounded-2xl border shadow-sm p-8 card-hover h-full group">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{course.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
                          {course.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {course.shortDescription}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-teal-50 text-brand-teal text-xs font-medium rounded-full">
                        {course.levels}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {course.format}
                      </span>
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                        {course.priceRange}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}