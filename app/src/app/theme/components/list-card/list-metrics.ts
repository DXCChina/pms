interface ItemMetrics {
  itemObj: any;
  itemName: string;
  itemfrom: string;
  itemLevel: string;
  itemStatus: string;
  itemTag: string[];
  itemTime: string;
}

export interface ListMetrics {
  listName: string;
  listData: ItemMetrics[];
}
