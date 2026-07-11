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
                  {/* Featured Long-Form Video */}
                  {featuredVideo && (
                    <ScrollAnimator>
                      <a
                        href={featuredVideo.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative rounded-2xl overflow-hidden aspect-video max-w-4xl mx-auto shadow-lg hover:shadow-2xl transition-shadow duration-300"
                      >
                        <Image
                          src={getYouTubeThumbnail(featuredVideo.youtubeUrl)}
                          alt={featuredVideo.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <svg className="w-8 h-8 text-brand-teal ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {/* Info Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          {featuredVideo.category && (
                            <span className="inline-block px-3 py-1 bg-brand-teal text-white text-xs font-bold rounded-full mb-2">
                              {featuredVideo.category}
                            </span>
                          )}
                          <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2">
                            {featuredVideo.title}
                          </h3>
                          <p className="text-gray-300 text-sm mt-1 line-clamp-2 max-w-2xl">
                            {featuredVideo.description}
                          </p>
                        </div>
                      </a>
                    </ScrollAnimator>
                  )}

                  {/* Shorts Section */}
                  {shortVideos.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-brand-teal" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                        </svg>
                        Shorts
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {shortVideos.map((video, i) => (
                          <ScrollAnimator key={video.id} delay={i * 60}>
                            <a
                              href={video.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block relative rounded-xl overflow-hidden aspect-[9/16] card-hover"
                            >
                              <Image
                                src={getYouTubeThumbnail(video.youtubeUrl)}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                              {/* Play icon */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                  <svg className="w-5 h-5 text-brand-teal ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                              {/* Info */}
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h4 className="text-white font-semibold text-xs line-clamp-2">
                                  {video.title}
                                </h4>
                                {video.category && (
                                  <span className="text-brand-teal-light text-[10px] mt-0.5 block">
                                    {video.category}
                                  </span>
                                )}
                              </div>
                            </a>
                          </ScrollAnimator>
                        ))}
                      </div>
                    </div>
                  )}
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