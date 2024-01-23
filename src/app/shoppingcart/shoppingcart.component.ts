import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
  standalone: true,
  imports: [MatIconModule]
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
  this.localStorageValue  = this.products ? this.products.length : 0;



  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.products.forEach(product => {
      this.totalAmount += product.price;
    });
  }
  removeFromCart(productId: any) {
    let index = this.products.findIndex(p => p.id === productId); 
    this.products.splice(index, 1);
    this.localStorageService.setLocalStorageValue('cart', this.products);
    this.localStorageValue  = this.products ? this.products.length : 0;
    this.calculateTotalAmount();
  }


}
