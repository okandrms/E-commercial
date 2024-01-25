import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';

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
 

  constructor(private productService: ProductService,private localStorageService: LocalStorageService ) {
  }

  ngOnInit() {
    this.products = this.localStorageService.getLocalStorageValue('favorites'); 
    this.localStorageValueFavorite = this.products ? this.products.length : 0;      
   }
 
  removeFromFavorites(productId: any) {
    let index = this.products.findIndex(p => p.id === productId); 
    this.products.splice(index, 1);
    this.localStorageService.setLocalStorageValue('favorites', this.products);
    this.localStorageValueFavorite  = this.products ? this.products.length : 0;
    
  }

  increaseQuantity(product: { quantity: number }) {
    product.quantity = (product.quantity || 0) + 1;
    
    // this.localStorageValue = this.calculateTotalQuantity(this.products); // Update local storage value, So Total products are displayed at total products.
    

  }
  
  decreaseQuantity(product: { quantity: number }) {
    if (product.quantity > 0) {
      product.quantity -= 1;
     
      // this.localStorageValue = this.calculateTotalQuantity(this.products); // Update local storage value, So Total products are displayed at total products.
    }
  }
}