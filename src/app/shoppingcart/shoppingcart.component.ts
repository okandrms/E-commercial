import { Component, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



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
  toaster: any;

  constructor(private localStorageService: LocalStorageService, private router: Router) { 
    this.toaster = inject(ToastrService);
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
      this.localStorageService.setLocalStorageValue('cart', products); // Update local storage value, So Total products are displayed in cart.
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
  orderNow() {
    if (this.products.length == 0) {
      this.toaster.error("Cart is empty");
      return;
    }
    this.toaster.success("Ordering...");
    setTimeout(() => {
   this.toaster.success("Your order has been placed! Thank you for shopping with us!");
   this.router.navigateByUrl('/home');
   this.localStorageService.setLocalStorageValue('cart', []);
    
  } , 3000);
}  

  increaseQuantity(product: { quantity: number }) {
    product.quantity = (product.quantity || 0) + 1;
    this.calculateTotalAmount();
    this.localStorageValue = this.calculateTotalQuantity(this.products); // Update local storage value, So Total products are displayed at total products.
    

  }
  
  decreaseQuantity(product: { quantity: number }) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.calculateTotalAmount();
      this.localStorageValue = this.calculateTotalQuantity(this.products); // Update local storage value, So Total products are displayed at total products.
    }
  }

  
  }
  
  
  
  

  

