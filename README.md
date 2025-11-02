# 🛍️ MyStore - Angular E-Commerce Application

A modern, responsive single-page e-commerce application built with Angular that provides a complete online shopping experience.

![MyStore Screenshot](https://via.placeholder.com/800x400?text=MyStore+E-Commerce+App)

## ✨ Features

### 🏪 Core Features
- **Product Catalog** - Browse available products with search functionality
- **Product Details** - Detailed product pages with image galleries
- **Shopping Cart** - Add/remove products and manage quantities
- **Checkout Process** - Complete order with form validation
- **Order Confirmation** - Order summary and confirmation page

### 🎨 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Form Validation** - Client-side validation for all user inputs
- **Cart Persistence** - Shopping cart saved in localStorage
- **Search & Filter** - Find products quickly with real-time search

### ⚡ Technical Features
- **Angular 18+** - Built with latest Angular features
- **Standalone Components** - Modern component architecture
- **TypeScript** - Full type safety
- **RxJS** - Reactive programming patterns
- **CSS3** - Modern styling with Flexbox and Grid

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn
- Angular CLI 18+

### Installation

1. **Clone the repository**
   git clone https://github.com/your-username/my-store.git
   cd my-store
2. **Install dependencies**
    npm install
3. **Start development server**
    ng serve
4. **Open your browser**
    Navigate to http://localhost:4200

## Build for Production

### Development build
    ng build

### Production build
    ng build --configuration=production

### Build with optimization
    ng build --prod

## 📁 Project Structure
src/
├── app/
│   ├── components/          # Angular components
│   │   ├── product-list/    # Product catalog
│   │   ├── product-details/ # Individual product pages
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout process
│   │   └── confirmation/   # Order confirmation
│   ├── services/           # Data services
│   │   ├── product.service.ts
│   │   └── cart.service.ts
│   ├── models/             # TypeScript interfaces
│   │   ├── product.ts
│   │   └── cart-item.ts
│   ├── assets/             # Static assets
│   │   └── data.json       # Product data
│   └── app.config.ts       # Application configuration


## 🛠️ Technical Details
### Architecture
1. Component-Based - Modular, reusable components

2. Service Layer - Separated business logic

3. Reactive State - RxJS for state management

4. Type Safety - Full TypeScript implementation

### Key Components
1. ProductService - Handles product data and API calls

2. CartService - Manages shopping cart state and persistence

3. Product Models - TypeScript interfaces for data structures

### Data Flow
1. Products loaded from assets/data.json

2. Cart state managed via BehaviorSubject

3. Local storage for cart persistence

4. Router for navigation between views

## 🎯 Usage Guide
Adding Products
Products are managed in src/assets/data.json:

json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description",
      "imageUrl": "https://example.com/image.jpg",
      "category": "electronics"
    }
  ]
}
### Customizing Styles
1. Main styles: src/styles.css

2. Component styles: Individual .css files

3, Responsive breakpoints in component CSS

### Extending Features
1. Add new product categories

2. Implement user authentication

3. Connect to real API backend

4. Add payment integration

## 🙏 Acknowledgments
1. Angular Team for the amazing framework

2. Udacity for project guidelines

3. Open source community for inspiration


