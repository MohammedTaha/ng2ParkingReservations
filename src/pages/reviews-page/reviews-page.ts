import { ReviewsService } from './../../providers/reviews-service';
import { AppCoreService } from './../../providers/app-core-service';
import { Page1 } from './../page1/page1';
import { reducerActionTypes } from './../../providers/RxStoreReducers';
import { Store } from '@ngrx/store';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ReviewsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'reviews-page',
  templateUrl: 'reviews-page.html'
})
export class ReviewsPage  {
  loggedInUserType:String;
  list : FirebaseListObservable<any>;
  isNewFeedBackViewVisible: Boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public af : AngularFire, 
    public store : Store<any>,
    public appCoreService : AppCoreService,
    public reviewsService : ReviewsService
  ) {

      this.isNewFeedBackViewVisible = false;
     if(this.appCoreService.loggedInUser && this.appCoreService.loggedInUser.user){
      this.loggedInUserType = this.appCoreService.loggedInUser.user.UserType;      
      if(this.appCoreService.loggedInUser.user.UserType == 'Normal User'){
        this.list = this.reviewsService.getAllReviewsBySingleUser(this.appCoreService.loggedInUser.user.uid);
      } else {
        this.list = this.reviewsService.getAllReviews();
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPagePage');
  }

  openNewFeedBackForm (){
    this.isNewFeedBackViewVisible = true;
  }


  getAdminReview(reviewID){

    let reply = prompt();
    if(reply){
      let updates = {
        Reply : {
          TS : (new Date()).getTime(), 
          Desc : reply, 
          uid :  this.appCoreService.loggedInUser.user.uid,
          UserName :  this.appCoreService.loggedInUser.user.FirstName + " " + this.appCoreService.loggedInUser.user.LastName,
        }
      };
      this.reviewsService.updateAdminUserReply(reviewID, updates);
    }
  }

  sumbitFeedback(event, form){
    event.preventDefault();
    this.isNewFeedBackViewVisible = false;
    let userReview = form.value;
    userReview.TS = (new Date()).getTime();
    let loggedInUser = null;
    if(this.appCoreService.loggedInUser && this.appCoreService.loggedInUser.user){
      loggedInUser  = this.appCoreService.loggedInUser.user;
      userReview.uid = loggedInUser.uid; 
      userReview.UserName = loggedInUser.FirstName +" "+ loggedInUser.LastName; 
    }

    this.reviewsService.postReviewByUser(form.value);
    form.reset();
  }

  logoutUser(){
    this.af.auth.logout();
    this.store.dispatch({type : reducerActionTypes.SIGN_OUT, payload : null});
    this.navCtrl.setRoot( Page1 ) ;
  }
}
