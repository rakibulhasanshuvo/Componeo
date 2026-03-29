"use client";

import React from "react";
import { 
  ArrowRight, 
  Terminal, 
  User, 
  Clock, 
  Hash, 
  ChevronRight 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ComponentRow } from "@/lib/repositories/componentsRepository";

interface ForgeActivityTableProps {
  components: ComponentRow[];
}

export default function ForgeActivityTable({ components }: ForgeActivityTableProps) {
  return (
    <div className="col-span-12">
      <div className="bg-surface-container-low rounded-xl border border-white/5 overflow-hidden shadow-2xl shadow-black/40">
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase py-1 border-b border-white/10">
              The Forge: Recent Unit Synthesis
            </span>
          </div>
          <Link 
            href="/create" 
            className="text-[10px] font-label font-bold text-primary tracking-[0.2em] uppercase flex items-center gap-1 group transition-all hover:brightness-110 active:scale-95"
          >
            Generate New Unit 
            <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-label font-bold text-outline tracking-tighter uppercase border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-5">Module Name</th>
                <th className="px-6 py-5">Forge Status</th>
                <th className="px-6 py-5">Build ID</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5 text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px] font-body bg-transparent">
              {components.slice(0, 5).map((comp, idx) => (
                <motion.tr 
                  key={comp.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-5 group-hover:pl-8 transition-all duration-300">
                    <div className="text-xs font-headline font-black text-white italic tracking-wide uppercase transition-all group-hover:text-primary">
                      {comp.title}
                    </div>
                    <div className="text-[9px] font-label text-outline uppercase tracking-widest leading-tight">
                      L1 INFRASTRUCTURE UNIT
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#00d2fd] animate-pulse"></div>
                      <span className="text-[10px] font-label font-bold text-primary tracking-widest uppercase">Stable</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-on-surface-variant group-hover:text-white transition-colors">
                      <Hash size={10} className="text-outline" />
                      <span className="text-[10px] font-mono opacity-60">
                        {comp.id.substring(0, 8).toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 uppercase font-label font-bold tracking-widest text-[#adaaaa] text-[9px]">
                    {comp.category}
                  </td>
                  <td className="px-6 py-5 text-right font-headline font-black text-xs text-white/50 group-hover:text-white transition-colors italic">
                    {new Date(comp.created_at).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
              {components.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-outline font-label font-bold tracking-widest uppercase opacity-40">
                    No active modules found in the Forge core.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Console status line */}
        <div className="px-6 py-3 bg-white/[0.01] flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-4 text-[9px] font-label font-bold text-outline tracking-widest uppercase">
             <div className="flex items-center gap-1.5 grayscale opacity-50">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
               ENCRYPTED LINK :: ACTIVE
             </div>
             <div className="opacity-30">SYSTEM ARCHIVE V1.0.4</div>
          </div>
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-[9px] font-label font-bold text-primary tracking-widest uppercase"
          >
            SYNERGY READY
          </motion.div>
        </div>
      </div>
    </div>
  );
}
