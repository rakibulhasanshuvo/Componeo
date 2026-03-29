"use client";

import React from "react";
import { motion } from "framer-motion";
import { Boxes, Sparkles, Activity, Shield } from "lucide-react";

export default function ForgeBlueprintsMode() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 text-purple-400">
          <Boxes size={16} />
          <span className="text-[10px] font-headline font-black uppercase tracking-[0.4em]">Blueprint_Archive</span>
        </div>
        <h2 className="text-4xl font-headline font-black text-white italic uppercase tracking-tighter">
          Schematic <span className="chromatic-text">Analysis</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-premium glass-noise p-8 rounded-[2.5rem] border border-white/5 group hover:border-purple-500/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                <Shield size={20} />
              </div>
              <span className="text-[8px] font-headline font-black text-neutral-600 uppercase tracking-widest">v1.0.4</span>
            </div>
            <h3 className="font-headline font-black text-lg text-white uppercase italic mb-2">Atomic_Pattern_{i}</h3>
            <p className="text-[10px] text-neutral-500 font-body uppercase tracking-widest leading-relaxed">
              Diagnostic schematic for high-pressure UI nodes.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
