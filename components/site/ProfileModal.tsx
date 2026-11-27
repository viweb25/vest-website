'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useAuth } from '@/providers/AuthProvider';
import { User, Building, Phone, MapPin, Mail, Briefcase, CheckCircle2, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user, profile, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    designation: '',
    phone: '',
    phoneCountryCode: '+91',
    city: '',
    country: 'India',
    contactMethod: 'Phone Call',
    bestTimeToContact: 'Morning',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: profile?.name || user.name || '',
        companyName: profile?.companyName || '',
        designation: profile?.designation || '',
        phone: profile?.phone || '',
        phoneCountryCode: profile?.phoneCountryCode || '+91',
        city: profile?.city || '',
        country: profile?.country || 'India',
        contactMethod: profile?.contactMethod || 'Phone Call',
        bestTimeToContact: profile?.bestTimeToContact || 'Morning',
      });
    }
  }, [user, profile, open]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onOpenChange(false);
    }, 1200);
  };

  if (!user) return null;

  const initials = (formData.name || user.name || user.email || 'U')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto p-0 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        {/* Top Header Card - Clean Neutral Theme */}
        <div className="p-6 border-b border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 rounded-t-3xl relative">
          <div className="flex items-center gap-4 pr-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0B2540] dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#0B2540] dark:text-white truncate">
                  {formData.name || user.name || 'Client Profile'}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                </span>
              </div>
              <p className="text-slate-500 dark:text-zinc-400 text-xs mt-1 flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" /> {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-4 text-left">
            <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-white">
              Profile &amp; Contact Details
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-zinc-400">
              These details are used to prepopulate your engineering consultations and meeting invites.
            </DialogDescription>
          </DialogHeader>

          {savedSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Profile details saved successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            {/* Full Name & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Designation
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Technical Director"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Acme Automation Pvt Ltd"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    value={formData.phoneCountryCode}
                    onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                    className="px-2 py-2 text-xs font-bold rounded-l-xl border border-r-0 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 focus:outline-none"
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+49">+49 (DE)</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full px-3 py-2 text-sm rounded-r-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>

            {/* City & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  City / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bengaluru, Chennai, Pune"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="India"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                />
              </div>
            </div>

            {/* Contact Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Preferred Contact
                </label>
                <select
                  value={formData.contactMethod}
                  onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                >
                  <option value="Phone Call">Phone Call</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Best Time to Reach
                </label>
                <select
                  value={formData.bestTimeToContact}
                  onChange={(e) => setFormData({ ...formData, bestTimeToContact: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E7651A]/40 focus:border-[#E7651A] text-slate-900 dark:text-zinc-100"
                >
                  <option value="Morning">Morning (9am - 12pm)</option>
                  <option value="Afternoon">Afternoon (12pm - 4pm)</option>
                  <option value="Evening">Evening (4pm - 7pm)</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
              <Link
                href="/book"
                onClick={() => onOpenChange(false)}
                className="text-xs font-bold text-[#E7651A] hover:underline flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Consultation
              </Link>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2.5 rounded-none border border-slate-300 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-none border-1.5 border-[#0B2340] bg-[#0B2340] hover:bg-transparent hover:text-[#0B2340] text-white text-xs font-extrabold uppercase tracking-[0.12em] shadow-none transition-all"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

