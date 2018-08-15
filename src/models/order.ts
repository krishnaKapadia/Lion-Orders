export interface Item {
  description: string,
  quantity: string,
  cost: any
}

export interface Category {
  id: string,
  title: string,
  index: any
}

export interface Order {
  title: string;
  items: Array<Item>;
  status: string;
}
