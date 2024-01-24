import { Component, OnInit } from '@angular/core';
import { ProductService } from '../apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  products: any[] =[];
  term: string= "";
  toaster: any;
  localStorageService: any;
selectedSize: any;
  
   constructor(private productService: ProductService, private route: ActivatedRoute) { 
    
   }
  
   async ngOnInit() {
    
    
    this.route.params.subscribe(params => {
    this.term = params['term'];
    });


     this.products = await this.productService.getFilterProducts(this.term);
    
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
  

