import { Injectable } from '@angular/core';

/**
 * @class ThemeService
 * @description Service for managing the application theme (Dark/Light mode).
 * Uses CSS variables to dynamically switch between themes.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'dark' | 'light' = 'dark';

  constructor() {
    this.loadTheme();
  }

  /**
   * @method setTheme
   * @description Sets the application theme.
   * @param {('dark' | 'light')} theme The theme to set.
   */
  public setTheme(theme: 'dark' | 'light'): void {
    this.currentTheme = theme;
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * @method toggleTheme
   * @description Toggles between dark and light themes.
   */
  public toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * @method getCurrentTheme
   * @description Returns the current theme.
   * @returns {('dark' | 'light')} The current theme.
   */
  public getCurrentTheme(): 'dark' | 'light' {
    return this.currentTheme;
  }

  /**
   * @method applyTheme
   * @description Applies the current theme by setting CSS variables.
   */
  private applyTheme(): void {
    const root = document.documentElement;

    if (this.currentTheme === 'dark') {
      // Dark Mode
      root.style.setProperty('--primary-bg', '#0B0C10'); // Deep Obsidian
      root.style.setProperty('--secondary-bg', '#4B0082'); // Royal Velvet
      root.style.setProperty('--accent-color', '#00FFFF'); // Neon Aqua
      root.style.setProperty('--container-bg', '#2A2B4D'); // Deep Indigo
      root.style.setProperty('--text-primary', '#FFFFFF');
      root.style.setProperty('--text-secondary', '#B0B0B0');
    } else {
      // Light Mode
      root.style.setProperty('--primary-bg', '#FAFAFA'); // Premium Paper White
      root.style.setProperty('--secondary-bg', '#1C1C1C'); // Deep Charcoal Slate
      root.style.setProperty('--accent-color', '#00875A'); // Luxury Emerald
      root.style.setProperty('--container-bg', '#FFFFFF');
      root.style.setProperty('--text-primary', '#000000');
      root.style.setProperty('--text-secondary', '#505050');
    }
  }

  /**
   * @method saveTheme
   * @description Saves the current theme to localStorage.
   */
  private saveTheme(): void {
    localStorage.setItem('velvet-vista-theme', this.currentTheme);
  }

  /**
   * @method loadTheme
   * @description Loads the saved theme from localStorage.
   */
  private loadTheme(): void {
    const savedTheme = localStorage.getItem('velvet-vista-theme') as 'dark' | 'light' | null;
    this.currentTheme = savedTheme || 'dark';
    this.applyTheme();
  }
}
