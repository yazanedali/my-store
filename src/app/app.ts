import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="app-container">
      <!-- Navigation Header -->
      <header class="app-header">
        <nav class="navbar">
          <div class="nav-brand">
            <a routerLink="/" class="brand-link">MyStore</a>
          </div>
          <div class="nav-links">
            <a routerLink="/products" class="nav-link">Products</a>
            <a routerLink="/cart" class="nav-link">Cart</a>
          </div>
        </nav>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="footer-content">
          <p>&copy; 2024 MyStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class App {
  title = 'MyStore';
}