import { Metadata } from "next";
import { blogContent } from "@/data/blogContent";
import { notFound } from "next/navigation";
import BlogDetailsClient from "./BlogDetailsClient";

export function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogContent[params.slug];
  if (!post) return { title: "Article Not Found | VI WebSync" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: `/blogs/${params.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://www.viwebsync.com/blogs/${params.slug}`,
      type: "article",
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug];
  if (!post) return notFound();

  const keys = Object.keys(blogContent);
  const currentIndex = keys.indexOf(params.slug);
  const validIndex = currentIndex !== -1 ? currentIndex : 0;
  const nextIndex = (validIndex + 1) % keys.length;
  const nextSlug = keys[nextIndex];
  const nextPost = blogContent[nextSlug];

  return <BlogDetailsClient post={post} nextPost={nextPost} nextSlug={nextSlug} />;
}
