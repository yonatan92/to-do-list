import { DisplayList } from './DisplayList.js';
import { ListItem } from './listItem.js';
const $ = (s, p = document) => p.querySelector(s);

export class TodoApp {
  constructor() {
    this.displayList = new DisplayList();
    this.activeItems = this.displayList.activeItems();
    this.doneItems = this.displayList.doneItems();
  }

  addItem(task) {
    this.displayList.addItem(new ListItem(task));
  }
}
