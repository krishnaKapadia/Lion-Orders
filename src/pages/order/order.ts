import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Order } from '../../models/order';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { OrdersPage } from '../orders/orders';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  changed: boolean = false;
  id: number;
  uid: number;
  order = {} as Order;
  status: string;
  statuses = [];
  oldStatus: string;

  constructor(private fsp: FirebaseServiceProvider, private toastCtrl: ToastController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.order = navParams.get("order").data;
    this.oldStatus = this.order.status;
    // console.log(this.status);
    this.id = navParams.get("id");
    this.uid = navParams.get("order").id;

    // Get all statuses
    fsp.getStatuses().valueChanges().forEach((e) => {
    this.statuses = [];

      e.forEach((item) => {
        for(var index in item){
          this.statuses.push(item[index])
        }
      });
    });

  }

  private save() {
    this.order.status = this.oldStatus;
    this.fsp.updateOrder(this.uid, this.order).then((res) => {
      let toast = this.toastCtrl.create({
        message: 'Order was successfully saved',
        duration: 2000,
        position: 'bottom',
        cssClass: "toast"
      });

      toast.present();
      // this.navCtrl.push(OrdersPage, { refresh: true })
      this.dismiss();
    }).catch((err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 2000,
        position: 'bottom',
        cssClass: "toast"
      });

      toast.present();
    })
  }

  private didChange() {
    console.log("CHANGED")
    this.changed = true;
  }

  private presentToast() {
    const res = this.fsp.deleteOrder(this.uid).then((res) => {
      let toast = this.toastCtrl.create({
        message: 'Order was successfully deleted',
        duration: 2000,
        position: 'bottom',
        cssClass: "toast"
      });

      toast.present();
      this.dismiss();
    }).catch((err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 2000,
        position: 'bottom',
        cssClass: "toast"
      });

      toast.present();
    })

  }

  private dismiss() {
     this.viewCtrl.dismiss();
   }

}
