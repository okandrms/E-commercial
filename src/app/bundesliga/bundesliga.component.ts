import { Component, OnInit } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-bundesliga',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bundesliga.component.html',
  styleUrl: './bundesliga.component.css'
})
export class BundesligaComponent implements OnInit {
  products: any[] =[];
  
   constructor(private productService: ProductService) { 
    
   }
  
   async ngOnInit() {
  
     this.products = await this.productService.getProducts("Bundesliga");
    
     this.products.forEach(product => {
        
       let images : string[] = product.imageList ? JSON.parse(product.imageList) : []; 
       let is : string[] = [];
       images.forEach((i: string) => {
         is.push("..\\assets\\images\\".replace(/\\/g, '/')+i);        
 
       })
       console.log(images);  
       product.images = is; 
 
     })
     console.log(this.products);
   }
  }
