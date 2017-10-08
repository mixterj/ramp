import { Component, OnInit, Input } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { AppComponent } from "../../app.component";
import { Observable } from "rxjs/Observable";
import { ChartService, ChartSpec } from "../../services/chart.service";

@Component({
  selector: "app-chart-wrapper",
  templateUrl: "./chart-wrapper.component.html",
  styleUrls: ["./chart-wrapper.component.css"]
})
export class ChartWrapperComponent {
  @Input() chart: Observable<ChartSpec>;
  chartData?: any;

  constructor(private chartService: ChartService) {}
}
