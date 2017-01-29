import { ParkingService } from './../../providers/parking-service';
import { BookingPage } from './../../pages/booking-page/booking-page';
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
/*
  Generated class for the ParkingSlotComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'parking-slot-component',
  templateUrl: 'parking-slot-component.html'
})
export class ParkingSlotComponent {

  @Input() parkingSlot;

  constructor(public navCtrl: NavController, public parkingService: ParkingService) {
    console.log('Hello ParkingSlotComponent Component');
    //this.text = 'Hello World';
  }

  selectParkingSlot(parkingSlot){
    console.log(" parkingSlot " , parkingSlot);
    this.parkingService.setActiveParkingSlot(parkingSlot);
    this.navCtrl.push( BookingPage );
  }

}
