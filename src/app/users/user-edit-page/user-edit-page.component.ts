import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'fs-user-edit-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css']
})
export class UserEditPageComponent {

  @ViewChild('editName') editName!: NgForm;
  @ViewChild('editPass') editPass!: NgForm;

  name!:string;
  email!:string;
  password!:string;
  password2!:string;

  constructor(
    private readonly userService:UserService,
    private readonly router: Router
  ) {}

  editNameEvent()
  {
    this.userService.editName(this.name,this.email).subscribe(()=>{
      this.router.navigate(['users/me']);
    });
  }

  editPasswordEvent()
  {
    this.userService.editPassword(this.password).subscribe(()=>{
      this.router.navigate(['users/me']);
    });
  }

  editPhotoEvent()
  {
    this.userService.editPhoto((document.getElementById("photo") as HTMLImageElement).src).subscribe(()=>{
      this.router.navigate(['users/me']);
    });
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      (document.getElementById('photo') as HTMLInputElement).src = reader.result as string;
    });
  }
}
