"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ShieldCheck, Command, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Matrix access link dispatched. Check your terminal (inbox)." });
    }
    setLoading(false);
  };

  return (
    <div className="asymmetric-gradient min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 pt-40 pb-32">
        {/* Elite Command HUD */}
        <div className="max-w-md w-full mb-8 flex items-center justify-between px-6 py-3 relative glass-premium rounded-2xl border-white/[0.03]">
           {/* Technical Corner Markers */}
           <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/30 rounded-tl-sm" />
           <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/30 rounded-tr-sm" />
           <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/30 rounded-bl-sm" />
           <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/30 rounded-br-sm" />

           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-cyan-400/10 rounded-lg text-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.2)]">
                <Command size={12} strokeWidth={2.5} />
              </div>
              <div className="flex items-center gap-2 text-[9px] font-headline font-black text-neutral-500 uppercase tracking-[0.2em]">
                <span className="opacity-50 text-[7px] tracking-normal mr-1">Path:</span>
                <span className="hover:text-cyan-400 transition-colors cursor-default">Access</span>
                <ChevronRight size={10} className="text-white/10" />
                <span className="text-white/90">Uplink</span>
              </div>
           </div>
           <div className="flex gap-2.5 items-center">
             <div className="flex gap-0.5">
               <div className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
               <div className="w-0.5 h-2 bg-cyan-400/40" />
               <div className="w-0.5 h-2 bg-cyan-400/20" />
             </div>
             <span className="text-[7px] font-headline font-black text-cyan-400 uppercase tracking-[0.3em]">Signal: Secure</span>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full refractive-glass rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group"
        >
          {/* Internal Refraction Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/5 blur-[100px] pointer-events-none group-hover:bg-cyan-400/10 transition-colors duration-1000" />
          
          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-6">
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 text-cyan-400 shadow-2xl group/shield overflow-hidden">
                <div className="rotating-radar opacity-0 group-hover/shield:opacity-100 transition-opacity duration-700" />
                <ShieldCheck size={38} strokeWidth={1.5} className="relative z-10 group-hover/shield:scale-110 group-hover/shield:drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] transition-all duration-500" />
              </div>
              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-headline text-5xl font-black text-white italic uppercase tracking-tighter chromatic-text"
                >
                  Matrix Access
                </motion.h1>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-4 bg-white/10" />
                  <p className="text-[8px] text-neutral-500 font-headline font-black uppercase tracking-[0.5em]">
                    id_req: identity_v1.0.auth
                  </p>
                  <div className="h-[1px] w-4 bg-white/10" />
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center ml-1">
                  <label className="font-headline text-[8px] tracking-[0.4em] font-black text-neutral-500 uppercase">
                    Verification Source
                  </label>
                  <span className="text-[7px] font-mono text-cyan-400/40">UDP://AUTH.01</span>
                </div>
                <div className="relative group holographic-focus">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors z-10" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@componeo.io"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-6 pl-16 pr-6 text-gray-100 text-[13px] focus:outline-none focus:border-cyan-400/30 focus:ring-1 focus:ring-cyan-400/5 transition-all font-mono tracking-tight placeholder:text-gray-500 backdrop-blur-sm"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                       <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                       <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                       <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400/40 via-white/5 to-purple-400/40 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <button
                  disabled={loading}
                  className="relative w-full bg-white text-black font-headline font-black uppercase tracking-[0.25em] py-6 rounded-2xl text-[10px] transition-all piston-core overflow-hidden flex items-center justify-center gap-3 disabled:opacity-50 group-active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-200 opacity-100" />
                  <span className="relative z-10">{loading ? "Synchronizing..." : "Dispatch Access Link"}</span>
                  {!loading && <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
                </button>
              </div>
            </form>

            {message && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl text-[10px] font-headline font-black uppercase tracking-widest text-center border ${
                  message.type === "success" 
                    ? "bg-emerald-400/5 border-emerald-400/20 text-emerald-400" 
                    : "bg-red-400/5 border-red-400/20 text-red-400"
                }`}
              >
                {message.text}
              </motion.div>
            )}
            
            <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-2">
              <p className="text-[8px] text-neutral-700 font-headline font-black uppercase tracking-[0.4em]">
                Secured by Componeo Identity Matrix
              </p>
              <div className="flex gap-1.5 grayscale opacity-20">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
