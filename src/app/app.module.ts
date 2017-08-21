import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-strategy';
import { HttpModule } from '@angular/http';
import { ObservableMedia, FlexLayoutModule} from "@angular/flex-layout";

import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ErrorComponent } from './components/error/error.component';

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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FlexLayoutModule
  ],
  providers: [HttpService, DataService, Title, {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
