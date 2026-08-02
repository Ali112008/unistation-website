import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { CTASection } from "@/components/shared";
import client from "@/lib/turso";

export const revalidate = 60;

async function getAllBlogSlugs(): Promise<string[]> {
  const result = await client.execute("SELECT slug FROM blog_posts WHERE slug IS NOT NULL AND slug != ''");
  return result.rows.map((row: any) => row.slug as string);
}

async function getBlogPost(slug: string) {
  const result = await client.execute({
    sql: "SELECT * FROM blog_posts WHERE slug = ?",
    args: [slug],
  });
  return result.rows[0] || null;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getBlogPost(slug);

  if (!item) {
    notFound();
  }

  const title = (item.title as string) || "Blog Post";
  const coverImage = (item.cover_image as string) || "";
  const author = (item.author as string) || "UniStation Team";
  const date = new Date(item.created_on as string).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        {coverImage && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-6 mt-6 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {date}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {item.excerpt && (
            <p className="text-xl text-gray-600 font-medium leading-relaxed border-l-4 border-brand-teal pl-6 mb-10">
              {item.excerpt as string}
            </p>
          )}
          <div
            className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:mb-1 prose-strong:text-brand-navy prose-blockquote:border-brand-teal prose-blockquote:text-gray-600"
            dangerouslySetInnerHTML={{ __html: (item.content as string) || "" }}
          />
        </div>
      </article>

      <CTASection />
    </>
  );
}
