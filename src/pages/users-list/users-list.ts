import { AppCoreService } from './../../providers/app-core-service';
import { Page1 } from './../page1/page1';
import { reducerActionTypes } from './../../providers/RxStoreReducers';
import { Store } from '@ngrx/store';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

/*
  Generated class for the UsersList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html'
})
export class UsersListPage {
  list : FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public af : AngularFire, public store : Store<any>, public appCoreService:AppCoreService) {
    this.list = this.appCoreService.getAllUsersFromFB();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersListPage');
  }



  logoutUser(){
    this.af.auth.logout();
    this.store.dispatch({type : reducerActionTypes.SIGN_OUT, payload : null});
    this.navCtrl.setRoot( Page1 ) ;
  }
}
