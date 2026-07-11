"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function ScrollAnimator({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("scroll-animate", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  light = false,
  center = true,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {subtitle && (
        <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
          light ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </h2>
      <div className={cn("brand-line", center ? "mx-auto" : "")} />
    </div>
  );
}

export function CTASection() {
  return (
    <section className="relative py-24 bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-teal rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-teal-dark rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollAnimator>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Are You Ready?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Take the first step towards your international academic journey. Our
            team of experts is ready to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg btn-primary-hover transition-colors"
            >
              Book Free Consultation
            </a>
            <a
              href="https://wa.me/971522732589"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}