import { Routes } from '@angular/router';
import { leavePageGuard } from '../guards/leave-page.guard';
import { restaurantIdGuard } from './guards/restaurant-id.guard';
import { restaurantResover } from './resolvers/restaurant.resolver';

export const RESTAURANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./restaurants-page/restaurants-page.component').then(
        (m) => m.RestaurantsPageComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./restaurant-form/restaurant-form.component').then(
        (m) => m.RestaurantFormComponent
      ),
    canDeactivate: [leavePageGuard]
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./restaurant-form/restaurant-form.component').then(
        (m) => m.RestaurantFormComponent
      ),
    canActivate: [restaurantIdGuard],
    resolve: {
      restaurant: restaurantResover
    }
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./restaurant-details/restaurant-details.component').then(
        (m) => m.RestaurantDetailsComponent
      ),
    canActivate: [restaurantIdGuard],
    resolve: {
      restaurant: restaurantResover
    }
  },
];
