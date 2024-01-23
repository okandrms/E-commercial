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




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule, SlickCarouselModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Eindproef';
  term: any ;
  localStorageValue : number = 0; 
  private subscription: Subscription = new Subscription();

constructor(private router: Router,private localStorageService: LocalStorageService) {}

  redirectToSearch() {
    console.log(this.term);
    this.router.navigate(['/search', this.term]);
    
  }

  
  
  ngOnInit() {
   
    this.subscription = this.localStorageService.localStorage$.subscribe(value => { 
    console.log("APP Component Init", value); 
    let products = value ? JSON.parse(value??"") : this.localStorageService.getLocalStorageValue('cart'); 
    this.localStorageValue  = products ? products.length : 0;
    
  });
  }


}
