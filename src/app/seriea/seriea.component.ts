import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seriea',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './seriea.component.html',
  styleUrl: './seriea.component.css'
})

export class SerieaComponent implements OnInit {
  // Array to store products
  products: any[] = [];
  // Array to store selected sizes
  selectedSize: any[] = [];
  // Toastr service for displaying notifications
  toaster: any;

  // Constructor to inject services
  constructor(private productService: ProductService, private localStorageService: LocalStorageService) {
    // Initialize Toastr service
    this.toaster = inject(ToastrService);
  }

  // Lifecycle hook - ngOnInit
  async ngOnInit() {
    // Fetch Serie A products from the ProductService
    this.products = await this.productService.getProducts("Serie-A");

    // Process images for each product
    this.products.forEach(product => {
      let images: string[] = product.imageList ? JSON.parse(product.imageList) : [];
      let is: string[] = [];
      images.forEach((i: string) => {
        // Format image paths
        is.push("..\\assets\\images\\".replace(/\\/g, '/') + i);
      })
      // Assign processed images to product
      product.images = is;
    })
    console.log(this.products);
  }

  // Function to handle adding a product to the cart
  addToCart(size: string, product: any) {
    // Check if a size is selected
    if (!size) {
      this.toaster.error("Select a size");
      return; // End transaction if the customer did not select a size
    }
    
    // Display success notification
    this.toaster.success(`${product.productName} added to cart`);

    // Log selected size
    console.log(`Selected Size: ${size}`);
    product.size = size;

    // Retrieve cart items from local storage
    let products = this.localStorageService.getLocalStorageValue('cart');
    console.log(products);

    // Initialize cart products or use an empty array if null
    let cartProducts = products ?? [];

    // Check if the product is already in the cart
    let cartProductFind = cartProducts.find((p: any) => p.id == product.id && p.size == size);

    // If product is in the cart, increment quantity; otherwise, add to cart
    if (cartProductFind) {
      cartProductFind.quantity = cartProductFind.quantity + 1;
    } else {
      product.quantity = 1;
      cartProducts.push(product);
    }

    // Update cart in local storage
    this.localStorageService.setLocalStorageValue('cart', cartProducts);
  }
}

