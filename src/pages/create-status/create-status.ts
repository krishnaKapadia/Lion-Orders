import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Category } from '../../models/order';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

/**
 * Generated class for the CreateStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-status',
  templateUrl: 'create-status.html',
})
export class CreateStatusPage {
  category = { title: "", id: "" } as Category;

  constructor(private fsp: FirebaseServiceProvider, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }


  public submit() {
    this.fsp.addStatus(this.category).then((res) => {
      let toast = this.toastCtrl.create({
        message: 'Status was successfully created',
        duration: 2000,
        position: 'bottom',
        cssClass: "toast"
      });

      toast.present();
      this.navCtrl.pop();
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

}
