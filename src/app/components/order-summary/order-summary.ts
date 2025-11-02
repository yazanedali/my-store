import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="order-summary">
      <h2>Order Summary</h2>
      
      <div class="order-items">
        <div *ngFor="let item of items" class="order-item">
          <img [src]="item.product.imageUrl" [alt]="item.product.name" class="item-image">
          <div class="item-details">
            <h4>{{ item.product.name }}</h4>
            <p class="item-price">{{ item.product.price | currency }} × {{ item.quantity }}</p>
          </div>
          <div class="item-total">
            {{ (item.product.price * item.quantity) | currency }}
          </div>
        </div>
      </div>

      <div class="summary-totals">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>{{ subtotal | currency }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (10%):</span>
          <span>{{ tax | currency }}</span>
        </div>
        <div class="summary-row total">
          <strong>Total:</strong>
          <strong>{{ total | currency }}</strong>
        </div>
      </div>

      <button 
        (click)="onSubmitOrder()" 
        [disabled]="!canSubmit"
        class="btn btn-primary submit-order-btn">
        {{ submitButtonText }}
      </button>

      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./order-summary.css']
})
export class OrderSummaryComponent {
  @Input() items: CartItem[] = [];
  @Input() subtotal: number = 0;
  @Input() tax: number = 0;
  @Input() total: number = 0;
  @Input() canSubmit: boolean = true;
  @Input() submitButtonText: string = 'Place Order';
  
  @Output() submitOrder = new EventEmitter<void>();

  onSubmitOrder(): void {
    this.submitOrder.emit();
  }
}