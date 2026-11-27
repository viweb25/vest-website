'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/AuthProvider';
import { ProfileModal } from '@/components/site/ProfileModal';
import { User, LogOut, Calendar, ChevronDown, CheckCircle2, ShieldCheck, Phone } from 'lucide-react';
import Link from 'next/link';

export function UserProfileDropdown() {
  const { user, profile, logout } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  if (!user) return null;

  const displayName = profile?.name || user.name || user.email.split('@')[0];
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="relative w-10 h-10 rounded-full border border-black/10 dark:border-white/10 p-0.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm hover:ring-2 hover:ring-[#E7651A]/50 hover:border-[#E7651A]/40 transition-all outline-none flex items-center justify-center cursor-pointer shrink-0 group"
            title="Account Profile"
            aria-label="User Profile"
          >
            {/* Avatar Circle with Initials */}
            <div className="w-full h-full rounded-full bg-[#0B2540] dark:bg-zinc-700 text-white flex items-center justify-center font-bold text-xs shadow-inner transition-transform group-hover:scale-105">
              {initials}
            </div>
            {/* Online Status Indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-64 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl"
        >
          {/* Header Card */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl mb-1 border border-zinc-200/70 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B2540] dark:bg-zinc-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-zinc-900 dark:text-white truncate">
                  {displayName}
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Signed In Account</span>
            </div>
          </div>

          <DropdownMenuSeparator className="my-1 bg-zinc-100 dark:bg-zinc-800" />

          {/* Profile Details Action */}
          <DropdownMenuItem
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:bg-[#E7651A]/10 focus:text-[#E7651A] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-[#E7651A] flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div>Profile Details</div>
              <div className="text-[10px] font-normal text-slate-400 dark:text-zinc-500">View &amp; edit contact info</div>
            </div>
          </DropdownMenuItem>

          {/* Book Consultation Action */}
          <DropdownMenuItem asChild>
            <Link
              href="/book"
              className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:bg-[#E7651A]/10 focus:text-[#E7651A] transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div>Book Consultation</div>
                <div className="text-[10px] font-normal text-slate-400 dark:text-zinc-500">Schedule technical session</div>
              </div>
            </Link>
          </DropdownMenuItem>

          {/* Contact Support */}
          <DropdownMenuItem asChild>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:bg-[#1D79C5]/10 focus:text-[#1D79C5] transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div>Contact Support</div>
                <div className="text-[10px] font-normal text-slate-400 dark:text-zinc-500">Reach our engineering team</div>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-zinc-100 dark:bg-zinc-800" />

          {/* Logout Action */}
          <DropdownMenuItem
            onClick={() => logout()}
            className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 focus:bg-red-50 dark:focus:bg-red-950/40 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-red-100/60 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <LogOut className="w-3.5 h-3.5" />
            </div>
            <div>Sign Out / Logout</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

