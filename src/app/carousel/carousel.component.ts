// Import necessary modules and components from Angular and third-party libraries
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Component decorator to define the component metadata
@Component({
  selector: 'app-carousel', // Selector for the component
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, CarouselModule], // Imported modules
  templateUrl: './carousel.component.html', // HTML template file
  styleUrl: './carousel.component.css' // CSS style file
})
export class CarouselComponent {

  // Configuration object for Slick Carousel
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true
  };

  // Array of carousel items with image URLs and captions
  carouselItems = [
    { imageUrl: '../assets/images/monchengladbach2.jpeg', caption: 'Mönchengladbach Kits' },
    { imageUrl: '../assets/images/Milan.jpg', caption: 'Milan Kits' },
    { imageUrl: '../assets/images/Liv.jpg', caption: 'Liverpool Kits' }
    // Add more items as needed
  ];

  // Constructor of the component
  constructor() { }
}

