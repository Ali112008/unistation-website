"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig as fallbackData } from "@/data/site-data";
import { ScrollAnimator, CTASection } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { pageFaqs as fallbackFaqs } from "@/data/page-faqs";
import { MapPin, Mail, Phone, Instagram } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [brand, setBrand] = useState(fallbackData.brand);
  const [social, setSocial] = useState(fallbackData.social);
  const [offices, setOffices] = useState(fallbackData.offices);
  const [contactFaqs, setContactFaqs] = useState(fallbackFaqs.contact);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data?.brand) setBrand(data.brand);
        if (data?.social) setSocial(data.social);
        if (data?.offices) setOffices(data.offices);
        if (data?.faqs?.contact) setContactFaqs(data.faqs.contact);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop" alt="Contact" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Contact Us</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            Whether you want to book a consultation, join a guidance workshop, or inquire about our personalized services for studying abroad, fill out the form and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <ScrollAnimator>
                <h2 className="text-2xl font-bold text-brand-navy mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm group-hover:text-green-700 transition-colors">WhatsApp</p>
                      <p className="text-green-600 text-sm">{brand.whatsapp}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-brand-teal" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Email</p>
                      <a href={`mailto:${brand.email}`} className="text-brand-teal text-sm hover:underline">{brand.email}</a>
                    </div>
                  </div>

                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm group-hover:text-pink-600 transition-colors">Instagram</p>
                      <p className="text-gray-500 text-sm">@unistation1</p>
                    </div>
                  </a>
                </div>

                {/* Offices */}
                <h3 className="text-lg font-bold text-brand-navy mt-10 mb-4">Our Offices</h3>
                <div className="space-y-3">
                  {offices.map((office) => (
                    <div key={office.city} className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-brand-teal mt-1 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{office.city}, {office.country}</p>
                        <p className="text-gray-500 text-xs">{office.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimator>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollAnimator delay={200}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy mb-2">Thank You!</h3>
                        <p className="text-gray-600">Your submission has been received. We&apos;ll get back to you as soon as possible.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" required placeholder="John" className="mt-1.5 rounded-lg" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input id="lastName" required placeholder="Doe" className="mt-1.5 rounded-lg" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" type="email" required placeholder="john@example.com" className="mt-1.5 rounded-lg" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone *</Label>
                            <Input id="phone" type="tel" required placeholder="+971 50 123 4567" className="mt-1.5 rounded-lg" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <Label htmlFor="country">Preferred Country of Study *</Label>
                            <Input id="country" required placeholder="e.g., UK, Germany" className="mt-1.5 rounded-lg" />
                          </div>
                          <div>
                            <Label htmlFor="program">Preferred Program *</Label>
                            <Input id="program" required placeholder="e.g., Medicine, Engineering" className="mt-1.5 rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="graduation">Expected Graduation Date *</Label>
                          <Input id="graduation" required placeholder="e.g., June 2025" className="mt-1.5 rounded-lg" />
                        </div>
                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea id="message" required placeholder="Tell us about your goals and how we can help..." rows={4} className="mt-1.5 rounded-lg" />
                        </div>
                        <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-lg py-3 btn-primary-hover">
                          Send Message
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </ScrollAnimator>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={contactFaqs} />
    </>
  );
}