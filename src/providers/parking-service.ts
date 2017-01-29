import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the ParkingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParkingService {

  private parking;
  private parkingSlot;

  constructor( public af : AngularFire) {
    console.log('Hello ParkingService Provider');
  }



  getBookingDuration(){
    let duration = [];
    for(let i = 1; i <= 10; i++){
      duration.push(i);
    }
    return duration;
  }

  getAllAreas(){
    return this.af.database.list('/parkingArea');
  }
  getAllSlots(){
    return this.af.database.list('/parkingSlots');
  }
  getSlotsOfSelectedArea(query){
    return this.af.database.list('/parkingSlots', {query : query});
  }

  setActiveParking(parking){
    this.parking  = parking;
  }

  getActiveParking(){
    return this.parking;
  }

  setActiveParkingSlot(parkingSlot){
    this.parkingSlot = parkingSlot;
  }
  getActiveParkingSlot(){
    return this.parkingSlot;
  }


  getBookingsForSelectedSlotAndDate(key): FirebaseListObservable<any>{
    return this.af.database.list('/Bookings', {query : {orderByChild: '_filterKey', equalTo: key}} )  
  }
  setBookingsForSelectedSlot(bookingObj, key){
    return this.af.database.list('/Bookings').push(bookingObj);  
  }
  removeBookings(id){
    this.af.database.list('/Bookings').remove(id);  
  }
  getAllBookings(): FirebaseListObservable<any>{
    return this.af.database.list('/Bookings');  
  }
  getBookingsForSelectedUser(userID): FirebaseListObservable<any>{
    return this.af.database.list('/Bookings', {query : {orderByChild: 'uid', equalTo: userID}} );
  }

}
