"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/data/site-data";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import {
  Globe2,
  Users,
  MapPin,
  Award,
  ArrowRight,
  ChevronRight,
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

export default function HomePage() {
  const [cmsTeam, setCmsTeam] = useState<{ name: string; role: string; image: string; bio: string; slug: string }[]>([]);

  useEffect(() => {
    fetch("/api/webflow?type=team")
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
    : siteConfig.team;
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
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://cdn.prod.website-files.com/68fd63e9503df62b019b5c75/68fd63e9503df62b019b5d0f_8061028-hd_1920_1080_25fps-transcode.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
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
              <Button
                asChild
                size="lg"
                className="bg-brand-teal hover:bg-brand-teal-light text-white btn-primary-hover rounded-lg text-base px-8"
              >
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 rounded-lg text-base px-8"
              >
                <Link href="/about">Learn More</Link>
              </Button>
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
          {[...siteConfig.stats, ...siteConfig.stats, ...siteConfig.stats, ...siteConfig.stats].map((stat, i) => (
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
                    <div className="rounded-2xl overflow-hidden h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop"
                        alt="Graduation ceremony"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-64">
                      <Image
                        src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=400&fit=crop"
                        alt="Students studying together"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden h-64">
                      <Image
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop"
                        alt="University building"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop"
                        alt="Library with books"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
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
            {[
              { icon: Globe2, value: 25, suffix: "+", label: "Destinations" },
              { icon: Users, value: 800, suffix: "+", label: "Students Guided" },
              { icon: MapPin, value: 30, suffix: "+", label: "Countries" },
              { icon: Award, value: 10, suffix: "+", label: "Years Experience" },
            ].map((stat, i) => (
              <ScrollAnimator key={stat.label} delay={i * 100}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 mx-auto mb-4 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-brand-teal" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-brand-navy mb-1">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                </div>
              </ScrollAnimator>
            ))}
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

      {/* Locations */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              subtitle="Global Presence"
              title="Our Locations"
            />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Ready to take your academic journey to the next level? Experience
              expert guidance, global university connections, and a community that
              inspires success.
            </p>
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {siteConfig.offices.map((office, i) => (
              <ScrollAnimator key={office.city} delay={i * 100}>
                <div className="relative group rounded-2xl overflow-hidden h-72 card-hover">
                  <Image
                    src={office.image}
                    alt={`${office.city}, ${office.country}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl font-bold mb-1">
                      {office.city}, {office.country}
                    </h3>
                    <p className="text-gray-300 text-sm">{office.description}</p>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading subtitle="Support" title="Frequently Asked Questions" />
            <p className="text-gray-500 mt-4">
              Can&apos;t find the answer you&apos;re looking for? Please chat to
              our friendly team or write us an email at{" "}
              <a
                href={`mailto:${siteConfig.brand.email}`}
                className="text-brand-teal hover:underline"
              >
                {siteConfig.brand.email}
              </a>
            </p>
          </ScrollAnimator>
          <Accordion type="single" collapsible className="mt-10">
            {siteConfig.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-gray-800 hover:text-brand-teal">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Book Consultation */}
      <section className="py-16 bg-brand-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimator>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Book a Free Consultation
            </h3>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Stay up to date with the latest opportunities and get personalized
              guidance from our experts.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
              />
              <Button className="bg-white text-brand-teal hover:bg-gray-100 font-semibold rounded-lg px-6 btn-primary-hover">
                Subscribe
              </Button>
            </form>
          </ScrollAnimator>
        </div>
      </section>

      <CTASection />
    </>
  );
}