"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Bolt, Verified, HelpCircle, Terminal, Globe } from "lucide-react";
import { motion } from "framer-motion";

const pricingTiers = [
  {
    name: "Experimental",
    price: "FREE",
    description: "Perfect for hackers and side projects looking for high-performance UI.",
    features: ["50 Core Components", "Public Registry Access", "Community Support"],
    locked: ["Private Registry"],
    cta: "Deploy Kernel",
    highlight: false,
  },
  {
    name: "Professional",
    price: "49",
    description: "For high-growth studios requiring technical precision and speed.",
    features: [
      "Unlimited Components",
      "Private Registry",
      "Priority Email Support",
      "Custom Theme Injection",
      "Advanced Figma Sync",
    ],
    locked: [],
    cta: "Initialize Pro",
    highlight: true,
  },
  {
    name: "Omni-Channel",
    price: "CUSTOM",
    description: "Full-scale infrastructure with custom governance and security.",
    features: ["Unlimited Seats", "Custom SLAs", "On-Premise Deployment", "24/7 Dedicated Support"],
    locked: [],
    cta: "Request Access",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Can I upgrade at any time?",
    a: "Yes. All system upgrades are processed in real-time. Pro-rated billing ensures you only pay for the time you use the higher-tier protocols.",
    span: "col-span-3",
  },
  {
    q: "Do you offer educational discounts?",
    a: "Componeo supports the next generation of architects. Contact our uplink for university-wide licensing options.",
    span: "col-span-3",
  },
  {
    q: "Multi-User support?",
    a: "Enterprise tiers support granular RBAC for teams of 50+.",
    span: "col-span-2",
  },
  {
    q: "How does the Private Registry work?",
    a: "Your custom components are hosted on our edge nodes, restricted by secure tokens. Only authorized collaborators within your organization can pull or edit these visual units.",
    span: "col-span-4",
  },
];

export default function PricingPage() {
  return (
    <div className="asymmetric-gradient min-h-screen text-white selection:bg-cyan-400 selection:text-black">
      <Navbar />

      <main className="pt-40 pb-32 px-4 md:px-10 overflow-hidden md:overflow-visible">
        {/* Hero Section */}
        <header className="max-w-4xl mx-auto text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-headline text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold">
              Scale Your Vision
            </span>
          </motion.div>
          
          <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight italic uppercase pb-2">
            MACHINED <br />
            <span className="chromatic-text">PRECISION</span> PRICING
          </h1>
          
          <p className="text-neutral-400 text-base md:text-xl max-w-2xl mx-auto font-body leading-relaxed px-4">
            Choose the technical foundation for your digital ecosystem. From experimental kernels to global enterprise grids.
          </p>
        </header>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto mb-48 px-4 md:px-0">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-premium p-8 md:p-10 flex flex-col group relative transition-all duration-500 border border-white/5 ${
                tier.highlight ? "pro-glow scale-[1.02] md:scale-[1.05] z-10 border-purple-500/30" : "hover:border-white/10"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white font-headline text-[10px] tracking-widest uppercase font-black rounded-full shadow-lg shadow-purple-500/20 whitespace-nowrap">
                  Recommended
                </div>
              )}

              <div className="mb-10">
                <h3 className={`font-headline text-xs tracking-[0.3em] uppercase mb-4 font-black ${tier.highlight ? "text-purple-400" : "text-neutral-600"}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  {tier.price !== "FREE" && tier.price !== "CUSTOM" && (
                    <span className="text-neutral-500 font-headline text-xl">$</span>
                  )}
                  <span className={`font-headline text-5xl md:text-6xl font-black italic ${tier.highlight ? "text-white" : "text-neutral-200"}`}>
                    {tier.price}
                  </span>
                  {tier.price !== "FREE" && tier.price !== "CUSTOM" && (
                    <span className="text-neutral-500 font-headline text-xs uppercase tracking-widest ml-1">/ mo</span>
                  )}
                </div>
                <p className="text-neutral-500 text-sm mt-6 font-body leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-5 mb-12 flex-grow">
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    {tier.highlight ? (
                      <Bolt size={16} className="text-purple-500 fill-purple-500/20" />
                    ) : (
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    )}
                    <span className={`text-sm tracking-wide ${tier.highlight ? "text-white font-medium" : "text-neutral-400"}`}>
                      {feat}
                    </span>
                  </div>
                ))}
                {tier.locked.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 opacity-30 grayscale">
                    <CheckCircle2 size={16} className="text-neutral-600" />
                    <span className="text-sm tracking-wide text-neutral-600 italic">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 font-headline uppercase text-[10px] tracking-[0.3em] font-black transition-all active:scale-95 rounded-2xl ${
                tier.highlight 
                  ? "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-cyan-400/30 hover:text-cyan-400 hover:neon-glow-cyan shadow-xl" 
                  : "glass-premium text-white border-white/10 hover:bg-white/5"
              }`}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Technical Details */}
        <section className="mt-48 max-w-6xl mx-auto mb-48 px-6 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-12">
              <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-white uppercase italic">
                ENGINEERED FOR <span className="text-cyan-400">PERFECTION</span>
              </h2>
              
              <div className="space-y-10">
                <div className="flex gap-6 md:gap-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Bolt size={20} className="md:size-24 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-headline text-xs tracking-[0.3em] uppercase text-white mb-3 font-black">Zero-Latency Runtime</h4>
                    <p className="text-neutral-500 text-sm font-body leading-relaxed max-w-md">
                      Our components are pre-compiled and optimized for the highest possible lighthouse scores right out of the box.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 md:gap-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Verified size={20} className="md:size-24 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-headline text-xs tracking-[0.3em] uppercase text-white mb-3 font-black">Encrypted Assets</h4>
                    <p className="text-neutral-500 text-sm font-body leading-relaxed max-w-md">
                      Enterprise plans include end-to-end encryption for all custom component code in your private registry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700" />
              <div className="glass-premium p-2 rounded-[2.5rem] overflow-hidden aspect-video md:aspect-video relative border-white/5">
                <div className="w-full h-full bg-neutral-900 rounded-[2rem] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent opacity-50" />
                  <div className="p-8 md:p-12 h-full flex flex-col justify-end">
                    <span className="font-headline text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-white/20 mb-4 font-black">Visual Core v2.4.0</span>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bento Section */}
        <section className="max-w-7xl mx-auto mb-20 px-6 md:px-0">
          <h2 className="font-headline text-xl md:text-2xl font-black text-center mb-20 tracking-[0.4em] uppercase italic">
            SYSTEM PROTOCOL <span className="text-neutral-600">/ FAQ</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`${faq.span.replace('col-span-', 'md:col-span-')} glass-premium p-8 md:p-10 rounded-[2rem] hover:bg-white/[0.04] transition-all border border-white/5 group`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:neon-glow-cyan transition-all">
                  <HelpCircle size={18} className="text-cyan-400/40 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h4 className="font-headline text-xs text-white mb-4 uppercase tracking-[0.2em] font-black">{faq.q}</h4>
                <p className="text-neutral-500 text-sm font-body leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
