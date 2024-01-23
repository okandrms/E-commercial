import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-premierleague',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './premierleague.component.html',
  styleUrl: './premierleague.component.css'
})
export class PremierleagueComponent implements OnInit {
 products: any[] =[];
 selectedSize: any[] = [];
 toaster: any;
 
 
  constructor(private productService: ProductService,private localStorageService: LocalStorageService) { 
   this.toaster = inject(ToastrService);
  }
 
  async ngOnInit() {
 
    this.products = await this.productService.getProducts("PREMIER_LEAGUE");
   
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

  addToCart(size: string, product: any) {
    if (!size) {
        this.toaster.error("Select a size");
        return; // End transaction if customer did not select a size
    }
    this.toaster.success(`${product.productName} added to cart`);

    console.log(`Selected Size: ${size}`);
    product.size = size;
    
    let products = this.localStorageService.getLocalStorageValue('cart');
    console.log(products);

    let cartProducts = products ?? [];
    cartProducts.push(product);
    
    this.localStorageService.setLocalStorageValue('cart', cartProducts);
}

  
  
 }