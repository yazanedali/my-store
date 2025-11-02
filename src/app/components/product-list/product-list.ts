import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // أضفنا هذا
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, FormsModule], // أضفنا FormsModule هنا
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: string = '';

  // جعلنا cartService public حتى نستطيع استخدامه في الـtemplate
  constructor(
    private productService: ProductService,
    public cartService: CartService // غيرنا private إلى public
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load products from service
  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  // Search products
  searchProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.products;
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  // Clear search
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }

  // Add product to cart
  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  }

  // Check if product is in cart
  isInCart(productId: number): boolean {
    return this.cartService.isInCart(productId);
  }

  // Get quantity in cart
  getQuantityInCart(productId: number): number {
    return this.cartService.getProductQuantity(productId);
  }

  // Handle image error - أضفنا هذه الدالة
  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  }
}