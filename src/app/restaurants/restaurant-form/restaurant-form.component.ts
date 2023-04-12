import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CanDeactivateComponent } from 'src/app/guards/leave-page.guard';
import { ArcgisMapComponent } from 'src/app/maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from 'src/app/maps/arcgis-marker/arcgis-marker.directive';
import { ArcgisSearchDirective } from 'src/app/maps/arcgis-search/arcgis-search.directive';
import { SearchResult } from 'src/app/maps/interfaces/search-result';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, OneCheckedDirective,ArcgisMapComponent,ArcgisMarkerDirective,ArcgisSearchDirective],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
})
export class RestaurantFormComponent implements CanDeactivateComponent,OnInit {
  daysOpen: boolean[] = new Array(7).fill(true);
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  newRestaurant: Restaurant;
  saved = false;
  @ViewChild('restaurantForm') restaurantForm!: NgForm;
  latitude=0;
  longitude=0;
  restaurant!:Restaurant;


  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly router: Router,
    private readonly route:ActivatedRoute

  ) {
    this.newRestaurant = this.resetRestaurant();
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => (this.restaurant = data['restaurant']));
    this.newRestaurant.name = this.restaurant.name;   //si cambias esto no furula
    this.newRestaurant.description = this.restaurant.description;
    this.newRestaurant.image = this.restaurant.image;
    this.newRestaurant.cuisine = this.restaurant.cuisine;
    this.newRestaurant.daysOpen = this.restaurant.daysOpen;
    this.newRestaurant.address = this.restaurant.address;
    this.newRestaurant.phone = this.restaurant.phone;
  }

  canDeactivate() {
    return this.saved || this.restaurantForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
  }

  resetRestaurant() {
    return {
      name: '',
      description: '',
      image: '',
      cuisine: '',
      daysOpen: [],
      address: '',
      phone: '',
      lat:0,
      lng:0
    };
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newRestaurant.image = reader.result as string;
    });
  }

  addRestaurant() {
    this.newRestaurant.daysOpen = this.daysOpen
      .map((open, i) => (open ? String(i) : ''))
      .filter((day) => day !== '');

    this.restaurantsService.create(this.newRestaurant).subscribe({
      next: () => {
        this.saved = true;
        this.router.navigate(['/restaurants']);
      },
      error: (error) => console.error(error),
    });
  }

  searchResult(result:SearchResult)
  {
    this.newRestaurant.address=result.address;
    this.newRestaurant.lat=result.latitude;
    this.newRestaurant.lng=result.longitude;
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
