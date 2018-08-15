import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../models/user";
import { Order, Category } from "../../models/order";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseAuth } from '../../providers/auth/auth';


/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  user: any
  orderCollection: any
  refresh: boolean = false;

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

  public async deleteOrder(id) {
    const res = await this.AFStore.collection(`orders/${this.user.uid}/orders`).doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  public getOrders() {
    return this.AFStore.collection(`orders/${this.user.uid}/orders`);
  }

  public addOrder(order: Order) {
    this.AFStore.collection(`orders/${this.user.uid}/orders`).add(order);
  }

  public getStatuses() {
    return this.AFStore.collection(`status/${this.user.uid}/status/`);
  }

  public async getOrderNumber() {
    const res = this.AFStore.collection(`orders/${this.user.uid}/orders`);
    return res;
  }

  public addStatus(category: Category) {
    var statusRef = this.AFStore.collection(`status/${this.user.uid}/status/`).doc(`${this.user.uid}`);
    var title = category.title;
    var index = Math.random().toString(36).substring(7);
    var obj = {}
    obj[title] = title
    return statusRef.set(obj, { merge: true });
  }

  public deleteStatus(toDelete) {
    var statusRef = this.AFStore.collection(`status/${this.user.uid}/status/`).doc(`${this.user.uid}`);
    let obj = this.toObject(toDelete);
    // obj[toDelete] = firebase.firestore.FieldValue.delete();
    // console.log(toDelete)
    return statusRef.set(obj);
  }

  public toObject(arr) {
    var obj = {}
    for (let key in arr) {
      obj[key] = key
    }
    return obj;
  }

  public updateOrder(id, order) {
    var ref = this.AFStore.collection(`orders/${this.user.uid}/orders`);
    return ref.doc(id).update({ status: order.status, items: order.items });
  }

  public refreshOrders() {
    this.refresh = true;
  }



}
