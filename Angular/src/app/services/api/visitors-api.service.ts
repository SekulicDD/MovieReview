import { Injectable } from '@angular/core';
import {api_url} from "../paths";
import {HttpClient} from "@angular/common/http";
import {Visitor} from "../../models/Visitor";

@Injectable({
  providedIn: 'root'
})
export class VisitorsApiService {

  constructor(private http:HttpClient) { }

  getVisitorsLastMonth(){
    const url=api_url.url+`/visitors-month`;
    return this.http.get<Visitor[]>(url);
  }

  getYearlyVisitors(){
    const url=api_url.url+`/visitors-yearly`;
    return this.http.get<Visitor[]>(url);
  }
}
