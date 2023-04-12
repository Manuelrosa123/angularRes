import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'fs-restaurants-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RestaurantFormComponent,
    RestaurantCardComponent,
    RestaurantFilterPipe,
  ],
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
})
export class RestaurantsPageComponent implements OnInit {
  restaurants: Restaurant[] = [];
  onlyOpen = false;
  search = '';

  constructor(private readonly restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getAll().subscribe(
      restaurants => this.restaurants = restaurants
    );
  }

  deleteRestaurant(rest: Restaurant) {
    this.restaurants = this.restaurants.filter((r) => r !== rest);
  }
}
