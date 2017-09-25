import { Component, OnInit, AfterViewInit, Input, Output} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { HomeComponent } from '../home/home.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { ObservableMedia } from "@angular/flex-layout";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    myDate: Date = new Date();
    apiBase = 'http://104.154.72.209:3075?service=run&';
    @Output() orgId = null;
    @Output() data = {};
    dataReady = false;
    runningGeo = true;
    runningHist = true;
    finished = false;
    cols: number = 0;
    rowHeight: string = '';
    gutterSize: string = '';
    
    constructor(
            private dataService: DataService,
            private route: ActivatedRoute,
            private http: HttpService,
            private datepipe: DatePipe,
            private media: ObservableMedia,
    ) { }
    
    organization = null;

    ngOnInit() {
        this.updateGrid();
        this.orgId = this.route.snapshot.paramMap.get('id');
        console.log(this.orgId)
        this.organization = this.dataService.getOrganizationData(this.orgId)
        console.log(this.organization)
    }
    
    updateDate(updatedDate) {
        this.myDate = updatedDate
    }
    
    ngAfterViewInit() {
        this.updateGrid();
        this.media.subscribe(change => { this.updateGrid(); });     
      }
    
    getDailyVisualization() {
        let url = this.apiBase + '&app=get_benchmarks&process=get_geo&id=' + this.orgId + '&searchDate=' +  this.datepipe.transform(this.myDate, 'yyyy-MM-dd') + '&wskey=msu';
        this.http.getJson(url).then(data => {
            console.log(data);
            this.data['chartType'] = 'GeoChart';
            this.data['options'] = "{'title': 'Clicks by Device'}"
            if (Object.keys(data).length > 0){
                this.data['dataTable'] = data;
                console.log(this.data);
            }
            else{
                this.data['error'] = 'Error No Data for this Date';
                console.log(this.data);
            }
            
        }).then(() =>{
            this.dataReady = true;    
        });      
    }
    
    getCumulativeVisualization() {
        let url = this.apiBase + '&app=get_benchmarks&process=get_geo&id=' + this.orgId + '&searchDate=' +  this.datepipe.transform(this.myDate, 'yyyy-MM-dd') + '&wskey=msu';
        this.http.getJson(url).then(data => {
            console.log(data);
            this.data['chartType'] = 'GeoChart';
            this.data['options'] = "{'title': 'Clicks by Device'}"
            if (Object.keys(data).length > 0){
                this.data['dataTable'] = data;
                console.log(this.data);
            }
            else{
                this.data['error'] = 'Error No Data for this Date';
                console.log(this.data);
            }
            
        }).then(() =>{
            this.dataReady = true;    
        });      
    }
    
    pieChartData =  {
            chartType: 'PieChart',
            dataTable: [
              ['Task', 'Hours per Day'],
              ['Work',     11],
              ['Eat',      2],
              ['Commute',  2],
              ['Watch TV', 2],
              ['Sleep',    7]
            ],
            options: {'title': 'Clicks by Device'},
          };
    
    updateGrid(): void {
        if (this.media.isActive('xl')) { this.cols = 4; this.gutterSize = '20px'; this.rowHeight = '400px';   }
        else if (this.media.isActive('lg')) { this.cols = 3; this.gutterSize = '20px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('md')) { this.cols = 2; this.gutterSize = '20px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('sm')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('xs')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
    }
    

    
    // individual date API calls:
    // http://104.154.72.209:3075?service=run&app=get_daily_results&process=visualize&id=montana&searchDate=2017-09-07&wskey=msu
    // http://104.154.72.209:3075?service=run&app=get_daily_results&process=comparison&id=montana&searchDate=2017-09-07&wskey=msu
    // http://104.154.72.209:3075/?service=run&app=get_daily_results&process=download_daily_stats&id=montana&searchDate=2017-09-07&wskey=msu
    
    // cumulative API calls:
    // http://104.154.72.209:3075?service=run&app=get_benchmarks&process=get_cumulative&id=montana&searchDate=2017-09-15&wskey=msu
    
    //http://104.154.72.209:3075?service=run&app=get_benchmarks&process=get_geo&id=montana&searchDate=2017-09-15&wskey=msu

}
