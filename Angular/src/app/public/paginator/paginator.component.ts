import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() itemPerPage: number = 0;
  @Input() total: number = 0;
  @Input() getPage:(page:number) => any = ()=> console.log("test");

}
