import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { FavoriteService } from '../favorites.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../orders.service';


@Component({
  selector: 'app-seriea',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatIconModule],
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
  constructor(private productService: ProductService, private localStorageService: LocalStorageService,private favoriteService: FavoriteService, private router: Router, private orderService: OrderService) {
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
  async addToCart(size: string, product: any) {
    if (!size) {
        this.toaster.error("Select a size");
        return; // End transaction if customer did not select a size
    } 
    //if the user is not logged in then redirect to login
    if(!this.localStorageService.getLocalStorageValue('user')){
      this.toaster.error("Please login to add to cart");
      this.router.navigateByUrl('/login');


      return
    }
   
    console.log(`Selected Size: ${size}`);
    product.size = size;
    
    let user = this.localStorageService.getLocalStorageValue('user'); 
    let ordProducts = await this.orderService.getOrdersByUserId(user.id); 
   
    console.log(user);
    console.log(ordProducts);

  
    let orderProducts = ordProducts ?? [];
    let orderProductFind = orderProducts.find((p: any)=> p.id == product.id && p.size == size);
    if (!orderProductFind) { 
      let order = {
        user_id: user.id,
        product_id: product.id,
        size: size,
        quantity: 1 
      }
     let response = await this.orderService.createOrder(order);  
     if(response.status==200){
      this.toaster.success(`${product.productName} added to cart`);
     }
    }
    else {
      orderProductFind.quantity += 1;
      let order = {
        user_id: user.id,
        product_id: product.id,
        size: size,
        quantity: orderProductFind.quantity 
      }
     let response = await this.orderService.updateOrder(order, orderProductFind.order_id);  
     if(response.status==200){
      this.toaster.success(`${product.productName} added to cart`);
     }
    }   
    
  }
  async addToFavorites(size: string, product: any) {
    if (!size) {
        this.toaster.error("Select a size");
        return; // End transaction if customer did not select a size
    } //if size is already in favorites then give error
    
    
 
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


