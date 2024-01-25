// Import necessary Angular modules and services
import { Component, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
  standalone: true,  // Indicates that this component is standalone and not part of a larger module
  imports: [MatIconModule, FormsModule]
})
export class ShoppingcartComponent implements OnInit {
  // Initialize variables
  products: any[] = [];
  totalAmount: number = 0;
  private subject = new Subject<any>();
  localStorageValue: number = 0;
  toaster: any;

  // Constructor with dependency injection
  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.toaster = inject(ToastrService);
  }

  // Angular lifecycle hook: ngOnInit
  ngOnInit() {
    // Retrieve products from local storage
    this.products = this.localStorageService.getLocalStorageValue('cart');
    // Calculate total amount and total quantity
    this.calculateTotalAmount();
    this.localStorageValue = this.products ? this.calculateTotalQuantity(this.products) : 0;
  }

  // Calculate total quantity of products in the cart
  calculateTotalQuantity(products: any[]): number {
    let totalQuantity = 0;
    products.forEach(product => {
      totalQuantity += product.quantity;
      this.localStorageService.setLocalStorageValue('cart', products); // Update local storage value to display total products in the cart
    });
    return totalQuantity;
  }

  // Calculate total amount of products in the cart
  calculateTotalAmount(): void {
    let tempTotalAmount = 0;
    this.products.forEach(product => {
      tempTotalAmount += product.price * product.quantity;
      this.totalAmount = parseFloat(tempTotalAmount.toFixed(2));
    });
  }

  // Remove a product from the cart
  removeFromCart(productId: any): void {
    let index = this.products.findIndex(p => p.id === productId);
    this.products.splice(index, 1);
    this.localStorageService.setLocalStorageValue('cart', this.products);
    this.localStorageValue = this.products ? this.products.length : 0;
    this.calculateTotalAmount();
    if (this.products.length === 0) {
      this.totalAmount = 0;
    }
  }

  // Process the order
  orderNow(): void {
    // Check if the user is logged in (exists in localStorage)
    const user = this.localStorageService.getLocalStorageValue('user');

    if (!user) {
      // User is not logged in, show toaster message
      this.toaster.error("Please log in before you order");
      this.router.navigateByUrl('/login');
      return;
    }

    // Continue with the order process
    if (this.calculateTotalQuantity(this.products) === 0) {
      this.toaster.error("Cart is empty");
      return;
    }

    // Simulate order processing delay with a setTimeout
    this.toaster.success("Ordering...");
    setTimeout(() => {
      this.toaster.success("Your order has been placed! Thank you for shopping with us!");
      this.router.navigateByUrl('/home');
      this.localStorageService.setLocalStorageValue('cart', []); // Clear the cart after placing the order
    }, 3000);
  }

  // Increase the quantity of a product in the cart
  increaseQuantity(product: { quantity: number }): void {
    product.quantity = (product.quantity || 0) + 1;
    this.calculateTotalAmount();
    this.localStorageValue = this.calculateTotalQuantity(this.products); // Update local storage value to display total products
  }

  // Decrease the quantity of a product in the cart
  decreaseQuantity(product: { id(id: any): unknown; quantity: number }): void {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.calculateTotalAmount();
      this.localStorageValue = this.calculateTotalQuantity(this.products); // Update local storage value to display total products
    }
    if (product.quantity === 0) {
      this.removeFromCart(product.id);
    }
  }
}

  
  
  
  

  

