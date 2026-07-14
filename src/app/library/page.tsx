"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimator, SectionHeading } from "@/components/shared";
import { FAQSection } from "@/components/FAQSection";
import { pageFaqs } from "@/data/page-faqs";
import { BookOpen, Video, Calendar, Loader2, Play, ExternalLink } from "lucide-react";

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

/* ───────── Branded Video Player (single-play) ───────── */
function VideoPlayer({
  videoId,
  youtubeUrl,
  title,
  activeId,
  onPlay,
  className = "",
}: {
  videoId: string;
  youtubeUrl: string;
  title: string;
  activeId: string | null;
  onPlay: (id: string) => void;
  className?: string;
}) {
  const ytId = (() => {
    if (!youtubeUrl) return null;
    const match = youtubeUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  })();

  const thumb = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : "";

  const isPlaying = activeId === videoId;

  // When another video is played, stop this one by unmounting the iframe
  const embedSrc =
    isPlaying && ytId
      ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`
      : "";

  const handlePlay = useCallback(() => {
    onPlay(videoId);
  }, [videoId, onPlay]);

  if (!ytId) return null;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {isPlaying ? (
        <iframe
          key={videoId}
          src={embedSrc}
          title={title}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={handlePlay}
          className="group relative block w-full aspect-video cursor-pointer focus:outline-none"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail */}
          <Image
            src={thumb}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-brand-navy/30 group-hover:bg-brand-navy/40 transition-colors duration-300" />

          {/* Branded Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-teal/90 group-hover:bg-brand-teal flex items-center justify-center shadow-lg shadow-brand-teal/30 transition-all duration-300 group-hover:scale-110">
              <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="white" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

/* ───────── Library Page ───────── */
export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"blogs" | "videos">("blogs");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

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
                                <span className="px-3 py-1 bg-brand-teal-dark text-white text-xs font-bold rounded-full">
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
                      <div className="max-w-4xl mx-auto">
                        <VideoPlayer
                          videoId={featuredVideo.id}
                          youtubeUrl={featuredVideo.youtubeUrl}
                          title={featuredVideo.title}
                          activeId={activeVideoId}
                          onPlay={setActiveVideoId}
                          className="shadow-lg"
                        />
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
                        </div>
                      </div>
                    </ScrollAnimator>
                  )}

                  {/* Shorts Section */}
                  {shortVideos.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                        <Video className="w-5 h-5 text-brand-teal" />
                        Shorts
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {shortVideos.map((video, i) => (
                          <ScrollAnimator key={video.id} delay={i * 80}>
                            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                              <VideoPlayer
                                videoId={video.id}
                                youtubeUrl={video.youtubeUrl}
                                title={video.title}
                                activeId={activeVideoId}
                                onPlay={setActiveVideoId}
                                className="!rounded-xl"
                              />
                              <div className="p-3 bg-white">
                                <h4 className="font-semibold text-sm text-brand-navy line-clamp-1">
                                  {video.title}
                                </h4>
                                {video.category && (
                                  <span className="text-brand-teal text-xs font-medium mt-1 block">
                                    {video.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </ScrollAnimator>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Watch Channel Button - CTA */}
                  <ScrollAnimator>
                    <div className="flex justify-center pt-4">
                      <a
                        href="https://www.youtube.com/@UniStation_DXB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-7 py-3.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-teal/25"
                      >
                        <Play className="w-5 h-5" fill="white" />
                        Watch Our Channel
                        <ExternalLink className="w-4 h-4 opacity-70" />
                      </a>
                    </div>
                  </ScrollAnimator>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <FAQSection faqs={pageFaqs.library} />
    </>
  );
}