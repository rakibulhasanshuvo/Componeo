"use client";

import React from "react";
import { 
  Search, 
  Settings, 
  HelpCircle, 
  UserCircle 
} from "lucide-react";
import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <header className="w-full top-0 left-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-8 py-4 h-16 fixed">
      <div className="flex items-center gap-8 translate-y-0.5">
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-primary font-headline italic hover:brightness-110 transition-all active:scale-95"
        >
          COMPONEO
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link 
            href="/dashboard" 
            className="font-headline tracking-widest uppercase font-bold text-[10px] text-primary border-b-2 border-primary pb-1"
          >
            System Overview
          </Link>
          <Link 
            href="/resources" 
            className="font-headline tracking-widest uppercase font-bold text-[10px] text-on-surface-variant hover:text-white transition-colors"
          >
            Resources
          </Link>
          <Link 
            href="/docs" 
            className="font-headline tracking-widest uppercase font-bold text-[10px] text-on-surface-variant hover:text-white transition-colors"
          >
            Documentation
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Field */}
        <div className="relative flex items-center bg-surface-container-low rounded-full px-4 py-1.5 border border-white/5 transition-all hover:bg-surface-container active:scale-[0.98]">
          <Search size={14} className="text-on-surface-variant mr-2" aria-hidden="true" />
          <input 
            type="text" 
            placeholder="QUERY SYSTEM..." 
            aria-label="Search system"
            className="bg-transparent border-none focus:ring-0 text-[10px] font-label font-bold tracking-widest text-on-surface placeholder:text-outline p-0 w-32 focus:w-48 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
          />
        </div>

        {/* Global Control Buttons */}
        <div className="flex items-center gap-1">
          <button
            aria-label="System Settings"
            title="System Settings"
            className="p-2 text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all rounded-full active:scale-90 aspect-square flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Settings size={18} aria-hidden="true" />
          </button>
          <button
            aria-label="Help and Documentation"
            title="Help and Documentation"
            className="p-2 text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all rounded-full active:scale-90 aspect-square flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <HelpCircle size={18} aria-hidden="true" />
          </button>
          <button
            aria-label="User Profile"
            title="User Profile"
            className="p-2 text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all rounded-full active:scale-90 aspect-square flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <UserCircle size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
