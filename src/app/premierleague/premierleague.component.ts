// Import necessary Angular modules and services
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

// Component decorator with metadata
@Component({
  selector: 'app-premierleague',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './premierleague.component.html',
  styleUrl: './premierleague.component.css'
})
export class PremierleagueComponent implements OnInit {
  // Declare component properties
  products: any[] = [];
  selectedSize: any[] = [];
  toaster: any;

  // Constructor to inject services
  constructor(private productService: ProductService, private localStorageService: LocalStorageService) {
    this.toaster = inject(ToastrService);
  }

  // Lifecycle hook, executed after the component's view has been initialized
  async ngOnInit() {
    // Fetch products from the ProductService based on the category "PREMIER_LEAGUE"
    this.products = await this.productService.getProducts("PREMIER_LEAGUE");

    // Process product images
    this.products.forEach(product => {
      let images: string[] = product.imageList ? JSON.parse(product.imageList) : [];
      let is: string[] = [];
      images.forEach((i: string) => {
        is.push("..\\assets\\images\\".replace(/\\/g, '/') + i);
      })
      console.log(images);
      product.images = is;
    })
    console.log(this.products);
  }

  // Function to add a product to the cart
  addToCart(size: string, product: any) {
    // Check if a size is selected
    if (!size) {
      this.toaster.error("Select a size");
      return; // End transaction if the customer did not select a size
    }
    this.toaster.success(`${product.productName} added to cart`);

    console.log(`Selected Size: ${size}`);
    product.size = size;

    // Retrieve and update cart information from local storage
    let products = this.localStorageService.getLocalStorageValue('cart');
    console.log(products);

    let cartProducts = products ?? [];
    let cartProductFind = cartProducts.find((p: any) => p.id == product.id && p.size == size);
    if (cartProductFind) {
      cartProductFind.quantity = cartProductFind.quantity + 1;
    } else {
      product.quantity = 1;
      cartProducts.push(product);
    }

    this.localStorageService.setLocalStorageValue('cart', cartProducts);
  }
}

addToFavorites(size: string, product: any) {
  if (!size) {
      this.toaster.error("Select a size");
      return; // End transaction if customer did not select a size
  }
  this.toaster.success(`${product.productName} added to favorites`);

  console.log(`Selected Size: ${size}`);
  product.size = size;
  
  let favProducts = this.localStorageService.getLocalStorageValue('favorites');
  console.log(favProducts);

  let favoriteProducts = favProducts ?? [];
  let favoriteProductFind = favoriteProducts.find((p: any)=> p.id == product.id && p.size == size);
  if (favoriteProductFind) {
    favoriteProductFind.quantity = favoriteProductFind.quantity + 1;
  } else {
    product.quantity = 1;
    favoriteProducts.push(product);
  }

  
  this.localStorageService.setLocalStorageValue('favorites', favoriteProducts);
}
  
  
 }

