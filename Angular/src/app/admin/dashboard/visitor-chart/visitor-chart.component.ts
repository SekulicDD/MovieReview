import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions,ChartType } from 'chart.js';
import {VisitorsApiService} from "../../../services/api/visitors-api.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {GetVisitorsLastMonth} from "../../../actions/Visitor.action";

@Component({
  selector: 'app-visitor-chart',
  templateUrl: './visitor-chart.component.html',
  styleUrls: ['./visitor-chart.component.css']
})
export class VisitorChartComponent implements OnInit {

  constructor(private visitorsApiService: VisitorsApiService,private store:Store) {
    this.store.select(state=>state.visitors.visitors)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: data => {
          if(data)
            this.handleVisitor(data)},
        error : err=> console.log(err)
      });
  }

  private ngUnsubscribe = new Subject<void>();

  visitorsMonth:number[]=[];
  selectedValue:string="7";
  labels=[];


  type:ChartType="bar";

  chartData: ChartDataset[] = [];
  lineChartLabels = [];

  lineChartLegend = false;
  options:ChartOptions={
    responsive:true,
    backgroundColor:"#82aab4",
  }

  ngOnInit(): void {
    this.store.dispatch(new GetVisitorsLastMonth());
  }

  private handleVisitor(data:any){
    this.visitorsMonth = data.map((x:any) => x.total);
    this.labels=data.map((x:any)=>x.date);
    this.setChartData();
  }

  setChartData(){
    let tmpData=this.visitorsMonth;
    let tmpLabels=this.labels;
    if(this.selectedValue=="7") {
      tmpData = tmpData.slice(0, 7);
      tmpLabels=tmpLabels.slice(0,7);
    }
    this.chartData=[
      {data:tmpData,label: 'Daily users',hoverBackgroundColor: "#17A2B8"}
    ]
    this.lineChartLabels=tmpLabels;
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
