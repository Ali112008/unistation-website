"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Remember subscription across visits
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("unistation_newsletter_subscribed")) {
      setSubscribed(true);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        localStorage.setItem("unistation_newsletter_subscribed", "true");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 rounded-lg bg-white/10 p-1.5">
              <Image
                src="/logo-01.png"
                alt={siteConfig.brand.name}
                width={44}
                height={44}
                className="h-11 w-auto brightness-0 invert"
              />
              <span className="text-xl font-bold">{siteConfig.brand.name}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your Gateway to Global Education. We help students build strong
              academic profiles and make informed decisions about studying abroad.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href={`tel:+${siteConfig.brand.whatsapp}`} className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors">
                <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                +{siteConfig.brand.whatsapp}
              </a>
              <a href={`mailto:${siteConfig.brand.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                {siteConfig.brand.email}
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <span>Digital Park, A1, Dubai Silicon Oasis, Dubai</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { label: "Instagram", href: siteConfig.social.instagram, icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                )},
                { label: "TikTok", href: siteConfig.social.tiktok, icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.79a4.84 4.84 0 0 1-1-.1z"/></svg>
                )},
                { label: "YouTube", href: siteConfig.social.youtube, icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                )},
                { label: "Facebook", href: siteConfig.social.facebook, icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                )},
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand-teal flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-brand-teal-light">
              Top Destinations
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.topDestinations.map((d) => {
                const matchingPkg = siteConfig.packages.find(
                  (p) => p.name.toLowerCase() === d.name.toLowerCase()
                );
                const href = matchingPkg
                  ? `/packages/${matchingPkg.slug}`
                  : "/destinations";
                return (
                  <li key={d.name}>
                    <Link
                      href={href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {d.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-brand-teal-light">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Study Destinations", href: "/destinations" },
                { label: "Language Courses", href: "/language-courses" },
                { label: "Our Packages", href: "/packages" },
                { label: "Team", href: "/team" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-brand-teal-light">
              Join Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Stay updated with the latest study abroad opportunities, scholarship
              openings, webinars, and student success stories.
            </p>
            {subscribed ? (
              <div className="p-4 bg-brand-teal/10 border border-brand-teal/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <p className="text-brand-teal text-sm font-medium">You&apos;re subscribed!</p>
                </div>
                <p className="text-gray-500 text-xs mt-1.5">You&apos;ll receive our latest updates in your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-sm rounded-lg focus:ring-brand-teal"
                  required
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg disabled:opacity-50"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">{siteConfig.brand.copyright}</p>
          <div className="flex items-center gap-6">
            <a href={`tel:+${siteConfig.brand.whatsapp}`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              +{siteConfig.brand.whatsapp}
            </a>
            <a
              href={`mailto:${siteConfig.brand.email}`}
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              {siteConfig.brand.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}