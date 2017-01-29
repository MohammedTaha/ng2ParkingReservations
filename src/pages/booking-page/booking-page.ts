import { EmailerService } from './../../providers/emailer.service';
import { reducerActionTypes } from './../../providers/RxStoreReducers';
import { Page1 } from './../page1/page1';
import { Observable } from 'rxjs';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { AppCoreService } from './../../providers/app-core-service';
import { ParkingService } from './../../providers/parking-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {Store} from "@ngrx/store"

/*
  Generated class for the BookingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'booking-page',
  templateUrl: 'booking-page.html'
})
export class BookingPage {

  activeParkingArea;
  activeParkingSlot;
  bookingDuration;
  alreadyPerformedBookings : FirebaseListObservable<any>;
  loader;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public parkingService: ParkingService, 
    public appCoreService : AppCoreService,
    public loadingCtrl: LoadingController,
    public store : Store<any>,
    public af : AngularFire,
    public emailerService : EmailerService
  ) {
    this.activeParkingArea = this.parkingService.getActiveParking();
    this.activeParkingSlot = this.parkingService.getActiveParkingSlot();
    this.bookingDuration   = this.parkingService.getBookingDuration();
    this.alreadyPerformedBookings = Observable.create();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPagePage');
  }


  bookSelectedSlot(eve, form){
    eve.preventDefault();

    if(!form.bookingDate || !form.bookingStartTime || !form.bookingDuration){
      return false;
    }
    
    this.loader = this.loadingCtrl.create({content: 'Please wait...'});
    this.loader.present();

    let bookingDate         = new Date(form.bookingDate);
    let completeBookingDate = new Date(form.bookingDate);
    let bookingStartTime    = parseInt(form.bookingStartTime);
    let bookingDuration     = parseInt(form.bookingDuration);

    let bookingStartDT      = new Date(completeBookingDate);
    bookingStartDT.setHours(bookingStartTime);
    
    let bookingEndDT        = new Date(completeBookingDate);
    bookingEndDT.setHours(bookingStartTime + bookingDuration);
    

    let loggedInUser = this.appCoreService.loggedInUser.user;
    let key = (this.activeParkingSlot.$key  + '-' + bookingDate.getTime());
    let bookingObj = {
      _filterKey    : key,
      _bookingDate  : bookingDate.toDateString(),
      uid       : loggedInUser.uid,
      UserName  : loggedInUser.FirstName + " " + loggedInUser.LastName,
      AreaID    : this.activeParkingSlot.AreaID,
      SlotID    : this.activeParkingSlot.$key,
      AreaName  : this.activeParkingArea.Name,
      SlotName  : this.activeParkingSlot.Name,
      BookingStartDT  : bookingStartDT.getTime(),
      BookingEndDT    : bookingEndDT.getTime(),
      TS        : bookingDate.getTime(),
    };

    this.fetchDataToValidateSlotBooking(bookingDate, bookingObj, key);
  }

  fetchDataToValidateSlotBooking(date:Date, bookingObj:any, key:String){

    let query = this.parkingService.getBookingsForSelectedSlotAndDate(key)
      .subscribe( list =>{
          query.unsubscribe();
          if(list && list.length){
            console.log("list ", list);
            let validations = this.validateBookings(list, bookingObj)
            if(!validations.status){
                this.loader.dismiss();
                this.appCoreService.showErrorMessage(validations.message);
            } else {
              this.finalizeSlotBooking(bookingObj, key);  
             // this.emailerService.sendEmail({});
            }
          } else {
            this.finalizeSlotBooking(bookingObj, key);
           // this.emailerService.sendEmail({});
          }
      });
  }


  finalizeSlotBooking(bookingObj:any, key:String){
    this.parkingService.setBookingsForSelectedSlot(bookingObj, key)
    .then(() => {
      this.loader.dismiss();
      alert('Slot booked succesfully.');
      this.navCtrl.pop();
    });
    
  }

  validateBookings (bookings, currentBooking) : {status : Boolean, message: String}{
    
    let alreadyPerformedBooking;
    let currentSt = new Date(currentBooking.BookingStartDT);
    let currentEnd = new Date(currentBooking.BookingEndDT);
    for( let i = 0; i < bookings.length ; i++){
      if(bookings[i].BookingStartDT && bookings[i].BookingEndDT){
          let stDate = new Date(bookings[i].BookingStartDT);
          let enDate =  new Date(bookings[i].BookingEndDT);

          if(stDate >= currentSt && enDate <= currentSt){
            alreadyPerformedBooking = bookings[i];
          } else if (stDate <= currentEnd && enDate >= currentEnd){
            alreadyPerformedBooking = bookings[i];
          }

          if(alreadyPerformedBooking){
            break;
          }
      }
    }

    if(alreadyPerformedBooking){
      return {status : false, message : 'Slot already reserved by ' + alreadyPerformedBooking.UserName + ' from ' + new Date(alreadyPerformedBooking.BookingStartDT).toLocaleString() + ' to ' + new Date(alreadyPerformedBooking.BookingEndDT).toLocaleString() };
    } 
    return {status : true, message : ""};

  }
  


  logoutUser(){
    this.af.auth.logout();
    this.store.dispatch({type : reducerActionTypes.SIGN_OUT, payload : null});
    this.navCtrl.setRoot( Page1 ) ;
  }
}
