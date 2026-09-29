"use client";

import { useState, useEffect, useRef } from 'react';
import { Check, Minus, Sparkles, HelpCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { ShimmerText } from '@/components/ui/shimmer-text';

// Number count-up animation component
function Counter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth easeOutQuad curve
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easeProgress * (end - 1) + 1);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

const PLANS = [
  {
    name: 'Starter',
    sub: 'Single shop, 1–2 staff',
    monthlyPrice: 5208,
    yearlyPrice: 50000,
    cta: 'Start Free Trial',
    ctaTarget: 'contact',
    popular: false,
    features: [
      { label: 'Repair ticket tracking', value: 'Yes' },
      { label: 'WhatsApp status updates', value: 'Limited / add-on' },
      { label: 'Itemized billing', value: 'Yes' },
      { label: 'Purchases & stock', value: 'Basic' },
      { label: 'Staff attendance & payroll', value: 'No' },
      { label: 'Role-based access', value: 'Owner only' },
      { label: 'Customer self-tracking', value: 'Yes' },
      { label: 'Shops', value: '1' },
      { label: 'Support', value: 'Email' },
    ],
  },
  {
    name: 'Growth',
    sub: 'Single shop, growing team',
    monthlyPrice: 8333,
    yearlyPrice: 80000,
    cta: 'Book a Demo',
    ctaTarget: 'contact',
    popular: true,
    features: [
      { label: 'Repair ticket tracking', value: 'Yes' },
      { label: 'WhatsApp status updates', value: 'Yes' },
      { label: 'Itemized billing', value: 'Yes' },
      { label: 'Purchases & stock', value: 'Full' },
      { label: 'Staff attendance & payroll', value: 'Yes' },
      { label: 'Role-based access', value: 'Yes' },
      { label: 'Customer self-tracking', value: 'Yes' },
      { label: 'Shops', value: '1' },
      { label: 'Support', value: 'Email + WhatsApp' },
    ],
  },
  {
    name: 'Pro',
    sub: 'Multi-shop operators',
    monthlyPrice: 10417,
    yearlyPrice: 100000,
    cta: 'Contact Sales',
    ctaTarget: 'contact',
    popular: false,
    features: [
      { label: 'Repair ticket tracking', value: 'Yes' },
      { label: 'WhatsApp status updates', value: 'Yes' },
      { label: 'Itemized billing', value: 'Yes' },
      { label: 'Purchases & stock', value: 'Full' },
      { label: 'Staff attendance & payroll', value: 'Yes' },
      { label: 'Role-based access', value: 'Yes' },
      { label: 'Customer self-tracking', value: 'Yes' },
      { label: 'Shops', value: 'Multiple (multi-shop dashboard)' },
      { label: 'Support', value: 'Priority / dedicated' },
    ],
  },
];

const FAQ = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — the Starter plan offers a free trial so you can try RepairSync in your shop before paying anything.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can move between Starter, Growth, and Pro at any time as your shop grows or your needs change.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No. There is no setup fee — sign up and start creating tickets right away.',
  },
  {
    q: 'Do you support more than one shop location?',
    a: 'Yes. The Pro plan includes a multi-shop dashboard so platform admins can manage multiple locations from one place.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your data remains yours. If you cancel, you can export your ticket, billing, and stock history before your account is closed.',
  },
];

const TABLE_ROWS = PLANS[0].features.map((_, i) => ({
  label: PLANS[0].features[i].label,
  starter: PLANS[0].features[i].value,
  growth: PLANS[1].features[i].value,
  pro: PLANS[2].features[i].value,
}));

function valueCell(v: string) {
  if (v === 'Yes') return <Check size={16} className="mx-auto text-[#F2670E]" />;
  if (v === 'No') return <Minus size={16} className="mx-auto text-zinc-400" />;
  return <span className="text-sm text-zinc-500">{v}</span>;
}

