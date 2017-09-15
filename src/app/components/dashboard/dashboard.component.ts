import { Component, OnInit, AfterViewInit, Input, Output} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { HomeComponent } from '../home/home.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    myDate: Date = new Date();
    apiBase = 'http://104.154.72.209:3075?service=run&';
    orgId = null;
    data = null;
    
    constructor(
            private dataService: DataService,
            private route: ActivatedRoute,
            private http: HttpService,
            private datepipe: DatePipe
    ) { }
    
    organization = null;

    ngOnInit() {
        this.orgId = this.route.snapshot.paramMap.get('id');
        console.log(this.orgId)
        this.organization = this.dataService.getOrganizationData(this.orgId)
        console.log(this.organization)
    }
    
    updateDate(updatedDate) {
        this.myDate = updatedDate
    }
    
    getDailyVisualization() {
        let url = this.apiBase + '&app=get_daily_results&process=visualize&id=' + this.orgId + '&searchDate=' +  this.datepipe.transform(this.myDate, 'yyyy-MM-dd') + '&wskey=msu';
        this.http.getJson(url).then(data => {
            console.log(data);
            if (Object.keys(data).length > 0){
                this.data = data;
                console.log(this.data);
            }
            else{
                this.data = 'Error No Data for this Date';
                console.log(this.data);
            }
            
        });      
    }
    
   pie_ChartOptions = {
            title: 'My Daily Activities',
            width: 900,
            height: 500
        };
    
    // individual date API calls
    // http://104.154.72.209:3075?service=run&app=get_daily_results&process=visualize&id=montana&searchDate=2017-09-07&wskey=msu
    // http://104.154.72.209:3075?service=run&app=get_daily_results&process=comparison&id=montana&searchDate=2017-09-07&wskey=msu
    // http://104.154.72.209:3075/?service=run&app=get_daily_results&process=download_daily_stats&id=montana&searchDate=2017-09-07&wskey=msu
    
    // cumulative API calls
    // http://104.154.72.209:3075?service=run&app=get_benchmarks&process=get_cumulative&id=montana&searchDate=2017-09-15&wskey=msu
    
    //http://104.154.72.209:3075?service=run&app=get_benchmarks&process=get_geo&id=montana&searchDate=2017-09-15&wskey=msu

}
