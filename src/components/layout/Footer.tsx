"use client";

import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-16 px-8 bg-black border-t border-white/5 flex flex-col items-center gap-12 relative overflow-hidden">
      {/* Background Refraction */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-cyan-400/5 blur-[120px] pointer-events-none" />
      
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="text-3xl font-black text-white font-headline tracking-tighter italic chromatic-text">COMPONEO</div>
        <p className="font-headline text-[9px] tracking-[0.4em] uppercase text-neutral-600 font-black">
          © 2026 COMPONEO. MACHINED IN THE VOID.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 relative z-10">
        <Link 
          href="/docs"
          className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-cyan-400 transition-all font-bold"
        >
          Documentation
        </Link>
        <Link 
          href="https://github.com/componeo"
          target="_blank"
          className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-cyan-400 transition-all font-bold flex items-center gap-2"
        >
          <Github size={14} />
          GitHub Matrix
        </Link>
        <Link 
          href="https://discord.com/invite/componeo"
          target="_blank"
          className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-cyan-400 transition-all font-bold"
        >
          Discord Uplink
        </Link>
        <Link 
          href="/pricing"
          className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-cyan-400 transition-all font-bold"
        >
          Protocols
        </Link>
      </div>
      
      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </footer>
  );
}
