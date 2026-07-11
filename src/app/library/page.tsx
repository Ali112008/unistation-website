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
    if (!url) return null;
    // Match /shorts/ID, /watch?v=ID, /embed/ID, youtu.be/ID
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const ytId = getYouTubeId(url);
    if (!ytId) return "";
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  };

  const isShort = (url: string) => url?.includes("/shorts/");

  // Separate featured (long-form) from shorts
  const featuredVideo = videos.find((v) => !isShort(v.youtubeUrl));
  const shortVideos = videos.filter((v) => isShort(v.youtubeUrl));

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
                <div className="mt-12 space-y-12">
                  {/* Featured Long-Form Video - Embedded */}
                  {featuredVideo && (() => {
                    const ytId = getYouTubeId(featuredVideo.youtubeUrl);
                    return ytId ? (
                      <ScrollAnimator>
                        <div className="max-w-4xl mx-auto">
                          <div className="relative rounded-2xl overflow-hidden shadow-lg">
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}`}
                              title={featuredVideo.title}
                              className="w-full aspect-video"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div>
                              {featuredVideo.category && (
                                <span className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-bold rounded-full mb-2">
                                  {featuredVideo.category}
                                </span>
                              )}
                              <h3 className="text-lg md:text-xl font-bold text-brand-navy">
                                {featuredVideo.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                {featuredVideo.description}
                              </p>
                            </div>
                            <a
                              href={featuredVideo.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 hover:border-brand-teal hover:text-brand-teal rounded-lg text-sm font-medium transition-colors shrink-0"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                              Watch on YouTube
                            </a>
                          </div>
                        </div>
                      </ScrollAnimator>
                    ) : null;
                  })()}

                  {/* Shorts Section - Embedded */}
                  {shortVideos.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-brand-teal" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                        </svg>
                        Shorts
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {shortVideos.map((video, i) => {
                          const ytId = getYouTubeId(video.youtubeUrl);
                          return ytId ? (
                            <ScrollAnimator key={video.id} delay={i * 80}>
                              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <div className="relative">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${ytId}`}
                                    title={video.title}
                                    className="w-full aspect-video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                                <div className="p-3 bg-white">
                                  <h4 className="font-semibold text-sm text-brand-navy line-clamp-1">
                                    {video.title}
                                  </h4>
                                  <div className="flex items-center justify-between mt-1.5">
                                    {video.category && (
                                      <span className="text-brand-teal text-xs font-medium">
                                        {video.category}
                                      </span>
                                    )}
                                    <a
                                      href={video.youtubeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-400 hover:text-brand-teal transition-colors ml-auto"
                                      title="Watch on YouTube"
                                    >
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </ScrollAnimator>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Visit Channel Button */}
                  <ScrollAnimator>
                    <div className="flex justify-center pt-4">
                      <a
                        href="https://www.youtube.com/@UniStation_DXB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        Visit Our YouTube Channel
                      </a>
                    </div>
                  </ScrollAnimator>
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