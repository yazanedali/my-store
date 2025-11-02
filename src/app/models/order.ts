import { CartItem } from "./cart-item";

export interface Order {
  id?: number;
  customerInfo: CustomerInfo;
  cartItems: CartItem[];
  total: number;
  orderDate?: Date;
  status?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}