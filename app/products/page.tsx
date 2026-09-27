"use client"

import React from 'react'
import { Search, ChevronDown, X, Bookmark } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'

const productsData = [
  {
    id: "erp",
    title: "VEST ERP",
    maker: "VEST Solutions",
    makerAvatar: "/images/logo.png", // Or a default avatar
    featured: true,
    liveLink: "#",
    tags: ["Enterprise", "SaaS"],
    imageMock: (
      <img src="/erp.png" alt="VEST ERP" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    )
  },
  {
    id: "repairsync",
    title: "RepairSync",
    maker: "VEST Solutions",
    makerAvatar: "/images/logo.png",
    featured: true,
    liveLink: "#",
    tags: ["Mobile", "Management"],
    imageMock: (
      <img src="/repair.png" alt="RepairSync" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    )
  },
  {
    id: "auto-posting",
    title: "N*N Auto Posting",
    maker: "VEST Solutions",
    makerAvatar: "/images/logo.png",
    featured: false,
    liveLink: "#",
    tags: ["Social Media", "Automation"],
    imageMock: (
      <img src="/n8n.png" alt="N*N Auto Posting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    )
  },
  {
    id: "puro",
    title: "Puro Firing Box",
    maker: "VEST Solutions",
    makerAvatar: "/images/logo.png",
    featured: false,
    liveLink: "#",
    tags: ["Hardware", "Industrial"],
    imageMock: (
      <img src="/Firing Box Installation.png" alt="Puro Firing Box" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    )
  }
];

export default function ProductsPage() {
  const [search, setSearch] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [isTagsOpen, setIsTagsOpen] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState<Set<string>>(new Set());

  const allTags = React.useMemo(() => Array.from(new Set(productsData.flatMap(p => p.tags))), []);

  const filteredProducts = React.useMemo(() => {
    return productsData.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.maker.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setActiveTag(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      <main className="container mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-12">
          Browse all products
        </h1>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12 flex-wrap">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white w-full md:w-64 focus:md:w-72 transition-all duration-150 ease-out shadow-sm hover:shadow-md"
            />
          </div>



          <div className="flex-1"></div>

          {/* Reset Filters */}
          {(search || activeTag) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full text-sm font-medium hover:bg-rose-100 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-300 ease-out text-rose-500 hover:text-rose-600 animate-in fade-in zoom-in duration-200"
            >
              <X className="w-4 h-4" />
              Reset filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer transform transition-transform duration-300 hover:-translate-y-4 relative z-0 hover:z-10">
                {/* Image Container */}
                <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-50 mb-4 border border-slate-200/50 shadow-sm transition-shadow duration-150 group-hover:shadow-xl">

                  {/* Custom corner borders to match the original VEST design */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#168a9f] z-10 opacity-30 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#168a9f] z-10 opacity-30 group-hover:opacity-100 transition-opacity" />

                  {/* Render the custom CSS mock instead of an image */}
                  <div className="absolute inset-0">
                    {product.imageMock}
                  </div>

                  {/* Featured Badge */}
                  {/* {product.featured && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-slate-900 shadow-sm z-20">
                      Featured
                    </div>
                  )} */}

                  {/* Bookmark Icon */}
                  <button
                    onClick={(e) => toggleBookmark(e, product.id)}
                    className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-110 transition-all shadow-sm z-20"
                  >
                    <Bookmark className="w-4 h-4" fill={bookmarks.has(product.id) ? "currentColor" : "none"} />
                  </button>
                </Link>

                {/* Card Footer */}
                <div className="relative flex flex-col px-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 bg-white relative z-10 w-full py-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center border border-slate-200">
                        {/* Using logo.png if it exists, otherwise just a V */}
                        <span className="text-xs font-bold text-slate-700">V</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-base leading-tight tracking-tight mb-0.5">
                          {product.title}
                        </h3>
                        <p className="text-sm text-slate-500">
                          made by <span className="text-slate-900 font-medium">{product.maker}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Actions Row */}
                  <div className="absolute left-1 right-1 top-full pt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 ease-out pointer-events-none group-hover:pointer-events-auto flex items-center justify-between">
                    <Link href={`/products/${product.id}`} className="bg-transparent border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-150 ease-out hover:-translate-y-1 active:scale-95 flex items-center justify-center uppercase tracking-wider">
                      See details
                    </Link>
                    <div className="flex items-center gap-2">

                      <div className="relative group/tooltip flex items-center justify-center">
                        <button
                          disabled={!product.liveLink}
                          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-150 bg-white shadow-sm hover:-translate-y-1 group/arrowbtn ${product.liveLink
                            ? "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 active:scale-95 cursor-pointer hover:shadow-md"
                            : "border-slate-100 text-slate-300 cursor-not-allowed opacity-75"
                            }`}
                          onClick={(e) => {
                            if (product.liveLink) {
                              e.stopPropagation();
                              // window.open(product.liveLink, '_blank');
                            }
                          }}
                        >
                          <svg className={`transition-transform duration-150 ${product.liveLink ? 'group-hover/arrowbtn:translate-x-0.5 group-hover/arrowbtn:-translate-y-0.5' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </button>

                        <div className="absolute top-full mt-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-white border border-slate-200 text-black text-[13px] py-1 px-2.5 pointer-events-none whitespace-nowrap shadow-sm z-20 font-medium">
                          {product.liveLink ? "Live Demo" : "No Live Demo"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
