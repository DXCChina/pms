export class ItemMetrics {

  itemId: number;
  itemName: string;
  itemTime: string;
  itemlabel: string;
  itemfrom: string;
  itemTodo: string;
  itemLevel: number;

  constructor(itemId: number,
    itemName: string,
    itemTime: string,
    itemlabel: string,
    itemfrom: string,
    itemTodo: string,
    itemLevel: number) {

    this.itemId = itemId;
    this.itemName = itemName;
    this.itemTime = itemTime;
    this.itemlabel = itemlabel;
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
