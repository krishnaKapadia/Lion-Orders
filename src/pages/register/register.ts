import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import LoginPage from "../login/login";
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(private fsp: FirebaseServiceProvider, private AFAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  async register(user: User) {
    try {
      const result = await this.AFAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      console.log(result);
      this.showAlert(result);
    } catch(error) {
      console.error(error);
    }

  }

  private showAlert(msg) {
    this.alertCtrl.create({
      title: 'Success!',
      subTitle: "Welcome to the platform!",
      buttons: [{
        text: 'Login',
        handler: () => {
          this.navCtrl.popTo("LoginPage");
        }
      }]
    }).present();
  }

}
