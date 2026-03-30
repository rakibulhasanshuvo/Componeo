"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Activity, Layout, Cpu, Boxes, ShieldCheck, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Registry", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "The Forge", href: "/create" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <header className={`fixed left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between w-[95%] max-w-7xl px-8 py-3 bg-[#050505]/60 backdrop-blur-lg border border-white/10 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-700 ${scrolled ? "top-4 scale-[0.98]" : "top-8 scale-100"}`}>
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-headline font-black text-2xl tracking-tighter text-slate-100 uppercase italic group-hover:chromatic-text transition-all duration-500">
            COMPONEO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2 rounded-full font-headline font-bold tracking-[0.2em] uppercase text-[9px] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  isActive 
                    ? "text-white" 
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-white/10 rounded-full z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    <motion.div
                      layoutId="active-nav-glow"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 shadow-[0_0_10px_#00f2ff] rounded-full z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  </>
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden lg:block w-[1px] h-4 bg-white/10"></div>
          
          <Link 
            href="/dashboard"
            className="hidden sm:flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden relative focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Shield size={14} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform duration-500 relative z-10" />
            <span className="font-headline font-black tracking-[0.2em] uppercase text-[9px] relative z-10">
              DASHBOARD
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white text-black active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-3xl flex flex-col items-center justify-center glass-noise"
          >
            {/* Technical HUD Scanning Bar */}
            <motion.div 
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute left-0 w-full h-px bg-cyan-400/20 shadow-[0_0_20px_#00f2ff] z-[100] pointer-events-none"
            />

            <nav className="flex flex-col items-center gap-12 py-10 overflow-y-auto relative z-10 w-full px-12 max-h-[90vh]">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30, 
                      delay: idx * 0.05 
                    }}
                    className="w-full text-center group"
                  >
                    <Link
                      href={link.href}
                      className={`relative inline-block py-2 font-headline font-black text-5xl md:text-7xl tracking-tighter uppercase italic transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-lg ${
                        isActive ? "chromatic-text" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      <span className="relative">
                        {link.name}
                        {isActive && (
                          <motion.span 
                            layoutId="mobile-active-dot"
                            className="absolute -right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f2ff]"
                          />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="mt-16 w-full max-w-xs"
              >
                <Link 
                  href="/dashboard"
                  className="flex items-center justify-center gap-4 px-10 py-6 rounded-3xl bg-white text-black font-headline font-black tracking-widest uppercase text-xs shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all overflow-hidden relative group/btn focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <Shield size={20} className="relative z-10 group-hover/btn:rotate-12 transition-transform" />
                  <span className="relative z-10">DASHBOARD_ACCESS</span>
                </Link>
              </motion.div>
            </nav>

            {/* Matrix Background Effect */}
            <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
