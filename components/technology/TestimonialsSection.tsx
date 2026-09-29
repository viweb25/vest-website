'use client';

import React from 'react';
import { Star, CheckCircle, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FlowSection } from '../ui/story-scroll';

export function TestimonialsSection() {
  const pathname = usePathname();
  const isMarketing = pathname?.includes('digital-marketing');

  return (
    <FlowSection aria-label="What our clients say" style={{ backgroundColor: '#f5f4f0', color: '#0f172a' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">What our clients say</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Real messages, from <span className="text-[#1877f2] italic font-medium">real clients.</span>
            </h2>
          </div>
          <div className="max-w-xs lg:pt-2 lg:text-right">
            <div className="flex items-center lg:justify-end gap-1 mb-2 text-amber-500">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm font-bold text-gray-900 ml-2">4.9 / 5 on Trustpilot</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              503 reviews across Google, Trustpilot and Facebook, the kind that don't come from a request form.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="border-y border-gray-300/60 py-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-1">503</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Total Reviews</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-1">4.9</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Google ★</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-1">4.9</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Trustpilot ★</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-1">84%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Facebook Recommend</p>
            </div>
          </div>
        </div>

        {/* Main Content (Cards + Text) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 mb-20">

          {/* Left: Scattered Cards Collage */}
          {isMarketing ? (
            <div className="lg:w-[60%] relative min-h-[600px] sm:min-h-[700px] w-full hidden sm:block">
              {/* Card 1: WhatsApp Sarah (Top Left) */}
              <div className="absolute top-0 left-[5%] xl:left-[8%] w-[280px] shadow-xl shadow-black/5 overflow-hidden z-10 transform -rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-bottom-left rounded-2xl bg-[#e5f5ea] border border-[#d1e8d9]">
                <div className="bg-[#075e54] text-white p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">ST</div>
                  <div>
                    <p className="font-bold text-sm leading-tight">Sarah Thompson</p>
                    <p className="text-[10px] opacity-80">Director - Thompson Retail</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm text-xs text-gray-800 leading-relaxed relative">
                    Morning Myk, just had a look at the dashboard. We've doubled enquiries this month and the new product page is outperforming the homepage. Can't quite believe it. Thank you 🙏
                    <div className="text-[9px] text-gray-400 text-right mt-1">08:42 ✓✓</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Facebook Chris (Top Right) */}
              <div className="absolute top-[130px] right-0 w-[300px] bg-white rounded-xl shadow-xl shadow-black/5 p-4 z-20 transform rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-bottom-right border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold shrink-0">CW</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900 leading-tight">Chris Webb <span className="text-red-500">❤️</span> <span className="text-gray-500 font-normal">recommends</span></p>
                    <p className="text-[10px] text-gray-500 mt-0.5">1 May at 21:18 · 🌎</p>
                  </div>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed mb-3">
                  Can't recommend Myk Baxter enough for his help building me a fresh new site for my removals business. Myk & his team have gone above & beyond, thanks again, 5 star service.
                </p>
                <div className="border-t border-gray-100 pt-2 flex items-center gap-4 text-gray-500 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-[#1877f2]">👍 2</span>
                </div>
              </div>

              {/* Card 3: Google Kate (Mid Left) */}
              <div className="absolute top-[220px] left-[12%] xl:left-[15%] w-[320px] bg-white rounded-xl shadow-xl shadow-black/5 p-4 z-30 transform -rotate-1 hover:rotate-0 hover:z-[60] transition-transform origin-top-left border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#fbbc05] text-white flex items-center justify-center font-bold shrink-0">KB</div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Kate Baer</p>
                    <p className="text-[10px] text-gray-500">11 reviews · 2 photos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-[#fbbc05] text-sm">★★★★★</div>
                  <span className="text-[10px] text-gray-500">9 weeks ago</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed">
                  Myk and MBM have done an amazing job. Great communication from start to finish, professional and offering the best advice. For me, there's no one else I would use. 10/10.
                </p>
              </div>

              {/* Card 4: WhatsApp James (Mid Center) */}
              <div className="absolute top-[360px] left-[30%] xl:left-[35%] w-[260px] shadow-xl shadow-black/10 overflow-hidden z-40 transform rotate-1 hover:rotate-0 hover:z-[60] transition-transform origin-bottom-right rounded-2xl bg-[#e5f5ea] border border-[#d1e8d9]">
                <div className="bg-[#075e54] text-white p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">JW</div>
                  <div>
                    <p className="font-bold text-sm leading-tight">James Whitfield</p>
                    <p className="text-[10px] opacity-80">Owner - Whitfield & Co</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm text-xs text-gray-800 leading-relaxed relative">
                    Mate, three new leads from Google overnight. Sales team is panicking (in a good way). Whatever you tweaked last Friday, keep doing it.
                    <div className="text-[9px] text-gray-400 text-right mt-1">07:11 ✓✓</div>
                  </div>
                </div>
              </div>

              {/* Card 5: Trustpilot Jessica (Bottom Left) */}
              <div className="absolute top-[480px] left-[5%] xl:left-[8%] w-[300px] bg-white rounded-xl shadow-xl shadow-black/10 p-5 z-50 transform -rotate-1 hover:rotate-0 hover:z-[60] transition-transform origin-top-right border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#d6ece4] text-[#00b67a] flex items-center justify-center font-bold text-xs shrink-0">JL</div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 leading-tight">Jessica Lewis</p>
                      <p className="text-[10px] text-gray-500">GB - 5 reviews</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                </div>
                <p className="font-bold text-xs text-gray-900 mb-1">I first worked with Myk 15 years ago..</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Myk and his team have done an outstanding job on my eCommerce website. I've seen an increase in sales, the website is functioning 10000x better.
                </p>
              </div>

              {/* Card 6: Trustpilot Anthony (Bottom Right) */}
              <div className="absolute top-[520px] right-0 w-[300px] bg-white rounded-xl shadow-xl shadow-black/10 p-5 z-40 transform rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-top-right border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs shrink-0">AH</div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 leading-tight">Anthony Hutton</p>
                      <p className="text-[10px] text-gray-500">GB - 1 review</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                  <div className="bg-[#00b67a] text-white text-[10px] px-1 py-0.5 rounded-sm">★</div>
                </div>
                <p className="font-bold text-xs text-gray-900 mb-1">10 out of 10 on everything</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  The website and the whole experience was absolutely top draw. They nailed the brief and any tweaks were never a problem.
                </p>
              </div>

              {/* Card 7: Google Review (Mid Right Gap) */}
              <div className="absolute top-[330px] right-0 left-[90%]  w-[320px] bg-white rounded-xl shadow-xl shadow-black/5 p-4 z-[35] transform -rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-center border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#fbbc05] text-white flex items-center justify-center font-bold shrink-0">MP</div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Mark Phillips</p>
                    <p className="text-[10px] text-gray-500">2 reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-[#fbbc05] text-sm">★★★★★</div>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed">
                  Exceptional quality and support. The team really understood our vision and delivered perfectly on time. Highly recommended.
                </p>
              </div>
            </div>
          ) : (
            <div className="lg:w-[60%] relative min-h-[600px] sm:min-h-[700px] w-full hidden sm:block">

            {/* Card 1: ERP Dashboard Image (Top Left) */}
            <div className="absolute top-0 left-[5%] xl:left-[8%] w-[320px] h-[220px] shadow-xl shadow-black/5 overflow-hidden z-10 transform -rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-bottom-left rounded-2xl bg-white border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" 
                alt="ERP Dashboard" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 2: Office Workspace Image (Top Right) */}
            <div className="absolute top-[130px] right-0 w-[330px] h-[220px] shadow-xl shadow-black/5 overflow-hidden z-20 transform rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-bottom-right rounded-2xl bg-white border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80" 
                alt="Workspace Collaboration" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 3: Dashboard Analytics Image (Mid Left) */}
            <div className="absolute top-[220px] left-[12%] xl:left-[15%] w-[350px] h-[220px] shadow-xl shadow-black/5 overflow-hidden z-30 transform -rotate-1 hover:rotate-0 hover:z-[60] transition-transform origin-top-left rounded-2xl bg-white border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" 
                alt="Analytics Dashboard" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 4: UI Design Image (Mid Center) */}
            <div className="absolute top-[360px] left-[30%] xl:left-[35%] w-[300px] h-[200px] shadow-xl shadow-black/10 overflow-hidden z-40 transform rotate-1 hover:rotate-0 hover:z-[60] transition-transform origin-bottom-right rounded-2xl bg-white border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80" 
                alt="UI/UX Design" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 5: Mobile App Image (Bottom Left) */}
            <div className="absolute top-[480px] left-[5%] xl:left-[8%] w-[330px] h-[240px] shadow-xl shadow-black/10 overflow-hidden z-50 transform -rotate-1 hover:rotate-0 hover:z-[60] transition-transform origin-top-right rounded-2xl bg-white border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80" 
                alt="Mobile App Interface" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 6: Code Laptop Image (Bottom Right) */}
            <div className="absolute top-[520px] right-0 w-[330px] h-[220px] shadow-xl shadow-black/10 overflow-hidden z-40 transform rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-top-right rounded-2xl bg-white border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" 
                alt="Web Development Code" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 7: Data Charts Image (Mid Right Gap) */}
            <div className="absolute top-[330px] right-0 left-[90%]  w-[340px] h-[200px] shadow-xl shadow-black/5 overflow-hidden z-[35] transform -rotate-2 hover:rotate-0 hover:z-[60] transition-transform origin-center rounded-2xl bg-white border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80" 
                alt="Business Data Charts" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          )}


          {/* Mobile version of cards (simple stack) */}
          <div className="sm:hidden flex flex-col gap-6 w-full">
            <div className="bg-[#e5f5ea] rounded-2xl p-4 border border-[#d1e8d9]">
              <p className="font-bold text-sm mb-2 text-[#075e54]">Sarah Thompson</p>
              <p className="text-sm text-gray-800">"We've doubled enquiries this month and the new product page is outperforming the homepage."</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex text-[#fbbc05] text-xs mb-1">★★★★★</div>
              <p className="font-bold text-sm mb-2">Kate Baer</p>
              <p className="text-sm text-gray-800">"Great communication from start to finish, professional and offering the best advice."</p>
            </div>
          </div>

          {/* Right: Text Testimonials */}
          <div className="lg:w-[40%] flex flex-col justify-start space-y-5 lg:space-y-6 pl-0 lg:pl-10 border-l-0 lg:border-l border-gray-300/60 self-start">
            <div>
              <p className="text-sm text-gray-700 font-medium leading-relaxed mb-2">
                "Their SEO work has been phenomenal. We went from page 5 to page 1 for all our target keywords within 6 months."
              </p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                <span className="text-gray-900">Emma Richardson</span> / Richardson Legal Services
              </p>
            </div>
            <div className="pt-5 lg:pt-6 border-t border-gray-300/60">
              <p className="text-sm text-gray-700 font-medium leading-relaxed mb-2">
                "Top team. Friendly, available, and they actually pick up the phone. Three years in and still our first call."
              </p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                <span className="text-gray-900">Gyles Seward</span> / Via Trustpilot
              </p>
            </div>
            <div className="pt-5 lg:pt-6 border-t border-gray-300/60">
              <p className="text-sm text-gray-700 font-medium leading-relaxed mb-2">
                "We've worked with four agencies in ten years. MBM are the only ones who treated our business like it was their own."
              </p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                <span className="text-gray-900">David Archer</span> / Archer Construction
              </p>
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="border-t border-gray-300/60 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 mt-16 lg:mt-32">
          <h3 className="text-2xl md:text-3xl font-medium text-gray-800 max-w-md">
            Want a message like this in your inbox?
          </h3>
          <button className="flex items-center justify-center gap-2 border border-black bg-transparent hover:bg-black hover:text-white text-black font-bold text-sm uppercase py-3 px-6 transition-colors w-full sm:w-auto text-center shrink-0">
            Book your free consultation
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </FlowSection>
  );
}
