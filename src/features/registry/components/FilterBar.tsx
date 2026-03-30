"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { 
  Layers, 
  MousePointer2, 
  Layout, 
  Box, 
  Zap,
  Activity
} from "lucide-react";

const CATEGORIES = [
  { name: "All Units", icon: Layers, count: "24" },
  { name: "Cursors", icon: MousePointer2, count: "06" },
  { name: "Backgrounds", icon: Box, count: "04" },
  { name: "Layouts", icon: Layout, count: "08" },
  { name: "Buttons", icon: Zap, count: "04" },
  { name: "Micro-Animations", icon: Activity, count: "02" },
];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All Units";

  const handleCategoryChange = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (name === "All Units") {
      params.delete("category");
    } else {
      params.set("category", name);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6 mb-12">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,210,253,0.5)]" />
          <h2 className="text-[10px] font-headline font-black text-white uppercase tracking-[0.3em]">
            Registry Filter // Category Selection
          </h2>
        </div>
        <div className="text-[9px] font-label font-bold text-neutral-600 uppercase tracking-widest hidden md:block">
          Select Unit Category for Synthesis
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 overflow-hidden ${
                isActive 
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400 shadow-[0_0_30px_rgba(0,210,253,0.15)]" 
                  : "border-white/5 bg-white/[0.02] text-neutral-500 hover:border-white/20 hover:text-neutral-300"
              }`}
            >
              <cat.icon size={14} className={isActive ? "text-cyan-400" : "text-neutral-600 group-hover:text-neutral-400"} />
              <span className="font-headline text-[10px] font-black uppercase tracking-widest leading-none">
                {cat.name}
              </span>
              <span className={`text-[8px] font-label font-bold px-1.5 py-0.5 rounded border border-current opacity-40 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100" : ""}`}>
                {cat.count}
              </span>

              {/* Holographic underline for active state */}
              {isActive && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-cyan-400 shadow-[0_0_10px_rgba(0,210,253,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
