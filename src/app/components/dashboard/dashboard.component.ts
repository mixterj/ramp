import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { HomeComponent } from '../home/home.component';
import { ChartWrapperComponent } from "../chart-wrapper/chart-wrapper.component";
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { ObservableMedia } from "@angular/flex-layout";
import { ChartService, ChartSpec } from '../../services/chart.service';
import { SignInService } from '../../services/sign-in.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    dailyCompChart: Observable<ChartSpec>;
    dailyChart: Observable<ChartSpec>;
    histChart: Observable<ChartSpec>;
    geoChart: Observable<ChartSpec>;
    myDate: Date = new Date();
    dailyData = {};
    cols: number = 0;
    rowHeight: string = '';
    gutterSize: string = '';
    constructor(
            private chartService: ChartService,
            private dataService: DataService,
            private route: ActivatedRoute,
            private http: HttpService,
            private datepipe: DatePipe,
            private media: ObservableMedia,
            private app: AppComponent,
            private signIn: SignInService
    ) { }
    
    organization = null;

    ngOnInit() {
        this.updateGrid();
        this.app.orgId = this.route.snapshot.paramMap.get('id');
        this.app.runningGeo = true;
        console.log(this.app.orgId)
        this.organization = this.dataService.getOrganizationData(this.app.orgId)
        console.log(this.organization)
        this.geoChart = this.chartService.geoChart('*', this.app.orgId);
        this.histChart = this.chartService.histogram('*', this.app.orgId);
    }

    updateDate(updatedDate) {
        this.myDate = updatedDate
    }
    
    ngAfterViewInit() {
        this.updateGrid();
        this.media.subscribe(change => { this.updateGrid(); });     
      }
    
    getDailyVisualization() {
        this.dailyChart = this.chartService.dailyVisualization(this.myDate, this.app.orgId);
    }

    getDailyComp() {
        this.dailyCompChart = this.chartService.dailyComp(this.myDate, this.app.orgId);
    }
    
    downloadData() {
      let url = this.app.apiBase + '&app=get_daily_results&process=download_daily_stats&id=' + this.app.orgId + '&searchDate=' + this.datepipe.transform(this.myDate, 'yyyy-MM-dd') +'&wskey=' +this.signIn.credentials
          window.open(url, "_blank");
    }
    
    updateGrid(): void {
        if (this.media.isActive('xl')) { this.cols = 4; this.gutterSize = '20px'; this.rowHeight = '400px';   }
        else if (this.media.isActive('lg')) { this.cols = 3; this.gutterSize = '20px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('md')) { this.cols = 2; this.gutterSize = '20px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('sm')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
        else if (this.media.isActive('xs')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
    }
    

}
