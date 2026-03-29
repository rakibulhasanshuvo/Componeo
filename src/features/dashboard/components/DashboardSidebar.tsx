"use client";

import React from "react";
import { 
  Terminal as TerminalIcon, 
  Package, 
  Hammer, 
  Activity, 
  Rocket 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Registry", icon: Package, href: "/", active: pathname === "/" },
    { label: "The Forge", icon: Hammer, href: "/create", active: pathname === "/create" },
    { label: "System Monitoring", icon: Activity, href: "/dashboard", active: pathname === "/dashboard" },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl shadow-[40px_0_80px_rgba(0,212,255,0.02)] flex flex-col py-6 px-4 gap-2 z-[90]">
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20">
            <TerminalIcon size={16} className="text-on-primary-fixed" />
          </div>
          <div>
            <div className="text-[10px] font-label font-bold text-on-surface-variant tracking-tighter leading-none">V2.4.0-STABLE</div>
            <div className="text-xs font-headline font-bold text-white tracking-widest uppercase">Admin Root</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 font-label font-bold uppercase tracking-widest text-[10px] ${
              item.active 
                ? "bg-white/5 text-primary border-r-4 border-primary shadow-[0_0_15px_rgba(0,210,253,0.1)]" 
                : "text-on-surface-variant opacity-70 hover:opacity-100 hover:bg-white/5"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="mt-auto mx-2 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-label font-bold uppercase tracking-widest text-[10px] py-4 rounded-full shadow-[0_4px_20px_rgba(0,210,253,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2">
        <Rocket size={14} />
        DEPLOY NEW MODULE
      </button>
    </aside>
  );
}
