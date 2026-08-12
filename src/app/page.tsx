"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig as fallbackData } from "@/data/site-data";
import { ScrollAnimator, SectionHeading } from "@/components/shared";
import { LibrarySection } from "@/components/LibrarySection";
import { FAQSection } from "@/components/FAQSection";
import {
  Globe2,
  Users,
  MapPin,
  Mail,
  Phone,
  Clock,
  Award,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Star,
} from "lucide-react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function getPlaceholderReviews() {
  return [
    {
      name: "Sara M.",
      text: "UniStation made my dream of studying medicine in the UK a reality. Their guidance through the UCAT and application process was invaluable. I couldn't have done it without their support!",
      rating: 5,
      source: "Google",
      university: "University of Manchester",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Ahmed K.",
      text: "I was overwhelmed by the German university system, but UniStation's team broke everything down for me. From language preparation to application, they were with me every step of the way.",
      rating: 5,
      source: "Google",
      university: "Technical University of Munich",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Lina R.",
      text: "The team at UniStation truly cares about their students. They helped me find the perfect program in Canada and even assisted with my visa application. Highly recommended!",
      rating: 5,
      source: "Google",
      university: "University of Toronto",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Omar J.",
      text: "Applying to US universities seemed impossible until I found UniStation. Their expertise in SAT preparation and university selection made all the difference in my admission.",
      rating: 5,
      source: "Google",
      university: "University of California, Berkeley",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Fatima H.",
      text: "UniStation's personalized approach set them apart. They understood my goals and helped me find a pharmacy program in Ireland that was the perfect fit for my aspirations.",
      rating: 4,
      source: "Google",
      university: "Trinity College Dublin",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Youssef T.",
      text: "From portfolio review to university applications, UniStation provided comprehensive support. Their knowledge of European universities is truly impressive and up to date.",
      rating: 5,
      source: "Google",
      university: "Politecnico di Milano",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
  ];
}

function ReviewAvatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={36}
        height={36}
        className="rounded-full object-cover"
        unoptimized={photo.startsWith("http")}
      />
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-sm shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// Parse a stat value string like "800+", "+50", "25", "10+" into number + suffix
function parseStatValue(raw: string): { target: number; suffix: string } {
  if (!raw) return { target: 0, suffix: "" };
  const str = String(raw).trim();
  // Extract leading +, then digits, then trailing +/M/% etc.
  const match = str.match(/^([+]?)\s*(\d+(?:\.\d+)?)\s*([+%MKBk]*)$/);
  if (match) {
    return { target: parseFloat(match[2]), suffix: match[3] || "" };
  }
  // Fallback: try to extract just digits
  const numMatch = str.match(/(\d+(?:\.\d+)?)/);
  if (numMatch) {
    return { target: parseFloat(numMatch[1]), suffix: str.replace(numMatch[1], "").trim() };
  }
  return { target: 0, suffix: str };
}

