import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  RestaurantResponse,
  RestaurantsResponse,
} from '../interfaces/responses';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Restaurant[]> {
    return this.http
      .get<RestaurantsResponse>('restaurants')
      .pipe(map((r) => r.restaurants));
  }

  getById(id: number): Observable<Restaurant> {
    return this.http
      .get<RestaurantResponse>(`restaurants/${id}`)
      .pipe(map((r) => r.restaurant));
  }

  create(restaurant: Restaurant): Observable<Restaurant> {
    return this.http
      .post<RestaurantResponse>('restaurants', restaurant)
      .pipe(map((r) => r.restaurant));
  }

  delete(id: number): Observable<void> {
    console.log(id);
    return this.http.delete<void>(`restaurants/${id}`).pipe();
  }
}
