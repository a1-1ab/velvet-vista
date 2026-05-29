import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { Watch } from '../../models/watch.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="container">
        <h1>Welcome to Velvet Vista</h1>
        <p>Discover the world's finest luxury watches</p>
        <a routerLink="/watches" class="btn btn-primary">Explore Collection</a>
      </div>
    </section>

    <section class="featured-watches">
      <div class="container">
        <h2>Featured Watches</h2>
        <div class="watches-grid">
          @for (watch of featuredWatches; track watch.id) {
            <div class="watch-card card">
              <img [src]="watch.imageUrl" [alt]="watch.name" class="watch-image">
              <div class="watch-info">
                <h3>{{ watch.brand }} {{ watch.name }}</h3>
                <p class="watch-price">${{ watch.price | number:'1.2-2' }}</p>
                <a [routerLink]="['/watches', watch.id]" class="btn btn-secondary">View Details</a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 4rem 0;
      text-align: center;
      background: linear-gradient(135deg, var(--primary-bg), var(--secondary-bg));
      color: var(--text-primary);
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: var(--text-secondary);
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background-color: var(--accent-color);
      color: var(--primary-bg);
    }

    .btn-secondary {
      background-color: var(--container-bg);
      color: var(--text-primary);
      border: 1px solid var(--accent-color);
    }

    .featured-watches {
      padding: 4rem 0;
    }

    .featured-watches h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
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

    .watch-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent-color);
      margin-bottom: 1rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredWatches: Watch[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    this.featuredWatches = await this.supabaseService.getProducts();
  }
}
