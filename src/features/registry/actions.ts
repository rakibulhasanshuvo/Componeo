"use server";

import { cache } from "react";
import { createClient } from "@/utils/supabase/server";
import { createStaticClient } from "@/utils/supabase/static";
import { ComponentsRepository, ComponentRow } from "@/lib/repositories/componentsRepository";
import { ELITE_MOCK_COMPONENTS } from "./mockData";
import { unstable_cache } from "next/cache";

const fetchComponents = cache(async (category?: string) => {
  return unstable_cache(
    async () => {
      try {
        const supabase = createStaticClient();
        const repository = new ComponentsRepository(supabase);
        const data = await repository.getPublicComponents(category);

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
    [`components-registry-${category || 'all'}`],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: ['components']
    }
  )();
});

/**
 * Fetch all public components for the registry.
 */
export async function getComponents(category?: string): Promise<ComponentRow[]> {
  return fetchComponents(category);
}

const fetchComponentById = cache(async (id: string) => {
  return unstable_cache(
    async () => {
      try {
        const supabase = createStaticClient();
        const repository = new ComponentsRepository(supabase);
        const data = await repository.getComponentById(id);

        if (!data) {
          // Check mock data for development units (e.g. initial registry units)
          return (ELITE_MOCK_COMPONENTS.find(m => m.id === id) as unknown as ComponentRow) || null;
        }

        return data;
      } catch (error) {
        console.error(`SYSTEM: [Database_Error] Fetching component ${id} failed:`, error);
        // Emergency UI pivot to mock data to prevent total system blackout
        return (ELITE_MOCK_COMPONENTS.find(m => m.id === id) as unknown as ComponentRow) || null;
      }
    },
    [`component-${id}`],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: ['components', `component-${id}`]
    }
  )();
});

/**
 * Fetch a single component by its Unique ID.
 */
export async function getComponentById(id: string): Promise<ComponentRow | null> {
  return fetchComponentById(id);
}
