"use server";

import { cache } from "react";
import { createClient } from "@/utils/supabase/server";
import { createStaticClient } from "@/utils/supabase/static";
import { ComponentsRepository, ComponentRow } from "@/lib/repositories/componentsRepository";
import { ELITE_MOCK_COMPONENTS } from "./mockData";
import { unstable_cache } from "next/cache";

const getCachedComponents = async (category?: string) => {
  const cachedFn = unstable_cache(
    async (cat?: string) => {
      try {
        const supabase = createStaticClient();
        const repository = new ComponentsRepository(supabase);
        const data = await repository.getPublicComponents(cat);

        // If database is empty, provide the architectural fallback for "Elite" onboarding
        if (data.length === 0) {
          console.warn("SYSTEM: [Database_Empty] Serving architectural fallback set.");
          return ELITE_MOCK_COMPONENTS as unknown as ComponentRow[];
        }

        return data;
      } catch (error) {
        console.error("SYSTEM: [Database_Error] Fetching components failed:", error);
        // Emergency UI pivot to mock data to prevent total system blackout
        return ELITE_MOCK_COMPONENTS as unknown as ComponentRow[];
      }
    },
    ['components', category ?? 'all'],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: ['components']
    }
  );
  return cachedFn(category);
};

/**
 * Fetch all public components for the registry.
 */
export async function getComponents(category?: string): Promise<ComponentRow[]> {
  const start = performance.now();
  const data = await getCachedComponents(category);
  const end = performance.now();
  console.log(`[Performance] getComponents(${category ?? 'all'}) took ${(end - start).toFixed(2)}ms`);
  return data;
}

/**
 * Fetch a single component by its Unique ID.
 */
export async function getComponentById(id: string): Promise<ComponentRow | null> {
  try {
    const supabase = await createClient();
    const repository = new ComponentsRepository(supabase);
    const data = await repository.getComponentById(id);
    
    if (!data) {
      // Check mock data for development units (e.g. initial registry units)
      return (ELITE_MOCK_COMPONENTS.find(m => m.id === id) as unknown as ComponentRow) || null;
    }

    return data;
  } catch (error) {
    console.error(`SYSTEM: [Database_Error] Fetching component ${id} failed:`, error);
    return (ELITE_MOCK_COMPONENTS.find(m => m.id === id) as unknown as ComponentRow) || null;
  }
}
