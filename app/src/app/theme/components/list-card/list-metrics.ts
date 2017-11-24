interface ItemMetrics {
  itemName: string;
  itemTime: string;
  itemlabel: string;
  itemfrom: string;
  itemTodo: string;
  itemLevel: number;
}

export interface ListMetrics {
  listName: string;
  listData: ItemMetrics[];
}
