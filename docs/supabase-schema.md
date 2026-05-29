# Velvet Vista - Supabase Schema & Initial Data

## 🗃️ Database Schema Overview

The **Velvet Vista** database is designed to support:
- **Users** (Customer accounts)
- **Products** (Luxury watches)
- **Orders** (Purchase history)
- **Cart** (Shopping cart state)

All tables enforce **Row-Level Security (RLS)** policies to ensure data isolation and security.

---

## 📜 001_create_users_table.sql

```sql
-- Enable RLS on the users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Update the updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to the users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row-Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

---

## 📜 002_create_products_table.sql

```sql
-- Create the products table for luxury watches
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    image_url TEXT,
    category TEXT NOT NULL DEFAULT 'Luxury' CHECK (
        category IN ('Luxury', 'Vintage', 'Modern', 'Limited Edition')
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Apply the updated_at trigger to products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Products
CREATE POLICY "Anyone can view products" ON products
    FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage products" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

---

## 📜 003_create_orders_table.sql

```sql
-- Create the orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')
    ),
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    shipping_address JSONB NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'credit_card' CHECK (
        payment_method IN ('credit_card', 'paypal', 'bank_transfer')
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Apply the updated_at trigger to orders
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Orders
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
    FOR UPDATE USING (
        auth.uid() = user_id AND status IN ('pending', 'confirmed')
    );

CREATE POLICY "Admins can view all orders" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all orders" ON orders
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

---

## 📜 004_create_cart_table.sql

```sql
-- Create the cart table
CREATE TABLE IF NOT EXISTS cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Apply the updated_at trigger to cart
DROP TRIGGER IF EXISTS update_cart_updated_at ON cart;
CREATE TRIGGER update_cart_updated_at
    BEFORE UPDATE ON cart
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for Cart
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Cart
CREATE POLICY "Users can view their own cart" ON cart
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart" ON cart
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all carts" ON cart
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all carts" ON cart
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

---

## 🌱 Seed Data - luxury_watches.sql

```sql
-- Insert luxury watch brands and models
INSERT INTO products (name, brand, model, description, price, stock_quantity, image_url, category) VALUES
-- Rolex
('Rolex Submariner', 'Rolex', 'Submariner', 'The iconic dive watch with a rich history and timeless design.', 12500.00, 15, 'https://example.com/images/rolex-submariner.jpg', 'Luxury'),
('Rolex Daytona', 'Rolex', 'Daytona', 'A legendary chronograph designed for professional racing drivers.', 25000.00, 8, 'https://example.com/images/rolex-daytona.jpg', 'Luxury'),
('Rolex Datejust', 'Rolex', 'Datejust', 'The epitome of classic elegance with a date display.', 9500.00, 20, 'https://example.com/images/rolex-datejust.jpg', 'Luxury'),

-- Patek Philippe
('Patek Philippe Nautilus', 'Patek Philippe', 'Nautilus', 'A masterpiece of horology with a distinctive porthole design.', 50000.00, 5, 'https://example.com/images/patek-nautilus.jpg', 'Luxury'),
('Patek Philippe Calatrava', 'Patek Philippe', 'Calatrava', 'The quintessential dress watch with timeless elegance.', 35000.00, 7, 'https://example.com/images/patek-calatrava.jpg', 'Luxury'),

-- Audemars Piguet
('Audemars Piguet Royal Oak', 'Audemars Piguet', 'Royal Oak', 'A revolutionary design that redefined luxury sports watches.', 45000.00, 6, 'https://example.com/images/ap-royal-oak.jpg', 'Luxury'),
('Audemars Piguet Royal Oak Offshore', 'Audemars Piguet', 'Royal Oak Offshore', 'A bold and rugged interpretation of the iconic Royal Oak.', 55000.00, 4, 'https://example.com/images/ap-royal-oak-offshore.jpg', 'Luxury'),

-- Omega
('Omega Speedmaster', 'Omega', 'Speedmaster', 'The first watch worn on the Moon, a symbol of space exploration.', 8500.00, 12, 'https://example.com/images/omega-speedmaster.jpg', 'Vintage'),
('Omega Seamaster', 'Omega', 'Seamaster', 'A legendary dive watch with a rich maritime heritage.', 7200.00, 18, 'https://example.com/images/omega-seamaster.jpg', 'Vintage'),

-- Tag Heuer
('Tag Heuer Carrera', 'Tag Heuer', 'Carrera', 'A racing-inspired chronograph with a sporty and elegant design.', 6500.00, 10, 'https://example.com/images/tag-carrera.jpg', 'Modern'),
('Tag Heuer Monaco', 'Tag Heuer', 'Monaco', 'A square-shaped icon that revolutionized watch design.', 7800.00, 9, 'https://example.com/images/tag-monaco.jpg', 'Modern'),

-- Richard Mille
('Richard Mille RM 011', 'Richard Mille', 'RM 011', 'A high-performance timepiece designed for extreme conditions.', 180000.00, 2, 'https://example.com/images/rm-011.jpg', 'Limited Edition'),
('Richard Mille RM 035', 'Richard Mille', 'RM 035', 'A lightweight and ultra-resistant watch for the most demanding athletes.', 200000.00, 1, 'https://example.com/images/rm-035.jpg', 'Limited Edition'),

-- Jaeger-LeCoultre
('Jaeger-LeCoultre Reverso', 'Jaeger-LeCoultre', 'Reverso', 'A timeless classic with a reversible case, symbolizing elegance and innovation.', 15000.00, 8, 'https://example.com/images/jlc-reverso.jpg', 'Vintage'),
('Jaeger-LeCoultre Master Ultra Thin', 'Jaeger-LeCoultre', 'Master Ultra Thin', 'A testament to the art of watchmaking with an ultra-thin profile.', 22000.00, 6, 'https://example.com/images/jlc-master-ultra-thin.jpg', 'Luxury'),

-- Vacheron Constantin
('Vacheron Constantin Overseas', 'Vacheron Constantin', 'Overseas', 'A versatile and elegant watch designed for the modern traveler.', 38000.00, 5, 'https://example.com/images/vc-overseas.jpg', 'Luxury'),
('Vacheron Constantin Patrimony', 'Vacheron Constantin', 'Patrimony', 'A celebration of traditional watchmaking with a contemporary twist.', 42000.00, 4, 'https://example.com/images/vc-patrimony.jpg', 'Luxury'),

-- A. Lange & Söhne
('A. Lange & Söhne Saxonia', 'A. Lange & Söhne', 'Saxonia', 'A masterpiece of German precision and understated elegance.', 30000.00, 3, 'https://example.com/images/al-saxonia.jpg', 'Luxury'),
('A. Lange & Söhne Datograph', 'A. Lange & Söhne', 'Datograph', 'A highly complicated timepiece featuring a chronograph and perpetual calendar.', 80000.00, 2, 'https://example.com/images/al-datograph.jpg', 'Limited Edition');
```

---

## 🔐 Supabase Configuration for Backend

Create a `supabase.config.ts` file in `backend/src/config/`:

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey: string = process.env.SUPABASE_KEY || 'YOUR_SUPABASE_KEY';

let supabase: SupabaseClient;

function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return supabase;
}

export { getSupabaseClient };
```

---

## 🔐 Environment Variables for Backend

Create a `.env` file in the `backend/` directory:

```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
NODE_ENV=development
PORT=3000
```

---

## 🔐 Environment Variables for Frontend

Create a `.env` file in the `frontend/` directory:

```env
NG_APP_SUPABASE_URL=your-supabase-project-url
NG_APP_SUPABASE_KEY=your-supabase-anon-key
```