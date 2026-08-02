"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig as fallbackData } from "@/data/site-data";
import { pageFaqs as fallbackFaqs } from "@/data/page-faqs";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { LibrarySection } from "@/components/LibrarySection";
import { ArrowRight, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  slug: string;
}

function TeamGrid() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Try sessionStorage cache first
    const cached = sessionStorage.getItem("unistation_team_data");
    if (cached) {
      try { setTeam(JSON.parse(cached)); } catch {}
    }

    fetch("/api/webflow?type=team")
      .then((r) => r.json())
      .then((d) => {
        const raw = d.team || [];
        sessionStorage.setItem("unistation_team_data", JSON.stringify(raw));
        setTeam(raw);
      })
      .catch(() => {});
  }, []);

  const display = team.length > 0
    ? team.map((m) => ({
        ...m,
        shortBio: m.bio?.replace(/<[^>]*>/g, "").slice(0, 150) || "",
      }))
    : fallbackData.team.map((m) => ({
        ...m,
        shortBio: m.fullBio?.replace(/<[^>]*>/g, "").slice(0, 150) || m.shortBio || "",
      }));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {display.map((member, i) => (
        <ScrollAnimator key={member.name} delay={i * 80}>
          <Link
            href={`/team/${member.slug || member.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="block group"
          >
            <div className="bg-gray-50 rounded-2xl overflow-hidden card-hover border border-gray-100">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized={member.image.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">{member.name}</p>
                  <p className="text-brand-teal-light text-sm font-medium">{member.role}</p>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-4 h-4 text-brand-navy" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {member.shortBio}
                </p>
                <span className="inline-flex items-center text-brand-teal text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                  View Profile <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </ScrollAnimator>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(fallbackData.about);
  const [timeline, setTimeline] = useState(fallbackData.timeline);
  const [aboutFaqs, setAboutFaqs] = useState(fallbackFaqs.about);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => {
        if (d.about) setAboutData(d.about);
        if (d.timeline) setTimeline(d.timeline);
        if (d.faqs?.about) setAboutFaqs(d.faqs.about);
      })
      .catch(() => {});
  }, []);

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
                {aboutData.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-lg btn-primary-hover transition-colors"
                >
                  Start Your Journey <ArrowRight className="w-4 h-4" />
                </Link>
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
            {timeline.map((item, i) => (
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

      {/* Team Section - ALL members from CMS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading subtitle="Our People" title="Meet the Team" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our dedicated team of education professionals is here to guide you
              through every step of your academic journey abroad.
            </p>
          </ScrollAnimator>
          <div className="mt-12">
            <TeamGrid />
          </div>
        </div>
      </section>

      <FAQSection faqs={aboutFaqs} />
      <LibrarySection />
      <CTASection />
    </>
  );
}