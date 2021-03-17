export class DisplayList {
  arrItems = [];

  constructor() {}

  get arrItems() {
    return this.arrItems;
  }

  addItem(itm) {
    this.arrItems.push(itm);
  }

  deleteItem(itmId) {
    this.arrItems = this.arrItems.filter((itm) => itmId != itm.id);
  }

  activeItems() {
    return this.arrItems.filter((itm) => itm.status == Symbol('active'));
  }

  doneItems() {
    return this.arrItems.filter((itm) => itm.status == Symbol('done'));
  }
}
