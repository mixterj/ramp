import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RAMP';
  orgId = null;
  runningGeo = true;
  runningHist = true;
  authorized = false;
  credentials = null;
  signInError = false;
}
