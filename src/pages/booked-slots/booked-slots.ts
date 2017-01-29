import { Page1 } from './../page1/page1';
import { reducerActionTypes } from './../../providers/RxStoreReducers';
import { Store } from '@ngrx/store';
import { AppCoreService } from './../../providers/app-core-service';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { ParkingService } from './../../providers/parking-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the BookedSlots page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-booked-slots',
  templateUrl: 'booked-slots.html'
})
export class BookedSlotsPage {

  list:FirebaseListObservable<any>;
  loggedInUserType:String;
  itemToPrint:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public parkingService : ParkingService, 
    public appCoreService: AppCoreService,
    public af : AngularFire,
    public store : Store<any>
  ) {
    
    if(this.appCoreService.loggedInUser && this.appCoreService.loggedInUser.user){
      this.loggedInUserType = this.appCoreService.loggedInUser.user.UserType;      
      if(this.appCoreService.loggedInUser.user.UserType == 'Normal User'){
        this.list = this.parkingService.getBookingsForSelectedUser(this.appCoreService.loggedInUser.user.uid)
      } else {
        this.list = this.parkingService.getAllBookings()
      }
    }
    this.itemToPrint = {};
  }


  getDate(dt){
    return new Date(dt).toLocaleString();
  }
  cancelThisBooking(bookingID){
    this.parkingService.removeBookings(bookingID)
  }
  printThisBooking(item){
    this.itemToPrint = item;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookedSlotsPage');
  }

  logoutUser(){
    this.af.auth.logout();
    this.store.dispatch({type : reducerActionTypes.SIGN_OUT, payload : null});
    this.navCtrl.setRoot( Page1 ) ;
  }
}
