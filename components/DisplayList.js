export class DisplayList {
  #arrItems;

  constructor() {
    this.#arrItems = [];
  }

  get arrItems() {
    return this.#arrItems;
  }
  set arrItems(newArr) {
    this.#arrItems = newArr;
  }

  addItem(itm) {
    this.arrItems.push(itm);
  }

  activeItems() {
    const ans = this.arrItems.filter(
      (itm) => itm.state.toString() === Symbol('active').toString()
    );

    return ans;
  }

  doneItems() {
    return this.arrItems.filter(
      (itm) => itm.state.toString() === Symbol('done').toString()
    );
  }

  markTaskAsDone(id) {
    let doneElement = this.arrItems.find((elem) => elem.id == id);
    doneElement.done();
  }
  markTaskAsUnDone(id) {
    let unDoneElement = this.arrItems.find((elem) => elem.id == id);
    unDoneElement.unDone();
  }

  removeElement(id) {
    this.arrItems = this.arrItems.filter((elem) => elem.id !== id);
  }
}
