import { ComponentRow } from "@/lib/repositories/componentsRepository";

export const ELITE_MOCK_COMPONENTS: ComponentRow[] = [
  {
    id: "mock-1",
    created_at: new Date().toISOString(),
    title: "Refraction Matrix",
    description: "High-fidelity SVG displacement material for advanced glass-morphism. Features fractal noise distortion and scroll-synced chromatic shift.",
    category: "Refractive Backgrounds",
    thumbnail_url: null,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RefractionMatrix() {
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center bg-black overflow-hidden rounded-[2rem]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent" />
      
      <motion.div 
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.02, 0.98, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 p-12 refractive-glass rounded-3xl border border-white/10 shadow-2xl backdrop-blur-3xl"
      >
        <h2 className="font-headline text-4xl font-black text-white italic tracking-tighter uppercase chromatic-text">
          Refractive
        </h2>
        <p className="text-[10px] text-cyan-400 font-headline uppercase tracking-[0.4em] mt-2">
          Matrix Active
        </p>
      </motion.div>
    </div>
  );
}`,
    author_id: "system",
    is_public: true
  },
  {
    id: "mock-2",
    created_at: new Date().toISOString(),
    title: "Intent HUD",
    description: "Adaptive command interface that morphs based on user goal. Implements Purpose-Adaptive design patterns for zero-latency workflows.",
    category: "HUD Navs",
    thumbnail_url: null,
    code: `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, Activity, ChevronRight } from "lucide-react";

export default function IntentHUD() {
  const [active, setActive] = useState(false);

  return (
    <div className="p-12 flex flex-col items-center justify-center gap-8 bg-neutral-950 rounded-[2.5rem] border border-white/5">
      <motion.div 
        layout
        onClick={() => setActive(!active)}
        className={\`cursor-pointer glass-premium rounded-2xl flex items-center gap-4 transition-all duration-500 \${active ? "px-8 py-6 w-full max-w-md" : "p-4 w-16 h-16 justify-center"}\`}
      >
        <Command className={\`text-cyan-400 \${active ? "w-6 h-6" : "w-8 h-8"}\`} />
        
        <AnimatePresence>
          {active && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 flex items-center justify-between"
            >
              <span className="font-headline text-xs font-black text-white uppercase tracking-widest italic">Command Matrix</span>
              <Activity size={16} className="text-cyan-400/50 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <p className="text-[9px] font-headline text-neutral-600 uppercase tracking-widest">
        Click Matrix to Toggle Intent
      </p>
    </div>
  );
}`,
    author_id: "system",
    is_public: true
  },
  {
    id: "mock-3",
    created_at: new Date().toISOString(),
    title: "Kinetic Card",
    description: "Premium UI unit with 3D tilt physics and haptic chromatic feedback on interaction. Optimized for high-fidelity component showcases.",
    category: "Atomic Cards",
    thumbnail_url: null,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function KineticCard() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="p-10 glass-card rounded-[2rem] border-white/5 shadow-2xl flex flex-col items-center text-center gap-4 group cursor-pointer"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all duration-500">
        <Sparkles size={32} />
      </div>
      <div className="space-y-1">
        <h3 className="font-headline text-2xl font-black text-white italic uppercase tracking-tighter">Kinetic Unit</h3>
        <p className="text-[10px] text-neutral-500 font-headline uppercase tracking-[0.3em]">Module_v1.0.tsx</p>
      </div>
      <div className="w-full h-[1px] bg-white/5 my-2" />
      <button className="w-full bg-white text-black font-headline font-black uppercase tracking-widest py-3 rounded-xl text-[9px] hover:scale-105 active:scale-95 transition-all">
        Fuse Unit
      </button>
    </motion.div>
  );
}`,
    author_id: "system",
    is_public: true
  },
  {
    id: "mock-4",
    created_at: new Date().toISOString(),
    title: "Diagnostic Terminal",
    description: "Functional terminal UI for telemetry streams. Features monospaced typography and real-time activity markers.",
    category: "Logic Fragments",
    thumbnail_url: null,
    code: `"use client";

import React from "react";
import { Terminal, Activity } from "lucide-react";

export default function DiagnosticTerminal() {
  const logs = [
    "[16:04:21] SYNC: Established",
    "[16:04:22] MATRIX: Refracting",
    "[16:04:23] UNIT: Fusing Complete"
  ];

  return (
    <div className="w-full bg-black rounded-3xl p-8 border border-white/5 font-mono shadow-inner shadow-cyan-400/5">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-cyan-400">
           <Terminal size={16} />
           <span className="text-[10px] font-headline uppercase tracking-widest font-black">System_Logs</span>
        </div>
        <Activity size={14} className="text-emerald-400 animate-pulse" />
      </div>
      <div className="space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="text-[10px] text-neutral-500 flex gap-4">
            <span className="text-cyan-400/40">>></span>
            <span>{log}</span>
          </div>
        ))}
        <div className="text-[10px] text-cyan-400 animate-pulse flex gap-4 mt-4">
           <span>|</span>
           <span className="animate-typing">Awaiting input...</span>
        </div>
      </div>
    </div>
  );
}`,
    author_id: "system",
    is_public: true
  },
  {
    id: "mock-5",
    created_at: new Date().toISOString(),
    title: "Elite Pulse",
    description: "Multi-layered button unit with refractive border and internal glow. Optimized for high-priority CTA interactions.",
    category: "Fused Buttons",
    thumbnail_url: null,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ElitePulse() {
  return (
    <button className="group relative px-8 py-4 bg-black rounded-2xl overflow-hidden border border-white/5 active:scale-95 transition-transform">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10 font-headline font-black text-[10px] tracking-[0.3em] text-white uppercase italic">Initialize Fusion</span>
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-cyan-400/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </button>
  );
}`,
    author_id: "system",
    is_public: true
  },
  {
    id: "mock-6",
    created_at: new Date().toISOString(),
    title: "Quantum State",
    description: "Experimental unit showcasing probabilistic UI rendering. Morphs its visual identity based on user interaction frequency.",
    category: "Experimental",
    thumbnail_url: null,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function QuantumState() {
  return (
    <div className="p-10 border-2 border-dashed border-cyan-400/20 rounded-[2.5rem] bg-cyan-400/[0.02] flex flex-col items-center text-center gap-4">
      <div className="w-20 h-20 rounded-full border border-cyan-400/20 flex items-center justify-center animate-spin-slow">
        <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#00f2ff]" />
      </div>
      <h3 className="font-headline text-xl font-black text-cyan-400 uppercase tracking-widest italic animate-pulse">Experimental Unit</h3>
      <p className="text-[9px] text-neutral-600 font-headline uppercase leading-relaxed tracking-[0.2em]">Restricted_Access_Protocol_Active</p>
    </div>
  );
}`,
    author_id: "system",
    is_public: true
  }
];
