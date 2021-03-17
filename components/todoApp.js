import { DisplayLisy } from './DisplayList';
import { ListItem } from './components/listItem.js';
const $ = (s, p = document) => p.querySelector(s);

class TodoApp {
  constructor() {
    this.displayList = new DisplayLisy();
    this.activeItems = this.displayList.activeItems();
    this.doneItems = this.displayList.doneItems();
  }

  addItem(task) {
    this.displayList.addItem(new ListItem(task));
  }
}
