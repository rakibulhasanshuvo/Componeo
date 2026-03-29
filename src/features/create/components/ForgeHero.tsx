"use client";

import React from "react";
import { Zap, Database } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgeHero({ onStartBuilding }: { onStartBuilding: () => void }) {
  return (
    <section className="relative rounded-[2rem] overflow-hidden mb-12 bg-[#131313] min-h-[450px] flex items-center ghost-border shadow-2xl group">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-[3s]" 
          alt="Abstract 3D architectural lines"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeFiSMsScWBdDhhZK5cA2Y50Kvw1vqcx7NRLiS9cr00YwQzU_CY9Jdn7tmeIqe1aAeMdshkh_TsBvgDjv_MNfkMwHLeMLhNxTqQEobtddZ3diDuFWPa1xU3E3y6VAhhswSsHFT1AY6bCzWf27coicX8z2wuH_-w-9BofLyz94tqbqR5_EbG_WWOvOTAzwaXE1Lr0bvayvFAxnALDbdeNaw1HMyYOOfKVv0GGEny43LhKlmAUy92GBqMxPul6woDIl3KAsgsW_ptWg" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent"></div>
      </div>

      <div className="relative z-10 p-16 lg:w-2/3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-4 py-1.5 rounded-full font-headline text-[9px] tracking-[0.2em] font-black uppercase">CORE MODULE</span>
          <span className="text-neutral-500 font-headline text-[9px] tracking-widest uppercase">STABLE RELEASE V4.0.1</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-headline font-black text-6xl lg:text-8xl mb-8 tracking-tighter uppercase leading-[0.9] text-white italic"
        >
          The Forge: <br/><span className="text-cyan-400 chromatic-text">Unified Compiler</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-neutral-400 text-lg font-body max-w-xl mb-12 leading-relaxed uppercase tracking-tighter"
        >
          High-end digital architecture requires precision execution. Deploy unified logic structures across multi-vector environments with zero latency.
        </motion.p>

        <div className="flex flex-wrap gap-6">
          <button 
            onClick={onStartBuilding}
            className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-black font-headline font-black tracking-widest px-12 py-5 rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:scale-105 hover:brightness-110 active:scale-95 transition-all uppercase text-xs"
          >
            START BUILDING
          </button>
          <Link 
            href="/dashboard"
            className="glass-panel text-white font-headline font-black tracking-widest px-12 py-5 rounded-2xl ghost-border hover:bg-white/5 active:scale-95 transition-all uppercase text-xs flex items-center justify-center gap-3 decoration-transparent"
          >
            VIEW ARCHIVE
          </Link>
        </div>
      </div>

      {/* Technical Spec Sidebar Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block w-72 glass-panel p-8 rounded-3xl ghost-border backdrop-blur-xl"
      >
        <div className="space-y-8">
          <div>
            <p className="text-[9px] font-headline font-black text-cyan-400 tracking-[0.3em] mb-3 uppercase">SYSTEM STATUS</p>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-cyan-400 shadow-[0_0_10px_#00f2ff]"
              ></motion.div>
            </div>
            <div className="flex justify-between mt-3 font-headline font-black text-[10px] tracking-tighter">
              <span className="text-neutral-500">OPTIMIZED</span>
              <span className="text-cyan-400">94%</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Zap className="text-cyan-400 w-5 h-5" />
            <div>
              <p className="text-[9px] font-headline font-black text-neutral-500 tracking-widest uppercase">LATENCY</p>
              <p className="text-sm font-headline font-black text-white italic">0.002 MS</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Database className="text-cyan-400 w-5 h-5" />
            <div>
              <p className="text-[9px] font-headline font-black text-neutral-500 tracking-widest uppercase">NODE CAP</p>
              <p className="text-sm font-headline font-black text-white italic">12.4 TB/S</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
