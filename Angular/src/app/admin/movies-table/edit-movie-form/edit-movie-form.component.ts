import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-movie-form',
  templateUrl: './edit-movie-form.component.html',
  styleUrls: ['./edit-movie-form.component.css']
})
export class EditMovieFormComponent implements OnInit {

  constructor() { }

  addMoreCounter:number=0;

  ngOnInit(): void {
  }

  addCat(){
    this.addMoreCounter++;
  }
}
