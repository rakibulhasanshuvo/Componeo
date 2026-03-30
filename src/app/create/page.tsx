"use client";

import React, { useState, useEffect } from "react";
import { 
  Eye, 
  ArrowLeft, 
  Sparkles,
  Loader2,
  Save,
  Command,
  ChevronRight,
  ShieldCheck,
  Terminal,
  Activity,
  Layers,
  Rocket,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createComponent } from "@/features/create/actions";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import CreateForm, { CreateComponentValues } from "@/features/create/components/CreateForm";

// New Dashboard Components
import ForgeSidebar from "@/features/create/components/ForgeSidebar";
import ForgeHero from "@/features/create/components/ForgeHero";
import ForgeModules from "@/features/create/components/ForgeModules";
import ForgeBlueprint from "@/features/create/components/ForgeBlueprint";
import Navbar from "@/components/layout/Navbar";

// Placeholder for new modes
import ForgeBlueprintsMode from "@/features/create/components/ForgeBlueprintsMode";
import ForgeStagingMode from "@/features/create/components/ForgeStagingMode";

type ForgeView = 'hub' | 'editor' | 'blueprints' | 'staging';

// Default Boilerplate for Componeo Elite
const BOILERPLATE_TEMPLATE = `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MyCustomComponent() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-12 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center min-h-[300px] text-center gap-4"
    >
      <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20">
        <Sparkles size={24} />
      </div>
      <h2 className="font-headline text-3xl font-black text-white italic uppercase tracking-tighter">
        Elite Atomic Unit
      </h2>
      <p className="text-xs text-neutral-500 font-body uppercase tracking-[0.2em]">
        Status: Fusing Complete
      </p>
    </motion.div>
  );
}`;

