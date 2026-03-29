"use client";

import React from "react";
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackThemeProvider,
} from "@codesandbox/sandpack-react";
import { monokaiPro } from "@codesandbox/sandpack-themes";
import { Maximize2, RefreshCw, Zap } from "lucide-react";

interface NexusStageProps {
  code: string;
}

export default function NexusStage({ code }: NexusStageProps) {
  // We wrap the code in a basic React component structure if it's just a snippet
  // But usually, Componeo code is already a full component.
  // We'll provide a default App.tsx for Sandpack.
  
  const files = {
    "/App.tsx": code.includes("export default") ? code : `
import React from "react";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      ${code}
    </div>
  );
}
    `,
  };

  return (
    <div className="group relative border border-white/5 rounded-3xl overflow-hidden bg-[#050505] shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-cyan-400/20">
      {/* HUD Header */}
      <div className="bg-white/[0.02] border-b border-white/5 py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400/20" />
            <div className="w-2 h-2 rounded-full bg-amber-400/20" />
            <div className="w-2 h-2 rounded-full bg-emerald-400/20" />
          </div>
          <span className="text-[9px] font-headline font-black text-neutral-600 uppercase tracking-[0.2em]">
            Atomic Synthesis Engine // Live
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-neutral-600 hover:text-cyan-400 transition-colors">
            <RefreshCw size={12} />
          </button>
          <button className="text-neutral-600 hover:text-cyan-400 transition-colors">
            <Maximize2 size={12} />
          </button>
        </div>
      </div>

      {/* Sandpack Stage */}
      <div className="relative min-h-[500px]">
        <SandpackProvider 
          template="react-ts" 
          files={files}
          theme={monokaiPro}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout className="!border-none !rounded-none">
            <SandpackPreview 
              className="!h-[500px] !bg-black" 
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
            />
          </SandpackLayout>
        </SandpackProvider>

        {/* HUD Overlays */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md border border-white/5 py-1 px-3 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-headline font-black text-emerald-400 uppercase tracking-widest">Stable</span>
          </div>
        </div>
      </div>

      {/* HUD Footer */}
      <div className="bg-white/[0.01] border-t border-white/5 py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap size={12} className="text-cyan-400" />
          <span className="text-[9px] font-headline font-black text-neutral-700 uppercase tracking-[0.3em]">
            Real-time Hot Module Replacement
          </span>
        </div>
        <span className="text-[8px] font-label font-bold text-neutral-800 uppercase tracking-widest leading-none">
          v01.03. Synthesis Nexus
        </span>
      </div>
    </div>
  );
}
