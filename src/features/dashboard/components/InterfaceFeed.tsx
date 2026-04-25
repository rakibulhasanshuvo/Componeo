"use client";

import React from "react";
import { 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  Activity 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SYSTEM_LOGS = [
  { id: 1, type: "success", title: "DEPLOYMENT_COMPLETE", time: "12:44:02", message: "System module 'Auth-V4' successfully migrated to US-East-1 node." },
  { id: 2, type: "warning", title: "THROTTLE_ENGAGED", time: "12:38:15", message: "Rate limiting active on EU-West-3 due to spike in anomalous traffic." },
  { id: 3, type: "success", title: "HEARTBEAT_STABLE", time: "12:20:00", message: "Global health check passed for all 48 infrastructure nodes." },
  { id: 4, type: "info", title: "CONFIG_SYNC", time: "11:55:22", message: "Updating environment variables across monolith cluster B." },
  { id: 5, type: "success", title: "UNIT_FORGED", time: "11:42:10", message: "New atomic unit 'Liquid-Button-H' successfully synthesized." },
];

export default function InterfaceFeed() {
  return (
    <div className="col-span-12 lg:col-span-5 bg-surface-container-low rounded-xl border border-white/5 flex flex-col h-full overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-primary" />
          <span className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase">
            Nexus Interface Feed
          </span>
        </div>
        <History size={14} className="text-outline hover:text-white transition-colors cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {SYSTEM_LOGS.map((log, idx) => (
            <motion.div 
              key={log.id} 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4 items-start group"
            >
              <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 shadow-lg ${
                log.type === "success" ? "bg-primary shadow-primary/20" : 
                log.type === "warning" ? "bg-error shadow-error/20" : 
                "bg-tertiary shadow-tertiary/20"
              }`}></div>
              <div className="flex-1 border-b border-white/5 pb-4 group-last:border-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`text-xs font-headline font-black tracking-wider ${
                    log.type === "warning" ? "text-error" : "text-white"
                  }`}>
                    {log.title}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-outline uppercase tracking-tighter tabular-nums opacity-60">
                    {log.time}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                  {log.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Decorative Status Bar at bottom of feed */}
      <div className="px-6 py-2 bg-primary/5 border-t border-white/5 flex items-center justify-between">
        <span className="text-[8px] font-label font-bold text-primary/60 tracking-[0.2em] uppercase">SYSTEM REAL-TIME STATUS: NOMINAL</span>
        <div className="flex gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
