import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogContent } from "@/data/blogContent";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Engineering Insights | LabVIEW & AI Automation | VI WebSync",
  description: "Full engineering case studies and insights on LabVIEW, AI automation, and Industrial IoT.",
  alternates: { canonical: "/blogs" },
};

export default function BlogListingPage() {
  const blogList = Object.entries(blogContent);

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-x-clip pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

          {/* ── COMPACT HEADER ────────────────────────────────────────── */}
          <header className="mb-12 pb-8">
            <span className="text-gray-600 font-black text-[10px] uppercase tracking-[0.3em] block mb-2">
              VI WebSync Journal · Engineering Intelligence
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black text-black tracking-tight leading-[1.05]">
              Insights &amp; Innovation
            </h1>
            <p className="mt-4 text-zinc-500 text-xs md:text-sm max-w-xl leading-relaxed">
              Technical deep dives and industry analysis from our NI-certified LabVIEW and AI automation team.
            </p>
          </header>

          {/* ── BLOG FEED ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-24">
            {blogList.map(([slug, post]) => (
              <article key={slug} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border-b border-zinc-200 pb-20 last:border-0">
                
                {/* LEFT: Sidebar Meta */}
                <div className="lg:col-span-4 lg:sticky lg:top-28">
                  <Link href={`/blogs/${slug}`} className="block overflow-hidden rounded-xl aspect-[16/9] bg-zinc-100 relative mb-6 shadow-sm group">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur text-[8px] font-black uppercase tracking-widest rounded-md text-black">
                      {post.category}
                    </div>
                  </Link>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[9px] font-black text-orange-600 uppercase tracking-widest">
                      <time>{post.date}</time>
                      <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                      <span className="text-zinc-400">{post.readTime}</span>
                    </div>
                    <Link href={`/blogs/${slug}`}>
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-black leading-[1.1] tracking-tight hover:text-[#F2670E] transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <div className="pt-4 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400 border border-zinc-200">
                          {post.author.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-black uppercase text-[11px] leading-none mb-1">{post.author}</p>
                          <p className="text-[9px] text-zinc-500 uppercase tracking-tight">{post.authorRole}</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Article Content */}
                <div className="lg:col-span-8 bg-zinc-50/50 p-6 md:p-10 rounded-2xl border border-zinc-100">
                  <div className="prose prose-zinc prose-base md:prose-lg max-w-none">
                    {/* Excerpt */}
                    <p className="text-lg md:text-xl font-medium text-zinc-600 italic mb-8 border-l-4 border-orange-600 pl-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Content Body */}
                    <div className="text-zinc-800 leading-[1.8] space-y-6 text-sm md:text-base">
                      {(() => {
                        const lines = post.content.split('\n');
                        const elements: React.ReactNode[] = [];
                        let currentList: string[] = [];

                        const flushList = () => {
                          if (currentList.length > 0) {
                            elements.push(
                              <ul key={`ul-${elements.length}`} className="list-none pl-0 mb-6 space-y-4 bg-white p-6 rounded-[12px] border border-zinc-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                                {currentList.map((li, idx) => (
                                  <li key={idx} className="flex items-start gap-4 md:gap-5 ml-2 md:ml-4 text-zinc-600 text-sm md:text-base leading-[1.7]">
                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#F2670E] flex-shrink-0" />
                                    <span className="font-normal">
                                      {li.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => 
                                        part.startsWith('**') && part.endsWith('**') 
                                          ? <strong key={pIdx} className="font-bold text-black">{part.slice(2, -2)}</strong> 
                                          : part
                                      )}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            );
                            currentList = [];
                          }
                        };

                        // Only show first few elements for the preview
                        let displayedLines = 0;

                        for (let i = 0; i < lines.length; i++) {
                          const line = lines[i];
                          const trimmed = line.trim();
                          
                          if (displayedLines > 10) {
                             elements.push(
                                <div key="read-more" className="mt-6 pt-6 border-t border-zinc-200">
                                   <Link href={`/blogs/${slug}`} className="inline-flex items-center gap-2 text-[#F2670E] font-bold text-sm hover:underline">
                                      Read full article →
                                   </Link>
                                </div>
                             );
                             break;
                          }

                          if (!trimmed) {
                            flushList();
                            continue;
                          }

                          displayedLines++;

                          const renderFormatted = (text: string) => {
                            return text.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => 
                              part.startsWith('**') && part.endsWith('**') 
                                ? <strong key={pIdx} className="font-bold text-black">{part.slice(2, -2)}</strong> 
                                : part
                            );
                          };

                          if (trimmed.startsWith("## ")) {
                            flushList();
                            elements.push(
                              <h3 key={`h2-${i}`} className="text-xl md:text-2xl font-black text-black uppercase pt-6 mb-2">
                                {renderFormatted(trimmed.replace("## ", ""))}
                              </h3>
                            );
                          } else if (trimmed.startsWith("### ")) {
                            flushList();
                            elements.push(
                              <h4 key={`h3-${i}`} className="text-lg md:text-xl font-bold text-black pt-4 mb-2">
                                {renderFormatted(trimmed.replace("### ", ""))}
                              </h4>
                            );
                          } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                            currentList.push(trimmed.replace(/^[-*]\s+/, ""));
                          } else if (/^\d+\.\s/.test(trimmed)) {
                            flushList();
                            elements.push(
                              <div key={`p-${i}`} className="flex items-start gap-3 mb-4 text-zinc-700 text-sm md:text-base leading-relaxed">
                                <span className="font-bold text-black flex-shrink-0 mt-0.5">{trimmed.match(/^\d+\./)?.[0]}</span>
                                <span>{renderFormatted(trimmed.replace(/^\d+\.\s/, ""))}</span>
                              </div>
                            );
                          } else {
                            flushList();
                            elements.push(
                              <p key={`p-${i}`} className="mb-4 text-zinc-700 text-sm md:text-base leading-relaxed">
                                {renderFormatted(trimmed)}
                              </p>
                            );
                          }
                        }
                        flushList();
                        return elements;
                      })()}
                    </div>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