export default function HomePage() {
  const [cmsTeam, setCmsTeam] = useState<{ name: string; role: string; image: string; bio: string; slug: string }[]>([]);
  const [reviews, setReviews] = useState<{ name: string; text: string; rating: number; source: string; photo?: string; university?: string; country?: string; program?: string }[]>([]);
  // Admin-managed stats from Turso (fallback to static siteConfig.stats)
  const [stats, setStats] = useState<{ value: string; label: string }[]>(fallbackData.stats as { value: string; label: string }[]);

  useEffect(() => {
    // Fetch stats from Turso (admin-managed via /admin)
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then((cfg) => {
        if (Array.isArray(cfg.stats) && cfg.stats.length > 0) {
          setStats(cfg.stats.map((s: any) => ({
            value: String(s.value ?? ""),
            label: String(s.label ?? ""),
          })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/cms/reviews")
      .then((r) => r.json())
      .then((d) => {
        const fetched = (d.reviews || []).map((r: any) => r);
        if (fetched.length > 0) {
          setReviews(fetched);
        } else {
          setReviews(getPlaceholderReviews());
        }
      })
      .catch(() => {
        setReviews(getPlaceholderReviews());
      });
  }, []);

  useEffect(() => {
    fetch("/api/cms/team")
      .then((r) => r.json())
      .then((d) => {
        const raw = d.team || [];
        // Sort: General Director first, then rest
        const sorted = [...raw].sort((a, b) => {
          const aIsDirector = a.role?.toLowerCase().includes("director") || a.role?.toLowerCase().includes("founder") ? 0 : 1;
          const bIsDirector = b.role?.toLowerCase().includes("director") || b.role?.toLowerCase().includes("founder") ? 0 : 1;
          return aIsDirector - bIsDirector;
        });
        setCmsTeam(sorted);
      })
      .catch(() => {});
  }, []);

  const teamDisplay = cmsTeam.length > 0
    ? cmsTeam.map((m) => ({ ...m, shortBio: m.bio?.replace(/<[^>]*>/g, "").slice(0, 150) || "" }))
    : fallbackData.team;
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://cdn.prod.website-files.com/68f96cf6ade48fa155ef7a60/68fcda3e1e9ba482da3661eb_8061028-hd_1920_1080_25fps-poster-00001.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          >
            <source src="https://cdn.prod.website-files.com/68fd63e9503df62b019b5c75/68fd63e9503df62b019b5d0f_8061028-hd_1920_1080_25fps-transcode.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/60 to-brand-navy/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-1">
              <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-brand-teal-light text-sm font-medium mb-6">
                <Globe2 className="w-4 h-4" />
                25+ Destinations Worldwide
              </div>
              <h1 className="hero-animate hero-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Your Gateway to{" "}
                <span className="text-teal-shimmer">Study Abroad</span>
              </h1>
              <p className="hero-animate hero-delay-2 text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Personalized guidance for university admissions, language courses,
                and test preparation. We help students from 30+ countries reach
                their dream universities.
              </p>
              <div className="hero-animate hero-delay-3 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://calendly.com/unistation-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg btn-primary-hover transition-colors text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Book a Free Video Call
                </a>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white bg-transparent hover:bg-white/15 hover:border-white/60 rounded-lg text-base px-8"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Hero Video */}
            <div className="hero-animate hero-delay-2 flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <div className="relative block rounded-2xl overflow-hidden shadow-2xl shadow-teal-500/20 ring-1 ring-white/10">
                <div className="aspect-[9/16] bg-brand-navy/80">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://img.youtube.com/vi/BC9w7fA3bzw/maxresdefault.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="https://cdn.prod.website-files.com/68fd63e9503df62b019b5c75/68fd63e9503df62b019b5d0f_8061028-hd_1920_1080_25fps-transcode.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-brand-navy/10" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-animate hero-delay-4">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Marquee */}
      <section className="bg-brand-teal py-4 md:py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 md:gap-3 mx-6 md:mx-12 shrink-0">
              <span className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-white/80 text-xs md:text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-white/30 text-lg">|</span>
            </div>
          ))}
        </div>
      </section>

      {/* Brief on UniStation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimator>
              <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                Brief on UniStation
              </h2>
              <div className="brand-line mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  UniStation is an education and career advisory platform
                  dedicated to helping students build strong academic profiles and
                  make informed decisions about their future. We support students
                  who aspire to study abroad by providing personalized guidance
                  tailored to their goals, abilities, and ambitions.
                </p>
                <p>
                  We specialize in international education systems, with a strong
                  focus on more than 25 destinations, particularly English-taught
                  programs. Our approach is practical, transparent, and
                  student-centered, ensuring that each student receives clear,
                  honest, and reliable advice.
                </p>
              </div>
              <div className="mt-8 flex gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-teal">800+</p>
                  <p className="text-sm text-gray-500">Students Guided</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-teal">30+</p>
                  <p className="text-sm text-gray-500">Countries</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-teal">25+</p>
                  <p className="text-sm text-gray-500">Destinations</p>
                </div>
              </div>
            </ScrollAnimator>
            <ScrollAnimator delay={200}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-48 group relative cursor-pointer">
                      <Image
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop"
                        alt="Graduation ceremony"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">Graduation Day</div>
                    </div>
                    <div className="rounded-2xl overflow-hidden h-64 group relative cursor-pointer">
                      <Image
                        src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=400&fit=crop"
                        alt="Students studying together"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">Student Life</div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden h-64 group relative cursor-pointer">
                      <Image
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop"
                        alt="University building"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">Global Campuses</div>
                    </div>
                    <div className="rounded-2xl overflow-hidden h-48 group relative cursor-pointer">
                      <Image
                        src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop"
                        alt="Library with books"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-3 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">Research & Study</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-teal/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-teal/10 rounded-2xl -z-10" />
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.slice(0, 4).map((stat, i) => {
              const { target, suffix } = parseStatValue(stat.value);
              return (
                <ScrollAnimator key={stat.label + i} delay={i * 100}>
                  <div className="text-center p-6">
                    <div className="w-14 h-14 mx-auto mb-4 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                      {i === 0 && <Globe2 className="w-7 h-7 text-brand-teal" />}
                      {i === 1 && <Users className="w-7 h-7 text-brand-teal" />}
                      {i === 2 && <MapPin className="w-7 h-7 text-brand-teal" />}
                      {i === 3 && <Award className="w-7 h-7 text-brand-teal" />}
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-brand-navy mb-1">
                      <CountUp target={target} suffix={suffix} />
                    </p>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  </div>
                </ScrollAnimator>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              subtitle="Our Team"
              title="Meet the Team Behind UniStation"
            />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Dedicated professionals committed to helping you achieve your
              academic dreams
            </p>
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {teamDisplay.map((member, i) => (
              <ScrollAnimator key={member.name} delay={i * 100}>
                <Card className="group card-hover border-0 shadow-sm overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={member.image.startsWith("http")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold">{member.name}</p>
                      <p className="text-brand-teal-light text-sm">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {member.shortBio}
                    </p>
                    <Link
                      href={`/team/${member.slug || member.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-brand-teal text-sm font-medium mt-3 hover:gap-2 transition-all"
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              subtitle="Google Reviews"
              title="What Our Students Say"
            />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Real feedback from students who trusted UniStation with their academic journey
            </p>
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {reviews.slice(0, 6).map((review, i) => (
              <ScrollAnimator key={review.name} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col card-hover">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${
                          j < review.rating
                            ? "text-brand-teal fill-brand-teal"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                    <ReviewAvatar name={review.name} photo={review.photo} />
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-navy text-sm truncate">{review.name}</p>
                      {review.university && (
                        <p className="text-brand-teal text-xs truncate">{review.university}</p>
                      )}
                      {review.program && (
                        <p className="text-gray-400 text-xs truncate">{review.program}{review.country ? ` · ${review.country}` : ""}</p>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Our Library */}
      <LibrarySection />

      {/* Book a Video Call - Calendly */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimator>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Book Your Free Video Call With Us Now
            </h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Take the first step towards your international academic journey. Our team of experts is ready to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/unistation-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-xl btn-primary-hover transition-colors text-lg shadow-lg hover:shadow-xl hover:shadow-brand-teal/20"
              >
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Book Your Free Video Call
              </a>
              <a
                href="https://wa.me/971522732589"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/30 text-lg"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection />

    </>
  );
}