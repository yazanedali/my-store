import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
    
    // Subscribe to cart updates
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  // Load cart items
  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  // Update product quantity
  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  // Remove product from cart
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  // Clear cart
  clearCart(): void {
    this.cartService.clearCart();
  }

  // Calculate total price
  calculateTotal(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  // Increase quantity
  increaseQuantity(item: CartItem): void {
    this.updateQuantity(item.product.id, item.quantity + 1);
  }

  // Decrease quantity
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateQuantity(item.product.id, item.quantity - 1);
    }
  }

  // Checkout process
  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Cart is empty! Add some products first.');
      return;
    }
    // We'll add routing to checkout page later
    alert('Redirecting to checkout page!');
    console.log('Proceeding to checkout:', this.cartItems);
  }
}