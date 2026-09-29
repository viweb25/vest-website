'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { CreditCard, Loader2, Lock, CheckCircle2, Check, Minus, ChevronsUpDown } from 'lucide-react';
import { Country, State } from 'country-state-city';
import { cn } from '@/lib/utils';
import { scrollToId } from '@/hooks/use-lenis';

interface PlanFeature {
  label: string;
  value: string;
}

interface PaymentModalProps {
  children: React.ReactNode;
  planName: string;
  sub: string;
  price: number;
  period: 'month' | 'year';
  features: PlanFeature[];
}

// Mock exchange rates (Base INR = 1)
const EXCHANGE_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AUD: 0.018,
  CAD: 0.016,
  SGD: 0.016,
  AED: 0.044,
};

export function PaymentModal({ children, planName, sub, price, period, features }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Billing details
  const [countryIso, setCountryIso] = useState('IN');
  const [stateIso, setStateIso] = useState('TN');
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(countryIso);

  // Mock states for visual representation
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  // Pricing & Currency Logic
  const selectedCountry = Country.getCountryByCode(countryIso);
  const currencyCode = selectedCountry?.currency || 'INR';
  const rate = EXCHANGE_RATES[currencyCode] || EXCHANGE_RATES['USD']; // Fallback to USD for unknown currencies
  const displayCurrency = EXCHANGE_RATES[currencyCode] ? currencyCode : 'USD';

  const convertedPrice = price * rate;

  // Tax Logic
  const isTamilNadu = countryIso === 'IN' && stateIso === 'TN';
  const taxAmount = convertedPrice * 0.18;
  const totalAmount = convertedPrice + taxAmount;

  const cgst = taxAmount / 2;
  const sgst = taxAmount / 2;
  const igst = taxAmount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: displayCurrency,
      minimumFractionDigits: displayCurrency === 'INR' ? 0 : 2,
      maximumFractionDigits: displayCurrency === 'INR' ? 0 : 2,
    }).format(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Reset form and close after delay
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setCardNumber('');
        setExpiry('');
        setCvc('');
        setName('');
      }, 2500);
    }, 1500);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
      setExpiry(`${value.substring(0, 2)}/${value.substring(2, 4)}`);
    } else {
      setExpiry(value);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvc(value.substring(0, 4));
  };

  const renderFeatureValue = (v: string) => {
    if (v === 'Yes') return <Check size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />;
    if (v === 'No') return <Minus size={16} className="text-[var(--ink-muted)] shrink-0 mt-0.5" />;
    return <span className="text-sm text-[var(--ink-soft)] font-medium text-right leading-tight">{v}</span>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)} className="w-full">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden bg-background gap-0 border-[var(--line)]">
        {success ? (
          <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
            <div className="h-20 w-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-display font-semibold text-[var(--ink)]">Payment Successful!</h3>
            <p className="text-[var(--ink-soft)] mt-3 text-center text-lg">Your {planName} plan is now active.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 max-h-[90vh]">
            {/* LEFT COLUMN: Plan Details */}
            <div data-lenis-prevent="true" className="bg-[var(--surface)] p-8 md:p-10 border-r border-[var(--line)] hidden md:flex flex-col overflow-y-auto">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold mb-2">Selected Plan</p>
              <h2 className="text-4xl font-display font-bold text-[var(--ink)]">{planName}</h2>
              <p className="text-[var(--ink-soft)] text-sm mt-2">{sub}</p>

              <div className="my-6">
                <span className="text-4xl font-display font-bold text-[var(--ink)]">{formatCurrency(convertedPrice)}</span>
                <span className="text-[var(--ink-muted)] text-sm ml-2">/ {period === 'month' ? 'month' : 'year'}</span>
              </div>

              <div className="h-px w-full bg-[var(--line)] my-2"></div>

              <ul className="mt-6 space-y-4 flex-1">
                {features.map((f, i) => (
                  <li key={i} className="flex justify-between gap-4 items-start">
                    <span className="text-[13px] text-[var(--ink-soft)]">{f.label}</span>
                    {renderFeatureValue(f.value)}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT COLUMN: Payment & Billing */}
            <div data-lenis-prevent="true" className="p-8 md:p-10 flex flex-col overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[var(--ink)]">Checkout</h3>
                <p className="text-sm text-[var(--ink-soft)] mt-1 md:hidden">
                  {planName} Plan - {formatCurrency(convertedPrice)} / {period === 'month' ? 'mo' : 'yr'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">

                {/* Billing Region */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-[var(--ink)] uppercase tracking-wider">Billing Region</h4>
                  <div className="grid grid-cols-2 gap-4">

                    <div className="grid gap-2">
                      <Label className="text-[var(--ink-soft)] text-xs">Country</Label>
                      <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <span className="truncate">
                              {countryIso ? Country.getCountryByCode(countryIso)?.name : "Select country..."}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map((c) => (
                                  <CommandItem
                                    key={c.isoCode}
                                    value={c.name}
                                    onSelect={() => {
                                      setCountryIso(c.isoCode);
                                      setStateIso('');
                                      setOpenCountry(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4 shrink-0",
                                        countryIso === c.isoCode ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <span className="truncate">{c.name}</span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-[var(--ink-soft)] text-xs">State / Province</Label>
                      {states.length > 0 ? (
                        <Popover open={openState} onOpenChange={setOpenState}>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <span className="truncate">
                                {stateIso ? State.getStateByCodeAndCountry(stateIso, countryIso)?.name : "Select state..."}
                              </span>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search state..." />
                              <CommandList>
                                <CommandEmpty>No state found.</CommandEmpty>
                                <CommandGroup>
                                  {states.map((s) => (
                                    <CommandItem
                                      key={s.isoCode}
                                      value={s.name}
                                      onSelect={() => {
                                        setStateIso(s.isoCode);
                                        setOpenState(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4 shrink-0",
                                          stateIso === s.isoCode ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <span className="truncate">{s.name}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Input
                          placeholder="e.g. California"
                          value={stateIso}
                          onChange={(e) => setStateIso(e.target.value)}
                          className="text-[var(--ink)]"
                        />
                      )}
                    </div>

                  </div>
                </div>

                <div className="h-px w-full bg-[var(--line)]"></div>

                {/* Card Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-[var(--ink)] uppercase tracking-wider">Payment Method</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nameOnCard" className="text-[var(--ink-soft)] text-xs">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="text-[var(--ink)]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber" className="text-[var(--ink-soft)] text-xs">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          required
                          className="pl-10 font-mono text-[14px] tracking-[0.1em] text-[var(--ink)]"
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ink-muted)]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry" className="text-[var(--ink-soft)] text-xs">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={handleExpiryChange}
                          required
                          className="font-mono text-center tracking-widest text-[14px] text-[var(--ink)]"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc" className="text-[var(--ink-soft)] text-xs">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cvc}
                          onChange={handleCvcChange}
                          type="password"
                          required
                          className="font-mono text-center tracking-widest text-[14px] text-[var(--ink)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="bg-[var(--surface)] p-4 rounded-xl border border-[var(--line)] mt-2">
                  <div className="flex justify-between text-sm mb-2 text-[var(--ink-soft)]">
                    <span>Subtotal</span>
                    <span>{formatCurrency(convertedPrice)}</span>
                  </div>
                  {isTamilNadu ? (
                    <>
                      <div className="flex justify-between text-sm mb-2 text-[var(--ink-soft)]">
                        <span>CGST (9%)</span>
                        <span>{formatCurrency(cgst)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-3 text-[var(--ink-soft)]">
                        <span>SGST (9%)</span>
                        <span>{formatCurrency(sgst)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-sm mb-3 text-[var(--ink-soft)]">
                      <span>IGST (18%)</span>
                      <span>{formatCurrency(igst)}</span>
                    </div>
                  )}

                  <div className="h-px w-full bg-[var(--line)] mb-3"></div>

                  <div className="flex justify-between items-center font-bold text-lg text-[var(--ink)]">
                    <span>Total</span>
                    <span className="text-[var(--accent)]">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={true}
                  className="mt-2 w-full cursor-not-allowed rounded-xl flex items-center justify-center bg-[var(--surface)] border border-[var(--line)] shadow-sm px-4 py-3.5 text-sm font-medium text-[var(--ink-muted)] opacity-70"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Pay {formatCurrency(totalAmount)}
                  </span>
                </button>
                <div className="mt-3 text-center text-sm text-[var(--ink-soft)]">
                  Payment services not available.{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => scrollToId('contact'), 100);
                    }} 
                    className="text-[var(--accent)] hover:underline font-semibold"
                  >
                    Contact Us
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
