import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { AuthService } from '../services/auth/auth.service';
import {ResetPasswordApiService} from "../services/api/reset-password-api.service";


@Component({
  selector: 'app-reset-password-response',
  templateUrl: './reset-password-response.component.html',
  styleUrls: ['./reset-password-response.component.css']
})
export class ResetPasswordResponseComponent implements OnInit {

  constructor(private router: ActivatedRoute,
              private resetPasswordService: ResetPasswordApiService,
              private authService: AuthService) {
    router.queryParams.subscribe(params=>{
      this.token=params["token"];
      this.getEmail();
    })

  }

  token: string="";
  email: any;

  ngOnInit(): void {
  }

  private getEmail(){
    this.resetPasswordService.getEmailByToken(this.token).subscribe({
      next: data=>this.email=data,
      error: error=>console.log(error)
    });
    this.email=this.email?.email;
  }

  public changePassword(form:NgForm){
    this.authService.changePassword(form.value).subscribe({
      next: data=>console.log(data),
      error: error=>console.log(error)
    });
  }

}
