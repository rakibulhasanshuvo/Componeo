"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Zap, ShieldCheck, Activity } from "lucide-react";

export default function ForgeStagingMode() {
  return (
    <div className="space-y-12 h-full flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] animate-pulse" />
        <div className="relative glass-premium glass-noise p-20 rounded-[4rem] border border-white/10 flex flex-col items-center gap-10 shadow-2xl">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Rocket size={48} className="animate-bounce" />
          </div>
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-headline font-black text-white italic uppercase tracking-tighter">
              Staging <span className="chromatic-text">Buffer</span>
            </h2>
            <p className="text-neutral-500 font-body text-xs tracking-[0.3em] uppercase max-w-sm mx-auto">
              Testing component integrity before global deployment.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="px-10 py-4 bg-emerald-500 text-black font-headline font-black text-[10px] tracking-widest uppercase rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all">
              Initialize Test Suite
            </button>
            <button className="px-10 py-4 border border-white/5 bg-white/5 text-neutral-400 font-headline font-black text-[10px] tracking-widest uppercase rounded-2xl hover:text-white transition-all">
              Clear Buffer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
