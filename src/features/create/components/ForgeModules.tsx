"use client";

import React from "react";
import { GitBranch, Box, Terminal, ArrowRight, Activity, Share2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

type ForgeModuleAction = 'compiler' | 'blueprints' | 'staging';

interface ForgeModulesProps {
  onAction?: (action: ForgeModuleAction) => void;
}

export default function ForgeModules({ onAction }: ForgeModulesProps) {
  const modules = [
    {
      id: 'compiler' as const,
      title: "Logic Weaver",
      description: "Synthesize complex algorithmic paths into a single thread of executable architectural logic.",
      status: "ACTIVE",
      icon: <GitBranch className="w-6 h-6 text-cyan-400" />,
      bgIcon: <Share2 className="w-24 h-24 text-neutral-800" />
    },
    {
      id: 'blueprints' as const,
      title: "Resource Engine",
      description: "Dynamic allocation of computational assets across distributed clusters and local nodes.",
      status: "SCALING",
      icon: <Activity className="w-6 h-6 text-cyan-400" />,
      bgIcon: <Box className="w-24 h-24 text-neutral-800" />
    },
    {
      id: 'staging' as const,
      title: "Deployment Shell",
      description: "Automated staging and production environment provisioning with architectural security layers.",
      status: "READY",
      icon: <Terminal className="w-6 h-6 text-cyan-400" />,
      bgIcon: <Rocket className="w-24 h-24 text-neutral-800" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {modules.map((module, idx) => (
        <motion.div 
          key={module.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="group bg-[#131313] p-10 rounded-3xl ghost-border hover:border-cyan-400/40 transition-all duration-500 relative overflow-hidden shadow-xl"
        >
          {/* Background Decorative Icon */}
          <div className="absolute top-4 right-4 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity pointer-events-none">
            {module.bgIcon}
          </div>

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 border border-white/5 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/50 transition-all shadow-inner">
              {module.icon}
            </div>
            <h3 className="font-headline font-black text-2xl mb-4 tracking-tight uppercase text-white italic">{module.title}</h3>
            <p className="text-neutral-500 text-sm font-body leading-relaxed mb-10 uppercase tracking-tighter">
              {module.description}
            </p>
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <span className="text-[10px] font-headline font-black text-cyan-400 tracking-[0.3em] uppercase">{module.status}</span>
              <button 
                onClick={() => onAction?.(module.id)}
                className="text-neutral-500 hover:text-cyan-400 transition-colors group-hover:translate-x-1 duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
