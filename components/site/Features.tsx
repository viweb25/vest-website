'use client';

import {
  TicketCheck,
  Receipt,
  Package,
  Clock,
  ShieldCheck,
  Link2,
  Building2,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import TiltCard from '@/components/three/TiltCard';

const PIPELINE_STAGES = [
  'Received',
  'Diagnosing',
  'Approval',
  'Repairing',
  'Ready',
  'Delivered',
];

const FEATURES = [
  {
    icon: TicketCheck,
    title: 'Repair ticket tracking',
    desc: 'A clear status pipeline so every ticket\u2019s stage is always visible, to you and your team.',
    size: 'lg' as const,
  },
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp status updates',
    desc: 'Customers get a WhatsApp message the moment their device\u2019s status changes.',
    size: 'wide' as const,
  },
  {
    icon: Receipt,
    title: 'Itemized billing',
    desc: 'Parts, labour, and cost vs. sell price \u2014 real profit per ticket, visible only to admins.',
    size: 'sm' as const,
  },
  {
    icon: Package,
    title: 'Purchases & stock',
    desc: 'Log supplier purchases, pick parts from stock when billing, return unsold stock at day\u2019s end.',
    size: 'sm' as const,
  },
  {
    icon: Clock,
    title: 'Staff attendance & payroll',
    desc: 'Punch in/out and breaks tracked, with wages calculated from actual hours worked.',
    size: 'sm' as const,
  },
  {
    icon: ShieldCheck,
    title: 'Role-based access',
    desc: 'Employees see what they need. Only shop admins see cost, profit, and staff pay.',
    size: 'sm' as const,
  },
  {
    icon: Link2,
    title: 'Customer self-tracking',
    desc: 'A private link lets customers check their repair status anytime, without calling.',
    size: 'sm' as const,
  },
  {
    icon: Building2,
    title: 'Multi-shop ready',
    desc: 'Platform admins manage multiple shop locations from one dashboard.',
    size: 'sm' as const,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-10 sm:py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--ink) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl mb-16">
          <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
            Features
          </p>
          <h2 className="reveal display text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
            Everything your shop needs,{' '}
            <span className="text-gradient">in one app</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 [grid-auto-flow:dense] auto-rows-[minmax(190px,auto)] gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const span =
              f.size === 'lg'
                ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                : f.size === 'wide'
                  ? 'sm:col-span-2 lg:col-span-2'
                  : '';

            return (
              <TiltCard
                key={f.title}
                className={`reveal p-6 flex flex-col ${span}`}
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={20} />
                  </div>
                  <h3
                    className={`font-display font-semibold text-[var(--ink)] mb-2 leading-snug ${f.size === 'lg' ? 'text-xl' : 'text-lg'
                      }`}
                  >
                    {f.title}
                  </h3>
                  <p className="body-copy text-sm text-[var(--ink-soft)]">
                    {f.desc}
                  </p>

                  {/* signature mockup: real pipeline stages, echoing the how-it-works section */}
                  {f.size === 'lg' && (
                    <div className="mt-auto pt-6 flex flex-col justify-end h-full">
                      <div className="mb-6 mx-auto w-[55%] rounded-xl overflow-hidden border border-[var(--ink)]/10 shadow-md">
                        <img 
                          src="/ticket-mockup.png" 
                          alt="Repair Ticket Mockup" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          {PIPELINE_STAGES.map((stage, idx) => (
                            <div
                              key={stage}
                              className={`h-1.5 flex-1 rounded-full ${idx <= 3 ? 'ink-gradient' : 'bg-[var(--ink)]/10'
                                }`}
                            />
                          ))}
                        </div>
                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <span className="text-[var(--ink-muted)]">
                            Received
                          </span>
                          <span className="font-medium text-[var(--accent)]">
                            Repairing
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* signature mockup: a real WhatsApp bubble, not a generic chat icon */}
                  {f.size === 'wide' && (
                    <div className="mt-auto pt-6">
                      <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[var(--accent-soft)] px-3.5 py-2.5 text-xs text-[var(--ink)]">
                        Your iPhone 13 screen repair is ready for pickup ✅
                      </div>
                      <p className="mt-1.5 pr-1 text-right text-[10px] text-[var(--ink-muted)]">
                        Sent automatically via WhatsApp
                      </p>
                    </div>
                  )}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}