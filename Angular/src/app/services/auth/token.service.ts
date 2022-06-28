import { Injectable } from '@angular/core';
import {api_url} from "../paths";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private issuer = {
    login: api_url.url+'/auth/login',
    register: api_url.url+'/auth/register',
  };

  constructor() { }

  setToken(token: any) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  getUserId(){
    return this.payload(this.getToken()).sub;
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    }
    return false;
  }

  isLoggedIn() {
    return this.isValidToken();
  }

  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
