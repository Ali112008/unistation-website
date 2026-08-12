"use client";

import { useState, useEffect } from "react";
import { SectionHeading, ScrollAnimator } from "@/components/shared";
import { GraduationCap, MapPin, BookOpen, Building2 } from "lucide-react";

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
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/cms/portfolio", { cache: "no-store" })
      .then((res) => res.ok && res.json())
      .then((data) => setItems(data?.portfolio || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const programs = [...new Set(items.map((i) => i.program))];
  const destinations = [...new Set(items.map((i) => i.destination).filter(Boolean))];

  const filtered =
    filter === "all" ? items : items.filter((i) => i.program === filter);

  const countryFlags: Record<string, string> = {
    Egypt: "🇪🇬",
    Tunisia: "🇹🇳",
    "Türkiye": "🇹🇷",
    Jordan: "🇯🇴",
    Iraq: "🇮🇶",
    Syria: "🇸🇾",
    Lebanon: "🇱🇧",
    US: "🇺🇸",
    UAE: "🇦🇪",
    "Saint Lucia": "🇱🇨",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-brand-navy py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-brand-teal rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-brand-teal-dark rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title="Our Portfolio" subtitle="Student Success Stories" light />
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Meet the students we&apos;ve helped reach their dream universities across the
            globe. Their success is our pride.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-teal" />
              <strong className="text-white text-lg">{items.length}+</strong> Students
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-teal" />
              <strong className="text-white text-lg">{destinations.length}+</strong> Countries
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-teal" />
              <strong className="text-white text-lg">{programs.length}+</strong> Programs
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-brand-teal text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Programs
          </button>
          {programs.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === p
                  ? "bg-brand-teal text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No students found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, idx) => (
              <ScrollAnimator key={item.id} delay={idx * 50}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                  {/* Avatar / Initials */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-teal to-brand-teal-dark flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      item.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Name + Country */}
                  <h3 className="text-lg font-bold text-brand-navy text-center">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-1">
                    <span>{countryFlags[item.country] || "🌍"}</span>
                    {item.country}
                  </p>

                  {/* Details */}
                  <div className="mt-4 space-y-2 flex-grow">
                    <div className="flex items-start gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" />
                      <div>
                        <span className="text-gray-400">Curriculum:</span>{" "}
                        <span className="text-gray-700 font-medium">{item.curriculum}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" />
                      <div>
                        <span className="text-gray-400">Program:</span>{" "}
                        <span className="text-gray-700 font-medium">{item.program}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" />
                      <div>
                        <span className="text-gray-400">University:</span>{" "}
                        <span className="text-gray-700 font-medium">{item.university}</span>
                      </div>
                    </div>
                  </div>

                  {/* Destination badge */}
                  {item.destination && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-brand-teal text-xs font-semibold rounded-full">
                        <MapPin className="w-3 h-3" />
                        {item.destination}
                      </span>
                    </div>
                  )}
                </div>
              </ScrollAnimator>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join hundreds of students who achieved their academic goals with UniStation&apos;s
            guidance and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/unistation-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Book a Free Consultation
            </a>
            <a
              href="https://wa.me/971522732589"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
