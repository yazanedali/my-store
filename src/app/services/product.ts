import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Product } from '../models/product';

interface ProductsResponse {
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'assets/data.json';
  private products: Product[] = [];

  constructor(private http: HttpClient) { }

  // جلب جميع المنتجات
  getProducts(): Observable<Product[]> {
    if (this.products.length > 0) {
      // إذا كانت المنتجات محملة مسبقاً، نرجعها مباشرة
      return of(this.products);
    }

    return this.http.get<ProductsResponse>(this.productsUrl).pipe(
      map(response => {
        // حفظ المنتجات للاستخدام اللاحق
        this.products = response.products;
        return this.products;
      })
    );
  }

  // جلب منتج محدد بواسطة ID
  getProduct(id: number): Observable<Product | undefined> {
    // إذا كانت المنتجات محملة مسبقاً، نبحث فيها
    if (this.products.length > 0) {
      const product = this.products.find(p => p.id === id);
      return of(product);
    }

    // إذا لم تكن محملة، نحميلها أولاً ثم نبحث
    return this.getProducts().pipe(
      map(products => {
        return products.find(product => product.id === id);
      })
    );
  }

  // البحث في المنتجات
  searchProducts(term: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        if (!term.trim()) {
          return products;
        }
        
        const searchTerm = term.toLowerCase();
        return products.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      })
    );
  }

  // جلب المنتجات حسب الفئة (إذا كانت موجودة في المستقبل)
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        return products.filter(product => 
          product.category?.toLowerCase() === category.toLowerCase()
        );
      })
    );
  }

  // جلب المنتجات المميزة (إذا أردنا إضافتها لاحقاً)
  getFeaturedProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        // يمكننا إضافة منطق للمنتجات المميزة هنا
        return products.slice(0, 3); // أول 3 منتجات كمثال
      })
    );
  }

  // تحديث مخزون المنتج (للاستخدام المستقبلي)
  updateProductStock(productId: number, newStock: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      // إذا كان لدينا خاصية stock في المستقبل
      // product.stock = newStock;
    }
  }

  // إعادة تحميل المنتجات من الخادم
  reloadProducts(): Observable<Product[]> {
    this.products = []; // مسح الذاكرة المؤقتة
    return this.getProducts();
  }
}

