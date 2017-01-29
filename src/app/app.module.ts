import { EmailerService } from './../providers/emailer.service';
import { UsersListPage } from './../pages/users-list/users-list';
import { ReviewsService } from './../providers/reviews-service';
import { ReviewsPage } from './../pages/reviews-page/reviews-page';
import { BookedSlotsPage } from './../pages/booked-slots/booked-slots';
import { BookingPage } from './../pages/booking-page/booking-page';
import { ParkingSlotComponent  } from './../components/parking-slot-component/parking-slot-component';
import { ParkingService } from './../providers/parking-service';
import { ParkingComponent } from './../components/parking-component/parking-component';
import { LandingPage } from './../pages/landing-page/landing-page';
import { AppCoreService } from './../providers/app-core-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfigs } from '../firebaseConfig';
import { StoreModule } from "@ngrx/store";
import { myAppReducer } from '../providers/RxStoreReducers';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    LandingPage,
    ParkingComponent,
    ParkingSlotComponent,
    BookingPage,
    BookedSlotsPage,
    ReviewsPage,
    UsersListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfigs),
    StoreModule.provideStore({appStore : myAppReducer})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    LandingPage,
    BookingPage,
    BookedSlotsPage,
    ReviewsPage,
    UsersListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AppCoreService, ParkingService, ReviewsService, EmailerService]
})
export class AppModule {}
