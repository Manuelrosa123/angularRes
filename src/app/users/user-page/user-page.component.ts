import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/auth/interfaces/register';
import { UserService } from '../services/user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ArcgisMapComponent } from 'src/app/maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from 'src/app/maps/arcgis-marker/arcgis-marker.directive';

@Component({
  selector: 'fs-user-page',
  standalone: true,
  imports: [CommonModule,ArcgisMapComponent,ArcgisMarkerDirective],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
    user!: User;

    constructor(
      private readonly userService: UserService,
      private readonly router: Router,
      private readonly route:ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.userService.getUserMe().subscribe((r)=>this.user = r);
      this.route.data.subscribe((data)=>this.user=data['user']);
    }

    edit(){
      this.router.navigate(['users/edit']);
    }
}
