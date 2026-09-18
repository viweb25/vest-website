'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { WHATSAPP_URL } from '@/lib/three-context';



type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const honeypot = fd.get('company_website') as string;
    if (honeypot) {
      setStatus('success');
      form.reset();
      return;
    }

    const data = {
      name: (fd.get('name') as string)?.trim(),
      shop_name: (fd.get('shop_name') as string)?.trim(),
      phone: (fd.get('phone') as string)?.trim(),
      email: (fd.get('email') as string)?.trim() || null,
      location: (fd.get('location') as string)?.trim(),
      message: (fd.get('message') as string)?.trim() || null,
    };

    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = 'Your name is required';
    if (!data.shop_name) newErrors.shop_name = 'Shop name is required';
    if (!data.phone) newErrors.phone = 'Phone / WhatsApp is required';
    if (!data.location) newErrors.location = 'Location is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('loading');
    try {
      const { error } = await supabase.from('demo_requests').insert(data);
      if (error) {
        console.warn('Database save failed (table might be missing), but continuing to send email:', error);
      }

      // Send email
      const emailRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!emailRes.ok) {
        throw new Error('Failed to send email');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-10 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left: copy + interactive 3D phone */}
          <div className="relative">
            <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
              Contact
            </p>
            <h2 className="reveal display text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)] mb-5">
              Ready to see it{' '}
              <span className="text-gradient">in action?</span>
            </h2>
            <p className="reveal body-copy text-[clamp(1rem,1.6vw,1.15rem)] text-[var(--ink-soft)] max-w-md mb-8">
              Book a free demo or reach out on WhatsApp — we&rsquo;ll walk you
              through RepairSync for your shop.
            </p>

            {/* 3D Technician Mascot Image */}
            <div className="reveal relative w-full mb-2 lg:mb-12 flex items-center justify-center pointer-events-none">
              <img
                src="/images/contact_technician_3d.jpg"
                alt="3D Repair Technician"
                className="w-full h-auto max-h-[450px] object-contain rounded-3xl"
              />
            </div>

            <div className="reveal flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-[var(--ink)] transition-transform hover:scale-[1.03]"
              >
                <WhatsAppIcon width={17} height={17} className="text-[#25D366]" />
                Chat on WhatsApp
              </a>
              <div className="text-xs text-[var(--ink-muted)] leading-relaxed flex items-center">
                VI WebSync Technologies · viwebsync.com · +91 88867 11810
              </div>
            </div>
          </div>

          {/* right: form */}
          <div className="reveal relative mt-8">
            <div className="glass-strong  rounded-3xl p-7  sm:p-9">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] mb-5">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-[var(--ink)] mb-2">
                    Request received
                  </h3>
                  <p className="body-copy text-sm text-[var(--ink-soft)] mb-6">
                    Thanks — we&rsquo;ll be in touch shortly to set up your demo.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[var(--ink)]">
                        Name <span className="text-[var(--accent)]">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        className="bg-white/70"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shop_name" className="text-[var(--ink)]">
                        Shop name{' '}
                        <span className="text-[var(--accent)]">*</span>
                      </Label>
                      <Input
                        id="shop_name"
                        name="shop_name"
                        className="bg-white/70"
                        placeholder="Your repair shop"
                      />
                      {errors.shop_name && (
                        <p className="text-xs text-red-500">
                          {errors.shop_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[var(--ink)]">
                        Phone / WhatsApp{' '}
                        <span className="text-[var(--accent)]">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="bg-white/70"
                        placeholder="+91 …"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[var(--ink)]">
                        Email{' '}
                        <span className="text-[var(--ink-muted)]">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="bg-white/70"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[var(--ink)]">
                      Location{' '}
                      <span className="text-[var(--accent)]">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      className="bg-white/70"
                      placeholder="City or Address"
                    />
                    {errors.location && (
                      <p className="text-xs text-red-500">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[var(--ink)]">
                      Message{' '}
                      <span className="text-[var(--ink-muted)]">(optional)</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      className="bg-white/70 min-h-[90px]"
                      placeholder="Anything you'd like us to know?"
                    />
                  </div>

                  {/* honeypot */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  {status === 'error' && (
                    <p className="text-sm text-red-500">
                      Something went wrong. Please try WhatsApp instead.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white  shadow-lg shadow-[#0e7c86]/10 px-6 py-3.5 text-sm font-medium text-black dark:text-white shadow-xl shadow-[#0e7c86]/25 transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Request a Demo
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
