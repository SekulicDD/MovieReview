import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {api_url} from "../paths";
import {User} from "../../models/User";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http:HttpClient,private tokenService:TokenService) {}


  register(user:UserVer) {
    return this.http.post(api_url.url+'/auth/register', user);
  }

  login(user:UserVer) {
    return this.http.post<any>(api_url.url+'/auth/login', user);
  }

  userProfile(){
    const token = this.tokenService.getToken();
    if(token)
      return this.http.get<User>(api_url.url+'/auth/user-profile?token='+token);
    else return undefined;
  }

  resetPassword(data:UserVer){
    return this.http.post<any>(api_url.url+'/auth/reset-password', data);
  }

  changePassword(data:any){
    return this.http.post<any>(api_url.url+'/auth/change-password', data);
  }

}

export class UserVer {
  name!: string;
  email!: string;
  password!: string;
  password_confirmation!: string;
}
