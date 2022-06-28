import { Component, OnInit } from '@angular/core';
import  {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {TokenService} from "../../services/auth/token.service";
import {GetLoggedUser} from "../../actions/User.action";
import {Store} from "@ngxs/store";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {



  constructor(private authService:AuthService,
              private  tokenService:TokenService,
              private router:Router,
              private store:Store) {
  }


  errorsRegister:any;
  errorsLogin:any;
  success:any;

  userId:number=0;

  ngOnInit(): void {
  }

  handleResponse(data:any){
    this.errorsLogin=null;
    this.errorsRegister=null;

    this.tokenService.setToken(data.access_token);
    this.store.dispatch(new GetLoggedUser());

    this.userId=this.tokenService.getUserId();
    this.router.navigateByUrl("/profile/"+this.userId);
  }

  handleErrorRegister(data:any){
    this.errorsRegister=JSON.parse(data.error);
  }

  register(form:NgForm){
    this.authService.register(form.value)
      .subscribe({
        next: data=>this.success=data,
        error: error=>this.handleErrorRegister(error)
    });

  }

  login(form:NgForm){
    this.authService.login(form.value)
      .subscribe({
        next: data=>this.handleResponse(data),
        error: error=>this.handleErrorLogin(error)
      })
  }

  handleErrorLogin(data:any){
    this.errorsLogin=data.error;
  }


}
