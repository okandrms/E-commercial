// Importing required modules and decorators
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// Decorator to mark the class as injectable and define its scope
@Injectable({
  providedIn: 'root'
})
export class ConfirmedOrderService { 
  // API endpoints for user-related operations
  private apiUrl = 'http://127.0.0.1:8000/api/confirmedorders';

  private ordersSubject = new BehaviorSubject<string | null>(null);

  orders$ = this.ordersSubject.asObservable();

  // Constructor for the service
  constructor() {}

  // Method to create a new user
  async createOrder(orders: any) {
    
    let res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orders) 
    });
    this.ordersSubject.next("Created");  
    return res;

  }

  
  
  // Method to handle user login
  async getOrdersByUserId(userId: any) {
    // Sending a POST request to the login endpoint with user credentials
    let response = await fetch(this.apiUrl +"/"+ userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let result = await response.json();
    // Returning the response object for further processing
    return result; 
  }
}








