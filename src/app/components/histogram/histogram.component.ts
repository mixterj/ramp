import { Component, Output, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {

    constructor(
            private http: HttpService,
            private parent: DashboardComponent
    ) { }
    apiBase = 'http://104.154.72.209:3075?service=run&';
    chartData = {};
    ready = false
    
    ngOnInit() {
        console.log('at hist comp')
        this.parent.dataReady = false;
        let url = this.apiBase + '&app=get_benchmarks&process=get_cumulative&id=' + this.parent.orgId + '&searchDate=*&wskey=msu';
        console.log(url);
        this.http.getJson(url).then(data => {
            console.log(data.chart);
            this.chartData['chartType'] = 'ColumnChart';
            this.chartData['options'] = {};
            this.chartData['options']['title'] = "Clicks By Date";
            if (Object.keys(data).length > 0){
                this.chartData['dataTable'] = data.chart;
                console.log(this.chartData);
            }
            else{
                this.chartData['error'] = 'Error No Data for this Date';
                console.log(this.chartData);
            }
            
        }).then(() =>{
            //this.parent.dataReady = true;   
            this.parent.runningHist = false;   
            this.ready = true
        });      
    }

  }
