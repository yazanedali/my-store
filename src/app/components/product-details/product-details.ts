import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, FormsModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  loading: boolean = true;
  error: string = '';
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  // Load product by ID
loadProduct(): void {
  const productId = Number(this.route.snapshot.paramMap.get('id'));
  
  if (isNaN(productId)) {
    this.error = 'Invalid product ID';
    this.loading = false;
    return;
  }

  this.productService.getProduct(productId).subscribe({
    next: (product) => {
      if (product) {
        this.product = product;
      } else {
        this.error = 'Product not found';
      }
      this.loading = false;
    },
    error: (error) => {
      this.error = 'Error loading product. Please try again.';
      this.loading = false;
      console.error('Error loading product:', error);
    }
  });
}

  // Add to cart with selected quantity
  addToCart(): void {
    if (!this.product) return;

    this.cartService.addToCart(this.product, this.selectedQuantity);
    alert(`${this.selectedQuantity} ${this.product.name}(s) added to cart!`);
  }

  // Increase quantity
  increaseQuantity(): void {
    this.selectedQuantity++;
  }

  // Decrease quantity
  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  // Handle image error
  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
  }

  // Go back to products list
  goBack(): void {
    this.router.navigate(['/products']);
  }

  // Check if product is in cart
  isInCart(): boolean {
    return this.product ? this.cartService.isInCart(this.product.id) : false;
  }

  // Get quantity in cart
  getQuantityInCart(): number {
    return this.product ? this.cartService.getProductQuantity(this.product.id) : 0;
  }
}