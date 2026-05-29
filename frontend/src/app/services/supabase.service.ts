import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/**
 * @class SupabaseService
 * @description Service for interacting with Supabase.
 * Provides methods for querying and managing data in the Supabase database.
 */
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          persistSession: false,
        },
      }
    );
  }

  /**
   * @method getClient
   * @description Returns the Supabase client instance.
   * @returns {SupabaseClient} The Supabase client.
   */
  public getClient(): SupabaseClient {
    return this.supabase;
  }

  /**
   * @method getProducts
   * @description Fetches all products from the database.
   * @returns {Promise<Array<{ [key: string]: any }>>} Array of product objects.
   */
  public async getProducts(): Promise<Array<{ [key: string]: any }>> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  }

  /**
   * @method getProductById
   * @description Fetches a single product by its ID.
   * @param {string} id The product ID.
   * @returns {Promise<{ [key: string]: any } | null>} The product object or null if not found.
   */
  public async getProductById(id: string): Promise<{ [key: string]: any } | null> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data || null;
  }

  /**
   * @method searchProducts
   * @description Searches for products by name, brand, or model.
   * @param {string} query The search query.
   * @returns {Promise<Array<{ [key: string]: any }>>} Array of matching product objects.
   */
  public async searchProducts(query: string): Promise<Array<{ [key: string]: any }>> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,brand.ilike.%${query}%,model.ilike.%${query}%`);

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data || [];
  }

  /**
   * @method getCart
   * @description Fetches the cart items for the current user.
   * @param {string} userId The user ID.
   * @returns {Promise<Array<{ [key: string]: any }>>} Array of cart item objects.
   */
  public async getCart(userId: string): Promise<Array<{ [key: string]: any }>> {
    const { data, error } = await this.supabase
      .from('cart')
      .select('*, products(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching cart:', error);
      return [];
    }

    return data || [];
  }

  /**
   * @method addToCart
   * @description Adds a product to the user's cart.
   * @param {string} userId The user ID.
   * @param {string} productId The product ID.
   * @param {number} quantity The quantity to add.
   * @returns {Promise<{ [key: string]: any } | null>} The created cart item or null if failed.
   */
  public async addToCart(userId: string, productId: string, quantity: number = 1): Promise<{ [key: string]: any } | null> {
    const { data, error } = await this.supabase
      .from('cart')
      .insert([
        {
          user_id: userId,
          product_id: productId,
          quantity: quantity
        }
      ])
      .select();

    if (error) {
      console.error('Error adding to cart:', error);
      return null;
    }

    return data?.[0] || null;
  }

  /**
   * @method updateCartItem
   * @description Updates the quantity of a cart item.
   * @param {string} cartItemId The cart item ID.
   * @param {number} quantity The new quantity.
   * @returns {Promise<{ [key: string]: any } | null>} The updated cart item or null if failed.
   */
  public async updateCartItem(cartItemId: string, quantity: number): Promise<{ [key: string]: any } | null> {
    const { data, error } = await this.supabase
      .from('cart')
      .update({ quantity })
      .eq('id', cartItemId)
      .select();

    if (error) {
      console.error('Error updating cart item:', error);
      return null;
    }

    return data?.[0] || null;
  }

  /**
   * @method removeFromCart
   * @description Removes an item from the cart.
   * @param {string} cartItemId The cart item ID.
   * @returns {Promise<boolean>} True if successful, false otherwise.
   */
  public async removeFromCart(cartItemId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('cart')
      .delete()
      .eq('id', cartItemId);

    if (error) {
      console.error('Error removing from cart:', error);
      return false;
    }

    return true;
  }
}
