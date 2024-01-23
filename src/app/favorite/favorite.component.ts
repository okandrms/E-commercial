import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  standalone: true,
  imports: [MatIconModule, FormsModule]
})
export class FavoriteComponent implements OnInit {
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

  calculateTotalAmount():void {
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