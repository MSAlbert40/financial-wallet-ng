import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthResponse, IAuthUser, IAuthUserRegister} from "../interfaces/auth-user";
import {Observable} from "rxjs";
import {MessageResponse} from "../interfaces/message-response";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // LogIn Service
  logIn(body: IAuthUser): Observable<MessageResponse<IAuthResponse>> {
    return this.http.post<MessageResponse<IAuthResponse>>(environment.apiURL + '/auth/login', body);
  }

  // SignUp Service
  signUp(body: IAuthUserRegister): Observable<MessageResponse<IAuthResponse>> {
    return this.http.post<MessageResponse<IAuthResponse>>(environment.apiURL + '/auth/signup', body);
  }

  loginUser(token: string, user: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', String(user));
    localStorage.removeItem('enterpriseID');
    localStorage.removeItem('enterpriseName');
    return true;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !(token === undefined || token === '' || token == null);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    return true;
  }

  getToken() { return localStorage.getItem('token'); }

  getUser() { return localStorage.getItem('id'); }
}
