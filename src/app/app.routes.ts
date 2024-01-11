import { Routes } from '@angular/router';
import { HomeComponent } from  './home/home.component';

import { CarouselComponent } from './carousel/carousel.component';




export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
        },
        {
        path: 'home',
        component: HomeComponent
        },
        {
        path: 'carouselcomponent',
        component: CarouselComponent
        }

];
