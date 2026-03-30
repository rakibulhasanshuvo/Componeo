"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Search, Sparkles, Layout, Monitor, ShoppingBag, Grid, Palette, Plus, Code, Terminal, Settings } from "lucide-react";

const templates = [
  {
    title: "SaaS Landing Page",
    category: "STABLE v2.4",
    description: "High-conversion landing page with liquid-glass components and dark mode architecture.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRZeos-Lpm4STWSwRdizhU2rKe-Ep1y1l_JJzJWwDlh-6vfjwqOHSNHSCs5wsNbLdZZmA6HSjB4dpAVruE8HmdZkKFvfBWdEdubw7VkITSW5UFP1MuJZRYZw5UOThzjxViJlkTqhdvvEqY4WL42JsDUOewxtgcLP3h0-n5dctOQMoz_hXg3-q4wlkDoYGtWw0tgShF8a1pQWoJ01el8ns391UuACJfEMMC0x2rizHopvLJWnWIOZsZTyvQkBe_ClM54w2MMTE7mKg",
    glow: "shadow-cyan-500/10",
    icon: <Sparkles size={16} />,
    tags: [<Terminal key="t" size={14} />, <Settings key="s" size={14} />],
  },
  {
    title: "Portfolio Template",
    category: "PREMIUM",
    description: "An editorial-focused portfolio for developers and designers with fluid motion states.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChk6v6YAY-_CA4s8_8_CYwvSwfUOqoz2esVeAbsL7w-WUnAC-E_FFFNnGnXOpmDjwtWNL5UB7H-eUyfV6PrriWMb0xts3_IH_DVX8Q1NgNoo35qfKpSgt6tA_5hIq_iK1Ii6M3Zc0C_m-MHRtNVu7ckBzSN82prKniOAJ-C_fkdkdbwYnrJ94tFJDKgRPQQGuINFX084PJIt3giUQBABWP1xtqnkrH7XHFLZugSLeWMxXLFrun0zHRYIdpQ09oZFwczitrOlxVrX8",
    glow: "shadow-purple-500/10",
    icon: <Palette size={16} />,
    tags: [<Palette key="p" size={14} />, <Monitor key="m" size={14} />],
  },
  {
    title: "E-commerce Pro",
    category: "NEW RELEASE",
    description: "Full-stack ready commerce solution with optimized cart logic and immersive product views.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpzRg5rd9OoECWVYLo_r70mCqbZ64tFgxiAXf8ajKCW9N7yReoQjMXcyvIgagPaETMgdh0oJJqd56bkC956F6AZVHJJTuyeOWYkpD9OfgTBTqWl50AcEkzYcy_OFy0g0NFoH4XUl5nK5i-mPLA8TLB9zFs0DwPnd5XbTeUpD3HKi_E29XtaUondSPAGZ_H5pph_4j_6aaPHLvYLivpapisIrC8_c1w9HgR-XIfVAxuUP63wO8BkSlf9M9rCJzR6HMKODoWpvEi47k",
    glow: "shadow-cyan-500/10",
    icon: <ShoppingBag size={16} />,
    tags: [<ShoppingBag key="sb" size={14} />, <Grid key="g" size={14} />],
  },
  {
    title: "Admin Matrix",
    category: "ENTERPRISE",
    description: "Comprehensive management dashboard with modular widgets and data-heavy analytics views.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCKclnLpUn7OkF6r0DDUuL1dKyZCIwQRnjHuT2ybgyZRFfCeUDR40XFm5S3bD5X9tK8f-2TIm-OrRoiLCk6JKkgjTDMuWxHYYgBBNnjXjkFkAoCsQUDeavGQVwrl1iTMTA86Co9i5hTZ5WZ1uHn0dgSp_DwyWwLWJaDJnwqL5faFmkJtRKVf4n0QsWw1ihc0gj1P2o6km1BLo6XimdAfmmj4X1mGUZamBRcaWF09MCZI3r9i-CI8odfXkvpn9Ga2yBV71aTmhPj6o",
    glow: "shadow-purple-500/10",
    icon: <Grid size={16} />,
    tags: [<Grid key="g" size={14} />, <Settings key="s" size={14} />],
  },
  {
    title: "Studio Genesis",
    category: "BETA",
    description: "Experimental layout for high-end creative agencies and avant-garde digital studios.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDil2THeh43Om2GS1xrtlk7PMlE1NwiCeOz4vqMkNVn9fOp_XzTZ3jk4laTIW17r5uW_PZmLuxzObBiJ7wzvaX_g2SKAThO5jsfSP5Xlt83OvqfM8rgqiqWOc7sWdoogAuGHJJ4eZGZiFMo1boGlLOegvmOT1qMSVmDuwbpRN_UWQ8wC2AwvdmXBPFMdRFjZREy_jwO9puAodzWYXS3fJd5nDhDSr8JqKSryRHH0wBiuJVk-NxDfYhY2TSvISixobimRpJ33jzjHoI",
    glow: "shadow-cyan-500/10",
    icon: <Monitor size={16} />,
    tags: [<Monitor key="m" size={14} />, <Palette key="p" size={14} />],
  },
];

