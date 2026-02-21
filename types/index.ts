// ============================================================
// Core Type Definitions for MediCare E-Commerce
// ============================================================

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  shortDescription: string;
  category: ProductCategory;
  subCategory?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  dosage?: string;
  sideEffects?: string;
  ingredients?: string;
  requiresPrescription: boolean;
  badge?: 'bestseller' | 'new' | 'sale' | 'limited';
}

export type ProductCategory =
  | 'Pain Relief'
  | 'Vitamins & Supplements'
  | 'Antibiotics'
  | 'Cold & Flu'
  | 'Skincare'
  | 'Digestive Health'
  | 'Heart Health'
  | 'Diabetes Care'
  | 'Eye Care'
  | 'Baby Care';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type?: 'Home' | 'Work' | 'Other';
}

export interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
}

export interface AddressFormData {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  type?: 'Home' | 'Work' | 'Other';
}

export interface Order {
  orderId: string;
  items: CartItem[];
  address: Address;
  totalAmount: number;
  deliveryCharge: number;
  discount: number;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  paymentStatus: 'pending' | 'success' | 'failed';
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface UIState {
  isLoading: boolean;
  checkoutStep: 'cart' | 'address' | 'payment' | 'success';
  currentOrder: Order | null;
}

export type CheckoutStep = 'cart' | 'address' | 'payment' | 'success';

export interface ToastOptions {
  message: string;
  type: 'success' | 'error' | 'info' | 'loading';
}
