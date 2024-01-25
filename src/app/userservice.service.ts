// Importing required modules and decorators
import { Injectable } from '@angular/core';

// Decorator to mark the class as injectable and define its scope
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // API endpoints for user-related operations
  private apiUrl = 'http://127.0.0.1:8000/api/users/';
  private loginUrl = 'http://127.0.0.1:8000/api/login';

  // Constructor for the service
  constructor() {}

  // Method to create a new user
  async createUser(account: any) {
    return await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    });
  }

  // Method to handle user login
  async login(account: any) {
    // Sending a POST request to the login endpoint with user credentials
    let response = await fetch(this.loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    });

    // Returning the response object for further processing
    return response;
  }
}








