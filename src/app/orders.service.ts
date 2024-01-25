// Importing required modules and decorators
import { Injectable } from '@angular/core';

// Decorator to mark the class as injectable and define its scope
@Injectable({
  providedIn: 'root'
})
export class OrderService { 
  // API endpoints for user-related operations
  private apiUrl = 'http://127.0.0.1:8000/api/orders';

  // Constructor for the service
  constructor() {}

  // Method to create a new user
  async createOrder(orders: any) {
    return await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orders) 
    });
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








