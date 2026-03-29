"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* SVG Filter for Liquid Gooeiness */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.div 
        style={{ filter: "url(#liquid-goo)" }} 
        className="relative w-full h-full opacity-40 blur-[40px] mix-blend-screen"
      >
        {/* Blob 1: Cyan Reactive */}
        <motion.div
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 150, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 45, -45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/30 rounded-full"
        />

        {/* Blob 2: Purple Core */}
        <motion.div
          animate={{
            x: [0, -200, 100, 0],
            y: [0, 150, -100, 0],
            scale: [1, 0.8, 1.3, 1],
            rotate: [0, -180, 180, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full"
        />

        {/* Blob 3: Deep Orbital */}
        <motion.div
          animate={{
            x: [0, 300, -300, 0],
            y: [0, 200, -200, 0],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full"
        />
      </motion.div>

      {/* Surface Noise */}
      <div className="absolute inset-0 bg-transparent opacity-[0.03] grain-overlay" />
    </div>
  );
}
