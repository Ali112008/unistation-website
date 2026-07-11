"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";
import { BookOpen, Video, Calendar, Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featured: boolean;
  coverImage: string;
  createdOn: string;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  category: string;
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"blogs" | "videos">("blogs");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/webflow?type=blogs");
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch {
        console.error("Failed to fetch blogs");
      }
      try {
        const res = await fetch("/api/webflow?type=videos");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch {
        console.error("Failed to fetch videos");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getReadTime = (content: string) => {
    const words = (content || "").split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min`;
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=600&fit=crop"
            alt="Library"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
            Knowledge Hub
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Library
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            Blogs, videos, and resources to guide your study abroad journey.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "blogs"
                    ? "bg-white text-brand-navy shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <BookOpen className="w-4 h-4" /> Blog Articles
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "videos"
                    ? "bg-white text-brand-navy shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Video className="w-4 h-4" /> Videos
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
              <p className="text-gray-500 mt-4">Loading content...</p>
            </div>
          )}

          {!loading && activeTab === "blogs" && (
            <div>
              <ScrollAnimator>
                <SectionHeading subtitle="Latest Articles" title="Our Blog" />
              </ScrollAnimator>
              {blogs.length === 0 ? (
                <p className="text-center text-gray-500 py-20">
                  No blog posts yet. Check back soon!
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  {blogs.map((blog, i) => (
                    <ScrollAnimator key={blog.id} delay={i * 100}>
                      <Link href={`/blog/${blog.slug}`}>
                        <Card className="border-0 shadow-sm overflow-hidden card-hover h-full group">
                          <div className="relative h-52 overflow-hidden bg-gray-100">
                            {blog.coverImage ? (
                              <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-brand-teal/10">
                                <BookOpen className="w-12 h-12 text-brand-teal/30" />
                              </div>
                            )}
                            {blog.featured && (
                              <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 bg-brand-amber text-white text-xs font-bold rounded-full">
                                  FEATURED
                                </span>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(blog.createdOn)}
                              </span>
                              <span>{getReadTime(blog.excerpt)} read</span>
                            </div>
                            <h3 className="font-bold text-brand-navy group-hover:text-brand-teal transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                              {blog.excerpt}
                            </p>
                            <p className="text-brand-teal text-xs font-medium mt-3">
                              By {blog.author}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </ScrollAnimator>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === "videos" && (
            <div>
              <ScrollAnimator>
                <SectionHeading subtitle="Watch & Learn" title="Video Library" />
              </ScrollAnimator>
              {videos.length === 0 ? (
                <p className="text-center text-gray-500 py-20">
                  No videos yet. Check back soon!
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  {videos.map((video, i) => {
                    const ytId = getYouTubeId(video.youtubeUrl);
                    return (
                      <ScrollAnimator key={video.id} delay={i * 100}>
                        <div className="group relative rounded-2xl overflow-hidden h-64 card-hover cursor-pointer bg-gray-900">
                          {ytId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}`}
                              title={video.title}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <>
                              {video.thumbnail ? (
                                <Image
                                  src={video.thumbnail}
                                  alt={video.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Video className="w-16 h-16 text-gray-600" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <svg
                                    className="w-6 h-6 text-brand-teal ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white font-bold text-sm line-clamp-2">
                              {video.title}
                            </h3>
                            {video.category && (
                              <span className="text-brand-teal-light text-xs mt-1 block">
                                {video.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </ScrollAnimator>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}