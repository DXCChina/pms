interface ItemMetrics {
  itemName: string;
  itemTime: string;
  itemlabel: string;
  itemfrom: string;
}

export interface ListMetrics {
  listName: string;
  listData: ItemMetrics[];
}
