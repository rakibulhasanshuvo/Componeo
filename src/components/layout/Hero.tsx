"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FluidBackground from "@/components/custom/FluidBackground";

export default function Hero() {
  const words = "The Atomic React Ecosystem".split(" ");

  return (
    <header className="relative max-w-7xl mx-auto mb-32 pt-24 pb-12 text-center md:text-left">
      <FluidBackground />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="font-headline text-[10px] tracking-[0.2em] text-cyan-400 uppercase font-black">
            System Status: Optimized
          </span>
        </motion.div>

        <h1 className="font-headline text-5xl sm:text-6xl md:text-[120px] font-black tracking-tighter mb-8 md:leading-[1.1] text-white uppercase italic pb-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="inline-block mr-[0.2em] last:mr-0 last:chromatic-text"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-body text-base md:text-xl text-neutral-400 max-w-2xl mx-auto md:mx-0 leading-relaxed mb-12"
        >
          A premium registry of high-performance React components. Machined for
          absolute speed, layered with <span className="text-white font-bold opacity-100">Liquid Glass</span> translucency, and built for the next generation of digital interfaces.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <Link 
            href="#main-content"
            className="w-full sm:w-auto bg-white text-black font-headline font-bold uppercase tracking-widest px-10 py-5 rounded-2xl text-[10px] hover:scale-105 transition-all shadow-2xl hover:shadow-cyan-400/20 flex items-center justify-center text-center"
          >
            Explore Registry
          </Link>
          <Link 
            href="/docs"
            className="w-full sm:w-auto glass-premium text-white font-headline font-bold uppercase tracking-widest px-10 py-5 rounded-2xl text-[10px] hover:bg-white/5 transition-all border-white/10 flex items-center justify-center text-center"
          >
            Documentation
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
