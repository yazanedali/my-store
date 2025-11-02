import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { OrderSummaryComponent } from '../order-summary/order-summary';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, OrderSummaryComponent],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  tax: number = 0;
  grandTotal: number = 0;
  
  customerInfo = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

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

  // دالة جديدة للتحقق من إمكانية الإرسال
  get canSubmitOrder(): boolean {
    return !!(this.customerInfo.fullName && 
              this.customerInfo.email && 
              this.customerInfo.address &&
              this.customerInfo.city &&
              this.customerInfo.state &&
              this.customerInfo.zipCode &&
              this.customerInfo.country);
  }

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.tax = this.totalPrice * 0.1;
    this.grandTotal = this.totalPrice + this.tax;
    
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  submitOrder(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      
      const order = {
        customerInfo: this.customerInfo,
        cartItems: this.cartItems,
        total: this.grandTotal,
        orderDate: new Date()
      };
      
      localStorage.setItem('currentOrder', JSON.stringify(order));
      this.cartService.clearCart();
      
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/confirmation']);
      }, 2000);
    }
  }
    validatePaymentMethod(): void {
    console.log('Payment method changed to:', this.customerInfo.paymentMethod);
  }

    validateCardNumber(): void {
    if (!this.customerInfo.cardNumber) {
      this.formErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(this.customerInfo.cardNumber.replace(/\s/g, ''))) {
      this.formErrors.cardNumber = 'Please enter a valid 16-digit card number';
    } else {
      this.formErrors.cardNumber = '';
    }
  }
    validateFullName(): void {
    if (!this.customerInfo.fullName.trim()) {
      this.formErrors.fullName = 'Full name is required';
    } else if (this.customerInfo.fullName.length < 2) {
      this.formErrors.fullName = 'Full name must be at least 2 characters';
    } else {
      this.formErrors.fullName = '';
    }
  }

  validateEmail(): void {
    if (!this.customerInfo.email.trim()) {
      this.formErrors.email = 'Email is required';
    } else if (!this.isValidEmail(this.customerInfo.email)) {
      this.formErrors.email = 'Please enter a valid email address';
    } else {
      this.formErrors.email = '';
    }
  }

  validateAddress(): void {
    if (!this.customerInfo.address.trim()) {
      this.formErrors.address = 'Address is required';
    } else {
      this.formErrors.address = '';
    }
  }

  validateCity(): void {
    if (!this.customerInfo.city.trim()) {
      this.formErrors.city = 'City is required';
    } else {
      this.formErrors.city = '';
    }
  }

  validateState(): void {
    if (!this.customerInfo.state.trim()) {
      this.formErrors.state = 'State is required';
    } else {
      this.formErrors.state = '';
    }
  }

  validateZipCode(): void {
    if (!this.customerInfo.zipCode.trim()) {
      this.formErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(this.customerInfo.zipCode)) {
      this.formErrors.zipCode = 'Please enter a valid ZIP code';
    } else {
      this.formErrors.zipCode = '';
    }
  }

    validateCountry(): void {
    if (!this.customerInfo.country.trim()) {
      this.formErrors.country = 'Country is required';
    } else {
      this.formErrors.country = '';
    }
  }

    validateExpiryDate(): void {
    if (!this.customerInfo.expiryDate) {
      this.formErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(this.customerInfo.expiryDate)) {
      this.formErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      this.formErrors.expiryDate = '';
    }
  }

    validateCVV(): void {
    if (!this.customerInfo.cvv) {
      this.formErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(this.customerInfo.cvv)) {
      this.formErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
    } else {
      this.formErrors.cvv = '';
    }
  }

  validateForm(): boolean {
    let isValid = true;
    this.clearErrors();

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

    // تحقق من باقي الحقول بنفس الطريقة
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
     isValid = !Object.values(this.formErrors).some(error => error !== '');

    return isValid;
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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}