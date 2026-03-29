"use client";

import React from "react";
import { 
  Cpu, 
  Terminal, 
  Layers, 
  Rocket, 
  HelpCircle, 
  FileText,
  Plus,
  Layout
} from "lucide-react";

type ForgeView = 'hub' | 'editor' | 'blueprints' | 'staging';

interface ForgeSidebarProps {
  activeView: ForgeView;
  onViewChange: (view: ForgeView) => void;
}

export default function ForgeSidebar({ activeView, onViewChange }: ForgeSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 pt-28 bg-[#0a0a0a] border-r border-cyan-400/10 z-40 transition-all duration-300 ease-out">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-cyan-400/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
              <Cpu className="text-cyan-400 w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline font-black text-cyan-400 text-sm tracking-tighter">THE FORGE</h2>
              <p className="text-[10px] text-neutral-500 font-headline tracking-widest uppercase">v4.0.1 Stable</p>
            </div>
          </div>
          <button 
            onClick={() => onViewChange('editor')}
            className="w-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-black font-headline font-black text-[10px] tracking-widest py-3 rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.2)] active:scale-95 transition-all hover:brightness-110 uppercase"
          >
            NEW PROJECT
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <SidebarLink 
            icon={<Plus className="w-4 h-4" />} 
            label="ENGINE" 
            active={activeView === 'hub'} 
            onClick={() => onViewChange('hub')}
          />
          <SidebarLink 
            icon={<Terminal className="w-4 h-4" />} 
            label="COMPILER" 
            active={activeView === 'editor'} 
            onClick={() => onViewChange('editor')}
          />
          <SidebarLink 
            icon={<Layers className="w-4 h-4" />} 
            label="BLUEPRINTS" 
            active={activeView === 'blueprints'} 
            onClick={() => onViewChange('blueprints')}
          />
          <SidebarLink 
            icon={<Rocket className="w-4 h-4" />} 
            label="STAGING" 
            active={activeView === 'staging'} 
            onClick={() => onViewChange('staging')}
          />
        </nav>

        <div className="px-6 py-6 border-t border-white/5 space-y-2">
          <SidebarSmallLink icon={<HelpCircle className="w-3.5 h-3.5" />} label="SUPPORT" />
          <SidebarSmallLink icon={<FileText className="w-3.5 h-3.5" />} label="DOCS" />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-cyan-400/10 z-50 flex items-center justify-around px-4 pb-safe">
        <MobileNavLink 
          icon={<Plus className="w-5 h-5" />} 
          active={activeView === 'hub'} 
          onClick={() => onViewChange('hub')} 
        />
        <MobileNavLink 
          icon={<Terminal className="w-5 h-5" />} 
          active={activeView === 'editor'} 
          onClick={() => onViewChange('editor')} 
        />
        <div className="relative -top-6">
           <button 
             onClick={() => onViewChange('editor')}
             className="w-14 h-14 bg-cyan-400 text-black rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)] border-4 border-[#0a0a0a] active:scale-90 transition-all"
           >
             <Cpu size={24} />
           </button>
        </div>
        <MobileNavLink 
          icon={<Layers className="w-5 h-5" />} 
          active={activeView === 'blueprints'} 
          onClick={() => onViewChange('blueprints')} 
        />
        <MobileNavLink 
          icon={<Rocket className="w-5 h-5" />} 
          active={activeView === 'staging'} 
          onClick={() => onViewChange('staging')} 
        />
      </nav>
    </>
  );
}

function MobileNavLink({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl transition-all ${
        active ? "text-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,212,255,0.1)]" : "text-neutral-500"
      }`}
    >
      {icon}
    </button>
  );
}

function SidebarLink({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean,
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 ${
        active 
          ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shadow-[0_0_15px_rgba(0,212,255,0.05)]" 
          : "text-neutral-500 hover:text-cyan-400 hover:bg-white/5"
      }`}
    >
      <span className={active ? "text-cyan-400" : ""}>{icon}</span>
      <span className="font-headline font-black text-[10px] tracking-widest uppercase">{label}</span>
    </button>
  );
}

function SidebarSmallLink({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-4 text-neutral-500 hover:text-cyan-400 transition-all group w-full px-2 py-1">
      <span className="opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
      <span className="font-headline font-black text-[9px] tracking-widest uppercase">{label}</span>
    </button>
  );
}
