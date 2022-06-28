import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api_url} from "../paths";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http:HttpClient) { }

  getUsersCount(){
    const url=api_url.url+`/users-count`;
    return this.http.get<number>(url);
  }

}
