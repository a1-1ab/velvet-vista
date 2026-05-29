/**
 * @class Watch
 * @description Model representing a luxury watch product.
 */
export interface Watch {
  id: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  category: 'Luxury' | 'Vintage' | 'Modern' | 'Limited Edition';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @class CartItem
 * @description Model representing an item in the shopping cart.
 */
export interface CartItem {
  id: string;
  watch: Watch;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @class Order
 * @description Model representing a user order.
 */
export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @class User
 * @description Model representing a user account.
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
