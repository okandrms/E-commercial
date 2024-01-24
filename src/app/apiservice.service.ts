
import { Injectable } from '@angular/core';


@Injectable({
 providedIn: 'root'
})
export class ProductService {
 private apiUrl = 'http://127.0.0.1:8000/api/products/';

 constructor()  { }


 async getProducts(category: string) {
  return (await fetch(this.apiUrl+category)).json(); 
}

private apiSearch = 'http://127.0.0.1:8000/api/products/search/';



async getFilterProducts(term: string) {
  return (await fetch(this.apiSearch+term)).json();  
}



}




