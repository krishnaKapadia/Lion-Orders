import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { CategoryPage } from '../pages/category/category';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdersPage } from '../pages/orders/orders';
import { OrderPage } from '../pages/order/order';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { CreateOrderPage } from "../pages/create-order/create-order";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { FirebaseAuth } from '../providers/auth/auth';

import { FIREBASE_CONFIG } from "../providers/auth/firebase-config";
import { CreateStatusPage } from '../pages/create-status/create-status';

@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrdersPage,
    LoginPage,
    CreateOrderPage,
    OrderPage,
    CreateStatusPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrdersPage,
    LoginPage,
    CreateOrderPage,
    OrderPage,
    CreateStatusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    FirebaseAuth
  ]
})
export class AppModule {}
