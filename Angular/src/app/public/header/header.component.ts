import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";
import {TokenService} from "../../services/auth/token.service";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {GetLoggedUser} from "../../actions/User.action";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentTheme:string="light";
  themeLight:boolean=true;

  constructor(@Inject(DOCUMENT) private document: Document,
              private tokenService:TokenService,
              private router: Router,
              private store: Store){
    this.loggedUser$=store.select(state=>state.users.loggedUser);
    this.document.body.classList.add(this.currentTheme);
  }

  loggedUser$:Observable<any>;

  ngOnInit(): void {
    this.store.dispatch(new GetLoggedUser());
    this.defaultTheme();
  }

  switchTheme(): void {
    if(this.currentTheme=="light"){
      this.document.body.classList.replace(this.currentTheme, "dark")
      this.currentTheme="dark";
    }
    else{
      this.document.body.classList.replace(this.currentTheme, "light")
      this.currentTheme="light";
    }
    localStorage.setItem("theme",this.currentTheme);
  }

  defaultTheme(){
    let tmp=localStorage.getItem("theme");
    if(tmp){
      this.document.body.classList.replace(this.currentTheme, tmp)
      this.currentTheme=tmp;
    }
  }

  logout(event:MouseEvent ){
    event.preventDefault();
    this.tokenService.removeToken();
    this.store.dispatch(new GetLoggedUser());
    this.router.navigateByUrl("/login");
  }


}
