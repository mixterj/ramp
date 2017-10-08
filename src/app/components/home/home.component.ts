import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { ObservableMedia } from "@angular/flex-layout";
import { SignInService } from '../../services/sign-in.service';
import { ChartService, ChartSpec } from '../../services/chart.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    geoChart: Observable<ChartSpec>;

  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private httpService: HttpService,
          private dataService: DataService,
          private titleService: Title,
          private media: ObservableMedia,
          private app: AppComponent,
          private signIn: SignInService,
          private chartService: ChartService
  ) { }
  
  organizations = null;
  results = null;
  cols: number = 0;
  rowHeight: string = '';
  gutterSize: string = '';

  ngOnInit() {
      this.updateGrid();
      this.app.runningGeo = true;
      this.organizations =  this.dataService.getOrganizationsList()
      console.log(this.organizations)
      console.log(this.signIn.signInError)
      this.app.orgId = '*'
      this.geoChart = this.chartService.geoChart("*", this.app.orgId);

     
  }
  showDashboard(orgId) {
      this.router.navigate(['/dashboard/'+orgId]);
  }

  
  ngAfterViewInit() {
      this.updateGrid();
      this.media.subscribe(change => { this.updateGrid(); });  
    }
  
  updateGrid(): void {
      if (this.media.isActive('xl')) { this.cols = 4; this.gutterSize = '20px'; this.rowHeight = '400px';   }
      else if (this.media.isActive('lg')) { this.cols = 3; this.gutterSize = '20px'; this.rowHeight = '400px'; }
      else if (this.media.isActive('md')) { this.cols = 2; this.gutterSize = '20px'; this.rowHeight = '400px'; }
      else if (this.media.isActive('sm')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
      else if (this.media.isActive('xs')) { this.cols = 1; this.gutterSize = '10px'; this.rowHeight = '400px'; }
  }

}
