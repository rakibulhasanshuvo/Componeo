"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StabilityIndex() {
  const stability = 98.4;

  return (
    <div className="col-span-12 lg:col-span-7 bg-surface-container-low rounded-xl p-8 border border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[450px]">
      {/* HUD Header */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00d2fd]"></div>
        <span className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase">
          Core Architecture Health
        </span>
      </div>

      {/* Circular Visualization */}
      <div className="relative flex items-center justify-center">
        <svg className="w-80 h-80 transform -rotate-90">
          {/* Background Ring */}
          <circle 
            className="text-surface-variant opacity-20" 
            cx="160" cy="160" fill="transparent" r="140" 
            stroke="currentColor" strokeWidth="2"
          />
          {/* Stability Ring */}
          <motion.circle 
            initial={{ strokeDashoffset: 880 }}
            animate={{ strokeDashoffset: 120 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-primary opacity-80" 
            cx="160" cy="160" fill="transparent" r="140" 
            stroke="currentColor" strokeDasharray="880" strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Inner Ring (Decorative) */}
          <circle 
            className="text-surface-variant opacity-10" 
            cx="160" cy="160" fill="transparent" r="120" 
            stroke="currentColor" strokeWidth="1"
          />
          {/* Secondary Data Ring */}
          <motion.circle 
            initial={{ strokeDashoffset: 690 }}
            animate={{ strokeDashoffset: 200 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            className="text-primary-container opacity-40 shadow-[0_0_20px_rgba(0,210,253,0.3)]" 
            cx="160" cy="160" fill="transparent" r="110" 
            stroke="currentColor" strokeDasharray="690" strokeWidth="12"
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase mb-1">
            Stability Index
          </span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl font-headline font-black text-white tracking-tighter italic"
          >
            {stability}<span className="text-primary text-3xl ml-1">%</span>
          </motion.span>
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-label font-bold text-primary tracking-widest uppercase shadow-[0_0_20px_rgba(0,210,253,0.1)]"
          >
            Monolithic Integrity: OPTIMAL
          </motion.div>
        </div>
      </div>

      {/* Technical Decorative Elements */}
      <div className="absolute bottom-6 right-6 text-right font-label text-[10px] text-outline tracking-widest uppercase space-y-1 opacity-60 font-bold">
        <div>ENC_TYPE: SH-256</div>
        <div>LAYER: L0_INFRA</div>
      </div>

      {/* Radial Scanline Line Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_0%,white_1px,transparent_1px)] bg-[size:100%_4px] animate-[slide_20s_linear_infinite]" />
    </div>
  );
}
