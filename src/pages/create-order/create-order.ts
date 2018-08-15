import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order, Item } from '../../models/order';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireList } from "angularfire2/database";
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
/**
 * Generated class for the CreateOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-create-order',
  templateUrl: 'create-order.html',
})
export class CreateOrderPage {
  private order = { title: "", items: [{ description: '', quantity: '', cost: '' }] } as Order;
  private statusCollection: AngularFirestoreCollection<any>;
  private statuses: Array<string> = [];
  private items: number = 1;
  private Arr = Array;

  constructor(private fsp: FirebaseServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.fetchStatuses();
  }

  private fetchStatuses() {
    this.statusCollection = this.fsp.getStatuses();

    this.statusCollection.valueChanges().forEach((e) => {
      e.forEach((item) => {
        for(var index in item){
          this.statuses.push(item[index])
        }
      });
    });
  }

  public addItem() {
    this.order.items.push({} as Item);
    this.items += 1;
    this.order.items[this.items] = { description: '', quantity: '', cost: 0 }
  }

  public removeItem() {
    if(this.items > 1) {
      this.order.items.pop()
      this.items -= 1;
    }
  }

  public async submit() {
    this.fsp.addOrder(this.order);
    this.navCtrl.pop();
  }

}
