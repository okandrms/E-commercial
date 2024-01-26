import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../orders.service';
import { FavoriteService } from '../favorites.service';





@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,MatIconModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  products: any[] =[];
  term: string= "";

  selectedSize: any[] = [];
  toaster: any;
  i : number = 0;


  
  
   constructor(private productService: ProductService, private route: ActivatedRoute,private localStorageService: LocalStorageService, private orderService: OrderService,private favoriteService: FavoriteService) { 
    this.toaster = inject(ToastrService);
   }
  
   async ngOnInit() {
    
    
    this.route.params.subscribe(params => {
    this.term = params['term'];
    });


     this.products = await this.productService.getFilterProducts(this.term);
    
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


   async addToCartFromSearch(size: string, product: any) {
    if (!size) {
        this.toaster.error("Select a size");
        return; // End transaction if customer did not select a size
    }
    this.toaster.success(`${product.productName} added to cart`);

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
      let response = await this.orderService.updateOrder(order,orderProductFind.order_id);
      if(response.status==200){
        this.toaster.success(`${product.productName} added to cart`);
       }
    }
}

async addToFavorites(size: string, product: any) {
  if (!size) {
      this.toaster.error("Select a size");
      return; // End transaction if customer did not select a size
  }
  this.toaster.success(`${product.productName} added to favorites`);

  console.log(`Selected Size: ${size}`);
  product.size = size;
  
  let user = this.localStorageService.getLocalStorageValue('user'); 
    let favProducts = await this.favoriteService.getFavoritesByUserId(user.id); 
   
    console.log(user);
    console.log(favProducts);

  
    let favoriteProducts = favProducts ?? [];
    let favoriteProductFind = favoriteProducts.find((p: any)=> p.id == product.id && p.size == size);
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

  
  


