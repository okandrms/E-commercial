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
import { ToastrService } from 'ngx-toastr';

// Define the component metadata
@Component({
  selector: 'app-root',
  standalone: true,
  // Import required modules for the component
  imports: [CommonModule, RouterOutlet, MatIconModule, SlickCarouselModule, RouterModule, FontAwesomeModule, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// Define the main AppComponent class
export class AppComponent implements OnInit {
  [x: string]: any;
  // Define component properties
  title = 'Eindproef';
  term: any ;
  currentUser: any = {name: "", email: ""}; 
  ordersTotalQuantity : number = 0; 
  localStorageValueFavorite : number = 0;
  private subscription: Subscription = new Subscription();
  private subscriptionFavorite: Subscription = new Subscription();
  toaster: any;

  
 
  // Constructor with dependency injection
  constructor(private router: Router,private localStorageService: LocalStorageService,private favoriteService: FavoriteService,private orderService: OrderService, private toastr: ToastrService) {}


  // Method to redirect to the search page
  redirectToSearch() {
    console.log(this.term);
    this.router.navigate(['/search', this.term]);
  }

  // Lifecycle hook - ngOnInit
  async ngOnInit() {
   

    // Subscribe to changes in the localStorage for favorites
    this.subscriptionFavorite = this.favoriteService.favorite$.subscribe(async value => {
        console.log(value);
        let user = this.localStorageService.getLocalStorageValue('user'); 
        let productsFavourites = user ? await this.favoriteService.getFavoritesByUserId(user.id): [];  
        this.localStorageValueFavorite = productsFavourites ? productsFavourites.length : 0; 
    });

    // Subscribe to changes in the localStorage for orders
    
    this['subscriptionOrder'] = this.orderService.orders$.subscribe(async value => {
        console.log("subscriptionOrder",value);   
        let user = this.localStorageService.getLocalStorageValue('user'); 
        let userOrders =  user ? await this.orderService.getOrdersByUserId(user.id) : [];  
        this.ordersTotalQuantity = userOrders ? this.calculateTotalQuantity(userOrders) : 0;  
    });

    // Get the current user from local storage
    let tempUser = await this.localStorageService.getLocalStorageValue('user');
   
    this.currentUser= tempUser ? tempUser :  {name: "", email: ""}; 
}




  // Method to calculate the total quantity of products
  calculateTotalQuantity(products: any[]) {
    let totalQuantity = 0;
    products.forEach(product => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;

}
logout() {
  // Check if the user is logged in
  const user = this.localStorageService.getLocalStorageValue('user');

  if (user) {
    // Display toaster message
    this.toastr.success(`Logged out successfully`);
    // Clear local storage
    this.localStorageService.clearLocalStorage();
    // Redirect to login
    this.router.navigateByUrl('/login');
  } else {
    // Display toaster message if user is not logged in
    this.toastr.error('You are not logged in');
    // Redirect to login
    this.router.navigateByUrl('/login');
  }
}


}




