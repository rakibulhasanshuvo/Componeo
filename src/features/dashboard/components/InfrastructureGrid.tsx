"use client";

import React from "react";
import { motion } from "framer-motion";

const NODES = [
  { id: "US-EAST-01", region: "N. Virginia Cluster", latency: "8ms", uptime: "99.99%", status: "Active", bars: [4, 6, 5, 8, 4, 7, 9, 10] },
  { id: "EU-WEST-01", region: "Dublin Cluster", latency: "14ms", uptime: "99.98%", status: "Active", bars: [7, 8, 5, 6, 8, 7, 5, 4] },
  { id: "AP-SOUTH-02", region: "Mumbai Cluster", latency: "42ms", uptime: "98.42%", status: "Throttled", bars: [4, 3, 6, 10, 8, 7, 9, 8] },
  { id: "US-WEST-02", region: "Oregon Cluster", latency: "11ms", uptime: "99.99%", status: "Active", bars: [5, 4, 6, 7, 8, 6, 9, 10] },
];

export default function InfrastructureGrid() {
  return (
    <div className="col-span-12">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase pb-2 border-b border-primary/20">
          Active Infrastructure Nodes
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-surface-container-high rounded-full border border-white/5 text-[9px] font-label font-bold text-on-surface uppercase tracking-widest hover:bg-white/10 transition-all">
            Sort: Latency
          </button>
          <button className="px-3 py-1 bg-surface-container-high rounded-full border border-white/5 text-[9px] font-label font-bold text-on-surface uppercase tracking-widest hover:bg-white/10 transition-all">
            Filter: All Regions
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {NODES.map((node, i) => (
          <motion.div 
            key={node.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-surface-container-low rounded-xl border border-white/5 p-5 transition-all group relative overflow-hidden ${
              node.status === "Throttled" ? "hover:border-error/30" : "hover:border-primary/30"
            }`}
          >
            {/* Background Grain/Noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="text-sm font-headline font-black text-white tracking-wide italic">
                  {node.id}
                </h3>
                <p className="text-[9px] font-label font-bold text-outline tracking-widest uppercase">
                  {node.region}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-[10px] font-headline font-black ${
                  node.status === "Throttled" ? "text-error" : "text-primary"
                }`}>
                  {node.latency}
                </div>
                <div className="text-[8px] font-label font-bold text-outline uppercase tracking-tighter">
                  Latency
                </div>
              </div>
            </div>

            {/* Latency Sparkline Graph */}
            <div className="h-10 flex items-end gap-1 mb-4 relative z-10">
              {node.bars.map((bar, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 rounded-t-sm transition-all duration-500 delay-[${idx * 50}ms] group-hover:opacity-100 opacity-60 ${
                    node.status === "Throttled" ? "bg-error/40 group-hover:bg-error" : "bg-primary/20 group-hover:bg-primary/80"
                  }`}
                  style={{ height: `${bar * 10}%` }}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-[9px] font-label font-bold tracking-widest uppercase relative z-10">
              <span className={node.status === "Throttled" ? "text-error" : "text-primary"}>
                {node.uptime} Uptime
              </span>
              <span className="text-on-surface-variant">
                {node.status}
              </span>
            </div>
            
            {/* Sub-status Indicator Animation */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/30 transition-all" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
