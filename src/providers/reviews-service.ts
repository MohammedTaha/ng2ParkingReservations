import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
/*import { Http } from '@angular/http';
import 'rxjs/add/operator/map';*/

/*
  Generated class for the ReviewsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReviewsService {

  constructor(
    public af : AngularFire
  ) {
    console.log('Hello ReviewsService Provider');
  }

  postReviewByUser(review){
    this.af.database.list('/Reviews').push(review);
  }

  updateAdminUserReply(reviewID, updates){
    this.af.database.object('/Reviews/' + reviewID).update(updates);
  }

  getAllReviewsBySingleUser(uid){
    return this.af.database.list('/Reviews', {query : {orderByChild : 'uid', equalTo : uid}} );
  }

  getAllReviews(){
    return this.af.database.list('/Reviews');
  }
}
