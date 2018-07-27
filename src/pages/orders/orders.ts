import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { LoginPage } from '../login/login';
import { CreateOrderPage } from "../create-order/create-order";

import { Order } from "../../models/order";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireList } from "angularfire2/database";
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  ordersCollection: AngularFirestoreCollection<any>;
  orders: Observable<any[]>;

  constructor(private fsp: FirebaseServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.ordersCollection = fsp.getOrders();
    this.orders = this.ordersCollection.valueChanges();
  }

  public newOrder() {
    this.navCtrl.push(CreateOrderPage);
  }

}