function SimpleAccordion({ items }: { items: { q: string, a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white/80 rounded-2xl px-5 border border-zinc-200">
      {items.map((item, i) => (
        <div key={i} className="border-b border-zinc-200 last:border-0">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between py-4 text-left font-medium text-[#0B2540] transition-all hover:underline"
          >
            {item.q}
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden text-sm text-zinc-500 transition-all ${
              openIndex === i ? "pb-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
}

const TYPEWRITER_WORDS = [
  "PLCs",
  "HMIs",
  "Servo Drives",
  "Industrial PCs",
  "CNC Machines",
  "VFDs",
  "LabVIEW Systems"
];

function TypewriterEffect() {
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % TYPEWRITER_WORDS.length;
      const fullText = TYPEWRITER_WORDS[i];

      setCurrentWord(
        isDeleting
          ? fullText.substring(0, currentWord.length - 1)
          : fullText.substring(0, currentWord.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && currentWord === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="inline-block text-black font-bold min-w-[2ch]">
      {currentWord}
      <span className="animate-[pulse_1s_ease-in-out_infinite] font-light text-black">|</span>
    </span>
  );
}

export default function PricingPage() {
  const [period, setPeriod] = useState<'month' | 'year'>('month');

  return (
    <div className="font-sans">
      <Navbar />
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section 
        className="relative pt-14 pb-16 sm:pt-24 sm:pb-10 min-h-screen flex flex-col justify-start"
        style={{
          backgroundImage: "url('/project-images/92.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto relative">
            {/* White glow behind text for readability */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_10%,rgba(255,255,255,0.7)_50%,transparent_80%)] blur-3xl -z-10 scale-150 transform"></div>

            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-8">
              Live Technical Support
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-bold text-black tracking-tight leading-[1.1] mb-6">
              Expert Diagnosis for Your <br className="hidden sm:block" /> <TypewriterEffect /> <br className="hidden sm:block" />
              <span className="text-black font-bold">Live on Video, in Minutes.</span>
            </h1>
            <ShimmerText className="mt-6 text-slate-600 text-[15px] sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-10 text-center block">
              Connect with certified engineers who physically repair these equipment every day — via video call. No shipping. No OEM wait. Diagnosis from India's most experienced industrial electronics facility. No app needed. Works on any device with a camera and browser.
            </ShimmerText>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto rounded-full px-8 py-4 text-[15px] font-bold transition-all bg-[#F2670E] text-white shadow-lg hover:shadow-xl hover:bg-[#d9590b] hover:-translate-y-1">
                  Book a Session
                </button>
              </Link>
              <a href="#pricing-plans" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto rounded-full px-8 py-4 text-[15px] font-bold transition-all bg-white text-[#0B2540] shadow-md border border-zinc-200 hover:shadow-xl hover:-translate-y-1">
                  View Plans &amp; Pricing
                </button>
              </a>
            </div>
            <p className="mt-6 text-slate-500 text-[10px] sm:text-sm font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              No app needed. Works on any device with a camera and browser.
            </p>

            {/* Animated Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto pt-10 mt-10 border-t border-gray-200/50">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#0B2540]">
                  <Counter end={32} suffix="+" />
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#0B2540]">
                  <Counter end={180} suffix="+" />
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">
                  Expert Engineers
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#0B2540]">
                  <Counter end={100000} suffix="+" />
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">
                  Equipment Repaired
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#0B2540]">ISO 9001</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">
                  Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative pb-16 sm:pb-24 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">

        <header id="pricing-plans" className="text-center max-w-3xl mx-auto mb-12 md:mb-16 pb-8 pt-10 border-t border-zinc-200">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4 mt-10 block">
            Pricing
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold text-black tracking-tight leading-[1.05] mb-5">
            Simple plans that <br className="hidden sm:block" />
            <span className="text-black font-bold">grow with your shop</span>
          </h1>
          <ShimmerText className="mt-4 text-slate-600 text-[15px] sm:text-base font-medium max-w-xl mx-auto leading-relaxed text-center block">
            All prices exclusive of 18% GST. Tax invoice provided. No hidden fees. Switch plans any time. Save up to 20% with yearly billing.
          </ShimmerText>
        </header>

        {/* period toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center p-1 text-sm rounded-full border border-zinc-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            <button
              onClick={() => setPeriod('month')}
              className={`rounded-full px-6 py-2.5 font-medium transition-all duration-200 ${
                period === 'month'
                  ? 'bg-[#0B2540] text-white shadow-md'
                  : 'text-zinc-500 bg-transparent hover:text-zinc-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`rounded-full px-6 py-2.5 font-medium transition-all duration-200 ${
                period === 'year'
                  ? 'bg-[#0B2540] text-white shadow-md'
                  : 'text-zinc-500 bg-transparent hover:text-zinc-800'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* plan cards */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pt-6 md:pt-0">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative p-8 flex flex-col transition-all duration-300 ${
                  p.popular
                    ? 'bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:scale-105 z-10'
                    : 'bg-transparent z-0'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-bold text-zinc-700 bg-white shadow-sm">
                    <Sparkles size={12} className="text-zinc-700" /> Most Popular
                  </div>
                )}

                <div className="mt-2 text-center md:text-left">
                  <h3 className="font-black text-2xl text-[#0B2540]">
                    {p.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2 font-medium">
                    {p.sub}
                  </p>
                </div>

                <div className="my-8 text-center md:text-left">
                  <div className="text-4xl lg:text-5xl font-black text-[#0B2540]">
                    ₹{(period === 'month' ? p.monthlyPrice : p.yearlyPrice).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-zinc-400 mt-2 font-medium flex flex-col md:flex-row md:items-center gap-2">
                    <span>{period === 'month' ? 'per month' : 'per year'}</span>
                    {period === 'year' && (
                      <span className="inline-block rounded-full bg-[#F2670E]/10 text-[#F2670E] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                        Save {Math.round((1 - p.yearlyPrice / (p.monthlyPrice * 12)) * 100)}%
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <span className="text-zinc-500 font-medium">{f.label}</span>
                      <span className="text-right font-bold text-[#0B2540] shrink-0">
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="w-full">
                  <button
                    className="w-full rounded-full py-4 text-[14px] font-bold transition-all bg-white text-[#0B2540] shadow-md border border-zinc-100 hover:shadow-xl hover:-translate-y-1"
                  >
                    {p.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
      <Footer />
    </div>
  );
}
