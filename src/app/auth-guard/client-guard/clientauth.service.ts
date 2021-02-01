import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientauthService {
  constructor(private myRoute: Router) {}

  sendToken(token: string) {
    sessionStorage.setItem('C_AccessToken', token);
  }
  getToken() {
    return sessionStorage.getItem('C_AccessToken');
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    sessionStorage.clear();
    this.myRoute.navigate(['/client/signin']);
  }
}
