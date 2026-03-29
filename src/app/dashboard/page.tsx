import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ComponentRow } from "@/lib/repositories/componentsRepository";

// New Dashboard Components
import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import StabilityIndex from "@/features/dashboard/components/StabilityIndex";
import InterfaceFeed from "@/features/dashboard/components/InterfaceFeed";
import InfrastructureGrid from "@/features/dashboard/components/InfrastructureGrid";
import ForgeActivityTable from "@/features/dashboard/components/ForgeActivityTable";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch real components for the activity table
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  const components = (data as ComponentRow[]) || [];

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-hidden h-screen flex flex-col">
      {/* Top Console Bar */}
      <DashboardNavbar />

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Fixed Navigation Sidebar */}
        <DashboardSidebar />

        {/* Main Command Center area */}
        <main className="flex-1 lg:ml-64 overflow-y-auto bg-surface p-8 scroll-smooth scrollbar-hide">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
            {/* Console Header */}
            <div className="flex justify-between items-end border-b border-white/5 pb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tighter text-white mb-2 italic uppercase chromatic-text">
                  System Overview
                </h1>
                <p className="text-on-surface-variant font-body text-xs md:text-sm max-w-lg uppercase tracking-tight opacity-70">
                  Monitoring the Digital Monolith. All sub-systems reporting nominal operational efficiency.
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase">Global Latency</div>
                  <div className="text-xl font-headline font-black text-primary italic">12.4ms</div>
                </div>
                <div className="text-right border-l border-white/10 pl-6">
                  <div className="text-[10px] font-label font-bold text-on-surface-variant tracking-widest uppercase">Active Throttles</div>
                  <div className="text-xl font-headline font-black text-white italic">00</div>
                </div>
              </div>
            </div>

            {/* Central Monitoring Matrix */}
            <div className="grid grid-cols-12 gap-6">
              <StabilityIndex />
              <InterfaceFeed />
            </div>

            {/* Expansion Modules */}
            <InfrastructureGrid />
            <ForgeActivityTable components={components} />

            {/* Technical Metadata Footer */}
            <div className="flex items-center gap-4 py-12 opacity-20 select-none">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <span className="text-[8px] font-label font-bold tracking-[0.5em] uppercase text-center">
                Architecture Verified by COMPONEO Monolith Security Tier
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
