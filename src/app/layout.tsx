import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { getSiteLayoutData } from "@/lib/site-content";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unistation.ae"),
  title: {
    default: "UniStation | Your Gateway to Global Education",
    template: "%s | UniStation",
  },
  description:
    "UniStation is an education and career advisory platform helping students study abroad. Personalized guidance for university admissions, language courses, and test preparation across 25+ destinations worldwide.",
  keywords: [
    "study abroad",
    "university admission",
    "IELTS",
    "TOEFL",
    "study in UK",
    "study in USA",
    "study in Canada",
    "study in Germany",
    "study in UAE",
    "education consultancy",
    "UniStation",
    "language courses",
    "visa guidance",
  ],
  authors: [{ name: "UniStation", url: "https://unistation.ae" }],
  creator: "UniStation",
  publisher: "UniStation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unistation.ae",
    siteName: "UniStation",
    title: "UniStation | Your Gateway to Global Education",
    description:
      "Personalized guidance for university admissions, language courses, and test preparation across 25+ destinations worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UniStation - Your Gateway to Global Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UniStation | Your Gateway to Global Education",
    description:
      "Personalized guidance for university admissions, language courses, and test preparation across 25+ destinations worldwide.",
    images: ["/twitter-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = await getSiteLayoutData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased bg-background text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "UniStation",
              url: "https://unistation.ae",
              logo: "https://unistation.ae/logo-01.png",
              description: "Education and career advisory platform helping students study abroad",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
              sameAs: [
                "https://www.instagram.com/unistation1/",
                "https://www.youtube.com/@UniStation_DXB",
                "https://www.tiktok.com/@uni.station1",
                "https://www.facebook.com/share/1BuHxjz611/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971-522-732-589",
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
              },
            }),
          }}
        />
        <ScrollProgress />
        <Header data={siteData} />
        <main>{children}</main>
        <Footer data={siteData} />
        <FloatingWhatsApp whatsappUrl={siteData.brand.whatsappUrl} />
      </body>
    </html>
  );
}