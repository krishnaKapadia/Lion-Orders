import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import RegisterPage from "../register/register";
import { TabsPage } from "../tabs/tabs";
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;
  email: string;
  password: string;

  constructor(private fsp: FirebaseServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    // if(navParams.get("email") != null || navParams.get("email") != ""){
    //   this.email = navParams.get("email");
    // }
    //
    // if(navParams.get("password") != null || navParams.get("password") != "") {
    //   this.password = navParams.get("password");
    // }
    //
    // if(navParams.get("email") != null && navParams.get("password") != null) {
    //   let newUser = { email: this.email, password: this.password};
    //   this.login(newUser);
    // }
    // navCtrl.push(TabsPage)
  }

  private async login(user: User) {
    try{
      const result = await this.fsp.login(user);
      if(result.success) {
        this.navCtrl.setRoot(TabsPage)
      }else {
        this.showAlert(result)
      }
    }catch(error) {
      this.showAlert(error.error);
    }
  }

  private showAlert(msg) {
    this.alertCtrl.create({
      title: 'Error!',
      subTitle: "The email/password you have entered is incorrect. Please try again.",
      buttons: ['Dismis']
    }).present();
  }

  /**
  * Pushs up the register page to the stack
  */
  private register() {
    this.navCtrl.push('RegisterPage');
  }

}
