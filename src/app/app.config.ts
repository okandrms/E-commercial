import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideAnimations(), // required animations providers
    provideToastr({positionClass: 'toast-bottom-right'}), // Toastr providers
    provideRouter(routes)
  ]
};
