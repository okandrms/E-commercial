import { Component, OnInit } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-bundesliga',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bundesliga.component.html',
  styleUrl: './bundesliga.component.css'
})
export class BundesligaComponent implements OnInit {
  products: any[] =[];
 selectedSize: any[] = [];
 
 
  constructor(private productService: ProductService,private localStorageService: LocalStorageService) { 
   
  }
 
  async ngOnInit() {
 
    this.products = await this.productService.getProducts("Bundesliga");
   
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
      alert ("Select a size");
        return; // End transaction if customer did not select a size
    }

    console.log(`Selected Size: ${size}`);
    product.size = size;
    
    let products = this.localStorageService.getLocalStorageValue('cart');
    console.log(products);

    let cartProducts = products ?? [];
    cartProducts.push(product);
    
    this.localStorageService.setLocalStorageValue('cart', cartProducts);
}

  
  }
