"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { SquareCode as Code, ArrowUpRight, CheckCircle2, Trash2 } from "lucide-react";
import Link from "next/link";
import { ComponentRow } from "@/lib/repositories/componentsRepository";
import LivePreviewRenderer from "@/components/custom/LivePreviewRenderer";

interface ComponentCardProps {
  component: ComponentRow;
  idx: number;
  isDashboard?: boolean;
  onDelete?: (id: string) => void;
}

export default function ComponentCard({
  component,
  idx,
  isDashboard = false,
  onDelete,
}: ComponentCardProps) {
  const { id, title, description, category, code, thumbnail_url } = component;
  const [isCopied, setIsCopied] = useState(false);
  const [flash, setFlash] = useState(false);
  const [showLive, setShowLive] = useState(false);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setShowLive(false);
  };

  const onCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setFlash(true);
    setTimeout(() => {
      setIsCopied(false);
      setFlash(false);
    }, 2000);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  return (
    <motion.article
      role="gridcell"
      aria-labelledby={`title-${id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * (idx % 3), duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setShowLive(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-[2.5rem] p-4 flex flex-col gap-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-400/40 group overflow-hidden transition-all duration-700 ${flash ? "ring-2 ring-cyan-400 animate-pulse shadow-[0_0_50px_rgba(0,210,253,0.3)]" : ""}`}
    >
      {/* 3D Reflection Sheen */}
      <motion.div 
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          translateX: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]),
          translateY: useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]),
        }}
        className="absolute inset-0 pointer-events-none z-10 rounded-[2.5rem] overflow-hidden"
      />

      {/* High-Fidelity Snapshot & Stage Container */}
      <div 
        style={{ transform: "translateZ(60px)" }}
        className="h-80 w-full bg-[#020202] rounded-[2rem] relative overflow-hidden group/stage shadow-2xl border border-white/5"
      >
        <AnimatePresence mode="wait">
          {!showLive || !code ? (
            <motion.div 
              key="thumbnail"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              {thumbnail_url ? (
                <img 
                   src={thumbnail_url} 
                   alt={title} 
                   className="w-full h-full object-cover grayscale-[0.2] group-hover/stage:scale-110 transition-transform duration-[2s] ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
                  {/* Decorative Scan Lines */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,#00f2ff_50%)] bg-[size:100%_4px]" />
                  
                  {/* Rotating Radar Rings */}
                  <div className="absolute w-40 h-40 border border-cyan-500/10 rounded-full animate-[radar-rotate_10s_linear_infinite]" />
                  <div className="absolute w-64 h-64 border border-cyan-500/5 rounded-full animate-[radar-rotate_15s_linear_infinite_reverse]" />
                  
                  <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-md">
                      <Code size={32} className="text-cyan-400/40 animate-pulse" />
                    </div>
                    <div className="text-center space-y-1">
                      <span className="block text-[8px] font-headline font-black text-cyan-400 uppercase tracking-[0.4em] opacity-60">INITIALIZING_STAGE</span>
                      <span className="block text-[6px] font-label font-bold text-neutral-700 uppercase tracking-widest leading-none mt-1">NO_PREVIEW_DATA_DETECTED</span>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10" />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <LivePreviewRenderer code={code} className="transition-transform duration-[1.2s] ease-out scale-100 group-hover/stage:scale-105" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Diagnostic HUD Elements */}
        <div className="absolute top-6 left-6 z-20 flex gap-2 items-center px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/5">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
          </div>
          <span className="text-[7px] font-headline font-black text-white uppercase tracking-[0.25em]">
            {showLive ? "Holographic_Live" : "Atomic_Snapshot"}
          </span>
        </div>

        <div className="absolute top-6 right-6 z-20">
          <div className="bg-black/40 backdrop-blur-md border border-white/5 py-1.5 px-3 rounded-xl flex items-center gap-2">
            <span className="text-[8px] font-headline font-black text-neutral-400 uppercase tracking-widest leading-none">ID.{id.slice(0, 4)}</span>
          </div>
        </div>
        
        {/* Refractive Glass Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-90" />
        
        <Link 
          href={`/component/${id}`}
          className="absolute bottom-6 right-6 p-4 bg-cyan-400 rounded-2xl text-black hover:bg-cyan-300 transition-all duration-500 hover:scale-110 z-30 shadow-[0_0_30px_rgba(0,210,253,0.4)] opacity-0 group-hover/stage:opacity-100 translate-y-4 group-hover/stage:translate-y-0"
        >
          <ArrowUpRight size={20} />
        </Link>
      </div>

      <div 
        style={{ transform: "translateZ(40px)" }}
        className="px-3 pb-2 text-left space-y-4"
      >
        <div className="flex justify-between items-start gap-4">
          <h3 id={`title-${id}`} className="font-headline text-2xl font-black tracking-tighter text-white uppercase italic truncate group-hover:text-cyan-400 transition-colors duration-500">
            {title}
          </h3>
          <span className="font-headline text-[8px] bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full uppercase text-neutral-500 font-bold whitespace-nowrap group-hover:text-neutral-300 transition-colors tracking-[0.2em]">
            {category}
          </span>
        </div>
        
        <p className="text-xs text-neutral-600 font-body leading-relaxed line-clamp-2 h-10 group-hover:text-neutral-500 transition-colors duration-700">
          {description || "Architectural unit synthesized for the Componeo ecosystem."}
        </p>
        
        <div className="flex gap-4 pt-2">
           <Link 
            href={`/component/${id}`}
            className="flex-1 border border-white/5 bg-white/[0.02] text-neutral-400 font-headline font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-[9px] hover:bg-white/5 hover:text-white flex items-center justify-center gap-2 transition-all"
           >
            Explore
           </Link>
           <button 
             onClick={onCopy}
             aria-label={isCopied ? "Code copied to clipboard" : "Copy component code"}
             className={`flex-1 font-headline font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-[9px] transition-all flex items-center justify-center gap-2 px-4 ${
               isCopied 
                ? "bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]" 
                : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
             }`}
           >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                  <CheckCircle2 size={16} /> Fused
                </motion.div>
              ) : (
                <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <Code size={16} /> Fuse Code
                </motion.div>
              )}
            </AnimatePresence>
           </button>
        </div>
      </div>
    </motion.article>
  );
}
