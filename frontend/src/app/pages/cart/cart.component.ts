import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CartItem, Watch } from '../../models/watch.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="cart-page">
      <div class="container">
        <h1>Your Shopping Cart</h1>

        @if (cartItems.length === 0) {
          <div class="empty-cart">
            <p>Your cart is empty.</p>
            <a routerLink="/watches" class="btn btn-primary">Continue Shopping</a>
          </div>
        } @else {
          <div class="cart-content">
            <div class="cart-items">
              @for (item of cartItems; track item.id) {
                <div class="cart-item card">
                  <div class="cart-item-image">
                    <img [src]="item.watch.imageUrl" [alt]="item.watch.name" class="watch-image">
                  </div>
                  <div class="cart-item-info">
                    <h3>{{ item.watch.brand }} {{ item.watch.name }}</h3>
                    <p class="cart-item-model">{{ item.watch.model }}</p>
                    <p class="cart-item-price">${{ item.watch.price | number:'1.2-2' }}</p>
                  </div>
                  <div class="cart-item-quantity">
                    <button (click)="decreaseQuantity(item)" class="quantity-btn">-</button>
                    <span>{{ item.quantity }}</span>
                    <button (click)="increaseQuantity(item)" class="quantity-btn">+</button>
                  </div>
                  <div class="cart-item-total">
                    ${{ (item.watch.price * item.quantity) | number:'1.2-2' }}
                  </div>
                  <button (click)="removeFromCart(item)" class="remove-btn">×</button>
                </div>
              }
            </div>

            <div class="cart-summary card">
              <h2>Order Summary</h2>
              <div class="summary-item">
                <span>Subtotal</span>
                <span>${{ subtotal | number:'1.2-2' }}</span>
              </div>
              <div class="summary-item">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="summary-item total">
                <span>Total</span>
                <span>${{ subtotal | number:'1.2-2' }}</span>
              </div>
              <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .cart-page {
      padding: 2rem 0;
    }

    .cart-page h1 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }

    .empty-cart {
      text-align: center;
      padding: 4rem 0;
    }

    .empty-cart p {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: var(--text-secondary);
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 100px 2fr 1fr 1fr 40px;
      gap: 1rem;
      align-items: center;
      padding: 1rem;
    }

    .cart-item-image {
      width: 100%;
    }

    .watch-image {
      width: 100%;
      height: 80px;
      object-fit: cover;
      border-radius: 0.5rem;
    }

    .cart-item-info h3 {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .cart-item-model {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }

    .cart-item-price {
      font-weight: 600;
      color: var(--accent-color);
    }

    .cart-item-quantity {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .quantity-btn {
      width: 30px;
      height: 30px;
      border: 1px solid var(--border-color);
      background-color: var(--container-bg);
      color: var(--text-primary);
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 1rem;
    }

    .cart-item-total {
      font-weight: 600;
      text-align: right;
    }

    .remove-btn {
      width: 30px;
      height: 30px;
      border: none;
      background-color: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 1.5rem;
      border-radius: 0.25rem;
    }

    .remove-btn:hover {
      color: var(--accent-color);
      background-color: rgba(0, 255, 255, 0.1);
    }

    .cart-summary {
      padding: 1.5rem;
      height: fit-content;
      position: sticky;
      top: 2rem;
    }

    .cart-summary h2 {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .summary-item.total {
      font-weight: 700;
      font-size: 1.25rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid var(--accent-color);
    }

    .checkout-btn {
      width: 100%;
      padding: 1rem;
      margin-top: 1.5rem;
      font-size: 1.1rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      display: inline-block;
    }

    .btn-primary {
      background-color: var(--accent-color);
      color: var(--primary-bg);
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-item {
        grid-template-columns: 80px 1fr;
        grid-template-areas: "image info" "quantity total" "remove remove";
      }

      .cart-item-image {
        grid-area: image;
      }

      .cart-item-info {
        grid-area: info;
      }

      .cart-item-quantity {
        grid-area: quantity;
        justify-content: flex-start;
      }

      .cart-item-total {
        grid-area: total;
        text-align: right;
      }

      .remove-btn {
        grid-area: remove;
        justify-self: end;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    // TODO: Replace with actual user ID from auth
    const userId = 'user-id-placeholder';
    const cartData = await this.supabaseService.getCart(userId);
    
    // Transform cart data to match CartItem interface
    this.cartItems = cartData.map(item => ({
      id: item.id,
      watch: item.products,
      quantity: item.quantity,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at)
    }));
    
    this.calculateSubtotal();
  }

  calculateSubtotal(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + (item.watch.price * item.quantity),
      0
    );
  }

  async decreaseQuantity(item: CartItem): Promise<void> {
    if (item.quantity > 1) {
      // TODO: Implement update quantity in Supabase
      item.quantity--;
      this.calculateSubtotal();
    }
  }

  async increaseQuantity(item: CartItem): Promise<void> {
    // TODO: Implement update quantity in Supabase
    item.quantity++;
    this.calculateSubtotal();
  }

  async removeFromCart(item: CartItem): Promise<void> {
    // TODO: Implement remove from cart in Supabase
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.calculateSubtotal();
  }
}
