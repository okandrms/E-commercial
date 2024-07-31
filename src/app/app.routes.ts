import { Routes} from '@angular/router';
import { HomeComponent } from  './home/home.component';
import { LoginComponent } from './login/login.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PremierleagueComponent } from './premierleague/premierleague.component';
import { BundesligaComponent } from './bundesliga/bundesliga.component';
import { SerieaComponent } from './seriea/seriea.component';
import { Euro2024Component } from './euro2024/euro2024.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { SearchComponent } from './search/search.component';
import { BuynowComponent } from './buynow/buynow.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent} from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';





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
        },
        {
        path: 'login',
        component: LoginComponent
        },

        {
          path: 'forgotpassword',
          component: ForgotpasswordComponent
          },

        {
        path: 'register',
        component: RegisterComponent
        },

        {
        path: 'resetpassword',
        component: ResetpasswordComponent
        },

        {
        path: 'premierleague',
        component: PremierleagueComponent
        },
        {
        path: 'bundesliga',
        component: BundesligaComponent
        },
        {
        path: 'seriea',
        component: SerieaComponent
        },
        {
        path: 'euro2024',
        component: Euro2024Component
        },
        {
        path: 'shoppingcart',
        component: ShoppingcartComponent
        },
        {
        path: 'favorite',
        component: FavoriteComponent
        },
        {
        path: 'search/:term',
        component: SearchComponent
        },
        {
        path: 'buynow',
        component: BuynowComponent
        },
        {
        path: 'order',
        component: OrderComponent
        }



];
