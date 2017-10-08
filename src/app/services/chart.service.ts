import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { DatePipe } from "@angular/common";
import { Injectable } from '@angular/core';
import { SignInService } from "./sign-in.service";

export interface ChartSpec {
  chartType: string;
  options: {};
  dataTable: any;
  error: any;
}

let makeChartSpec = (chartType, options): ChartSpec => {
  return {
    chartType,
    options,
    dataTable: null,
    error: null
  };
};

let identity = x => x;

@Injectable()
export class ChartService {
  constructor(
    private http: HttpClient,
    private app: AppComponent,
    private datePipe: DatePipe,
    private signIn: SignInService
  ) {}

  fetchChart(url: string, chartSpec: ChartSpec, mapData = identity) {
    return this.http.get(url).map(data => {
      console.log(data);
      if (Object.keys(data).length > 0) {
        chartSpec.dataTable = mapData(data);
        console.log(chartSpec);
      } else {
        chartSpec.error = "Error No Data for this Date";
        console.log(chartSpec);
      }

      return chartSpec;
    });
  }

  geoChart(date = "*", orgId) {
    let url =
      this.app.apiBase +
      "&app=get_benchmarks&process=get_geo&id=" +
      orgId +
      "&searchDate=" +
      date +
      "&wskey=" +
      this.signIn.credentials;
    let chartSpec = makeChartSpec("GeoChart", {
      colorAxis: {
        colors: ["#EBF5FB", "#AED6F1", "#2E86C1", "#1B4F72"]
      }
    });
    return this.fetchChart(url, chartSpec);
  }

  dailyComp(date, orgId) {
    let url =
      this.app.apiBase +
      "&app=get_daily_results&process=comparison&id=" +
      orgId +
      "&searchDate=" +
      this.datePipe.transform(date, "yyyy-MM-dd") +
      "&wskey=" +
      this.signIn.credentials;
    let chartSpec = makeChartSpec("ColumnChart", {
      title: "Downloads per IR",
      height: 350
    });
    return this.fetchChart(url, chartSpec);
  }

  dailyVisualization(date, orgId) {
    let url =
      this.app.apiBase +
      "&app=get_daily_results&process=visualize&id=" +
      orgId +
      "&searchDate=" +
      this.datePipe.transform(date, "yyyy-MM-dd") +
      "&wskey=" +
      this.signIn.credentials;
    let chartSpec = makeChartSpec(
      "PieChart",
      { title: "Clicks by Device", height: 350 },
    );
    return this.fetchChart(url, chartSpec);
  }

  histogram(date, orgId) {
    let url =
      this.app.apiBase +
      "&app=get_benchmarks&process=get_cumulative&id=" +
      orgId +
      "&searchDate=*&wskey=" +
      this.signIn.credentials;
    let chartSpec = makeChartSpec(
      "ColumnChart",
      { title: "Clicks by Date", keepAspectRatio: true },
    );
    return this.fetchChart(url, chartSpec, (data) => data.chart);
  }
}
