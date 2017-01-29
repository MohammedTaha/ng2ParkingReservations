
import { AuthProviders, AuthMethods } from 'angularfire2';


export const firebaseConfigs = {
  apiKey: "AIzaSyCd_uD3BAlqvaM5k9kY71iLNXPGiKgOLjc",
  authDomain: "ng2parkingreservations.firebaseapp.com",
  databaseURL: "https://ng2parkingreservations.firebaseio.com",
  storageBucket: "ng2parkingreservations.appspot.com",
  messagingSenderId: "536618424815"
};
export const firebaseLoginPolicey = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};