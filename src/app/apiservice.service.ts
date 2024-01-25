// Import the Injectable decorator from Angular core
import { Injectable } from '@angular/core';

// Declare the service as Injectable with the providedIn metadata
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Define the API URL for fetching products
  private apiUrl = 'http://127.0.0.1:8000/api/products/';

  // Constructor of the service
  constructor() {}

  // Asynchronously fetch products based on the specified category
  async getProducts(category: string) {
    // Use fetch to make an asynchronous API call to the specified category
    return (await fetch(this.apiUrl + category)).json();
  }

  // Define the API URL for searching products
  private apiSearch = 'http://127.0.0.1:8000/api/products/search/';

  // Asynchronously fetch filtered products based on the search term
  async getFilterProducts(term: string) {
    // Use fetch to make an asynchronous API call to search for products with the specified term
    return (await fetch(this.apiSearch + term)).json();
  }
}






