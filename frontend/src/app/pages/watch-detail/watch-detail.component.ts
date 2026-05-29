import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { Watch } from '../../models/watch.model';

@Component({
  selector: 'app-watch-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="watch-detail-page">
      <div class="container">
        @if (watch) {
          <div class="watch-detail">
            <div class="watch-image-container">
              <img [src]="watch.imageUrl" [alt]="watch.name" class="watch-image">
            </div>
            <div class="watch-info">
              <h1>{{ watch.brand }} {{ watch.name }}</h1>
              <p class="watch-model">{{ watch.model }}</p>
              <p class="watch-price">${{ watch.price | number:'1.2-2' }}</p>
              <p class="watch-category">{{ watch.category }}</p>
              <p class="watch-description">{{ watch.description }}</p>
              <div class="watch-actions">
                <button class="btn btn-primary">Add to Cart</button>
                <button class="btn btn-secondary">Buy Now</button>
              </div>
              <div class="watch-specs">
                <h3>Specifications</h3>
                <ul>
                  <li><strong>Brand:</strong> {{ watch.brand }}</li>
                  <li><strong>Model:</strong> {{ watch.model }}</li>
                  <li><strong>Category:</strong> {{ watch.category }}</li>
                  <li><strong>Stock:</strong> {{ watch.stockQuantity }}</li>
                </ul>
              </div>
            </div>
          </div>
        } @else {
          <p>Loading watch details...</p>
        }
      </div>
    </section>
  `,
  styles: [`
    .watch-detail-page {
      padding: 2rem 0;
    }

    .watch-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .watch-image-container {
      width: 100%;
    }

    .watch-image {
      width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: contain;
      border-radius: 0.5rem;
    }

    .watch-info h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .watch-model {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .watch-price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent-color);
      margin-bottom: 1rem;
    }

    .watch-category {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .watch-description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: var(--text-secondary);
    }

    .watch-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
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

    .watch-specs {
      background-color: var(--container-bg);
      padding: 1.5rem;
      border-radius: 0.5rem;
    }

    .watch-specs h3 {
      margin-bottom: 1rem;
    }

    .watch-specs ul {
      list-style: none;
      padding: 0;
    }

    .watch-specs li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .watch-specs li:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      .watch-detail {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class WatchDetailComponent implements OnInit {
  watch: Watch | null = null;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.watch = await this.supabaseService.getProductById(id);
    }
  }
}
