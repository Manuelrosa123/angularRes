import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { /*RouterLink, RouterLinkActive,*/ RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'fs-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FoodScore';
}
