import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.imageUrl" [alt]="product.name" (error)="handleImageError($event)">
      </div>
      
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price | currency }}</p>
      </div>

      <div class="product-actions">
        <div class="cart-status" *ngIf="isInCart">
          In cart: {{ quantityInCart }}
        </div>
        
        <button 
          (click)="onAddToCart()" 
          class="btn btn-primary add-to-cart-btn">
          Add to Cart
        </button>
        
        <a 
          [routerLink]="['/products', product.id]" 
          class="btn btn-secondary details-btn">
          View Details
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isInCart: boolean = false;
  @Input() quantityInCart: number = 0;
  
  @Output() addToCart = new EventEmitter<Product>();
  @Output() imageError = new EventEmitter<{event: any, productId: number}>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  handleImageError(event: any): void {
    this.imageError.emit({ event, productId: this.product.id });
  }
}