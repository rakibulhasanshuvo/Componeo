"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Download, 
  Terminal, 
  Layers, 
  MousePointer2, 
  Type, 
  Grid, 
  Palette, 
  Zap,
  Activity,
  Shield, 
  ChevronRight,
  Copy,
  Check,
  Hash,
  Search,
  ExternalLink,
  Moon,
  Sun,
  Monitor,
  Menu,
  X,
  BookOpen,
  ArrowRight
} from "lucide-react";

export default function DocsPage() {
  const sidebarLinks = [
    {
      title: "Introduction",
      color: "text-cyan-400",
      links: [
        { name: "Getting Started", icon: <Rocket size={14} />, id: "getting-started" },
        { name: "Installation", icon: <Download size={14} />, id: "installation" },
        { name: "CLI Commands", icon: <Terminal size={14} />, id: "cli" },
      ]
    },
    {
      title: "Components",
      color: "text-purple-400",
      links: [
        { name: "Design Tokens", icon: <Layers size={14} />, id: "tokens" },
        { name: "Buttons", icon: <MousePointer2 size={14} />, id: "buttons" },
        { name: "Form Inputs", icon: <Type size={14} />, id: "inputs" },
        { name: "Bento Grid", icon: <Grid size={14} />, id: "bento" },
      ]
    },
    {
      title: "Advanced",
      color: "text-neutral-400",
      links: [
        { name: "Styling", icon: <Palette size={14} />, id: "styling" },
        { name: "Micro-interactions", icon: <Zap size={14} />, id: "interactions" },
        { name: "Security", icon: <Shield size={14} />, id: "security" },
      ]
    }
  ];

  const [activeSection, setActiveSection] = React.useState("tokens");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tocItems: Record<string, { id: string; name: string }[]> = {
    tokens: [
      { id: "colors", name: "Color Orchestration" },
      { id: "surfaces", name: "Atmospheric Tiers" },
      { id: "visual", name: "Visual Reference" },
    ],
    buttons: [
      { id: "units", name: "Interactive Units" },
      { id: "logic", name: "Code Implementation" },
    ],
    inputs: [
      { id: "refractive", name: "Refractive Fields" },
      { id: "focus", name: "Focus States" },
    ],
    bento: [
      { id: "matrix", name: "Matrix Structures" },
      { id: "data", name: "Data Integration" },
    ],
    installation: [
      { id: "npm", name: "Package Setup" },
      { id: "tailwind", name: "Tailwind Integration" },
    ],
    cli: [
      { id: "commands", name: "Command Index" },
      { id: "forge", name: "Component Forge" },
    ],
    styling: [
      { id: "syntax", name: "Visual Syntax" },
      { id: "config", name: "Global Config" },
    ],
    interactions: [
      { id: "kinetic", name: "Kinetic Motion" },
      { id: "shifts", name: "Layout Evolution" },
    ],
    security: [
      { id: "shield", name: "Shield Protocol" },
      { id: "audit", name: "Security Audit" },
    ],
  };

  const renderSidebarContent = () => (
    <>
      {/* Search HUD */}
      <div className="relative group mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-cyan-400 transition-colors" size={14} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="SEARCH_INDEX..." 
          className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-[11px] font-headline font-black uppercase tracking-widest text-white focus:outline-none focus:border-cyan-400/30 transition-all placeholder:text-neutral-800"
        />
      </div>

      {sidebarLinks.map((section) => {
        const filteredLinks = section.links.filter(link => 
          link.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (filteredLinks.length === 0) return null;

        return (
          <section key={section.title} className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-1 h-3 rounded-full ${section.color.replace('text-', 'bg-')}`} />
              <h3 className={`font-headline text-[9px] tracking-[0.4em] uppercase font-black ${section.color}`}>
                {section.title}
              </h3>
            </div>
            
            <ul className="space-y-4 ml-4 border-l border-white/5 pb-10">
              {filteredLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative">
                    <button 
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 relative group ${
                        isActive 
                          ? "text-cyan-400 font-bold bg-cyan-400/5 shadow-[inset_0_0_20px_rgba(0,242,255,0.05)] border border-cyan-400/10" 
                          : "text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="laser-nav"
                          className="absolute left-[-2px] top-[20%] bottom-[20%] w-[3px] bg-cyan-400 rounded-full shadow-[0_0_15px_#00f2ff] z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className={`p-1.5 rounded-lg border transition-all duration-300 ${
                        isActive ? "bg-cyan-400/10 border-cyan-400/30 shadow-[0_0_15px_rgba(0,242,255,0.2)]" : "bg-white/5 border-white/5 group-hover:border-white/10"
                      }`}>
                        {item.icon}
                      </div>
                      <span className="font-headline text-[10px] tracking-widest uppercase">{item.name}</span>
                      {isActive && <ArrowRight size={10} className="ml-auto animate-pulse" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-cyan-400 selection:text-black">
      <Navbar />

      {/* Top HUD / Breadcrumbs */}
      <div className="pt-32 pb-6 md:pb-10 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-[9px] md:text-[10px] font-headline font-black uppercase tracking-[0.2em] text-neutral-500 overflow-x-auto no-scrollbar whitespace-nowrap">
            <BookOpen size={14} className="text-cyan-400 shrink-0" />
            <span className="hover:text-white transition-colors cursor-pointer">Documentation</span>
            <ChevronRight size={10} className="text-white/10 shrink-0" />
            <span className="hover:text-white transition-colors cursor-pointer">Core</span>
            <ChevronRight size={10} className="text-white/10 shrink-0" />
            <span className="hover:text-white transition-colors cursor-pointer capitalize">{activeSection.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-6 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[8px] font-headline font-black text-cyan-400 uppercase tracking-widest">System Online</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[8px] font-headline font-black text-neutral-600 uppercase tracking-widest">v1.2.4r_production</span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle - Sticky Overlay */}
      <div className="lg:hidden sticky top-[4.5rem] z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-3 text-[10px] font-headline font-black uppercase tracking-widest text-cyan-400 active:scale-95 transition-all"
        >
          <Menu size={16} />
          CHANGE_MODULE
        </button>
        <div className="flex items-center gap-2">
           <div className="w-1 h-1 bg-cyan-400 rounded-full" />
           <span className="text-[10px] font-headline font-black uppercase text-white truncate max-w-[150px] italic">
             {activeSection}
           </span>
        </div>
      </div>

      <div className="flex max-w-[1600px] mx-auto relative px-0 md:px-6 lg:px-0">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 z-50 w-72 md:w-80 bg-[#050505] p-8 border-r border-white/10 overflow-y-auto lg:hidden"
              >
                 <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f2ff]" />
                     <span className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-white italic">Command_Module</span>
                   </div>
                   <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-neutral-500 hover:text-white transition-colors">
                     <X size={20} />
                   </button>
                 </div>
                 
                 <div className="space-y-12">
                   {renderSidebarContent()}
                 </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-80 h-[calc(100vh-8rem)] sticky top-32 overflow-y-auto px-10 py-12 custom-scrollbar border-r border-white/5">
          <div className="space-y-12">
            {renderSidebarContent()}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 md:px-12 lg:px-20 py-12 md:py-16 min-w-0 elite-content">
          <AnimatePresence mode="wait">
            {activeSection === "tokens" && (
              <motion.div
                key="tokens"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 italic uppercase">
                    Design <span className="chromatic-text">Tokens</span>
                  </h1>
                  
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body">
                    Our atomic foundations for the <span className="text-purple-400 font-bold">Liquid Glass</span> aesthetic. Define the primitive values that scale your HUD-style interfaces across any resolution.
                  </p>
                </header>

                <div className="space-y-32">
                  {/* Color Logic Section */}
                  <section id="colors" className="space-y-12">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="p-2 bg-cyan-400/10 rounded-xl text-cyan-400 border border-cyan-400/20">
                          <Grid size={20} />
                        </div>
                        <h2 className="text-3xl font-black font-headline uppercase tracking-widest text-white italic">Color Orchestration</h2>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                      <div className="refractive-glass p-1 p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent group overflow-hidden">
                        <div className="bg-[#080808] p-10 rounded-[2.4rem] h-full space-y-8 relative">
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                              <div className="w-20 h-20 rounded-[1.5rem] bg-cyan-400 neon-glow-cyan shadow-[0_0_40px_rgba(0,242,255,0.3)] relative group-hover:scale-105 transition-transform duration-500">
                                 <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-inherit" />
                              </div>
                              <div>
                                <span className="font-headline font-black text-[9px] tracking-[0.4em] uppercase block text-neutral-600 mb-2">Token_Ref: Primary_01</span>
                                <code className="text-white font-black tracking-[0.2em] text-lg italic">#DBFCFF</code>
                              </div>
                            </div>
                            <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-neutral-600 group-hover:text-cyan-400 transition-colors cursor-pointer">
                              <Copy size={16} />
                            </div>
                          </div>
                          <p className="text-neutral-400 leading-relaxed font-body text-sm relative z-10">
                            Engineered for maximal luminance against deep space backgrounds. Primarily used for interactive anchors and data-critical HUD readouts.
                          </p>
                          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400/5 blur-[60px] pointer-events-none group-hover:bg-cyan-400/10 transition-colors" />
                        </div>
                      </div>

                      <div className="refractive-glass p-1 p-[1px] rounded-[2.5rem] bg-gradient-to-br from-purple-500/20 to-transparent group overflow-hidden">
                        <div className="bg-[#080808] p-10 rounded-[2.4rem] h-full space-y-8 relative">
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                              <div className="w-20 h-20 rounded-[1.5rem] bg-purple-500 shadow-[0_0_40px_rgba(188,19,254,0.3)] relative group-hover:scale-105 transition-transform duration-500">
                                 <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-inherit" />
                              </div>
                              <div>
                                <span className="font-headline font-black text-[9px] tracking-[0.4em] uppercase block text-neutral-600 mb-2">Token_Ref: Secondary_02</span>
                                <code className="text-white font-black tracking-[0.2em] text-lg italic">#ECB2FF</code>
                              </div>
                            </div>
                            <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-neutral-600 group-hover:text-purple-400 transition-colors cursor-pointer">
                              <Copy size={16} />
                            </div>
                          </div>
                          <p className="text-neutral-400 leading-relaxed font-body text-sm relative z-10">
                            Our signature &quot;energy&quot; accent. Reserved for supplemental overlays, active logic paths, and high-frequency UI pulses.
                          </p>
                          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/5 blur-[60px] pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Code Snippet HUD */}
                    <div className="relative group/code">
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 rounded-[2.5rem] opacity-0 group-hover/code:opacity-100 transition-opacity duration-700 blur-sm" />
                      <div className="relative glass-premium rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-black/40 backdrop-blur-3xl">
                        <div className="bg-white/[0.04] px-10 py-5 flex justify-between items-center border-b border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-red-400/20" />
                              <div className="w-2 h-2 rounded-full bg-yellow-400/20" />
                              <div className="w-2 h-2 rounded-full bg-emerald-400/20" />
                            </div>
                            <span className="text-[10px] font-headline font-black uppercase tracking-[0.35em] text-neutral-500 italic">src/logic/matrix_config.ts</span>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="text-[8px] font-mono text-cyan-400/40 tracking-[0.2em] uppercase">Status: Read_Only</span>
                            <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-white/5 group/copy active:scale-95">
                              <span className="text-[8px] font-headline font-black uppercase tracking-widest text-neutral-400 group-hover/copy:text-white">Copy_Logic</span>
                              <Copy size={12} className="text-neutral-600 group-hover/copy:text-cyan-400" />
                            </button>
                          </div>
                        </div>
                        <div className="p-12 text-sm overflow-x-auto font-headline">
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          <pre className="text-neutral-400 leading-relaxed font-mono">
                            <span className="text-neutral-700">{`// System initialized: loading palette_v1.0`}</span>{"\n"}
                            <span className="text-purple-400">export const</span> <span className="text-white">MatrixTheme</span> = &#123;{"\n"}
                            {"  "}colors: &#123;{"\n"}
                            {"    "}void: <span className="text-cyan-400">&apos;#050505&apos;</span>,{"\n"}
                            {"    "}refractive: <span className="text-cyan-400">&apos;rgba(255, 255, 255, 0.03)&apos;</span>,{"\n"}
                            {"    "}glow: <span className="text-cyan-400">&apos;#00f2ff&apos;</span>,{"\n"}
                            {"    "}accent: <span className="text-purple-400">&apos;#bc13fe&apos;</span>{"\n"}
                            {"  "}&#125;,{"\n"}
                            {"  "}effects: &#123;{"\n"}
                            {"    "}blur: <span className="text-cyan-400">&apos;24px&apos;</span>,{"\n"}
                            {"    "}refraction: <span className="text-cyan-400">&apos;standard&apos;</span>{"\n"}
                            {"  "}&#125;{"\n"}
                            &#125;;
                          </pre>
                        </div>
                        {/* Visual Scanning Effect */}
                        <div className="absolute top-0 right-0 w-px h-full bg-cyan-400/10 shadow-[0_0_15px_#00f2ff] translate-x-[400px] animate-light-sweep-vertical pointer-events-none" />
                      </div>
                    </div>
                  </section>

                  {/* Surface Hierarchy 3D */}
                  <section id="surfaces" className="space-y-12">
                    <div className="flex items-center gap-5">
                      <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                        <Layers size={20} />
                      </div>
                      <h2 className="text-3xl font-black font-headline uppercase tracking-widest text-white italic">Atmospheric Tiers</h2>
                    </div>
                    
                    <p className="text-neutral-400 mb-16 max-w-3xl leading-relaxed font-body text-lg">
                      To simulate depth within the infinite dark, Componeo uses a tier-based stacking system. Each level represents a shift in atmospheric pressure and light refraction.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-container">
                      {[
                        { tier: "00", name: "Absolute Void", bg: "bg-neutral-950", border: "border-white/5" },
                        { tier: "01", name: "Surface Level", bg: "bg-neutral-900", border: "border-white/10" },
                        { tier: "02", name: "HUD Floating", bg: "bg-neutral-800", border: "border-cyan-400/20" },
                      ].map((s, idx) => (
                        <div 
                          key={s.tier} 
                          className={`${s.bg} ${s.border} p-12 h-80 rounded-[3rem] border flex flex-col justify-end group transition-all perspective-element relative overflow-hidden shadow-2xl`}
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 transition-opacity">
                             <span className="text-4xl font-headline font-black text-white/5 group-hover:text-cyan-400/20">#{s.tier}</span>
                          </div>
                          <span className="text-[9px] font-headline font-black text-neutral-600 uppercase tracking-[0.5em] mb-4 group-hover:text-cyan-400 transition-colors">
                            Tier_Lvl_{s.tier}
                          </span>
                          <span className="font-headline font-black text-2xl text-white tracking-tighter uppercase italic group-hover:chromatic-text transition-all leading-tight">
                            {s.name}
                          </span>
                          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover:scale-x-110 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Visual Guide Bento */}
                  <section id="visual">
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-12 xl:col-span-7 h-[28rem] relative rounded-[2.5rem] overflow-hidden group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXHHxbLSpa9XA-wIEsQ0RM9dTqQwiMOrxxO6MZjVx9FCNxK_uk0Q3ZWbl2EeNyu31VYkrvcxesR-avsXcPserfKJfZB8aFpSrMCIOc1yQKStw6Mpl1tv_gvNcBY-Muwz6nlbj8MsqEhpMBFpoGLzK8KEEL3X2xT0rCkwKJiOePqPFelO7RkbghczOz7worEgD3EQ8XX6s5dEUHFUzzD6WMRFRkI4QYrQSbtaIseF58JZguO0QdvhYm8yoLZwKYHPxCspAbYjRQuA"
                          className="w-full h-full object-cover grayscale opacity-20 mix-blend-screen transition-transform duration-1000 group-hover:scale-110"
                          alt="abstract dark 3d structure"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-12 left-12">
                          <span className="bg-cyan-400 text-black text-[10px] font-headline font-black uppercase px-4 py-1.5 mb-6 inline-block rounded-lg tracking-widest">Pro Tip</span>
                          <h3 className="text-4xl font-headline font-black text-white uppercase italic tracking-tighter mb-4">Machined Radius</h3>
                          <p className="text-neutral-400 max-w-sm font-body leading-relaxed">
                            Use 0.125rem (sharp) for technical precision or 0.5rem (xl) for interactive containers.
                          </p>
                        </div>
                      </div>

                      <div className="col-span-12 xl:col-span-5 h-[28rem] glass-premium p-12 rounded-[2.5rem] flex flex-col justify-center gap-10">
                        {[
                          { label: "Motion Curves", value: "QUARTZ_OUT", color: "text-cyan-400" },
                          { label: "Blur Intensity", value: "16PX / 24PX", color: "text-purple-400" },
                          { label: "Shadow Spread", value: "0 0 32PX", color: "text-white" },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-6">
                            <span className="font-headline font-black text-xs tracking-[0.3em] uppercase text-neutral-500">{item.label}</span>
                            <span className={`${item.color} font-headline font-black tracking-widest text-sm italic uppercase`}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

            {activeSection === "buttons" && (
              <motion.div
                key="buttons"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 italic uppercase">
                    Atomic <span className="chromatic-text">Buttons</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body">
                    Precision-engineered interactive units with refractive glass materials and synchronized micro-animations.
                  </p>
                </header>

                <div className="space-y-32">
                   <section id="units" className="space-y-12">
                      <div className="flex items-center gap-5">
                        <div className="p-2 bg-cyan-400/10 rounded-xl text-cyan-400 border border-cyan-400/20">
                          <MousePointer2 size={20} />
                        </div>
                        <h2 className="text-3xl font-black font-headline uppercase tracking-widest text-white italic">Interactive Units</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                         {/* Elite Button */}
                         <div className="glass-premium p-12 rounded-[3rem] flex flex-col items-center justify-center gap-8 min-h-[300px] group relative overflow-hidden">
                            <button className="relative px-10 py-4 bg-cyan-400 text-black font-headline font-black text-[11px] tracking-widest uppercase rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,242,255,0.3)] z-10">
                               Elite_Unit
                            </button>
                            <span className="text-[10px] font-headline font-black text-neutral-500 uppercase tracking-widest">Primary Action</span>
                            <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-[0.03] transition-opacity" />
                         </div>

                         {/* Ghost Button */}
                         <div className="glass-premium p-12 rounded-[3rem] flex flex-col items-center justify-center gap-8 min-h-[300px] group relative overflow-hidden">
                            <button className="relative px-10 py-4 border border-white/10 text-white font-headline font-black text-[11px] tracking-widest uppercase rounded-xl transition-all hover:bg-white/5 active:scale-95 z-10">
                               Ghost_Path
                            </button>
                            <span className="text-[10px] font-headline font-black text-neutral-500 uppercase tracking-widest">Supportive Link</span>
                         </div>

                         {/* Pulse Button */}
                         <div className="glass-premium p-12 rounded-[3rem] flex flex-col items-center justify-center gap-8 min-h-[300px] group relative overflow-hidden">
                            <button className="relative px-10 py-4 bg-white/5 border border-white/5 text-purple-400 font-headline font-black text-[11px] tracking-widest uppercase rounded-xl transition-all hover:border-purple-500/50 z-10 flex items-center gap-3">
                               <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                               Logic_Pulse
                            </button>
                            <span className="text-[10px] font-headline font-black text-neutral-500 uppercase tracking-widest">Status Indicator</span>
                         </div>
                      </div>

                      {/* Code Sample */}
                      <div id="logic" className="relative glass-premium rounded-[2.5rem] overflow-hidden border border-white/5 bg-black/40 backdrop-blur-3xl">
                         <div className="bg-white/[0.04] px-10 py-5 flex justify-between items-center border-b border-white/5">
                            <span className="text-[10px] font-headline font-black uppercase tracking-[0.35em] text-neutral-500 italic">src/components/EliteButton.tsx</span>
                            <button 
                              onClick={() => handleCopy('export const EliteButton = () => <button className="bg-cyan-400 text-black px-10 py-4 font-black rounded-xl">ELITE_ACTION</button>', 'btn-copy')}
                              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all group/copy"
                            >
                               <span className="text-[8px] font-headline font-black uppercase tracking-widest text-neutral-400 group-hover/copy:text-white">
                                  {copiedId === 'btn-copy' ? 'COPIED' : 'COPY'}
                               </span>
                               <Copy size={12} className={`transition-colors ${copiedId === 'btn-copy' ? 'text-cyan-400' : 'text-neutral-600 group-hover/copy:text-cyan-400'}`} />
                            </button>
                         </div>
                         <div className="p-10 font-mono text-sm">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <pre className="text-neutral-400">
                               <span className="text-purple-400">export const</span> <span className="text-white">EliteButton</span> = () =&gt; ({"\n"}
                               {"  "}&lt;<span className="text-cyan-400">button</span> className=&quot;bg-cyan-400 text-black px-10 py-4 font-black rounded-xl shadow-glow&quot;&gt;{"\n"}
                               {"    "}ELITE_ACTION{"\n"}
                               {"  "}&lt;/<span className="text-cyan-400">button</span>&gt;{"\n"}
                               );
                            </pre>
                         </div>
                      </div>
                   </section>
                </div>
              </motion.div>
            )}

            {activeSection === "inputs" && (
              <motion.div
                key="inputs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 italic uppercase">
                    Refractive <span className="chromatic-text">Inputs</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body">
                    Deep-glass text fields with luminous focus states and machined borders.
                  </p>
                </header>

                <div className="space-y-24">
                   <section id="refractive" className="space-y-12">
                      <div className="max-w-xl mx-auto space-y-12">
                         <div id="focus" className="space-y-4">
                            <label className="text-[10px] font-headline font-black text-neutral-500 uppercase tracking-[0.3em] block ml-4">Machine_ID</label>
                            <input 
                              type="text" 
                              placeholder="FUSE_TERMINAL_01" 
                              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-8 text-sm font-headline font-black text-white focus:outline-none focus:border-cyan-400/40 transition-all placeholder:text-neutral-800"
                            />
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-headline font-black text-neutral-500 uppercase tracking-[0.3em] block ml-4">Logic_Key</label>
                            <div className="relative group">
                               <input 
                                 type="password" 
                                 placeholder="••••••••••••" 
                                 className="w-full bg-black border border-white/5 rounded-2xl py-5 px-8 text-sm font-headline font-black text-white focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-neutral-900"
                               />
                               <div className="absolute inset-0 bg-purple-500/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                         </div>
                      </div>
                   </section>
                </div>
              </motion.div>
            )}

            {activeSection === "bento" && (
              <motion.div
                key="bento"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-[120px] font-black font-headline tracking-tighter text-white mb-8 italic uppercase leading-[0.85]">
                    Matrix <span className="chromatic-text">Grid</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body uppercase tracking-tighter">
                    Adaptive layout structures for high-density data visualizations.
                  </p>
                </header>

                <div className="grid grid-cols-12 gap-8 h-[600px]">
                   <div id="matrix" className="col-span-12 md:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 flex flex-col justify-end group overflow-hidden relative">
                      <div className="absolute top-12 right-12 text-cyan-400 group-hover:scale-110 transition-transform">
                         <Grid size={32} />
                      </div>
                      <h3 className="text-4xl font-black font-headline text-white uppercase italic italic">Primary Node</h3>
                      <p className="text-neutral-500 text-xs font-body uppercase mt-2">Main Visualization Controller</p>
                      <div className="absolute inset-0 bg-cyan-400 opacity-[0.01] group-hover:opacity-[0.03] transition-opacity" />
                   </div>
                   <div id="data" className="col-span-12 md:col-span-4 grid grid-rows-2 gap-8">
                      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 flex flex-col justify-center items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Zap size={20} />
                         </div>
                         <span className="text-[10px] font-headline font-black text-white uppercase tracking-widest italic font-black">Speed: 0.8ms</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 flex flex-col justify-center items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <Activity size={20} />
                         </div>
                         <span className="text-[10px] font-headline font-black text-white uppercase tracking-widest italic font-black">Health: 100%</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* Other Sections Placeholder */}
            {activeSection === "getting-started" && (
              <motion.div
                key="getting-started"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-[120px] font-black font-headline tracking-tighter text-white mb-8 italic uppercase leading-[0.85]">
                     Core <span className="chromatic-text">Genesis</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body uppercase tracking-tighter">
                     Componeo is a next-generation React assembly engine designed for high-fidelity technical interfaces.
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="glass-premium p-12 rounded-[3rem] border border-cyan-400/10 group">
                      <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-8 border border-cyan-400/20 group-hover:bg-cyan-400 transition-all group-hover:text-black">
                         <Rocket size={24} />
                      </div>
                      <h4 className="text-2xl font-black font-headline text-white uppercase italic mb-4">Atomic_Scale</h4>
                      <p className="text-neutral-500 font-body text-sm leading-relaxed">
                         Build with precision. Every component is designed to be an atomic unit that scales seamlessly within your HUD ecosystem.
                      </p>
                   </div>
                   <div className="glass-premium p-12 rounded-[3rem] border border-purple-500/10 group">
                      <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-8 border border-purple-500/20 group-hover:bg-purple-500 transition-all group-hover:text-black">
                         <Layers size={24} />
                      </div>
                      <h4 className="text-2xl font-black font-headline text-white uppercase italic mb-4">Glass_Materials</h4>
                      <p className="text-neutral-500 font-body text-sm leading-relaxed text-sm">
                         Advanced refraction algorithms and blur-backdrop filters provide the &quot;Cyber-Luxury&quot; aesthetic out of the box.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}

            {activeSection === "installation" && (
              <motion.div
                key="installation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 italic uppercase">
                     System <span className="chromatic-text">Injection</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body uppercase tracking-tighter">
                     Initialize the Componeo core module within your React environment.
                  </p>
                </header>

                <div className="space-y-12 max-w-2xl mx-auto">
                   <div id="npm" className="space-y-6">
                      <h3 className="text-[10px] font-headline font-black text-neutral-500 uppercase tracking-[0.3em] font-black">Step 01: Core Installation</h3>
                      <div className="relative group/cli overflow-hidden">
                         <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-400/10 blur-3xl group-hover/cli:bg-cyan-400/20 transition-colors" />
                         <div className="glass-premium p-8 rounded-2xl flex items-center justify-between border border-white/5 bg-black/60 shadow-2xl">
                            <code className="text-white font-mono text-sm tracking-tighter">
                               <span className="text-cyan-400">npm</span> install <span className="text-purple-400">@componeo/core</span> framer-motion lucide-react
                            </code>
                            <button 
                               onClick={() => handleCopy('npm install @componeo/core framer-motion lucide-react', 'npm-core')}
                               className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-neutral-600 hover:text-cyan-400 transition-colors"
                            >
                               {copiedId === 'npm-core' ? <span className="text-[8px] font-black text-cyan-400">COPIED</span> : <Copy size={16} />}
                            </button>
                         </div>
                      </div>
                   </div>

                   <div id="tailwind" className="space-y-6">
                      <h3 className="text-[10px] font-headline font-black text-neutral-500 uppercase tracking-[0.3em] font-black">Step 02: Tailwind Setup</h3>
                      <div className="relative group/cli overflow-hidden">
                         <div className="glass-premium p-8 rounded-2xl border border-white/5 bg-black/60 shadow-2xl space-y-4">
                            <p className="text-neutral-400 text-xs font-body mb-4">Add the Componeo preset to your <code className="text-cyan-400">tailwind.config.ts</code></p>
                            <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/5">
                               <code className="text-neutral-400 font-mono text-[11px]">
                                  plugins: [require(&quot;@componeo/tailwind-preset&quot;)]
                               </code>
                               <button 
                                 onClick={() => handleCopy('plugins: [require("@componeo/tailwind-preset")]', 'tw-preset')}
                                 className="text-neutral-600 hover:text-cyan-400 transition-colors"
                               >
                                  {copiedId === 'tw-preset' ? <span className="text-[8px] font-black text-cyan-400">COPIED</span> : <Copy size={12} />}
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeSection === "cli" && (
              <motion.div
                key="cli"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 italic uppercase">
                     Terminal <span className="chromatic-text">Forge</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body uppercase tracking-tighter">
                     Accelerate your workflow with the Componeo Command Line Interface.
                  </p>
                </header>

                <div id="commands" className="max-w-4xl mx-auto terminal-window bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
                   {/* Terminal Header */}
                   <div className="bg-white/[0.04] p-5 flex items-center justify-between border-b border-white/5">
                      <div className="flex gap-2.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <span className="text-[9px] font-headline font-black text-neutral-500 uppercase tracking-widest">SYSTEM_TERMINAL_V1.0</span>
                   </div>
                   
                   {/* Terminal Content */}
                   <div className="p-10 font-mono text-sm space-y-8">
                       <div className="space-y-2">
                          <div className="flex gap-4">
                             <span className="text-cyan-400">componeo</span>
                             <span className="text-white">init</span>
                          </div>
                          <p className="text-neutral-500 italic uppercase text-[11px] ml-4"># Initializing environment variables and structural nodes...</p>
                       </div>

                       <div id="forge" className="space-y-4">
                          <div className="flex items-center gap-4">
                             <div className="flex gap-4">
                                <span className="text-cyan-400">componeo</span>
                                <span className="text-white">forge</span>
                                <span className="text-purple-400">--button elite</span>
                             </div>
                             <button 
                               onClick={() => handleCopy('npx componeo forge --button elite', 'cli-forge')}
                               className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-600/40 hover:text-cyan-400"
                             >
                                <Copy size={12} />
                             </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                             <div className="text-[10px] text-neutral-400 border border-white/5 bg-white/[0.02] p-4 rounded-xl uppercase tracking-tighter">
                                [0.4s] FETCHING_NODE: BUTTON_ELITE
                             </div>
                             <div className="text-[10px] text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 p-4 rounded-xl uppercase tracking-tighter font-black">
                                SUCCESS: src/components/EliteButton.tsx
                             </div>
                          </div>
                       </div>

                       <div className="pt-10 flex items-center gap-4">
                          <span className="animate-pulse text-cyan-400 tracking-widest font-black">&gt;</span>
                          <div className="w-2 h-5 bg-cyan-400 animate-[blink_1s_infinite]" />
                       </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeSection === "styling" && (
              <motion.div
                key="styling"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 italic uppercase text-right">
                     Visual <span className="chromatic-text">Syntax</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body uppercase tracking-tighter ml-auto text-right">
                     Master the art of refractive glass and atmospheric depth using our CSS architecture.
                  </p>
                </header>

                <div className="space-y-20">
                   <div id="syntax" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="glass-premium p-10 rounded-[2.5rem] border border-white/5 space-y-6">
                         <div className="text-cyan-400 font-headline font-black text-xs tracking-widest uppercase italic">01 // Refraction</div>
                         <p className="text-neutral-500 text-sm font-body leading-relaxed">
                            Use the <code className="text-white">.glass-premium</code> utility to apply multi-layer backdrop filters and custom border-lighting.
                         </p>
                      </div>
                      <div className="glass-premium p-10 rounded-[2.5rem] border border-white/5 space-y-6">
                         <div className="text-purple-400 font-headline font-black text-xs tracking-widest uppercase italic">02 // Chromatic</div>
                         <p className="text-neutral-500 text-sm font-body leading-relaxed">
                            The <code className="text-white">.chromatic-text</code> class applies a subtle RGB split effect to headlines, simulating high-end display optics.
                         </p>
                      </div>
                      <div className="glass-premium p-10 rounded-[2.5rem] border border-white/5 space-y-6">
                         <div className="text-neutral-400 font-headline font-black text-xs tracking-widest uppercase italic">03 // Atmosphere</div>
                         <p className="text-neutral-500 text-sm font-body leading-relaxed">
                            Layering is handled via <code className="text-white">z-index</code> and opacity gradients (0.02 to 0.08) to maintain the &quot;infinite void&quot; feel.
                         </p>
                      </div>
                   </div>

                   <div id="config" className="relative glass-premium rounded-[3rem] overflow-hidden border border-white/5 bg-black/40 p-12">
                      <div className="flex justify-between items-center mb-8">
                         <h4 className="text-xl font-black font-headline text-white uppercase italic tracking-widest">Global_Theme_Config</h4>
                         <button 
                           onClick={() => handleCopy('@layer base {\n  :root {\n    --glass-blur: 24px;\n    --glass-opacity: 0.03;\n    --neon-cyan: #00f2ff;\n  }\n}', 'css-copy')}
                           className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all group/copy"
                         >
                            <span className="text-[8px] font-headline font-black uppercase tracking-widest text-neutral-400 group-hover/copy:text-white">
                               {copiedId === 'css-copy' ? 'COPIED' : 'COPY'}
                            </span>
                            <Copy size={12} className={`transition-colors ${copiedId === 'css-copy' ? 'text-cyan-400' : 'text-neutral-600 group-hover/copy:text-cyan-400'}`} />
                         </button>
                      </div>
                      <div className="font-mono text-sm text-neutral-400 space-y-2">
                         <p><span className="text-purple-400">@layer</span> base &#123;</p>
                         <p className="pl-6">:root &#123;</p>
                         <p className="pl-12">--glass-blur: <span className="text-cyan-400">24px</span>;</p>
                         <p className="pl-12">--glass-opacity: <span className="text-cyan-400">0.03</span>;</p>
                         <p className="pl-12">--neon-cyan: <span className="text-cyan-400">#00f2ff</span>;</p>
                         <p className="pl-6">&#125;</p>
                         <p>&#125;</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeSection === "interactions" && (
              <motion.div
                key="interactions"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 italic uppercase">
                     Logic <span className="chromatic-text">Pulses</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body uppercase tracking-tighter">
                     Kinetic micro-animations synchronized with user intent for high-response interfaces.
                  </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <div id="kinetic" className="glass-premium p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                      <div className="flex items-center justify-between mb-8">
                         <h4 className="text-lg font-black font-headline text-white uppercase italic tracking-widest">Hover_Kinetic</h4>
                         <Zap size={20} className="text-yellow-400" />
                      </div>
                      <div className="w-full h-40 bg-white/[0.02] rounded-2xl flex items-center justify-center p-8 relative overflow-hidden">
                         <motion.div 
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           className="w-20 h-20 bg-cyan-400 rounded-xl shadow-[0_0_30px_rgba(0,242,255,0.4)] flex items-center justify-center text-black font-black"
                         >
                            ACT
                         </motion.div>
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                      <p className="text-neutral-500 text-xs font-body uppercase mt-6 tracking-widest leading-loose">
                         Recommended: whileHover=&#123;&quot;&#123;&#123; scale: 1.05 &#125;&#125;&quot;&#125; transition=&#123;&quot;&#123;&#123; type: &apos;spring&apos;, stiffness: 300 &#125;&#125;&quot;&#125;
                      </p>
                   </div>

                   <div id="shifts" className="glass-premium p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                      <div className="flex items-center justify-between mb-8">
                         <h4 className="text-lg font-black font-headline text-white uppercase italic tracking-widest">Layout_Shifts</h4>
                         <Layers size={20} className="text-purple-400" />
                      </div>
                      <div className="w-full h-40 bg-white/[0.02] rounded-2xl p-8 space-y-4">
                         <motion.div layout className="h-4 bg-white/10 rounded-full w-full" />
                         <motion.div layout className="h-4 bg-white/5 rounded-full w-2/3" />
                         <motion.div layout className="h-4 bg-purple-500/20 rounded-full w-1/2" />
                      </div>
                      <p className="text-neutral-500 text-xs font-body uppercase mt-6 tracking-widest leading-loose">
                         Use AnimatePresence for section-level transitions to maintain visual continuity.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}

            {activeSection === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-20">
                  <h1 className="text-6xl md:text-[120px] font-black font-headline tracking-tighter text-white mb-8 italic uppercase leading-[0.85]">
                     Shield <span className="chromatic-text">Protocol</span>
                  </h1>
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl font-body uppercase tracking-tighter">
                     Enterprise-grade security standards for component isolation and dependency sanitization.
                  </p>
                </header>

                <div id="shield" className="glass-premium rounded-[4rem] border border-orange-500/10 p-20 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-20 opacity-5">
                      <Shield size={200} className="text-orange-500" />
                   </div>
                   
                   <div id="audit" className="max-w-xl space-y-12 relative z-10">
                      <div className="flex items-start gap-6">
                         <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/20">
                            <Shield size={24} />
                         </div>
                         <div>
                            <h4 className="text-2xl font-black font-headline text-white uppercase italic mb-2 tracking-tighter">Audit_Passed</h4>
                            <p className="text-neutral-500 font-body text-sm leading-relaxed">
                               Every component in our registry undergoes recursive security audits to ensure zero vulnerabilities in production environments.
                            </p>
                         </div>
                      </div>
                      
                      <div className="flex items-start gap-6">
                         <div className="p-3 bg-cyan-400/10 rounded-xl text-cyan-400 border border-cyan-400/20">
                            <Activity size={24} />
                         </div>
                         <div>
                            <h4 className="text-2xl font-black font-headline text-white uppercase italic mb-2 tracking-tighter">Isolation_Runtime</h4>
                            <p className="text-neutral-500 font-body text-sm leading-relaxed">
                               Components are sandboxed at the runtime level to prevent style bleeding and unauthorized DOM access between modules.
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="mt-20 pt-10 border-t border-white/5">
                      <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.3em]">
                         Current_Security_Hash: <span className="text-emerald-500">SHA256_F92B_831A_01X9</span>
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer inside content area */}
          <footer className="mt-48 pt-20 border-t border-white/5">
             <Footer />
          </footer>
        </main>

        {/* Right Side TOC */}
        <aside className="hidden xl:block w-80 h-[calc(100vh-8rem)] sticky top-32 px-12 py-12 border-l border-white/5">
          <div className="space-y-12">
            <div>
              <h4 className="font-headline text-[9px] tracking-[0.5em] uppercase text-neutral-600 font-black mb-10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
                Data_Index
              </h4>
              <nav className="space-y-1 px-4 relative">
                {/* Connector Line */}
                <div className="absolute left-[5px] top-4 bottom-4 w-px bg-white/5" />
                
                {(tocItems[activeSection] || []).map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    className="group relative block py-3 pl-8 text-[10px] font-headline font-black text-neutral-500 hover:text-white transition-all uppercase tracking-widest italic"
                  >
                    <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-3 h-px bg-white/20 group-hover:w-5 group-hover:bg-cyan-400 transition-all" />
                    <span className="relative group-hover:translate-x-1 inline-block transition-transform">
                      {item.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="glass-premium p-6 rounded-2xl border border-white/[0.03]">
               <h5 className="text-[8px] font-headline font-black uppercase text-neutral-400 mb-4 tracking-widest">Sys_Telemetry</h5>
               <div className="space-y-3">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-cyan-400" />
                 </div>
                 <div className="flex justify-between text-[7px] font-mono text-neutral-600">
                   <span>SYNCING...</span>
                   <span>65%</span>
                 </div>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
