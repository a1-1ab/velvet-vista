import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Watch } from '../../models/watch.model';

@Component({
  selector: 'app-watches',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="watches-page">
      <div class="container">
        <h1>Luxury Watch Collection</h1>

        <div class="search-bar">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (input)="searchWatches()"
            placeholder="Search watches..."
            class="search-input"
          >
        </div>

        <div class="filters">
          <button
            *ngFor="let category of categories"
            [class.active]="selectedCategory === category"
            (click)="filterByCategory(category)"
            class="filter-btn"
          >
            {{ category }}
          </button>
        </div>

        <div class="watches-grid">
          @for (watch of filteredWatches; track watch.id) {
            <div class="watch-card card">
              <img [src]="watch.imageUrl" [alt]="watch.name" class="watch-image">
              <div class="watch-info">
                <h3>{{ watch.brand }} {{ watch.name }}</h3>
                <p class="watch-model">{{ watch.model }}</p>
                <p class="watch-price">${{ watch.price | number:'1.2-2' }}</p>
                <div class="watch-actions">
                  <a [routerLink]="['/watches', watch.id]" class="btn btn-secondary">View Details</a>
                  <button (click)="addToCart(watch)" class="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .watches-page {
      padding: 2rem 0;
    }

    .watches-page h1 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }

    .search-bar {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      max-width: 500px;
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--container-bg);
      color: var(--text-primary);
      font-size: 1rem;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      background-color: var(--container-bg);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-btn:hover {
      background-color: var(--secondary-bg);
    }

    .filter-btn.active {
      background-color: var(--accent-color);
      color: var(--primary-bg);
      border-color: var(--accent-color);
    }

    .watches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .watch-card {
      transition: transform 0.3s ease;
    }

    .watch-card:hover {
      transform: translateY(-8px);
    }

    .watch-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }

    .watch-info h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .watch-model {
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .watch-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent-color);
      margin-bottom: 1rem;
    }

    .watch-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .btn-primary {
      background-color: var(--accent-color);
      color: var(--primary-bg);
    }

    .btn-secondary {
      background-color: var(--container-bg);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }
  `]
})
export class WatchesComponent implements OnInit {
  watches: Watch[] = [];
  filteredWatches: Watch[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Luxury', 'Vintage', 'Modern', 'Limited Edition'];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    this.watches = await this.supabaseService.getProducts();
    this.filteredWatches = this.watches;
  }

  searchWatches(): void {
    if (!this.searchQuery) {
      this.filteredWatches = this.watches;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredWatches = this.watches.filter(watch =>
      watch.name.toLowerCase().includes(query) ||
      watch.brand.toLowerCase().includes(query) ||
      watch.model.toLowerCase().includes(query)
    );
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredWatches = this.watches;
    } else {
      this.filteredWatches = this.watches.filter(watch => watch.category === category);
    }
  }

  async addToCart(watch: Watch): Promise<void> {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', watch.name);
  }
}
