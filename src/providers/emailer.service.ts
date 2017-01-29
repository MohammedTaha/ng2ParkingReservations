import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';

@Injectable()
export class EmailerService {
  private baseUrl = 'http://zaavia-emailer.herokuapp.com/email';
  constructor(private http: Http) { }
  sendEmail (emailObj){    
    return this.http.post(this.baseUrl, emailObj)
  }
}
