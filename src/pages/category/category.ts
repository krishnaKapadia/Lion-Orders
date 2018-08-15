import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Category } from '../../models/order';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { CreateStatusPage } from '../create-status/create-status';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  private categoryCollection: AngularFirestoreCollection<any>;
  private categories: Category[];
  // private newIndex =

  constructor(private fsp: FirebaseServiceProvider, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.getCategories();
  }

  public getCategories() {
    this.categoryCollection = this.fsp.getStatuses();
    this.categoryCollection.snapshotChanges().forEach((col) => {
      this.categories = [];

      col.forEach((val) => {
        // console.log(val.payload.doc.data())
        for(var prop in val.payload.doc.data()) {
          this.categories.push({
            title: val.payload.doc.data()[prop],
            id: val.payload.doc.id,
            index: prop
          });
        }
      })
    })
  }

  public newStatus() {
    this.navCtrl.push(CreateStatusPage);
  }

  public deleteStatus(title) {
    // let obj = [];
    //
    // this.categories.forEach((c) => {
    //   if(c.title !=  title) {
    //     obj[c.title] = c.title;
    //   }
    // })
    //
    // this.categories = obj;

    this.fsp.deleteStatus(title).then((res) => {
      let toast = this.toastCtrl.create({
        message: 'Status was successfully deleted',
        duration: 2000,
        position: 'bottom',
        cssClass: "toast"
      });

      toast.present();
      this.categories = [];
      this.getCategories();
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
