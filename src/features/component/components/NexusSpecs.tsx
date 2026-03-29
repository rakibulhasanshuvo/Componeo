"use client";

import React from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Calendar, 
  User, 
  Fingerprint,
  Zap,
  Globe,
  Lock
} from "lucide-react";
import { ComponentRow } from "@/lib/repositories/componentsRepository";
import { format } from "date-fns";

interface NexusSpecsProps {
  component: ComponentRow;
}

export default function NexusSpecs({ component }: NexusSpecsProps) {
  const synthesisDate = component.created_at 
    ? format(new Date(component.created_at), "MMM dd, yyyy HH:mm")
    : "UNKNOWN";

  const specs = [
    { label: "Unit ID", value: component.id.slice(0, 8), icon: Fingerprint, color: "text-cyan-400" },
    { label: "Category", value: component.category, icon: Cpu, color: "text-purple-400" },
    { label: "Synthesis", value: synthesisDate, icon: Calendar, color: "text-emerald-400" },
    { label: "Author", value: "Verified User", icon: User, color: "text-amber-400" },
    { label: "Registry", value: component.is_public ? "Public" : "Private", icon: component.is_public ? Globe : Lock, color: component.is_public ? "text-cyan-400" : "text-amber-400" },
    { label: "Stability", value: "99.8%", icon: ShieldCheck, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Title & Description HUD */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white uppercase">
          {component.title}
        </h1>
        <p className="text-sm font-body text-neutral-500 leading-relaxed max-w-xl">
          {component.description || "No archival description available for this atomic unit."}
        </p>
      </div>

      {/* Technical Data Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
        {specs.map((spec) => (
          <div key={spec.label} className="bg-white/[0.02] border border-white/5 p-4 flex flex-col gap-3 group hover:bg-white/[0.04] transition-all duration-500">
            <div className="flex items-center justify-between">
              <spec.icon size={14} className={`${spec.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <span className="text-[9px] font-headline font-black text-neutral-600 uppercase tracking-widest">{spec.label}</span>
            </div>
            <span className="text-xs font-label font-bold text-neutral-300 uppercase tracking-wider truncate">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Elite Action HUD */}
      <div className="pt-6 border-t border-white/5">
        <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 px-8 rounded-xl font-headline font-black text-sm tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(0,210,253,0.3)] hover:shadow-[0_0_50px_rgba(0,210,253,0.5)]">
          <Zap size={16} fill="black" className="group-hover:scale-125 transition-transform" />
          Synchronize Code
        </button>
        <p className="text-center mt-4 text-[9px] font-headline font-black text-neutral-700 uppercase tracking-[0.3em]">
          Secure Synthesis Authored at Edge
        </p>
      </div>
    </div>
  );
}
