"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site-data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const leftNav = siteConfig.navigation.filter((item) => item.side === "left");
  const rightNav = siteConfig.navigation.filter((item) => item.side === "right");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
      isActive(href)
        ? scrolled
          ? "text-brand-teal"
          : "text-white"
        : scrolled
        ? "text-gray-700 hover:text-brand-teal hover:bg-teal-50"
        : "text-white/90 hover:text-white hover:bg-white/10"
    }`;

  const dropdownTriggerClass = (href: string, isOpen: boolean) =>
    `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
      isActive(href) || isOpen
        ? scrolled
          ? "text-brand-teal"
          : "text-white"
        : scrolled
        ? "text-gray-700 hover:text-brand-teal hover:bg-teal-50"
        : "text-white/90 hover:text-white hover:bg-white/10"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-nav-entrance ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      {/* DESKTOP HEADER */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 grid items-center h-20" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
          {/* LEFT NAV — pushed to inner edge (near logo) */}
          <nav className="flex items-center gap-1 justify-self-end">
            {leftNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={dropdownTriggerClass(item.href, openDropdown === item.label)}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      openDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:text-brand-teal hover:bg-teal-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={navLinkClass(item.href)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* LOGO — centered in middle auto column */}
          <Link href="/" className="justify-self-center mx-3 flex-shrink-0">
            <div className={`rounded-xl p-1.5 transition-all duration-300 ${scrolled ? "bg-transparent" : "bg-white/90 backdrop-blur-sm shadow-sm"}`}>
              <Image
                src="/logo-01.png"
                alt={siteConfig.brand.name}
                width={56}
                height={56}
                className={`h-14 w-auto transition-all duration-300 ${scrolled ? "brightness-100" : "brightness-0"}`}
                priority
              />
            </div>
          </Link>

          {/* RIGHT NAV — pushed to inner edge (near logo) */}
          <nav className="flex items-center gap-1 justify-self-start">
            {rightNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={dropdownTriggerClass(item.href, openDropdown === item.label)}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <div
                    className={`absolute top-full right-0 pt-2 transition-all duration-200 ${
                      openDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:text-brand-teal hover:bg-teal-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={navLinkClass(item.href)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      {/* ── MOBILE HEADER ── */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-14 px-4">
          {/* LEFT spacer to keep logo centered */}
          <div className="w-10" />

          {/* CENTER LOGO */}
          <Link href="/" className="flex-shrink-0">
            <div className={`rounded-xl p-1 transition-all duration-300 ${scrolled ? "bg-transparent" : "bg-white/90 backdrop-blur-sm shadow-sm"}`}>
              <Image
                src="/logo-01.png"
                alt={siteConfig.brand.name}
                width={48}
                height={48}
                className={`h-11 w-auto transition-all duration-300 ${scrolled ? "brightness-100" : "brightness-0"}`}
                priority
              />
            </div>
          </Link>

          {/* RIGHT: Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className={`p-2 rounded-lg w-10 h-10 flex items-center justify-center ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <Image
                      src="/logo-01.png"
                      alt={siteConfig.brand.name}
                      width={36}
                      height={36}
                      className="h-8 w-auto brightness-0"
                    />
                  </Link>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                  {siteConfig.navigation.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <MobileDropdown
                          item={item}
                          openDropdown={openDropdown}
                          setOpenDropdown={setOpenDropdown}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-4 py-3 text-sm font-medium transition-colors ${
                            isActive(item.href)
                              ? "text-brand-teal bg-teal-50"
                              : "text-gray-700 hover:text-brand-teal hover:bg-gray-50"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="p-4 border-t space-y-2">
                  {/* WhatsApp button temporarily hidden - using floating button only */}
                  {/* <Button asChild className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg">
                    <a href={siteConfig.brand.whatsappUrl} target="_blank" rel="noopener noreferrer">
                      WhatsApp Us
                    </a>
                  </Button> */}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileDropdown({
  item,
  openDropdown,
  setOpenDropdown,
}: {
  item: { label: string; href: string; children: { label: string; href: string }[] };
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
}) {
  const isOpen = openDropdown === item.label;
  return (
    <div>
      <button
        onClick={() => setOpenDropdown(isOpen ? null : item.label)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-teal hover:bg-gray-50 transition-colors"
      >
        {item.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pl-4">
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-brand-teal hover:bg-gray-50 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}