// Import necessary modules and services from Angular
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteService } from '../favorites.service';
import { Router } from '@angular/router';


// Component decorator to define the component metadata
@Component({
  selector: 'app-buynow', // Selector for the component
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule], // Imported modules
  templateUrl: './buynow.component.html', // HTML template file
  styleUrl: './buynow.component.css' // CSS style file
})
export class BuynowComponent implements OnInit {
  products: any[] =[]; // Array to store products
  selectedSize: any[] = []; // Array to store selected sizes
  toaster: any; // Toastr service for notifications
   
  // Constructor to inject services
  constructor(private productService: ProductService, private localStorageService: LocalStorageService, private favoriteService: FavoriteService, private router: Router) {
    
  
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
  async addToFavorites(size: string, product: any) {
    if (!size) {
        this.toaster.error("Select a size");
        return; // End transaction if customer did not select a size
    } 
    //if the user is not logged in then redirect to login
    if(!this.localStorageService.getLocalStorageValue('user')){
      this.toaster.error("Please login to add to favorites");
      this.router.navigateByUrl('/login');


      return
    }
   
    console.log(`Selected Size: ${size}`);
    product.size = size;
    
    let user = this.localStorageService.getLocalStorageValue('user'); 
    let favProducts = await this.favoriteService.getFavoritesByUserId(user.id); 
   
    console.log(user);
    console.log(favProducts);
  
    let favoriteProducts = favProducts ?? [];
    let favoriteProductFind = favoriteProducts.find((p: any)=> p.id == product.id && p.size == size);
    if (favoriteProductFind) {
      this.toaster.error(`${product.productName} already in favorites`);//if size is already in favorites then give error
      return
    }
    if (!favoriteProductFind) { 
      let favorite = {
        user_id: user.id,
        product_id: product.id,
        size: size
      }
     let response = await this.favoriteService.create(favorite);  
     if(response.status==200){
      this.toaster.success(`${product.productName} added to favorites`);
     }
    }   
    
  }
}

