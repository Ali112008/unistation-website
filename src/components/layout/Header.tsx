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
      {/* ── DESKTOP HEADER ── */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* LEFT NAV */}
          <nav className="flex items-center gap-1">
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

          {/* CENTER LOGO */}
          <Link href="/" className="flex-shrink-0 mx-4">
            <Image
              src="/logo-01.png"
              alt={siteConfig.brand.name}
              width={48}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* RIGHT NAV + WHATSAPP */}
          <div className="flex items-center gap-1">
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
            <Button
              asChild
              size="sm"
              className="ml-2 bg-brand-teal hover:bg-brand-teal-dark text-white btn-primary-hover rounded-lg whitespace-nowrap"
            >
              <a href={siteConfig.brand.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* ── MOBILE HEADER ── */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-14 px-4">
          {/* LEFT spacer to keep logo centered */}
          <div className="w-10" />

          {/* CENTER LOGO */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-01.png"
              alt={siteConfig.brand.name}
              width={40}
              height={40}
              className="h-9 w-auto"
              priority
            />
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
                      className="h-8 w-auto"
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
                  <Button
                    asChild
                    className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg"
                  >
                    <a
                      href={siteConfig.brand.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Us
                    </a>
                  </Button>
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