export class ItemMetrics {

  itemObj: any;
  itemName: string;
  itemfrom: string;
  itemLevel: string;
  itemStatus: string;
  itemTag: string[];
  itemTime: string;

  constructor(
    itemObj: any,
    itemName: string,
    itemfrom: string,
    itemLevel: string,
    itemStatus: string,
    itemTag: string[],
    itemTime: string
  ) {
    this.itemObj = itemObj;
    this.itemName = itemName;
    this.itemfrom = itemfrom;
    this.itemLevel = itemLevel;
    this.itemStatus = itemStatus;
    this.itemTag = itemTag;
    this.itemTime = itemTime;
  }

}

export class ListMetrics {

  listName: string;
  listData: ItemMetrics[];

  constructor(listName: string, listData: ItemMetrics[]) {

    this.listName = listName;
    this.listData = listData;

  }

}
