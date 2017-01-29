import { ParkingService } from './../../providers/parking-service';
import { User } from './../../models/User';
import { AppCoreService } from './../../providers/app-core-service';
import { Page1 } from './../page1/page1';
import { reducerActionTypes } from './../../providers/RxStoreReducers';
import { Store } from '@ngrx/store';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'landing-page',
  templateUrl: 'landing-page.html'
})
export class LandingPage  {

  appStore : Observable <any>;
  loggedInUser : Observable<User>;
  parkings :  FirebaseListObservable <any>;
  selectedParking : any;
  parkingSlots : FirebaseListObservable <any>;
  parkingSlotsLoaded : Boolean;

  

  constructor(
    public navCtrl: NavController, 
    public af : AngularFire, 
    public store : Store<any>, 
    public appCoreService : AppCoreService,
    public parkingService : ParkingService
  ) {
     this.parkingSlotsLoaded = false;
     this.appStore = this.store.select('appStore');
     this.loggedInUser = Observable.create();
     this.initObservables();
  }

  ionViewDidLoad() {}



  parkingAreaSelected(parking){

    this.parkingSlotsLoaded = false;
    this.selectedParking = parking;
    this.parkingSlots = this.parkingService.getSlotsOfSelectedArea({orderByChild: 'AreaID', equalTo: parking.$key}); 
    this.parkingSlots.subscribe( slot => {
      this.parkingSlotsLoaded = true;
    });
  }


  initObservables(){

    this.parkings = this.parkingService.getAllAreas();
    this.appStore.subscribe( payload => {
      if( payload && payload.user){
        this.loggedInUser = payload.user;        
        this.store.dispatch({type : reducerActionTypes.CONSTRUCT_MENU, payload : payload.user.UserType});
      }
    });
  }

  logoutUser(){
    this.af.auth.logout();
    this.store.dispatch({type : reducerActionTypes.SIGN_OUT, payload : null});
    this.navCtrl.setRoot( Page1 ) ;
  }

}
