import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/register';
import { UserResponse, /*UsersResponse,*/ TokenResponse } from '../interfaces/responses';
import { UserLogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

   post(user: User): Observable<User> {
    return this.http
      .post<UserResponse>('auth/register', user)
      .pipe(map((r) => r.user));
  }

  postLogin(user:UserLogin): Observable<TokenResponse> {
    const resp = this.http.post<TokenResponse>(`auth/login`, user);
    return resp;
}
}
