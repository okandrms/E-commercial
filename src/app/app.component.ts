// Import necessary Angular modules and third-party libraries
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './local-storage.service';
import { Subscription } from 'rxjs';
import { FavoriteService } from './favorites.service';
import { OrderService } from './orders.service';

// Define the component metadata
@Component({
  selector: 'app-root',
  standalone: true,
  // Import required modules for the component
  imports: [CommonModule, RouterOutlet, MatIconModule, SlickCarouselModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// Define the main AppComponent class
export class AppComponent implements OnInit {
  [x: string]: any;
  // Define component properties
  title = 'Eindproef';
  term: any ;
  currentUser: any = {};
  ordersTotalQuantity : number = 0; 
  localStorageValueFavorite : number = 0;
  private subscription: Subscription = new Subscription();
  private subscriptionFavorite: Subscription = new Subscription();

  
 
  // Constructor with dependency injection
  constructor(private router: Router,private localStorageService: LocalStorageService,private favoriteService: FavoriteService,private orderService: OrderService) {}

  // Method to redirect to the search page
  redirectToSearch() {
    console.log(this.term);
    this.router.navigate(['/search', this.term]);
  }

  // Lifecycle hook - ngOnInit
  async ngOnInit() {
    // Subscribe to changes in the localStorage for cart
    // this.subscription = this.localStorageService.localStorage$.subscribe(value => { 
    //     console.log("APP Component Init", value); 
    //     // Parse the JSON value and calculate the total quantity
    //     let products =  this.localStorageService.getLocalStorageValue('cart'); 
    //     this.localStorageValue  = products ?  this.calculateTotalQuantity(products) : 0; 
    // });

    // Subscribe to changes in the localStorage for favorites
    this.subscriptionFavorite = this.favoriteService.favorite$.subscribe(async value => {
        console.log(value);
        let user = this.localStorageService.getLocalStorageValue('user'); 
        let productsFavourites = await this.favoriteService.getFavoritesByUserId(user.id);  
        this.localStorageValueFavorite = productsFavourites ? productsFavourites.length : 0; 
    });

    // Subscribe to changes in the localStorage for orders
    
    this['subscriptionOrder'] = this.orderService.orders$.subscribe(async value => {
        console.log("subscriptionOrder",value);   
        let user = this.localStorageService.getLocalStorageValue('user'); 
        let userOrders = await this.orderService.getOrdersByUserId(user.id);  
        this.ordersTotalQuantity = userOrders ? this.calculateTotalQuantity(userOrders) : 0;  
    });

    // Get the current user from local storage
    this.currentUser = await this.localStorageService.getLocalStorageValue('user');
    
}




  // Method to calculate the total quantity of products
  calculateTotalQuantity(products: any[]) {
    let totalQuantity = 0;
    products.forEach(product => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  }

}

