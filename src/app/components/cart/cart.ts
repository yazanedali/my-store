import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItemComponent } from '../cart-item/cart-item';
import { OrderSummaryComponent } from '../order-summary/order-summary';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItemComponent, OrderSummaryComponent],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  tax: number = 0;
  grandTotal: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
    
    this.cartService.cart$.subscribe(() => {
      this.loadCart();
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.tax = this.totalPrice * 0.1;
    this.grandTotal = this.totalPrice + this.tax;
  }

  onQuantityChange(event: {productId: number, quantity: number}): void {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    alert('Item removed from cart successfully!');
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
      alert('Cart cleared successfully!');
    }
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty! Add some products first.');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}