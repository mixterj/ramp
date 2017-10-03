import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../services/sign-in.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  wskey = '';
  constructor(
          private signIn: SignInService,
          private app: AppComponent
  ) { }

  ngOnInit() {
  }
  
  checkSignIn(){
      console.log('checking sign in');
      console.log(this.wskey);
      this.signIn.checkAuthorization(this.wskey).then(data =>{
          if(data.credentials.length > 0){
              console.log('it was tru');
              this.app.authorized = true;
              this.app.credentials = this.wskey
              this.app.signInError = false;
          }
          else{
              this.app.signInError = true;
              console.log('if was false');
          }
      })
  }

}
