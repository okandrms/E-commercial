import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
  standalone: true,
  imports: [MatIconModule, FormsModule]
})
export class ShoppingcartComponent implements OnInit {
  products: any[] = [];
  totalAmount: number = 0;
  private subject = new Subject<any>();
  localStorageValue : number = 0; 
  

  constructor(private localStorageService: LocalStorageService ) {
  }

  ngOnInit() {
   this.products = this.localStorageService.getLocalStorageValue('cart'); 
   this.calculateTotalAmount();
  this.localStorageValue  = this.products ?  this.calculateTotalQuantity(this.products) : 0;
  
  }

  calculateTotalQuantity(products: any[]) {
    let totalQuantity = 0;
    products.forEach(product => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  }

  calculateTotalAmount():void {
    let tempTotalAmount = 0;
    this.products.forEach(product => {
    tempTotalAmount += product.price * product.quantity;
    this.totalAmount = parseFloat(tempTotalAmount.toFixed(2)); 



    });
  }
  removeFromCart(productId: any) {
    let index = this.products.findIndex(p => p.id === productId); 
    this.products.splice(index, 1);
    this.localStorageService.setLocalStorageValue('cart', this.products);
    this.localStorageValue  = this.products ? this.products.length : 0;
    this.calculateTotalAmount();
  }

  increaseQuantity(product: { quantity: number }) {
    product.quantity = (product.quantity || 0) + 1;
    this.calculateTotalAmount();
  }
  
  decreaseQuantity(product: { quantity: number }) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.calculateTotalAmount();
    }
  }

  
  }
  
  
  
  

