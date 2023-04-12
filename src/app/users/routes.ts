import { Routes } from '@angular/router';
/*import { leavePageGuard } from '../guards/leave-page.guard';
import { restaurantIdGuard } from './guards/restaurant-id.guard';
import { restaurantResover } from './resolvers/restaurant.resolver';*/

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-page/user-page.component').then(
        (m) => m.UserPageComponent
      ),
  },
  {
    path: 'me',
    loadComponent: () =>
      import('./user-page/user-page.component').then(
        (m) => m.UserPageComponent
      ),
  },
  {
    path: ':edit',
    loadComponent: () =>
      import('./user-edit-page/user-edit-page.component').then(
        (m) => m.UserEditPageComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./user-page/user-page.component').then(
        (m) => m.UserPageComponent
      ),
  }
];
