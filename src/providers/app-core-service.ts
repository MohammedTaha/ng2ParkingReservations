import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { reducerActionTypes } from './RxStoreReducers';
import { AngularFire } from 'angularfire2';
import { Store } from "@ngrx/store";
import {firebaseLoginPolicey} from '../firebaseConfig';


/*
  Generated class for the AppCoreService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppCoreService {

  loggedInUser : User;

  constructor(public af : AngularFire, private store: Store<any>) {
    console.log('Hello AppCoreService Provider');
  }

  showErrorMessage(message: String) : void{
    alert(message || "Something Went wrong, sorry for inconvenience.");
  }

  getLoggedInUser() : User{
    return this.loggedInUser;
  }

  getLoggedInUserFromFB(id:String): void{
    this.af.database.object("/users/" + id)
    .subscribe( fbUser => {
        this.loggedInUser = new User(fbUser);
        this.store.dispatch({type : reducerActionTypes.SIGN_IN, payload : fbUser});
    });
  }



  getAllUsersFromFB(){
    return this.af.database.list("/users", {query : {orderByChild : 'UserType', equalTo : 'Normal User'} })
  }



  doSigninForUser(user) : void {

    this.af.auth.login( user, firebaseLoginPolicey )
      .then((registeredUser:any) => {

        this.af.database.object("/users/" + registeredUser.uid)
        .subscribe(user => {
          this.loggedInUser = new User(user);
          this.store.dispatch({type : reducerActionTypes.SIGN_IN, payload : user});
        });        
      }, (err) => {
          console.log(err);
          this.showErrorMessage(err.message);
      });
  }

  doSignupForUser(signupDetails, user) : void {

    this.af.auth.createUser( signupDetails )
      .then((registeredUser:any) => {
        user.uid      = registeredUser.uid;
        user.UserType = 'Normal User';

        delete user.Password;
        delete user.ReconfirmedPassword;

        let node = this.af.database.object("/users/" + registeredUser.uid);
        node.set(user);
        
        this.loggedInUser = new User(user);
        this.store.dispatch({type : reducerActionTypes.SIGN_IN, payload : user});
      }, (err) => {
          this.showErrorMessage(err.message);
      });
  }
}
