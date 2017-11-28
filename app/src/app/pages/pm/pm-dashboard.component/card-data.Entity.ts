export class ItemMetrics {

  itemObj: any;
  itemName: string;
  itemTime: string;
  itemfrom: string;
  itemTodo: string;
  itemLevel: string;

  constructor(
    itemObj: any,
    itemName: string,
    itemTime: string,
    itemfrom: string,
    itemTodo: string,
    itemLevel: string) {

    this.itemObj = itemObj;
    this.itemName = itemName;
    this.itemTime = itemTime;
    this.itemfrom = itemfrom;
    this.itemTodo = itemTodo;
    this.itemLevel = itemLevel;

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
