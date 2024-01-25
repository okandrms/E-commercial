// Import necessary modules and services from Angular
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { ToastrService } from 'ngx-toastr';

// Component decorator to define the component metadata
@Component({
  selector: 'app-buynow', // Selector for the component
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Imported modules
  templateUrl: './buynow.component.html', // HTML template file
  styleUrl: './buynow.component.css' // CSS style file
})
export class BuynowComponent implements OnInit {
  products: any[] =[]; // Array to store products
  selectedSize: any[] = []; // Array to store selected sizes
  toaster: any; // Toastr service for notifications
   
  // Constructor to inject services
  constructor(private productService: ProductService, private localStorageService: LocalStorageService) { 
    this.toaster = inject(ToastrService); // Inject ToastrService
  }

  // Lifecycle hook - ngOnInit, called after the component is initialized
  async ngOnInit() {
  
    // Fetch products from the ProductService
    this.products = await this.productService.getProducts("");
   
    // Process product images and update image paths
    this.products.forEach(product => {
      let images : string[] = product.imageList ? JSON.parse(product.imageList) : []; 
      let is : string[] = [];
      images.forEach((i: string) => {
        is.push("..\\assets\\images\\".replace(/\\/g, '/')+i);        
      })
      console.log(images);  
      product.images = is; 
    })
    console.log(this.products);
  }

  // Method to add a product to the cart
  addToCart(size: string, product: any) {
    if (!size) {
        this.toaster.error("Select a size");
        return; // End transaction if the customer did not select a size
    }
    this.toaster.success(`${product.productName} added to cart`);

    console.log(`Selected Size: ${size}`);
    product.size = size;
    
    // Retrieve products from local storage
    let products = this.localStorageService.getLocalStorageValue('cart');
    console.log(products);

    // Initialize cartProducts array or retrieve from local storage
    let cartProducts = products ?? [];
    
    // Check if the product is already in the cart
    let cartProductFind = cartProducts.find((p: any)=> p.id == product.id && p.size == size);
    if (cartProductFind) {
      cartProductFind.quantity = cartProductFind.quantity + 1; // Increment quantity if the product is already in the cart
    } else {
      product.quantity = 1;
      cartProducts.push(product); // Add the product to the cart if it's not already present
    }

    // Update the cart in local storage
    this.localStorageService.setLocalStorageValue('cart', cartProducts);
  }
}
