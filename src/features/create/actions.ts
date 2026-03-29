"use server";

import { createClient } from "@/utils/supabase/server";
import { ComponentsRepository } from "@/lib/repositories/componentsRepository";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * Zod Schema for Atomic Unit Creation
 */
const CreateComponentSchema = z.object({
  title: z.string().min(2, "Unit designation too short").max(100),
  description: z.string().max(500).optional(),
  category: z.string().min(1, "Category is required"),
  code: z.string().min(5, "Atomic code structure too simple"),
  is_public: z.boolean().default(true),
  thumbnail: z.any().optional(), // We'll handle file validation manually
});

export async function createComponent(data: z.infer<typeof CreateComponentSchema>) {
  // 1. Validate Input
  const validated = CreateComponentSchema.safeParse(data);
  
  if (!validated.success) {
    return { 
      error: "Technical validation failed", 
      details: validated.error.flatten().fieldErrors 
    };
  }

  const supabase = await createClient();
  const repository = new ComponentsRepository(supabase);

  // 2. Identity Verification
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Identity verification required for registry access." };
  }

  let thumbnail_url = null;

  // 3. Handle Thumbnail Upload if present
  if (data.thumbnail && data.thumbnail instanceof File) {
    const file = data.thumbnail;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('component-previews')
      .upload(filePath, file);

    if (uploadError) {
      console.error("STORAGE_ERROR: [Thumbnail_Upload]", uploadError);
      // We'll continue without the thumbnail if upload fails, to prevent UX block
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('component-previews')
        .getPublicUrl(filePath);
      
      thumbnail_url = publicUrl;
    }
  }

  // 4. Database Injection
  try {
    const { thumbnail, ...componentData } = validated.data;

    await repository.createComponent({
      ...componentData,
      thumbnail_url,
      author_id: user.id,
    });

    // 5. Persistence Sync
    revalidatePath("/");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("SYSTEM: [Database_Error] Component synthesis failed:", error);
    return { error: "Registry injection encountered a critical failure." };
  }
}
