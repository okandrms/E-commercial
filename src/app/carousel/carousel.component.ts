import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { CarouselModule} from  'ngx-bootstrap/carousel';



@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, CarouselModule], 
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true
  };

  carouselItems = [
    { imageUrl: '../assets/images/monchengladbach2.jpeg', caption: 'Mönchengladbach Kits' },
    { imageUrl: '../assets/images/Milan.jpg', caption: 'Milan Kits' },
    { imageUrl: '../assets/images/Liv.jpg', caption: 'Liverpool Kits' }
    // Add more items as needed
  ];

  


  constructor() { }
}
