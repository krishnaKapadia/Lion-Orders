import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuth {
  user: any;

  constructor(private AFAuth: AngularFireAuth, private AFStore: AngularFirestore, public http: HttpClient) {
    this.AFAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  // All Firebase methods go here
  public login(user: User) {
    return this.AFAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((res) => {
      let obj = {
        res,
        success: true
      }
      console.log(obj)
      return obj;
    }).catch((e) => {
      console.log(e)
      return {
        error: e,
        success: false
      }
    })
  }

}