export default function CreateComponentPage() {
  const router = useRouter();
  const supabase = createClient();
  const [view, setView] = useState<ForgeView>('hub');
  const [code, setCode] = useState(BOILERPLATE_TEMPLATE);
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?next=/create");
        return;
      }
      setUser(user);
      setIsLoadingAuth(false);
    };
    checkUser();
  }, [supabase, router]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setIsCompiling(true);
    const timer = setTimeout(() => setIsCompiling(false), 800);
    return () => clearTimeout(timer);
  };

  const handleFormSubmit = async (data: CreateComponentValues) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const result = await createComponent(data);
      if (result.error) {
        setSaveError(result.error);
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setSaveError("FORGE_OVERHEAT: A critical systemic failure occurred during fusion.");
    } finally {
      setIsSaving(false);
    }
  };

  // Auth bypass: we allow the page to render even if loading (or just show it immediately)
  if (isLoadingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
        <div className="relative">
          <div className="w-24 h-24 border-2 border-cyan-400/10 rounded-full animate-ping" />
          <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
             <Activity size={32} className="animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-cyan-400 selection:text-black font-body overflow-x-hidden uppercase tracking-tighter">
      {/* Global Navbar */}
      <Navbar />

      {/* Forge Sidebar */}
      <ForgeSidebar activeView={view} onViewChange={setView} />

      {/* Main Content Content */}
      <main className={`lg:pl-64 pt-32 min-h-screen transition-all duration-700 ${view === 'editor' ? 'bg-[#050505]' : 'bg-[#0a0a0a]'}`}>
        <AnimatePresence mode="wait">
          {view === 'hub' && (
            <motion.div 
              key="hub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-8 pb-32"
            >
              <ForgeHero onStartBuilding={() => setView('editor')} />
              <ForgeModules onAction={(action: 'compiler' | 'blueprints' | 'staging') => {
                if (action === 'compiler') setView('editor');
                else if (action === 'blueprints') setView('blueprints');
                else if (action === 'staging') setView('staging');
              }} />
              <ForgeBlueprint />
            </motion.div>
          )}

          {view === 'blueprints' && (
            <motion.div 
              key="blueprints"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto px-8 pb-32"
            >
               <ForgeBlueprintsMode />
            </motion.div>
          )}

          {view === 'staging' && (
            <motion.div 
              key="staging"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="px-8 pb-32"
            >
               <ForgeStagingMode />
            </motion.div>
          )}

          {view === 'editor' && (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="h-[calc(100vh-8rem)] flex flex-col md:flex-row relative"
            >
              {/* Editor Header Overlay */}
              <div className="absolute top-0 left-0 right-0 z-40 px-10 py-6 flex justify-between items-center pointer-events-none">
                <button 
                  onClick={() => setView('hub')}
                  className="pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 hover:text-cyan-400 hover:bg-white/10 transition-all font-headline font-black text-[9px] tracking-[0.3em] uppercase"
                >
                  <ArrowLeft size={16} />
                  Return to Hub
                </button>

                <div className="flex items-center gap-4 pointer-events-auto">
                  <button 
                    onClick={() => setShowPreview(!showPreview)} 
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-headline text-[9px] tracking-[0.3em] uppercase transition-all font-black border ${
                      showPreview ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30' : 'text-neutral-500 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <Eye size={16} />
                    {showPreview ? "Hide Stage" : "Show Stage"}
                  </button>
                  <button 
                    form="forge-form"
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-3 bg-cyan-500 text-black px-8 py-3 rounded-2xl font-headline text-[9px] tracking-[0.3em] uppercase font-black hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} strokeWidth={2} />}
                    {isSaving ? "FORGING..." : "Finalize"}
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <section className={`flex-1 overflow-y-auto p-10 pt-24 scrollbar-hide ${showPreview ? "md:w-1/2" : "md:w-full"}`}>
                <div className="max-w-3xl mx-auto space-y-12">
                  <div className="space-y-4 border-b border-white/5 pb-8">
                    <div className="inline-flex items-center gap-2 text-cyan-400">
                      <Terminal size={16} />
                      <span className="text-[10px] font-headline font-black uppercase tracking-[0.4em]">Engine Terminal</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-lg uppercase tracking-tighter">
                      Define the atomic properties of your unit. Every fused component is automatically versioned and verified.
                    </p>
                  </div>
                  
                  <CreateForm 
                    initialCode={BOILERPLATE_TEMPLATE}
                    onCodeChange={handleCodeChange}
                    isSaving={isSaving}
                    saveError={saveError}
                    onSaveError={setSaveError}
                    onSubmit={handleFormSubmit}
                  />
                </div>
              </section>

              {/* Preview Content */}
              <AnimatePresence>
                {showPreview && (
                  <motion.section 
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    className="flex-1 bg-[#050505] p-10 overflow-y-auto relative border-l border-white/5 flex items-center justify-center min-h-[600px]"
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px]" />
                    
                    <div className="w-full max-w-3xl flex items-center justify-center p-12">
                      <div className="w-full h-full min-h-[500px] bg-[#111] rounded-[3.5rem] p-16 shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 relative overflow-hidden flex items-center justify-center">
                         <AnimatePresence mode="wait">
                           {isCompiling ? (
                              <motion.div 
                                key="compiling"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                                className="text-center space-y-10 relative z-10"
                              >
                                 <div className="relative inline-block">
                                    <div className="w-32 h-32 border border-cyan-400/20 rounded-full animate-[ping_2s_infinite]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-16 h-16 border-2 border-cyan-400/40 border-t-transparent rounded-full animate-spin" />
                                      <Activity className="text-cyan-400 absolute animate-pulse" size={24} />
                                    </div>
                                    <div className="rotating-radar" />
                                 </div>
                                 <div className="space-y-4">
                                   <h3 className="font-headline text-3xl font-black text-white italic tracking-tighter uppercase chromatic-text">Fusing Atoms</h3>
                                   <div className="flex items-center justify-center gap-1">
                                      {[...Array(3)].map((_, i) => (
                                        <motion.div 
                                          key={i}
                                          animate={{ opacity: [0.2, 1, 0.2] }}
                                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                          className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f2ff]"
                                        />
                                      ))}
                                   </div>
                                 </div>
                              </motion.div>
                           ) : (
                              <motion.div 
                                key="ready"
                                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center space-y-8 w-full relative z-10"
                              >
                                 <div className="inline-block relative">
                                    <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full animate-pulse" />
                                    <div className="relative p-8 border border-cyan-400/30 bg-black/40 backdrop-blur-3xl rounded-[2.5rem] text-cyan-400 shadow-[0_0_50px_rgba(0,242,255,0.15)] group-hover:scale-105 transition-transform duration-700">
                                      <Sparkles size={56} className="animate-pulse" />
                                    </div>
                                 </div>
                                 <div className="space-y-3">
                                   <h3 className="font-headline text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Sync Validated</h3>
                                   <p className="text-neutral-500 font-body text-[10px] tracking-[0.2em] max-w-sm mx-auto leading-relaxed uppercase opacity-60">
                                     Unit ID: <span className="text-white">COMPONEO-ELITE-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                   </p>
                                   <p className="text-neutral-400 font-body text-xs max-w-sm mx-auto leading-relaxed uppercase tracking-tighter pt-4">
                                     Your unit has been validated against the <span className="text-cyan-400 font-bold">Forge Protocol</span>. Integration ready.
                                   </p>
                                 </div>
                              </motion.div>
                           )}
                         </AnimatePresence>
                      </div>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
