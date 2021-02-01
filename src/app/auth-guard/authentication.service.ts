import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  getBererToken() {
    const A_Token = sessionStorage.getItem('A_AccessToken');
    const C_Token = sessionStorage.getItem('C_AccessToken');
    const LoginUser = sessionStorage.getItem('Login_User');
    if (LoginUser === 'Client') {
      return C_Token;
    } else {
      return A_Token;
    }
  }
}
