import { Component, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders.service';



@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
  standalone: true,  // Indicates that this component is standalone and not part of a larger module
  imports: [MatIconModule, FormsModule]
})
export class ShoppingcartComponent implements OnInit {
  products: any[] = [];
  totalAmount: number = 0;
  localStorageValue: number = 0;
  private subject = new Subject<any>();
  

  constructor(private localStorageService: LocalStorageService, private router: Router, private orderService: OrderService, private toaster: ToastrService) {
    this.toaster = inject(ToastrService);
  }

  async ngOnInit() {

    this.getProductsFromDB();
       
   }

  calculateTotalQuantity(products: any[]): number {
    let totalQuantity = 0;
    products.forEach(product => {
      totalQuantity += product.quantity;
      this.localStorageService.setLocalStorageValue('cart', products);
    });
    return totalQuantity;
  }

  calculateTotalAmount(): void {
    let tempTotalAmount = 0;
    this.products.forEach(product => {
      tempTotalAmount += product.price * product.quantity;
      this.totalAmount = parseFloat(tempTotalAmount.toFixed(2));
    });
  }

  async removeFromCart(order_id: any, ) {

    let response = await this.orderService.delete(order_id);
 
    if(response.status==200){
    this.getProductsFromDB();
    }
    
    
     
   }

  async orderNow(): Promise<void> {
    const user = this.localStorageService.getLocalStorageValue('user');
    if (!user) {
       this.toaster.error("Please log in before you order");
       this.router.navigateByUrl('/login');
       return;
    }
   
    if (this.calculateTotalQuantity(this.products) === 0) {
       this.toaster.error("Cart is empty");
       return;
    }
   
    try {
       this.toaster.success("Ordering...");
       // Assuming you have a method in OrderService to place an order
       const orderResponse = await this.orderService.createOrder(user.id);
       if (orderResponse) {
         this.toaster.success("Your order has been placed! Thank you for shopping with us!");
         this.router.navigateByUrl('/home');
         this.localStorageService.setLocalStorageValue('cart', []);
       } else {
         throw new Error("Order creation failed");
       }
    } catch (error) {
       console.error("Error placing order:", error);
       this.toaster.error("An error occurred while placing the order. Please try again later.");
    }
   }
   

  async increaseQuantity(product: any ) {
    product.quantity = (product.quantity || 0) + 1;
    this.calculateTotalAmount();
    let user = this.localStorageService.getLocalStorageValue('user'); 
    let order = {
      user_id: user.id,
      product_id: product.id,
      size: product.size,
      quantity: product.quantity 
    }
    this.orderService.updateOrder(order,product.order_id);

    this.getProductsFromDB();
 

  }

  decreaseQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.calculateTotalAmount();
      let user = this.localStorageService.getLocalStorageValue('user'); 
      let order = {
        user_id: user.id,
        product_id: product.id,
        size: product.size,
        quantity: product.quantity 
      }
      this.orderService.updateOrder(order,product.order_id);
  
      this.getProductsFromDB();
    }
    if (product.quantity === 0) {
      this.removeFromCart(product.id);
    }
  }

  async getProductsFromDB() {
    let user = this.localStorageService.getLocalStorageValue('user'); 
    this.products  = await this.orderService.getOrdersByUserId(user.id); 
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
}

  
  
  
  

  

