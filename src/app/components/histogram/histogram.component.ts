import { Component, Output, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AppComponent } from '../../app.component';
import { Chart } from '../../models/chart';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {

    constructor(
            private http: HttpService,
            private app: AppComponent
    ) { }
    chartData = {};
    ready = false
    
    ngOnInit() {
        console.log('at hist comp')
        let url = this.app.apiBase + '&app=get_benchmarks&process=get_cumulative&id=' + this.app.orgId + '&searchDate=*&wskey='+this.app.credentials;
        console.log(url);
        this.http.getJson(url).then(data => {
            console.log(data.chart);
            this.chartData['chartType'] = 'ColumnChart';
            this.chartData['options'] = {};
            this.chartData['options']['title'] = "Clicks By Date";
            this.chartData['options']['keepAspectRatio'] = true;
            if (Object.keys(data).length > 0){
                this.chartData['dataTable'] = data.chart;
                console.log(this.chartData);
            }
            else{
                this.chartData['error'] = 'Error No Data for this Date';
                console.log(this.chartData);
            }
            
        }).then(() =>{ 
            this.app.runningHist = false;   
            this.ready = true
        });      
    }

  }
