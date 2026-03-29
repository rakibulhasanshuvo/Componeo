"use client";

import React, { useState } from "react";
import { History, Box, Activity, HelpCircle, FileText, MousePointer2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgeBlueprint() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Blueprint Visualizer */}
      <div 
        className="lg:col-span-8 bg-[#0e0e0e] rounded-[2.5rem] p-12 ghost-border relative overflow-hidden group shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h4 className="font-headline font-black text-3xl tracking-tight uppercase text-white italic">System Blueprint: <span className="text-cyan-400 chromatic-text">Project EON</span></h4>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-neutral-500 text-[10px] font-headline tracking-[0.4em] uppercase font-black">REAL-TIME ARCHITECTURAL FLOW</p>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className={`w-4 h-4 rounded-full transition-all duration-500 ${isHovered ? 'bg-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.6)] animate-pulse' : 'bg-white/5 border border-white/10'}`}></div>
            <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10"></div>
            <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10"></div>
          </div>
        </div>

        {/* Decorative Blueprint Graphic */}
        <div className="relative h-80 w-full border border-white/5 rounded-3xl bg-[#050505] overflow-hidden group-hover:border-cyan-400/20 transition-all duration-1000 shadow-inner">
          <div 
            className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000" 
            style={{ backgroundImage: 'radial-gradient(#00D4FF 1px, transparent 1px)', backgroundSize: '30px 30px' }}
          ></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
               animate={{ 
                 scale: isHovered ? [1, 1.02, 1] : [1, 1.05, 1], 
                 rotate: isHovered ? [0, 2, 0] : [0, 5, 0] 
               }}
               transition={{ duration: isHovered ? 4 : 10, repeat: Infinity, ease: "easeInOut" }}
               className="w-3/4 h-3/4 border border-cyan-400/10 border-dashed rounded-full flex items-center justify-center relative"
            >
              <div className="absolute inset-0 border border-cyan-400/5 rounded-full scale-110 animate-[spin_60s_linear_infinite]"></div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveNode('CORE')}
                className="w-1/3 h-1/3 border-2 border-cyan-400/40 rounded-[2.5rem] flex items-center justify-center bg-cyan-400/5 shadow-[0_0_50px_rgba(0,212,255,0.1)] group-hover:bg-cyan-400/10 transition-all cursor-pointer z-20"
              >
                <Box className="text-cyan-400 w-12 h-12 group-hover:scale-110 transition-transform" />
              </motion.div>

              {/* Orbital Nodes */}
              <OrbitalNode className="top-0 left-1/2 -translate-x-1/2" label="INPUT" />
              <OrbitalNode className="bottom-0 left-1/2 -translate-x-1/2" label="OUTPUT" />
              <OrbitalNode className="left-0 top-1/2 -translate-y-1/2" label="LOGIC" />
              <OrbitalNode className="right-0 top-1/2 -translate-y-1/2" label="SYNC" />
            </motion.div>
            
            {/* Dynamic connecting lines */}
            <div className="absolute left-16 top-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent to-cyan-400/20 group-hover:to-cyan-400/40 transition-all duration-1000"></div>
            <div className="absolute right-16 top-1/2 w-32 h-[1px] bg-gradient-to-l from-transparent to-cyan-400/20 group-hover:to-cyan-400/40 transition-all duration-1000"></div>
          </div>
          
          {/* HUD Elements */}
          <div className="absolute top-8 left-8 space-y-2">
            <div className="font-headline font-black text-[8px] tracking-[0.5em] text-neutral-600 uppercase">COORD_X: <span className="text-neutral-400 tracking-tighter shadow-sm">{isHovered ? '12.04.88' : '00.00.00'}</span></div>
            <div className="font-headline font-black text-[8px] tracking-[0.5em] text-neutral-600 uppercase">VECTOR_01: <span className="text-cyan-400 opacity-50">STABLE</span></div>
          </div>
          <div className="absolute bottom-8 right-8 text-right space-y-2">
            <div className="font-headline font-black text-[8px] tracking-[0.5em] text-neutral-600 uppercase">SCAN_MODE: <span className="text-cyan-400 opacity-80">{isHovered ? 'RESONATING' : 'IDLE'}</span></div>
            <div className="font-headline font-black text-[8px] tracking-[0.5em] text-neutral-600 uppercase italic">LEVEL: ARCHITECT</div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-8">
        {/* Recent Forges */}
        <div className="bg-[#131313] p-10 rounded-[2.5rem] ghost-border shadow-2xl h-full flex flex-col">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 text-cyan-400 shadow-inner">
              <History className="w-6 h-6" />
            </div>
            <h4 className="font-headline font-black text-xs tracking-[0.2em] uppercase text-white italic">RECENT FORGES</h4>
          </div>
          <div className="space-y-6 flex-1">
            <ForgeHistoryItem title="NEURAL_MESH_V2" time="2M AGO" />
            <ForgeHistoryItem title="QUANTUM_RELAY_CORE" time="45M AGO" />
            <ForgeHistoryItem title="STATIC_GATEWAY_3" time="3H AGO" />
            <ForgeHistoryItem title="VOID_RUNNER_ALPHA" time="1D AGO" />
          </div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="mt-12 p-8 rounded-3xl bg-cyan-400/5 border border-cyan-400/20 relative overflow-hidden group cursor-help transition-all"
          >
            <div className="relative z-10">
              <h4 className="font-headline font-black text-[10px] tracking-[0.3em] uppercase text-cyan-400 mb-3">SYSTEM COMMAND</h4>
              <p className="text-xs font-body leading-relaxed text-neutral-400 uppercase tracking-tighter">
                Access <kbd className="px-2 py-0.5 bg-[#1a1a1a] rounded border border-white/10 text-[9px] text-white">CTRL + ENT</kbd> to force-compile the atomic structure immediately.
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-125 transition-all duration-1000 group-hover:rotate-12">
              <Activity className="w-24 h-24 text-cyan-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OrbitalNode({ className, label }: { className: string, label: string }) {
  return (
    <div className={`absolute p-3 rounded-xl bg-[#0c0c0c] border border-white/10 text-cyan-400 group-hover:border-cyan-400/40 transition-all duration-700 shadow-2xl ${className}`}>
      <div className="w-2 h-2 rounded-full bg-cyan-400 mb-2 shadow-[0_0_10px_#22d3ee]"></div>
      <span className="text-[7px] font-headline font-black tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors uppercase italic">{label}</span>
    </div>
  );
}

function ForgeHistoryItem({ title, time }: { title: string, time: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer hover:border-cyan-400/20 transition-all">
      <div className="flex items-center gap-3">
        <MousePointer2 className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
        <span className="text-xs font-headline font-black tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase italic">{title}</span>
      </div>
      <span className="text-[9px] font-headline font-black text-neutral-600 tracking-widest uppercase">{time}</span>
    </div>
  );
}
