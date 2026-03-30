export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      components: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          category: string
          code: string
          thumbnail_url: string | null
          author_id: string
          is_public: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          category: string
          code: string
          thumbnail_url?: string | null
          author_id: string
          is_public?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          category?: string
          code?: string
          thumbnail_url?: string | null
          author_id?: string
          is_public?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
