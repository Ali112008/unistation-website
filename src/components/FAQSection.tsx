"use client";

import { useState, useEffect } from "react";
import { siteConfig as fallbackData } from "@/data/site-data";
import { ScrollAnimator, SectionHeading } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  subtitle?: string;
}

export function FAQSection({ faqs, subtitle = "Support" }: FAQSectionProps) {
  const [tursoFaqs, setTursoFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    if (faqs && faqs.length > 0) return; // prop provided, no need to fetch
    fetch("/api/config", { cache: "no-store" })
      .then((r) => r.json())
      .then((cfg) => {
        if (Array.isArray(cfg.faqs) && cfg.faqs.length > 0) {
          setTursoFaqs(cfg.faqs.map((f: any) => ({
            q: String(f.q ?? ""),
            a: String(f.a ?? ""),
          })));
        }
      })
      .catch(() => {});
  }, [faqs]);

  const items = faqs && faqs.length > 0
    ? faqs
    : tursoFaqs.length > 0
      ? tursoFaqs
      : fallbackData.faqs;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator>
          <SectionHeading subtitle={subtitle} title="Frequently Asked Questions" />
          <p className="text-gray-500 mt-4 text-center">
            Can&apos;t find the answer you&apos;re looking for? Please chat to
            our friendly team or write us an email at{" "}
            <a
              href={`mailto:${fallbackData.brand.email}`}
              className="text-brand-teal hover:underline"
            >
              {fallbackData.brand.email}
            </a>
          </p>
        </ScrollAnimator>
        <Accordion type="single" collapsible className="mt-10">
          {items.map((faq, i) => (
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
  );
}