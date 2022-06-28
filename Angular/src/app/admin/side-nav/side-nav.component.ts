import { Component, OnInit } from '@angular/core';
import {slideInOut} from "../../animations/animations";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations:[
    slideInOut
  ]
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  movieSub:boolean=true;
  categoriesSub:boolean=true;


}
