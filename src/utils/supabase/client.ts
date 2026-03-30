import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // The memory file states: The browser client initialization in `src/utils/supabase/client.ts` uses placeholder fallbacks if these variables are missing
    return createBrowserClient<Database>(
      supabaseUrl || "https://placeholder-url.supabase.co",
      supabaseKey || "placeholder-key"
    )
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseKey
  )
}
