'use client';

import { useState } from 'react';
import { Check, Minus, Sparkles, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { scrollToId } from '@/hooks/use-lenis';
import { PaymentModal } from './PaymentModal';

const PLANS = [
  {
    name: 'Starter',
    sub: 'Single shop, 1–2 staff',
    monthlyPrice: 5208,
    yearlyPrice: 50000,
    cta: 'Start Free Trial',
    ctaTarget: 'contact',
    popular: true,
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
    popular: false,
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
    popular: true,
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
  if (v === 'Yes') return <Check size={16} className="mx-auto text-[var(--accent)]" />;
  if (v === 'No') return <Minus size={16} className="mx-auto text-[var(--ink-muted)]" />;
  return <span className="text-sm text-[var(--ink-soft)]">{v}</span>;
}

export default function Pricing() {
  const [period, setPeriod] = useState<'month' | 'year'>('month');

  return (
    <section id="pricing" className="relative pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
            Pricing
          </p>
          <h2 className="reveal display text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)] mb-5">
            Simple plans that{' '}
            <span className="text-gradient">grow with your shop</span>
          </h2>
          <p className="reveal body-copy text-[var(--ink-soft)]">
            No hidden fees. Switch plans any time. Save up to 20% with yearly billing.
          </p>

          {/* period toggle */}
          <div className="reveal inline-flex items-center p-1 mt-7 text-sm rounded-full border border-[var(--line)] bg-[var(--surface)]"
            style={{ boxShadow: 'inset 2px 2px 5px var(--line), inset -2px -2px 5px rgba(255,255,255,0.05)' }}
          >
            <button
              onClick={() => setPeriod('month')}
              className={`rounded-full px-5 py-2 font-medium transition-all duration-200 ${period === 'month'
                ? 'bg-[var(--bg)] text-[var(--ink)] shadow-md'
                : 'text-[var(--ink-muted)] bg-transparent'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`rounded-full px-5 py-2 font-medium transition-all duration-200 ${period === 'year'
                ? 'bg-[var(--bg)] text-[var(--ink)] shadow-md'
                : 'text-[var(--ink-muted)] bg-transparent'
                }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* 3D timeline rail + plan cards */}
        <div className="relative">
          {/* rail */}
          <div className="absolute left-0 right-0 top-[64px] hidden md:block h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`reveal relative glass rounded-3xl p-7 flex flex-col transition-all duration-300 ${p.popular ? 'ring-2 ring-[var(--accent)] shadow-2xl md:scale-105 z-10' : 'md:scale-95 z-0 opacity-90 hover:opacity-100 hover:scale-100'
                  }`}
              >
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 hidden md:block">
                  <div className="h-3.5 w-3.5 rounded-full " />
                </div>

                {!p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-blck shadow-lg bg-white shadow-lg shadow-[#0e7c86]/10">
                    <Sparkles size={12} /> Most Popular
                  </div>
                )}

                <div className="mt-3">
                  <h3 className="font-display font-semibold text-xl text-[var(--ink)]">
                    {p.name}
                  </h3>
                  <p className="body-copy text-sm text-[var(--ink-soft)] mt-1">
                    {p.sub}
                  </p>
                </div>

                <div className="my-6">
                  <div className="display text-4xl text-[var(--ink)]">
                    ₹{(period === 'month' ? p.monthlyPrice : p.yearlyPrice).toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">
                    {period === 'month' ? 'per month' : 'per year'}
                    {period === 'year' && (
                      <span className="ml-2 inline-block rounded-full bg-[var(--accent-soft)] text-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold">
                        Save {Math.round((1 - p.yearlyPrice / (p.monthlyPrice * 12)) * 100)}%
                      </span>
                    )}
                  </p>
                </div>

                <ul className="space-y-3 mb-7 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <span className="text-[var(--ink-soft)]">{f.label}</span>
                      <span className="text-right font-medium text-[var(--ink)] shrink-0">
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <PaymentModal
                  planName={p.name}
                  sub={p.sub}
                  price={period === 'month' ? p.monthlyPrice : p.yearlyPrice}
                  period={period}
                  features={p.features}
                >
                  <button
                    className="w-full rounded-full py-3 text-sm font-medium transition-transform hover:scale-[1.02] bg-white text-black shadow-lg shadow-[#0e7c86]/10"
                  >
                    {p.cta}
                  </button>
                </PaymentModal>
              </div>
            ))}
          </div>
        </div>

        {/* comparison table */}
        <div className="reveal mt-20">
          <h3 className="font-display font-semibold text-xl text-[var(--ink)] mb-6">
            Full comparison
          </h3>
          <div className="overflow-x-auto rounded-2xl glass">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="text-left py-4 px-5 font-medium text-[var(--ink-soft)]">
                    Feature
                  </th>
                  <th className="text-center py-4 px-5 font-semibold text-[var(--ink)]">
                    Starter
                  </th>
                  <th className="text-center py-4 px-5 font-semibold text-[var(--accent)]">
                    Growth
                  </th>
                  <th className="text-center py-4 px-5 font-semibold text-[var(--ink)]">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-[var(--line)] last:border-0"
                  >
                    <td className="py-3.5 px-5 text-[var(--ink-soft)]">
                      {row.label}
                    </td>
                    <td className="text-center py-3.5 px-5">
                      {valueCell(row.starter)}
                    </td>
                    <td className="text-center py-3.5 px-5">
                      {valueCell(row.growth)}
                    </td>
                    <td className="text-center py-3.5 px-5">
                      {valueCell(row.pro)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="reveal mt-20 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle size={20} className="text-[var(--accent)]" />
            <h3 className="font-display font-semibold text-xl text-[var(--ink)]">
              Frequently asked questions
            </h3>
          </div>
          <Accordion type="single" collapsible className="glass rounded-2xl px-5">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-[var(--line)]"
              >
                <AccordionTrigger className="text-left text-[var(--ink)] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--ink-soft)]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
