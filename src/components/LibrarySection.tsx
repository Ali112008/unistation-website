"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimator } from "@/components/shared";
import { BookOpen, Video, Calendar, Play, ArrowRight, Loader2 } from "lucide-react";

/* ───────── Types ───────── */
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featured: boolean;
  coverImage: string;
  createdOn: string;
  tags?: string;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  category: string;
  tags?: string;
}

/* ───────── Helpers ───────── */
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function matchesTag(itemTags: string | undefined, filterTags: string[]): boolean {
  if (!filterTags || filterTags.length === 0) return true;
  if (!itemTags) return false;
  const itemTagsLower = itemTags.toLowerCase();
  return filterTags.some((tag) => itemTagsLower.includes(tag.toLowerCase()));
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ───────── Component ───────── */
interface LibrarySectionProps {
  /** Display name used in headings, e.g. "Spain", "IELTS" */
  topicName?: string;
  /** Tags to filter CMS content by (matched case-insensitively against item tags) */
  tags?: string[];
  /** Max items per section (videos & blogs) */
  maxItems?: number;
}

export function LibrarySection({
  topicName,
  tags,
  maxItems = 4,
}: LibrarySectionProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogRes, videoRes] = await Promise.all([
          fetch("/api/webflow?type=blogs"),
          fetch("/api/webflow?type=videos"),
        ]);
        const blogData = await blogRes.json();
        const videoData = await videoRes.json();

        const allBlogs: BlogPost[] = blogData.blogs || [];
        const allVideos: VideoItem[] = videoData.videos || [];

        if (tags && tags.length > 0) {
          setBlogs(
            allBlogs
              .filter((b) => matchesTag(b.tags, tags))
              .slice(0, maxItems)
          );
          setVideos(
            allVideos
              .filter((v) => matchesTag(v.tags, tags))
              .slice(0, maxItems)
          );
        } else {
          setBlogs(allBlogs.slice(0, maxItems));
          setVideos(allVideos.slice(0, maxItems));
        }
      } catch {
        console.error("Failed to fetch library data");
      }
      setLoading(false);
    }
    fetchData();
  }, [tags, maxItems]);

  /* Hide the entire section if nothing to show after loading */
  if (!loading && blogs.length === 0 && videos.length === 0) return null;

  const sectionTitle = topicName
    ? `Our Library about ${topicName}`
    : "Our Library";
  const sectionSubtitle = topicName
    ? `Videos & Articles about ${topicName}`
    : "Latest Videos & Articles";

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollAnimator>
          <div className="text-center mb-14">
            <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">
              {sectionSubtitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              {sectionTitle}
            </h2>
            <div className="brand-line mx-auto" />
          </div>
        </ScrollAnimator>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
          </div>
        )}

        {!loading && (
          <>
            {/* ── Videos ── */}
            {videos.length > 0 && (
              <div className="mb-16">
                <ScrollAnimator>
                  <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                    <Video className="w-5 h-5 text-brand-teal" />
                    Our Videos{topicName ? ` about ${topicName}` : ""}
                  </h3>
                </ScrollAnimator>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {videos.map((video, i) => {
                    const ytId = getYouTubeId(video.youtubeUrl);
                    const thumb = ytId
                      ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                      : "";
                    return (
                      <ScrollAnimator key={video.id} delay={i * 80}>
                        <a
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-white"
                        >
                          <div className="relative aspect-video overflow-hidden bg-gray-100">
                            {thumb ? (
                              <Image
                                src={thumb}
                                alt={video.title}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-brand-teal/10">
                                <Video className="w-10 h-10 text-brand-teal/30" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/30 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-brand-teal/90 group-hover:bg-brand-teal flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                <Play
                                  className="w-5 h-5 text-white ml-0.5"
                                  fill="white"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-sm text-brand-navy line-clamp-2 group-hover:text-brand-teal transition-colors">
                              {video.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                              {video.description}
                            </p>
                          </div>
                        </a>
                      </ScrollAnimator>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Blogs ── */}
            {blogs.length > 0 && (
              <div className="mb-10">
                <ScrollAnimator>
                  <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-teal" />
                    Our Blogs{topicName ? ` about ${topicName}` : ""}
                  </h3>
                </ScrollAnimator>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {blogs.map((blog, i) => (
                    <ScrollAnimator key={blog.id} delay={i * 80}>
                      <Link href={`/blog/${blog.slug}`}>
                        <Card className="border-0 shadow-sm overflow-hidden h-full group card-hover">
                          <div className="relative h-40 overflow-hidden bg-gray-100">
                            {blog.coverImage ? (
                              <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-brand-teal/10">
                                <BookOpen className="w-10 h-10 text-brand-teal/30" />
                              </div>
                            )}
                            {blog.featured && (
                              <div className="absolute top-3 left-3">
                                <span className="px-2.5 py-0.5 bg-brand-teal-dark text-white text-[10px] font-bold rounded-full">
                                  FEATURED
                                </span>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <Calendar className="w-3 h-3" />
                              {formatDate(blog.createdOn)}
                            </div>
                            <h4 className="font-semibold text-sm text-brand-navy group-hover:text-brand-teal transition-colors line-clamp-2">
                              {blog.title}
                            </h4>
                            <p className="text-gray-600 text-xs mt-1.5 line-clamp-2">
                              {blog.excerpt}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </ScrollAnimator>
                  ))}
                </div>
              </div>
            )}

            {/* ── View All CTA ── */}
            <ScrollAnimator>
              <div className="text-center pt-4">
                <Link
                  href="/library"
                  className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-teal-dark font-semibold text-sm transition-colors"
                >
                  View All Resources
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollAnimator>
          </>
        )}
      </div>
    </section>
  );
}