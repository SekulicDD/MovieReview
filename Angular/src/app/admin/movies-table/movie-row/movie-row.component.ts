import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: '[app-movie-row]',
  templateUrl: './movie-row.component.html',
  styleUrls: ['./movie-row.component.css']
})
export class MovieRowComponent implements OnInit {

  constructor() { }

  @Input() movie: any;
  @Output() editEvent = new EventEmitter<number>();
  categories: string="";

  editEventEmit(value: number) {
    this.editEvent.emit(value);
  }

  ngOnInit(): void {
    this.extractCategories();
  }

  extractCategories(){
    this.movie.categories.forEach((cat:any)=>{
      this.categories+=cat.name+", ";
    })
    this.categories=this.categories.substring(0,this.categories.length-2);
  }



}
