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
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
                <h3 className="text-lg font-bold text-brand-navy mt-10 mb-4">Our Office</h3>
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