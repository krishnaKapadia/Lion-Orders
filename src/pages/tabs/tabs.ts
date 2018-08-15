import { Component } from '@angular/core';

import { CategoryPage } from '../category/category';
import { ContactPage } from '../contact/contact';
import { OrdersPage } from '../orders/orders';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OrdersPage;
  tab2Root = CategoryPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
