import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../favorites.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule ]
})
export class FavoriteComponent implements OnInit {
  products: any[] = [];
  totalAmount: number = 0;
  private subject = new Subject<any>();
  localStorageValueFavorite : number = 0;
  selectedSize: any[] = [];
  
 

  constructor(private productService: ProductService,private localStorageService: LocalStorageService,private favoriteService: FavoriteService,private toaster: ToastrService, private orderService: OrderService) {
  }

  async ngOnInit() {

    let user = this.localStorageService.getLocalStorageValue('user'); 
    let products = await this.favoriteService.getFavoritesByUserId(user.id); 
    console.log("products",products);      
    this.products = products; 
    // Process product images
    this.products.forEach(product => {
      let images: string[] = product.imageList ? JSON.parse(product.imageList) : [];
      let is: string[] = [];
      images.forEach((i: string) => {
        is.push("..\\assets\\images\\".replace(/\\/g, '/') + i);
      })
      console.log(images);
      product.images = is;
    });
    this.localStorageValueFavorite = products ? products.length : 0;      
   }
 
 async removeFromFavorites(favorite_id: any) {

   let response = await this.favoriteService.delete(favorite_id);

   if(response.status==200){
    this.toaster.success('Product removed from favorites');
    let user = this.localStorageService.getLocalStorageValue('user'); 
    let products = await this.favoriteService.getFavoritesByUserId(user.id); 
    this.products = products; 
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
    this.localStorageValueFavorite = products ? products.length : 0;
   }
   
   
    
  }
  async addToCart(size: string, product: any) {
    // Check if a size is selected
    
    this.toaster.success(`${product.productName} added to cart`);

    console.log(`Selected Size: ${size}`);
    product.size = size;

    // Retrieve and update cart information from local storage
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
      let response = await this.orderService.updateOrder(order,orderProductFind.order_id);
      if(response.status==200){
        this.toaster.success(`${product.productName} added to cart`);
       }
    }

  }
  

  
}