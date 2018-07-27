import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";
import { Order } from "../../models/order";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  user: any
  orderCollection: any

  constructor(private AFAuth: AngularFireAuth, private AFStore: AngularFirestore, public http: HttpClient) {
    this.AFAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  // All Firebase methods go here
  public async login(user: User) {
    try {
      const res =  await this.AFAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(res)
      return res;
    } catch(e) {
      return e;
    }
  }

  public getOrders() {
    return this.AFStore.collection(`orders/${this.user.uid}/orders`);
  }

  public addOrder(order: Order) {
    this.AFStore.collection(`/orders/${this.user.uid}/orders`).add(order);
  }

}
