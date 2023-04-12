import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

export const restaurantResover: ResolveFn<Restaurant> = (route, state) => {
  return inject(RestaurantsService)
    .getById(+route.params['id'])
    .pipe(
      catchError((error) => {
        inject(Router).navigate(['/restaurants']);
        return EMPTY;
      })
    );
};
