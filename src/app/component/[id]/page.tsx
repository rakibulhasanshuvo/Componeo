import React from "react";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ChevronRight, 
  Layers, 
  Maximize2, 
  Zap, 
  FileCode,
  Box,
  Share2,
  Trash2
} from "lucide-react";
import Link from "next/link";
import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import { getComponentById } from "@/features/registry/actions";
import NexusStage from "@/features/component/components/NexusStage";
import NexusSpecs from "@/features/component/components/NexusSpecs";
import MonacoEditor from "@/components/editor/MonacoEditor";

interface ComponentPageProps {
  params: Promise<{ id: string }>;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { id } = await params;
  const component = await getComponentById(id);

  if (!component) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-[#0a0a0b] overflow-hidden">
      {/* 1. Technical Sidebar */}
      <DashboardSidebar />

      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        {/* 2. Command Hub Navbar */}
        <DashboardNavbar />

        {/* 3. Nexus Interface */}
        <div className="p-8 lg:p-12 space-y-12">
          {/* Breadcrumbs HUD */}
          <div className="flex items-center gap-4 text-[10px] font-headline font-black text-neutral-600 uppercase tracking-widest">
            <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Registry</Link>
            <ChevronRight size={10} />
            <span className="text-neutral-400">Blueprint</span>
            <ChevronRight size={10} />
            <span className="text-cyan-400">{component.title}</span>
          </div>

          {/* Top Section: Split Layout Stage & Specs */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
            {/* Direct Inspection Area */}
            <div className="xl:col-span-8 space-y-6">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Box size={16} className="text-cyan-400" />
                    <h2 className="text-xs font-headline font-black text-white uppercase tracking-widest">Synthesis Nexus // Stage</h2>
                 </div>
               </div>
               <NexusStage code={component.code} />
            </div>

            {/* Technical Metadata Area */}
            <div className="xl:col-span-4 sticky top-12">
               <NexusSpecs component={component} />
            </div>
          </div>

          {/* Bottom Section: Code Analysis Editor */}
          <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <FileCode size={16} className="text-purple-400" />
                <h2 className="text-xs font-headline font-black text-white uppercase tracking-widest">Atomic Structure // Deep Inspection</h2>
              </div>
              <div className="flex items-center gap-4">
                 <button className="text-[10px] font-headline font-black text-neutral-600 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
                   <Share2 size={12} />
                   Broadcast
                 </button>
                 <button className="text-[10px] font-headline font-black text-neutral-600 hover:text-red-400 uppercase tracking-widest flex items-center gap-2 transition-colors">
                   <Trash2 size={12} />
                   Decommission
                 </button>
              </div>
            </div>
            
            <div className="group relative">
               {/* Decorative holographic glow */}
               <div className="absolute -inset-1 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                 <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 rounded-[2rem]" />
               </div>
               
               <MonacoEditor 
                 value={component.code} 
                 language="typescript" 
                 readOnly={true} 
                 height="500px"
               />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
