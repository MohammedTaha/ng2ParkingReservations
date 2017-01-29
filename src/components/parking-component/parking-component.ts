import { ParkingService } from './../../providers/parking-service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the ParkingComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'parking-component',
  templateUrl: 'parking-component.html'
})
export class ParkingComponent {
  @Input() parking;
  @Output() parkingAreaSelected = new EventEmitter();
  //parkingSlots : FirebaseListObservable<any>;
  counter = 0;

  constructor( public parkingService : ParkingService) {
  
  }

  selectParking(parking){
    this.parkingService.setActiveParking(parking);
    this.parkingAreaSelected.emit(parking);
  }
}
