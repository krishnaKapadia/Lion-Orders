interface Item {
  name: string,
  quantity: number,
  cost: any
}

enum Status {
  enqueued = "Waiting",
  cooking = "Cooking",
  served = "Served",
  completed = "Completed"
}

export interface Order {
  company_id: any,
  name: string;
  items: Array<Item>;
  status: Status;
}
