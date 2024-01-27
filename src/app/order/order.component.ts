import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../favorites.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders.service';
import { ConfirmedOrderService} from '../confirmedorders.service'
import { useAnimation } from '@angular/animations';



@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  products: any[] = [];
  totalAmount: number = 0;
  private subject = new Subject<any>();
  selectedSize: any[] = [];
  localStorageValue: number = 0;

  
 

  constructor(private productService: ProductService,private localStorageService: LocalStorageService,private favoriteService: FavoriteService,private toaster: ToastrService, private orderService: OrderService,private confirmedOrderService: ConfirmedOrderService) {
  }



  async ngOnInit() {

    this.getProductsFromDB();
  }

  async getProductsFromDB() {
    let user = this.localStorageService.getLocalStorageValue('user'); 
    this.products  = await this.confirmedOrderService.getOrdersByUserId(user.id); 
    console.log("products",this.products);      
    
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
    // Calculate total amount and total quantity
    this.calculateTotalAmount();
    this.localStorageValue =  this.products ? this.calculateTotalQuantity(this.products) : 0;
  }
 
  calculateTotalQuantity(products: any[]): number {
    let totalQuantity = 0;
    products.forEach(product => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  }

  calculateTotalAmount(): void {
    let tempTotalAmount = 0;
    this.products.forEach(product => {
      tempTotalAmount += product.price * product.quantity;
     
    });
    this.totalAmount = parseFloat(tempTotalAmount.toFixed(2));
  }
}


