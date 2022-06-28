import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api_url} from "../paths";
import {Category} from "../../models/Category";

@Injectable({
  providedIn: 'root'
})

export class CategoriesApiService {

  constructor(private http:HttpClient) { }

  getCategories(){
    const url=api_url.url+`/categories`;
    return this.http.get<Category[]>(url);
  }

}
