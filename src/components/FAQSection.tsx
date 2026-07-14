"use client";

import { siteConfig } from "@/data/site-data";
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
  const items = faqs && faqs.length > 0 ? faqs : siteConfig.faqs;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator>
          <SectionHeading subtitle={subtitle} title="Frequently Asked Questions" />
          <p className="text-gray-500 mt-4 text-center">
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