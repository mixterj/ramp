import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
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
import { HttpClientModule } from '@angular/common/http';
import { ObservableMedia, FlexLayoutModule} from "@angular/flex-layout";
import { DatePipe } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FormsModule } from '@angular/forms';


import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';
import { SignInService } from './services/sign-in.service';
import { ChartService } from './services/chart.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ErrorComponent } from './components/error/error.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';

const appRoutes: Routes = [
   { path: '', redirectTo: 'organization', pathMatch: 'full' },
   { path: 'sign_in', component: SignInComponent },
   { path: 'organization', canActivate: [AuthGuardService], component: HomeComponent },
   { path: 'dashboard/:id', canActivate: [AuthGuardService], component: DashboardComponent },
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
    ChartWrapperComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
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
    HttpClientModule,
    HttpModule,
    FlexLayoutModule
  ],
  providers: [SignInService, AppComponent, AuthGuardService, HttpService, ChartService, DataService, Title, {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
