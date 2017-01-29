import { UsersListPage } from './../pages/users-list/users-list';
import { ReviewsPage } from './../pages/reviews-page/reviews-page';
import { BookedSlotsPage } from './../pages/booked-slots/booked-slots';
import { reducerActionTypes } from './../providers/RxStoreReducers';
import { LandingPage } from './../pages/landing-page/landing-page';
import { AppCoreService } from './../providers/app-core-service';
import { AngularFire } from 'angularfire2';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Page1 } from '../pages/page1/page1';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage : any = Page1;
  // rootPage : any = LandingPage;
  pages   : any[];
  appStore;


  constructor(public platform: Platform, public af: AngularFire, public appCoreService: AppCoreService, public store: Store<any>) {
    this.appStore = this.store.select('appStore');
    this.initObservables();
    this.pages = [{title : "Home", component : LandingPage}, {title : "Bookings", component : BookedSlotsPage}, {title : 'Feed Back', component : ReviewsPage}];
  }


  initObservables() {

    this.af.auth.subscribe(loggedInUserID => {
      if (loggedInUserID && loggedInUserID.uid) {
        this.appCoreService.getLoggedInUserFromFB(loggedInUserID.uid);
        this.nav.setRoot(LandingPage);
      } else {
        this.pages = [];
      }
    });



    this.appStore.subscribe(payload => {

      if(payload){
        if(payload.eve == reducerActionTypes.CONSTRUCT_MENU){
          this.pages = [{title : "Home", component : LandingPage}, {title : "Bookings", component : BookedSlotsPage}, {title : 'Feed Back', component : ReviewsPage}];  
          if(payload.userType == "Admin User"){
            this.pages.push({title : "Users List", component : UsersListPage});
          }
        }
      }
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
