"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Save, 
  Layout, 
  Globe, 
  Lock,
  AlertCircle,
  Sparkles
} from "lucide-react";
import MonacoEditor from "@/components/editor/MonacoEditor";

// 1. Zod Schema for Component Forge
const createComponentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(50),
  description: z.string().max(250).optional(),
  category: z.enum(["Cursors", "Backgrounds", "Layouts", "Buttons", "Micro-Animations"]),
  code: z.string().min(10, "Component code is too short for a valid forge."),
  is_public: z.boolean(),
  thumbnail: z.custom<File>((val) => val instanceof File, "Must be a file").optional(),
});

export type CreateComponentValues = z.infer<typeof createComponentSchema>;

interface CreateFormProps {
  initialCode: string;
  onCodeChange: (code: string) => void;
  isSaving: boolean;
  saveError: string | null;
  onSaveError: (error: string | null) => void;
  onSubmit: (data: CreateComponentValues) => Promise<void>;
}

export default function CreateForm({ 
  initialCode, 
  onCodeChange, 
  isSaving, 
  saveError,
  onSaveError,
  onSubmit
}: CreateFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm<CreateComponentValues>({
    resolver: zodResolver(createComponentSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Cursors",
      code: initialCode,
      is_public: true,
    },
  });

  const isPublic = watch("is_public");
  const thumbnail = watch("thumbnail");

  const handleFormSubmit = async (data: CreateComponentValues) => {
    onSaveError(null);
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      onSaveError(err instanceof Error ? err.message : "Forge Overheat: Critical failure saving component.");
    }
  };

  return (
    <form id="forge-form" onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-10 max-w-4xl mx-auto pb-40">
      {/* HUD Message for Errors */}
      {saveError && (
        <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-lg flex items-center gap-3 text-red-400 font-headline text-xs tracking-widest uppercase animate-pulse">
          <AlertCircle size={16} />
          {saveError}
        </div>
      )}

      {/* Metadata Fields */}
      <div className="space-y-6">
        <div className="group relative">
          <input 
            {...register("title")}
            type="text" 
            placeholder="COMPONENT TITLE..."
            className={`w-full bg-transparent border-b py-3 font-headline text-3xl font-black tracking-tighter outline-none transition-colors placeholder:text-neutral-800 ${
              errors.title ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-cyan-400"
            }`}
          />
          {errors.title && (
            <p className="text-[10px] text-red-400 font-headline uppercase tracking-widest mt-2">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="group relative">
          <textarea 
            {...register("description")}
            placeholder="ADD A BRIEF COMPONENT BIOGRAPHY..."
            className="w-full bg-transparent border-b border-white/5 focus:border-cyan-400 py-2 font-body text-sm outline-none transition-colors placeholder:text-neutral-900 resize-none h-12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Layout size={14} className="text-cyan-400 opacity-60" />
              <select 
                {...register("category")}
                className="bg-[#1a1a1a] border border-white/5 rounded px-3 py-1 font-headline text-[10px] tracking-widest uppercase outline-none focus:border-cyan-400/40 transition-all hover:border-white/20"
              >
                <option value="Cursors">Cursors</option>
                <option value="Backgrounds">Backgrounds</option>
                <option value="Layouts">Layouts</option>
                <option value="Buttons">Buttons</option>
                <option value="Micro-Animations">Micro-Animations</option>
              </select>
            </div>

            <Controller
              name="is_public"
              control={control}
              render={({ field }) => (
                <div 
                  className="flex items-center gap-3 cursor-pointer select-none group/toggle" 
                  onClick={() => field.onChange(!field.value)}
                >
                  <div className={`p-2 rounded-lg transition-all ${field.value ? 'bg-cyan-400/10 text-cyan-400' : 'bg-purple-400/10 text-purple-400'}`}>
                    {field.value ? <Globe size={14} /> : <Lock size={14} />}
                  </div>
                  <span className="font-headline text-[10px] tracking-widest uppercase text-neutral-500 group-hover/toggle:text-neutral-300 transition-colors">
                    {field.value ? "Registry: SHARED" : "Registry: ENCRYPTED"}
                  </span>
                </div>
              )}
            />
          </div>

          {/* New Image Upload HUD Field */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[9px] font-headline font-black text-neutral-600 uppercase tracking-[0.2em]">
              <Sparkles size={12} className="text-cyan-400" />
              Atomic Snapshot
            </label>
            <div className="relative group/upload">
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setValue("thumbnail", file);
                }}
              />
              <div className="border border-white/5 bg-white/[0.02] rounded-xl p-4 flex items-center gap-4 transition-all group-hover/upload:border-cyan-400/30 group-hover/upload:bg-white/[0.04]">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-700 group-hover/upload:text-cyan-400 transition-colors">
                  <Save size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-headline font-black text-white uppercase tracking-wider">
                    {thumbnail ? thumbnail.name : "Upload Preview"}
                  </div>
                  <div className="text-[8px] font-label font-bold text-neutral-500 uppercase tracking-widest mt-0.5">
                    {thumbnail ? `${(thumbnail.size / 1024).toFixed(1)} KB` : "PNG, WEBP (MAX 2MB)"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[10px] font-headline tracking-widest text-neutral-600 border-b border-white/5 pb-2 uppercase">
          <span>machine_editor.tsx</span>
          <span>TypeScript / UI-Core</span>
        </div>
        
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <div className={`transition-all ${errors.code ? "ring-1 ring-red-500/40 rounded-xl" : ""}`}>
              <MonacoEditor 
                value={field.value} 
                onChange={(val) => {
                  field.onChange(val);
                  if (val) onCodeChange(val);
                }} 
                height="65vh"
              />
            </div>
          )}
        />
        {errors.code && (
          <p className="text-[10px] text-red-400 font-headline uppercase tracking-widest mt-2">
            {errors.code.message}
          </p>
        )}
      </div>

      {/* Hidden Submit Button for Header Trigger */}
      <button type="submit" className="hidden" />
    </form>
  );
}
// Reviewed for code health
