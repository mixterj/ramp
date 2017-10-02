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
    dailyData = {};
    runningGeo = true;
    runningHist = true;
    dailyReady = false;
    dailyFailed = false;
    runningDaily = false;
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
        this.runningDaily = true;
        this.dailyReady = false;
        this.dailyFailed = false;
        this.dailyData = {};
        let url = this.apiBase + '&app=get_daily_results&process=visualize&id=' + this.orgId + '&searchDate=' +  this.datepipe.transform(this.myDate, 'yyyy-MM-dd') + '&wskey=msu';
        this.http.getJson(url).then(data => {
            console.log(data);
            this.dailyData['chartType'] = 'PieChart';
            this.dailyData['options'] = {};
            this.dailyData['options']['title'] = 'Clicks by Device';
            this.dailyData['options']['height'] = 350;
            if (Object.keys(data).length > 0){
                this.dailyData['dataTable'] = data;
                console.log(this.dailyData);
            }
            else{
                this.dailyData['error'] = 'Error No Data for this Date';
                this.dailyFailed = true;
                console.log(this.dailyData);
            }
            
        }).then(() =>{
            this.dailyReady = true;
            console.log(this.dailyReady)
            this.runningDaily = false;
        });      
    }

    getDailyComp() {
        this.runningDaily = true;
        this.dailyReady = false;
        this.dailyFailed = false;
        this.dailyData = {};
        let url = this.apiBase + '&app=get_daily_results&process=comparison&id=' + this.orgId + '&searchDate=' +  this.datepipe.transform(this.myDate, 'yyyy-MM-dd') + '&wskey=msu';
        this.http.getJson(url).then(data => {
            console.log(data);
            this.dailyData['chartType'] = 'ColumnChart';
            this.dailyData['options'] = {};
            this.dailyData['options']['title'] = 'Downloads per IR';
            this.dailyData['options']['height'] = 350;
            if (Object.keys(data).length > 0){
                this.dailyData['dataTable'] = data;
                console.log(this.dailyData);
            }
            else{
                this.dailyData['error'] = 'Error No Data for this Date';
                this.dailyFailed = true;
                console.log(this.dailyData);
            }
            
        }).then(() =>{
            this.dailyReady = true;
            console.log(this.dailyReady)
            this.runningDaily = false;
        });      
    }
    
    updateGrid(): void {
        if (this.media.isActive('xl')) { this.cols = 4; this.gutterSize = '20px'; this.rowHeight = '400px';   }
        else if (this.media.isActive('lg')) { this.cols = 3; this.gutterSize = '20px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('md')) { this.cols = 2; this.gutterSize = '20px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('sm')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('xs')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
    }
    

}
