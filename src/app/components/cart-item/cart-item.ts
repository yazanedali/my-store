import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-item">
      <div class="item-image">
        <img [src]="item.product.imageUrl" [alt]="item.product.name">
      </div>
      
      <div class="item-details">
        <h3>{{ item.product.name }}</h3>
        <p class="description">{{ item.product.description }}</p>
        <p class="price">{{ item.product.price | currency }}</p>
      </div>

      <div class="quantity-controls">
        <button 
          (click)="onDecreaseQuantity()" 
          [disabled]="item.quantity <= 1"
          class="btn btn-sm">
          -
        </button>
        <span class="quantity">{{ item.quantity }}</span>
        <button 
          (click)="onIncreaseQuantity()" 
          class="btn btn-sm">
          +
        </button>
      </div>

      <div class="item-total">
        <strong>{{ (item.product.price * item.quantity) | currency }}</strong>
      </div>

      <button 
        (click)="onRemoveItem()" 
        class="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  `,
  styleUrls: ['./cart-item.css']
})
export class CartItemComponent {
  @Input() item!: CartItem;
  
  @Output() quantityChange = new EventEmitter<{productId: number, quantity: number}>();
  @Output() removeItem = new EventEmitter<number>();

  onIncreaseQuantity(): void {
    this.quantityChange.emit({
      productId: this.item.product.id,
      quantity: this.item.quantity + 1
    });
  }

  onDecreaseQuantity(): void {
    this.quantityChange.emit({
      productId: this.item.product.id,
      quantity: this.item.quantity - 1
    });
  }

  onRemoveItem(): void {
    this.removeItem.emit(this.item.product.id);
  }
}