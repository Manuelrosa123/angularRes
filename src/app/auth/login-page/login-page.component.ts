import { Component, ViewChild /*,OnInit */ } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import {/* UserLogin*/ } from '../interfaces/login';
import { GeolocationService } from '../services/geolocation.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'fs-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  newLogin=this.resetLogin();
  saved = false;
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

  }

  canDeactivate() {
    return (
      this.saved ||
      this.loginForm.pristine ||
      confirm('Do you really want to leave?. Changes will be lost')
    );
  }

  resetLogin() {
    return {
      email: '',
      password: '',
      lat: 0,
      lng: 0,
    };
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    GeolocationService.getLocation().then((resp) => {
      this.newLogin.lat = resp.latitude;
      this.newLogin.lng = resp.longitude;
    });
  }

  loginUser() {
    this.authService.postLogin(this.newLogin).subscribe({
      next: (res) => {
        this.saved = true;
        console.log(this.newLogin);
        localStorage.setItem('token', res.accessToken);
        this.router.navigate(['/restaurants']);
      },
      error: (error) => console.log(this.newLogin, 'error: ' + error),
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
