import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminauthService {
  // loggedIn() {   return !!(sessionStorage.getItem('A_AccessToken'));  }

  constructor(private myRoute: Router) {}

  sendToken(token: string) {
    sessionStorage.setItem('A_AccessToken', token);
  }
  getToken() {
    return sessionStorage.getItem('A_AccessToken');
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    sessionStorage.clear();
    this.myRoute.navigate(['/']);
  }
}
