import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { LoginPage } from '../login/login';
import { CreateOrderPage } from "../create-order/create-order";

import { Order } from "../../models/order";
import { OrderPage } from "../order/order";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireList, snapshotChanges } from "angularfire2/database";
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
  orders: any;
  categories = [];
  currentOrders = [];
  numOrders: number = 0;

  constructor(private fsp: FirebaseServiceProvider, private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.ordersCollection = fsp.getOrders();

//  TODO: MOVE TO THE PROVIDER
    this.fsp.getStatuses().snapshotChanges().forEach((col) => {
      this.categories = [];

      col.forEach((val) => {
        for(var prop in val.payload.doc.data()) {
          this.categories.push({
            title: val.payload.doc.data()[prop]
          });
        }
      })

      this.ordersCollection.snapshotChanges().forEach((e) => {
        this.currentOrders = [];
        for (let i = 0; i < this.categories.length; i++) {
            this.currentOrders[this.categories[i].title] = [];
        }

        this.numOrders += 1;

        e.forEach((i) => {
          const data = i.payload.doc.data();
          this.currentOrders[data.status].push({
            data,
            id: i.payload.doc.id
          })
        })
      });

      // for (let i = 0; i < this.currentOrders.length; i++) {
      //   if(this.currentOrders[i][0].id == null) {
      //     this.currentOrders = this.currentOrders.splice(i, 1);
      //   }
      // }
      
    })

  }

  public newOrder() {
    this.navCtrl.push(CreateOrderPage);
  }

  public presentOrderModal(idx, title) {
    const order = this.currentOrders[title][idx];
    let orderModal = this.modalCtrl.create(OrderPage, { order, id: idx });
    orderModal.present();
 }


}
