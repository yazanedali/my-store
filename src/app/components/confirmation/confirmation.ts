import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Order } from '../../models/order';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.css']
})
export class ConfirmationComponent implements OnInit {
  order: Order | null = null;
  orderNumber: string = '';
  estimatedDelivery: Date = new Date();

  constructor(private router: Router) {
    // Get order data from navigation state
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras?.state?.['order'] as Order || null;
    
    // Calculate estimated delivery (7 days from now)
    this.estimatedDelivery = new Date();
    this.estimatedDelivery.setDate(this.estimatedDelivery.getDate() + 7);
  }

  ngOnInit(): void {
    if (!this.order) {
      // If no order data, try to get from localStorage
      this.loadLastOrder();
    }

    if (this.order) {
      this.generateOrderNumber();
    }
  }

  loadLastOrder(): void {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length > 0) {
      this.order = orders[orders.length - 1];
    }
  }

  generateOrderNumber(): void {
    if (this.order) {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      this.orderNumber = `ORD-${timestamp}-${random}`;
    }
  }

  getMaskedCardNumber(): string {
    if (!this.order?.customerInfo.cardNumber) return 'N/A';
    
    const cardNumber = this.order.customerInfo.cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cardNumber.slice(-4)}`;
  }

  getPaymentMethodText(): string {
    const method = this.order?.customerInfo.paymentMethod;
    switch (method) {
      case 'credit':
        return 'Credit Card';
      case 'paypal':
        return 'PayPal';
      default:
        return 'Unknown';
    }
  }

  printOrder(): void {
    window.print();
  }

  getOrderTotal(): number {
    return this.order?.total || 0;
  }

  getSubtotal(): number {
    return this.getOrderTotal() / 1.1; // Remove 10% tax
  }

  getTaxAmount(): number {
    return this.getSubtotal() * 0.1;
  }
}