"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import { BookOpen, Video, Calendar } from "lucide-react";

const sampleBlogs = [
  { title: "Complete Guide to Studying Medicine in the UK", excerpt: "Everything you need to know about applying to UK medical schools — from UCAT preparation to interview tips and visa requirements.", category: "Study Guide", date: "Jan 15, 2025", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop", readTime: "8 min" },
  { title: "Top 10 Scholarships for International Students in 2025", excerpt: "Discover the best scholarship opportunities that can help fund your study abroad dream. Deadlines, eligibility, and application tips.", category: "Scholarships", date: "Jan 10, 2025", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop", readTime: "6 min" },
  { title: "IELTS vs TOEFL: Which Test Should You Take?", excerpt: "A detailed comparison of the two most popular English proficiency tests to help you choose the right one for your study plans.", category: "Language", date: "Jan 5, 2025", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop", readTime: "5 min" },
  { title: "Student Visa Guide: Everything You Need to Know", excerpt: "Navigate the visa application process for top study destinations including the UK, USA, Canada, and Germany.", category: "Admission", date: "Dec 28, 2024", image: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?w=600&h=400&fit=crop", readTime: "10 min" },
  { title: "Cost of Living: A Comparison of Popular Study Destinations", excerpt: "An honest look at living expenses across 8 popular study destinations to help you plan your budget effectively.", category: "Student Tips", date: "Dec 20, 2024", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop", readTime: "7 min" },
  { title: "How to Write a Winning Personal Statement", excerpt: "Expert tips on crafting a personal statement that stands out. Includes examples and common mistakes to avoid.", category: "Admission", date: "Dec 15, 2024", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop", readTime: "9 min" },
];

const sampleVideos = [
  { title: "University Application Process Step by Step", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", duration: "15:30", views: "2.3K" },
  { title: "Student Life in Germany: What to Expect", thumbnail: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop", duration: "12:45", views: "1.8K" },
  { title: "How to Prepare for IELTS at Home", thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop", duration: "20:10", views: "3.1K" },
  { title: "Scholarship Application Tips from Experts", thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop", duration: "18:20", views: "1.5K" },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"blogs" | "videos">("blogs");

  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=600&fit=crop" alt="Library" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">Knowledge Hub</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Library</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">Blogs, videos, and resources to guide your study abroad journey.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "blogs" ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <BookOpen className="w-4 h-4" /> Blog Articles
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "videos" ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Video className="w-4 h-4" /> Videos
              </button>
            </div>
          </div>

          {activeTab === "blogs" && (
            <div>
              <ScrollAnimator>
                <SectionHeading subtitle="Latest Articles" title="Our Blog" />
              </ScrollAnimator>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {sampleBlogs.map((blog, i) => (
                  <ScrollAnimator key={blog.title} delay={i * 100}>
                    <Card className="border-0 shadow-sm overflow-hidden card-hover h-full group">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={blog.image} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-brand-teal text-white text-xs font-medium rounded-full">{blog.category}</span>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blog.date}</span>
                          <span>{blog.readTime} read</span>
                        </div>
                        <h3 className="font-bold text-brand-navy group-hover:text-brand-teal transition-colors line-clamp-2">{blog.title}</h3>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{blog.excerpt}</p>
                      </CardContent>
                    </Card>
                  </ScrollAnimator>
                ))}
              </div>
            </div>
          )}

          {activeTab === "videos" && (
            <div>
              <ScrollAnimator>
                <SectionHeading subtitle="Watch & Learn" title="Video Library" />
              </ScrollAnimator>
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {sampleVideos.map((video, i) => (
                  <ScrollAnimator key={video.title} delay={i * 100}>
                    <div className="group relative rounded-2xl overflow-hidden h-64 card-hover cursor-pointer">
                      <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-brand-teal ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-sm">{video.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-white/70 text-xs">
                          <span>{video.duration}</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded text-white text-xs font-medium">
                        {video.duration}
                      </div>
                    </div>
                  </ScrollAnimator>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}