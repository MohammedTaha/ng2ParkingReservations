
import { AppCoreService } from './../../providers/app-core-service';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  activeView:String;

  constructor(public navCtrl: NavController, public appCoreService : AppCoreService) {
    this.activeView = 'SignInView';
  }
  showSignIn() : void {
    this.activeView = 'SignInView';
  }
  showSignUp() : void {
    this.activeView = 'SignUpView';
  }



  doSignIn(user){
    if(!user.email || !user.password ){
      return false;
    }
    this.appCoreService.doSigninForUser(user);
    return false;
  }



  doSignUp(user){

    if(user.Password && user.ReconfirmedPassword && (user.Password != user.ReconfirmedPassword)){
      return false;
    }
    this.appCoreService.doSignupForUser({email : user.Email, password : user.Password}, user);
    return false;
  }

}
