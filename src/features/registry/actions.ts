"use server";

import { cache } from "react";
import { createClient } from "@/utils/supabase/server";
import { createStaticClient } from "@/utils/supabase/static";
import { ComponentsRepository, ComponentRow } from "@/lib/repositories/componentsRepository";
import { ELITE_MOCK_COMPONENTS } from "./mockData";
import { unstable_cache } from "next/cache";
import { cache } from "react";

/**
 * Fetch all public components for the registry.
 */
export const getComponents = cache(async (category?: string): Promise<ComponentRow[]> => {
  return unstable_cache(
    async () => {
      const supabase = createStaticClient();
      const repository = new ComponentsRepository(supabase);

      try {
        const data = await repository.getPublicComponents(category);

        // If database is empty, provide the architectural fallback for "Elite" onboarding
        if (data.length === 0) {
          console.warn("SYSTEM: [Database_Empty] Serving architectural fallback set.");
          return ELITE_MOCK_COMPONENTS as any;
        }

        return data;
      } catch (error) {
        console.error("SYSTEM: [Database_Error] Fetching components failed:", error);
        // Emergency UI pivot to mock data to prevent total system blackout
        return ELITE_MOCK_COMPONENTS as any;
      }
    },
    [`components-registry-${category || 'all'}`],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: ['components']
    }
  )();
});

/**
 * Fetch a single component by its Unique ID.
 */
const fetchComponent = cache(async (id: string): Promise<ComponentRow | null> => {
  const supabase = await createClient();
  const repository = new ComponentsRepository(supabase as any);
  
  try {
    const supabase = await createClient();
    const repository = new ComponentsRepository(supabase);

    const data = await repository.getComponentById(id);
    
    if (!data) {
      // Check mock data for development units (e.g. initial registry units)
      return ELITE_MOCK_COMPONENTS.find(m => m.id === id) || null;
    }

    return data;
  } catch (error) {
    console.error(`SYSTEM: [Database_Error] Fetching component ${id} failed:`, error);
    return ELITE_MOCK_COMPONENTS.find(m => m.id === id) || null;
  }
});

export async function getComponentById(id: string): Promise<ComponentRow | null> {
  return fetchComponent(id);
}
