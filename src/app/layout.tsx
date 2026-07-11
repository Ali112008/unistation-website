import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "UniStation | Your Gateway to Global Education",
  description:
    "UniStation is an education and career advisory platform helping students study abroad. Personalized guidance for university admissions, language courses, and test preparation across 25+ destinations worldwide.",
  keywords: [
    "study abroad",
    "university admission",
    "IELTS preparation",
    "TOEFL",
    "study in UK",
    "study in USA",
    "study in Canada",
    "study in Germany",
    "UniStation",
    "education consultancy",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased bg-background text-foreground`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}