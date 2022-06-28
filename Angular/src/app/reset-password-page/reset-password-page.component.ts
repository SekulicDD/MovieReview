import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  success:any;
  errors:any;

  resetPassword(form:NgForm){
    this.authService.resetPassword(form.value).subscribe({
      next: data=>this.handleResponse(data),
      error: error=>this.handleError(error),
    });
  }

  handleResponse(data:any){
    this.success = data;
  }

  handleError(data:any){
    this.errors = data.error;
  }

}
