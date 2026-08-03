"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

type SiteShellProps = {
  data: any;
  children: React.ReactNode;
};

export function SiteShell({ data, children }: SiteShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <Header data={data} />
      <main>{children}</main>
      <Footer data={data} />
      <FloatingWhatsApp whatsappUrl={data.brand.whatsappUrl} />
    </>
  );
}
