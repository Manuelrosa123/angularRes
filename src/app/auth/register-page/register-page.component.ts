import { Component, ViewChild /*,OnInit */} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmailRepeatedDirective } from 'src/app/shared/validators/email-repeated.directive';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { /*User */} from '../interfaces/register';
import { GeolocationService } from '../services/geolocation.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'fs-register-page',
  standalone: true,
  imports: [CommonModule,RouterLink, EmailRepeatedDirective,FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  newRegister=this.resetRegister();
  saved = false;
  @ViewChild('registerForm') registerForm!: NgForm;
  email2="";


  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  canDeactivate() {
    return this.saved || this.registerForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
  }

  resetRegister() {
    return {
      name: '',
      email: '',
      password: '',
      lat: 0,
      lng: 0,
      avatar: '',
    };
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit():void{
    GeolocationService.getLocation().then(resp=>{
      this.newRegister.lat=resp.latitude;
      this.newRegister.lng=resp.longitude;
  })
}

  registerUser(){
    console.log(this.newRegister);
    this.authService.post(this.newRegister).subscribe({
      next: () => {
        this.saved = true;
        this.router.navigate(['/auth/login']);
      },
      error: (error) => console.error("error:" + error),
    })
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newRegister.avatar = reader.result as string;
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
