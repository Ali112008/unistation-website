"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { pageFaqs as fallbackPageFaqs, type FAQItem } from "@/data/page-faqs";
import { ArrowRight, MapPin, GraduationCap, Building2 } from "lucide-react";

interface PortfolioItem {
  id: string;
  name: string;
  country: string;
  curriculum: string;
  program: string;
  university: string;
  destination: string;
  image: string;
  featured: number;
  sortOrder: number;
  createdOn: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [portfolioFaqs, setPortfolioFaqs] = useState<FAQItem[]>(fallbackPageFaqs.packages || []);

  useEffect(() => {
    fetch("/api/cms/portfolio", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setItems(data.portfolio || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then((cfg) => {
        const faqs = cfg.faqs?.portfolio;
        if (Array.isArray(faqs) && faqs.length > 0) {
          setPortfolioFaqs(faqs);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&h=600&fit=crop"
            alt="Students celebrating success"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
            Success Stories
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Our Portfolio
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            <strong>Meet our students</strong> who successfully secured
            admissions to top universities worldwide with UniStation&apos;s
            expert guidance and support.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg btn-primary-hover transition-colors"
          >
            Start your journey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
                >
                  <div className="w-full h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">
                No Portfolio Items Yet
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Our success stories are being curated. Check back soon to see
                students who&apos;ve achieved their dream university admissions
                with UniStation.
              </p>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <ScrollAnimator key={item.id} delay={i * 60}>
                  <li className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 h-full flex flex-col">
                      {/* Photo */}
                      <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <GraduationCap className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                        {item.featured === 1 && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-teal text-white text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        )}
                        {/* Destination badge */}
                        {item.destination && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                            {item.destination}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">
                          {item.name}
                        </h3>

                        <div className="space-y-1.5 mt-auto pt-3">
                          {item.university && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2 className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                              <span className="truncate">{item.university}</span>
                            </div>
                          )}
                          {item.program && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <GraduationCap className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                              <span className="truncate">{item.program}</span>
                            </div>
                          )}
                          {(item.country || item.curriculum) && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                              <span className="truncate">
                                {[item.curriculum, item.country].filter(Boolean).join(" · ")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                </ScrollAnimator>
              ))}
            </ul>
          )}
        </div>
      </section>

      <FAQSection faqs={portfolioFaqs} />
      <CTASection />
    </>
  );
}
