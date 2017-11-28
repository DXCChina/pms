interface ItemMetrics {
  itemObj: any;
  itemName: string;
  itemTime: string;
  itemfrom: string;
  itemTodo: string;
  itemLevel: string;
}

export interface ListMetrics {
  listName: string;
  listData: ItemMetrics[];
}
