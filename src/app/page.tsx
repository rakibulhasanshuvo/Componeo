import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterBar from "@/features/registry/components/FilterBar";
import ComponentCard from "@/features/registry/components/ComponentCard";
import { getComponents } from "@/features/registry/actions";
import { 
  Boxes, 
  Search, 
  Settings2, 
  ArrowRight,
  Zap,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const components = await getComponents(category);

  return (
    <div className="asymmetric-gradient min-h-screen flex flex-col selection:bg-cyan-400 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 pt-40 pb-32 relative">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* 3. Registry Interface */}
        <div className="relative z-10 space-y-12">
          
          {/* Holographic Header Section */}
          <header className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-cyan-400 font-headline text-[10px] font-black uppercase tracking-[0.4em]">
                  <Boxes size={14} />
                  Atomic Unit Registry // v1.2.0
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase italic">
                  The <span className="text-cyan-400">Elite</span> Matrix
                </h1>
              </div>
              
              <div className="flex items-center gap-8 border-l border-white/5 pl-8 py-2 hidden xl:flex">
                 <div className="space-y-1">
                   <div className="text-[10px] font-headline font-black text-neutral-600 uppercase tracking-widest">Active Units</div>
                   <div className="text-xl font-headline font-black text-white italic">{components.length.toString().padStart(2, '0')}</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-[10px] font-headline font-black text-neutral-600 uppercase tracking-widest">Stability</div>
                   <div className="text-xl font-headline font-black text-emerald-400 italic">99.8%</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-[10px] font-headline font-black text-neutral-600 uppercase tracking-widest">Threat Level</div>
                   <div className="text-xl font-headline font-black text-white italic">0.0</div>
                 </div>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="text-sm font-body text-neutral-500 leading-relaxed">
                Archival access to high-fidelity React modules designed for the Componeo ecosystem. 
                Every unit in the matrix is verified for atomic stability and performance optimization.
              </p>
            </div>
          </header>

          {/* Filtering Engine */}
          <FilterBar />

          {/* Atomic Unit Grid */}
          <section className="pb-40">
            {components.length > 0 ? (
              <div 
                role="grid" 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start"
              >
                {components.map((item, idx) => (
                  <ComponentCard key={item.id} component={item} idx={idx} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-white/[0.01] border border-white/5 rounded-[3rem] space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/5 blur-[100px] rounded-full" />
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-cyan-400/20 border border-white/10 rotate-12">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-headline text-3xl font-black text-white uppercase tracking-tighter italic">
                      Registry Offline
                    </h2>
                    <p className="text-neutral-500 font-body max-w-sm mx-auto text-sm leading-relaxed">
                      All atomic units are currently de-materialized. Initialize the Forge to synthesize new components.
                    </p>
                  </div>
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center gap-3 bg-white text-black py-4 px-10 rounded-2xl font-headline font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all duration-500 shadow-2xl group"
                  >
                    Enter the Forge
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>

      </main>
      <Footer />
    </div>
  );
}
