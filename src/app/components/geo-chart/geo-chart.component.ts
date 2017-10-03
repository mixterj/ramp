import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-geo-chart',
  templateUrl: './geo-chart.component.html',
  styleUrls: ['./geo-chart.component.css']
})
export class GeoChartComponent implements OnInit {
    
  constructor(
          private http: HttpService,
          private app: AppComponent
  ) { }
  apiBase = 'http://104.154.72.209:3075?service=run&';
  chartData = {};
  ready = false
  orgId = '*';
  
  ngOnInit() {
      console.log('at geo comp');
      let url = this.apiBase + '&app=get_benchmarks&process=get_geo&id=' + this.app.orgId + '&searchDate=*&wskey=' +this.app.credentials;
      this.http.getJson(url).then(data => {
          console.log(data);
          this.chartData['chartType'] = 'GeoChart';
          this.chartData['options'] = {};
          this.chartData['options']['colorAxis'] = {'colors': ['#EBF5FB','#AED6F1', '#2E86C1', '#1B4F72']};
          if (Object.keys(data).length > 0){
              this.chartData['dataTable'] = data;
              console.log(this.chartData);
          }
          else{
              this.chartData['error'] = 'Error No Data for this Date';
              console.log(this.chartData);
          }
          
      }).then(() =>{
          this.app.runningGeo = false;   
          this.ready = true
      });      
  }

}
