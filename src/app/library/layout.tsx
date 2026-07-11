import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Explore UniStation's library of blogs, videos, and resources to guide your study abroad journey.",
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}