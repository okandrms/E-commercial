  import { Component } from '@angular/core';
  import { CarouselComponent } from '../carousel/carousel.component';
  import { Router } from '@angular/router';
  
  
  
  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [CarouselComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent {
    constructor(private router: Router) {}
  
    buyNow() {
       this.router.navigateByUrl('/buynow');
      }
    GoToItaly() {
      this.router.navigateByUrl('/search/Italy');
    }
    GoToBelgium() {
      this.router.navigateByUrl('/search/Belgium');
    }
    GoToEngland() {
      this.router.navigateByUrl('/search/England');
    }
      }


