import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

export type ComponentRow = Database['public']['Tables']['components']['Row'];
export type ComponentInsert = Database['public']['Tables']['components']['Insert'];
export type ComponentUpdate = Database['public']['Tables']['components']['Update'];

/**
 * ComponentsRepository
 * Encapsulates all persistence logic for Atomic Units.
 */
export class ComponentsRepository {
  constructor(private readonly supabase: any) {}

  /**
   * Fetch all public components with optional category filter.
   */
  async getPublicComponents(category?: string): Promise<ComponentRow[]> {
    let query = this.supabase
      .from('components')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (category && category !== 'All Units') {
      query = query.eq('category', category);
    }

    try {
      const { data, error } = await query;

      if (error) {
        console.error('DATABASE_ERROR: [ComponentsRepository.getPublicComponents]', error);
        throw new Error(`Architectural failure in registry fetch: ${error.message}`);
      }

      return data;
    } catch (e) {
      console.error('DATABASE_ERROR: [ComponentsRepository.getPublicComponents]', e);
      throw new Error(`Architectural failure in registry fetch: ${e}`);
    }
  }

  /**
   * Fetch a single component by its Unit ID.
   */
  async getComponentById(id: string): Promise<ComponentRow | null> {
    const { data, error } = await this.supabase
      .from('components')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`DATABASE_ERROR: [ComponentsRepository.getComponentById] Unit: ${id}`, error);
      return null;
    }

    return data;
  }

  /**
   * Fetch components owned by a specific Author.
   */
  async getComponentsByAuthor(authorId: string): Promise<ComponentRow[]> {
    const { data, error } = await this.supabase
      .from('components')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`DATABASE_ERROR: [ComponentsRepository.getComponentsByAuthor] Author: ${authorId}`, error);
      throw new Error('Identity-bound persistence retrieval failed.');
    }

    return data;
  }

  /**
   * Create a new Atomic Unit in the registry.
   */
  async createComponent(component: ComponentInsert): Promise<ComponentRow> {
    const { data, error } = await this.supabase
      .from('components')
      .insert(component)
      .select()
      .single();

    if (error) {
      console.error('DATABASE_ERROR: [ComponentsRepository.createComponent]', error);
      throw new Error(`Atomic synthesis injection failed: ${error.message}`);
    }

    return data;
  }

  /**
   * Update an existing Atomic Unit.
   */
  async updateComponent(id: string, updates: ComponentUpdate, authorId: string): Promise<ComponentRow> {
    const { data, error } = await this.supabase
      .from('components')
      .update(updates)
      .eq('id', id)
      .eq('author_id', authorId) // Security: Ensure author owns the component
      .select()
      .single();

    if (error) {
      console.error(`DATABASE_ERROR: [ComponentsRepository.updateComponent] Unit: ${id}`, error);
      throw new Error('Structural update to atomic unit failed.');
    }

    return data;
  }

  /**
   * Terminate/Delete an Atomic Unit from the registry.
   */
  async deleteComponent(id: string, authorId: string): Promise<void> {
    const { error } = await this.supabase
      .from('components')
      .delete()
      .eq('id', id)
      .eq('author_id', authorId); // Security: Ensure author owns the component

    if (error) {
      console.error(`DATABASE_ERROR: [ComponentsRepository.deleteComponent] Unit: ${id}`, error);
      throw new Error('Decommissioning of atomic unit failed.');
    }
  }
}
