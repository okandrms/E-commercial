import { Component, OnInit } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seriea',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './seriea.component.html',
  styleUrl: './seriea.component.css'
})
export class SerieaComponent implements OnInit {
  products: any[] =[];
  
   constructor(private productService: ProductService) { 
    
   }
  
   async ngOnInit() {
  
     this.products = await this.productService.getProducts("Serie-A");
    
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
