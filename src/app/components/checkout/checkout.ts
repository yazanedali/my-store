import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';
import { Order, CustomerInfo } from '../../models/order';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, FormsModule, ],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  
  customerInfo: CustomerInfo = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit'
  };

  // Form validation
  formErrors = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  isSubmitting: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotals();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getTotalPrice();
    this.tax = this.subtotal * 0.1; // 10% tax
    this.total = this.subtotal + this.tax;
  }

  // Validate form
  validateForm(): boolean {
    let isValid = true;
    this.clearErrors();

    // Required fields validation
    if (!this.customerInfo.fullName.trim()) {
      this.formErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!this.customerInfo.email.trim()) {
      this.formErrors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.customerInfo.email)) {
      this.formErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!this.customerInfo.address.trim()) {
      this.formErrors.address = 'Address is required';
      isValid = false;
    }

    if (!this.customerInfo.city.trim()) {
      this.formErrors.city = 'City is required';
      isValid = false;
    }

    if (!this.customerInfo.state.trim()) {
      this.formErrors.state = 'State is required';
      isValid = false;
    }

    if (!this.customerInfo.zipCode.trim()) {
      this.formErrors.zipCode = 'ZIP code is required';
      isValid = false;
    }

    if (!this.customerInfo.country.trim()) {
      this.formErrors.country = 'Country is required';
      isValid = false;
    }

    // Payment validation
    if (this.customerInfo.paymentMethod === 'credit') {
      if (!this.customerInfo.cardNumber) {
        this.formErrors.cardNumber = 'Card number is required';
        isValid = false;
      } else if (!this.isValidCardNumber(this.customerInfo.cardNumber)) {
        this.formErrors.cardNumber = 'Please enter a valid card number';
        isValid = false;
      }

      if (!this.customerInfo.expiryDate) {
        this.formErrors.expiryDate = 'Expiry date is required';
        isValid = false;
      }

      if (!this.customerInfo.cvv) {
        this.formErrors.cvv = 'CVV is required';
        isValid = false;
      } else if (!this.isValidCVV(this.customerInfo.cvv)) {
        this.formErrors.cvv = 'Please enter a valid CVV';
        isValid = false;
      }
    }

    return isValid;
  }

  // Submit order
  submitOrder(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      const order: Order = {
        customerInfo: this.customerInfo,
        cartItems: this.cartItems,
        total: this.total,
        orderDate: new Date(),
        status: 'completed'
      };

      // Save order to localStorage (simulate database)
      this.saveOrder(order);
      
      // Clear cart
      this.cartService.clearCart();
      
      // Navigate to confirmation
      this.router.navigate(['/confirmation'], { 
        state: { order: order }
      });
      
      this.isSubmitting = false;
    }, 2000);
  }

  // Save order to localStorage
  private saveOrder(order: Order): void {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    order.id = orders.length + 1;
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  // Validation helpers
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidCardNumber(cardNumber: string): boolean {
    const cardRegex = /^\d{16}$/;
    return cardRegex.test(cardNumber.replace(/\s/g, ''));
  }

  private isValidCVV(cvv: string): boolean {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
  }

  private clearErrors(): void {
    this.formErrors = {
      fullName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };
  }

  // Update quantity
  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.loadCartItems();
    this.calculateTotals();
  }

  // Remove item
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCartItems();
    this.calculateTotals();
  }
}