export default function TemplatesPage() {
  return (
    <div className="asymmetric-gradient min-h-screen text-white selection:bg-cyan-400 selection:text-black">
      <Navbar />

      <main className="pt-40 pb-32 px-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-32 relative">
          <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-[1px] w-12 bg-cyan-400"></span>
            <span className="font-headline text-[10px] tracking-[0.4em] text-cyan-400 uppercase font-bold">
              Premium React Ecosystem
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-tight pb-2 uppercase italic"
          >
            TEMPLATES <br />
            <span className="chromatic-text">LIBRARY</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-2xl text-base md:text-xl font-body leading-relaxed"
          >
            Machined precision for the modern web. Explore our collection of high-fidelity React templates designed for performance, scalability, and absolute aesthetic dominance.
          </motion.p>
        </header>

        {/* Filters HUD */}
        <section className="mb-20">
          <div className="glass-premium p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6 border border-white/5">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-cyan-400/5 border border-cyan-400/20 rounded-xl shrink-0">
              <span className="font-headline text-[10px] font-black uppercase tracking-widest text-cyan-400">Active View:</span>
              <span className="font-headline text-xs font-bold text-white tracking-widest">ALL_RESOURCES</span>
            </div>
            <div className="h-8 w-[1px] bg-white/5 hidden md:block" />
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
              {["SaaS", "E-commerce", "Portfolio", "Dashboards", "Bento"].map((cat) => (
                <button 
                  key={cat}
                  className="px-6 py-2.5 rounded-xl glass-premium border border-white/5 hover:border-cyan-400/30 font-headline text-[10px] font-black uppercase tracking-widest transition-all text-neutral-400 hover:text-white whitespace-nowrap"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {templates.map((template, idx) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-premium group relative overflow-hidden rounded-[2.5rem] border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${template.glow}`}
            >
              <div className="aspect-video w-full overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-black/60 backdrop-blur-xl border border-white/10 text-white font-headline text-[9px] font-black px-4 py-1.5 rounded-lg tracking-[0.2em] uppercase">
                    {template.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-headline text-2xl font-black tracking-tighter text-white uppercase italic group-hover:chromatic-text transition-all leading-tight pb-1">
                    {template.title}
                  </h3>
                  <div className="text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                    {template.icon}
                  </div>
                </div>
                
                <p className="text-neutral-500 text-sm leading-relaxed mb-10 font-body">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {template.tags.map((tag, i) => (
                      <div key={i} className="w-10 h-10 rounded-xl border-2 border-black bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-white transition-colors">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <button className="glass-premium border border-white/10 text-white font-headline font-black uppercase text-[10px] tracking-[0.3em] px-8 py-4 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all hover:neon-glow-cyan active:scale-95 shadow-xl">
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* New Project Placeholder */}
          <div className="border-2 border-dashed border-white/5 bg-white/[0.01] rounded-[2.5rem] flex flex-col items-center justify-center p-12 group hover:bg-white/[0.02] transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:neon-glow-cyan transition-all border border-white/5">
              <Plus size={24} className="text-cyan-400 animate-pulse" />
            </div>
            <h3 className="font-headline text-xl font-black tracking-tight text-white mb-3 uppercase">Build Custom</h3>
            <p className="text-neutral-600 text-sm text-center font-body mb-8 max-w-[15rem] leading-relaxed">
              Need something unique? Our bespoke design engine is launching soon.
            </p>
            <button className="text-cyan-400/40 font-headline text-[9px] font-black uppercase tracking-[0.4em] hover:text-cyan-400 transition-colors underline decoration-2 underline-offset-8">
              Get Notified
            </button>
          </div>
        </section>

        {/* Implementation HUD */}
        <section className="mt-48 mb-20 max-w-4xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-2 bg-cyan-400/10 rounded-lg border border-cyan-400/20">
              <Code size={18} className="text-cyan-400" />
            </div>
            <h2 className="font-headline text-2xl font-black tracking-widest uppercase italic">Implementation Shell</h2>
          </div>
          
          <div className="glass-premium rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
            <div className="flex items-center gap-3 px-8 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
              </div>
              <span className="ml-4 font-headline text-[9px] text-neutral-600 tracking-[0.3em] uppercase font-black italic">Install_Componeo.sh</span>
            </div>
            
            <div className="p-10 font-headline text-sm leading-[1.8] text-neutral-400 bg-black/40">
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">01</span>
                <code className="text-white"><span className="text-cyan-400">npm i</span> @componeo/templates-react</code>
              </div>
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">02</span>
                <code><span className="text-purple-400">import</span> &#123; Shell &#125; <span className="text-purple-400">from</span> <span className="text-blue-400">&apos;@componeo/core&apos;</span>;</code>
              </div>
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">03</span>
                <code className="h-4"></code>
              </div>
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">04</span>
                <code><span className="text-purple-400">const</span> App = () =&gt; (</code>
              </div>
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">05</span>
                <code>&nbsp;&nbsp;&lt;Shell <span className="text-cyan-400">theme</span>=<span className="text-blue-400">&quot;liquid-glass&quot;</span>&gt;</code>
              </div>
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">06</span>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;Dashboard /&gt;</code>
              </div>
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">07</span>
                <code>&nbsp;&nbsp;&lt;/Shell&gt;</code>
              </div>
              <div className="flex gap-8">
                <span className="text-cyan-400/20 select-none w-4 font-black">08</span>
                <code>);</code>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
