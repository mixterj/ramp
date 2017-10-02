import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-strategy';
import { HttpModule } from '@angular/http';
import { ObservableMedia, FlexLayoutModule} from "@angular/flex-layout";
import { DatePipe } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ErrorComponent } from './components/error/error.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { GeoChartComponent } from './components/geo-chart/geo-chart.component';
import { HistogramComponent } from './components/histogram/histogram.component';

const appRoutes: Routes = [
   { path: '', redirectTo: 'organization', pathMatch: 'full' },
   { path: 'organization', component: HomeComponent },
   { path: 'dashboard/:id', component: DashboardComponent },
   { path: '**', component: ErrorComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SignInComponent,
    ErrorComponent,
    DatePickerComponent,
    GeoChartComponent,
    HistogramComponent
  ],
  imports: [
    BrowserModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    Ng2GoogleChartsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FlexLayoutModule
  ],
  providers: [HttpService, DataService, Title, {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
