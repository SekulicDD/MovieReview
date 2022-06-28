import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api_url} from "../paths";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordApiService {

  constructor(private http:HttpClient) { }

  getEmailByToken(token:string){
    const url=api_url.url+`/resetPasswordTable?token=${token}`;
    return this.http.get(url);
  }
}
