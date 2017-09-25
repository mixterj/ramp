import { Component, Output, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-geo-chart',
  templateUrl: './geo-chart.component.html',
  styleUrls: ['./geo-chart.component.css']
})
export class GeoChartComponent implements OnInit {
    
  constructor(
          private http: HttpService,
          private parent: DashboardComponent
  ) { }
  apiBase = 'http://104.154.72.209:3075?service=run&';
  chartData = {};
  ready = false
  
  ngOnInit() {
      console.log('at geo comp')
      this.parent.dataReady = false;
      let url = this.apiBase + '&app=get_benchmarks&process=get_geo&id=' + this.parent.orgId + '&searchDate=*&wskey=msu';
      this.http.getJson(url).then(data => {
          console.log(data);
          this.chartData['chartType'] = 'GeoChart';
          this.chartData['options'] = "{'title': 'Clicks by Device'}"
          if (Object.keys(data).length > 0){
              this.chartData['dataTable'] = data;
              console.log(this.chartData);
          }
          else{
              this.chartData['error'] = 'Error No Data for this Date';
              console.log(this.chartData);
          }
          
      }).then(() =>{
          //this.parent.dataReady = true;   
          this.parent.runningGeo = false;   
          this.ready = true
      });      
  }

}
