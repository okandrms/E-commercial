  // Import necessary modules and components from Angular
import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { Router } from '@angular/router';

// Component decorator to define the component metadata
@Component({
  selector: 'app-home', // Selector for the component
  standalone: true,
  imports: [CarouselComponent], // Imported components
  templateUrl: './home.component.html', // HTML template file
  styleUrl: './home.component.css' // CSS style file
})
export class HomeComponent {
  // Constructor to inject the Router service
  constructor(private router: Router) {}

  // Method to navigate to the 'buynow' route
  buyNow() {
    this.router.navigateByUrl('/buynow');
  }

  // Methods to navigate to specific search routes
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



