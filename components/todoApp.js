import { DisplayList } from './DisplayList.js';
import { ListItem } from './listItem.js';
const $ = (s, p = document) => p.querySelector(s);

export class TodoApp {
  constructor() {
    this.htmlElements = {
      userInput: $('#new-task'),
      addButton: $('#btn-add'),
      mainTaskList: $('#tasks-list'),
      completedTasksButton: $('.c-btn'),
      unCompletedTasksButton: $('.uc-btn'),
      allTasksButton: $('.all-btn'),
    };
    this.setEvents();

    this.displayList = new DisplayList();
    this.allItems = this.displayList.arrItems;
    this.activeItems = this.displayList.activeItems();
    this.doneItems = this.displayList.doneItems();
  }
  renderList(list) {
    this.htmlElements.mainTaskList.innerHTML = '';
    let test = list.map((element) => this.creatHtmlNode(element));
    test.forEach((element) => {
      this.htmlElements.mainTaskList.appendChild(element);
    });
  }

  updateList() {
    this.allItems = this.displayList.arrItems;
    this.activeItems = this.displayList.activeItems();
    this.doneItems = this.displayList.doneItems();
  }

  creatHtmlNode(elem) {
    console.log(elem.id);
    var listItem = document.createElement('li');
    listItem.classList.add('unmarked-item');

    //input (checkbox)
    var checkBox = document.createElement('input'); //checkbx
    //label
    var label = document.createElement('label'); //label
    //input (text)
    var editInput = document.createElement('input'); //text
    //button.edit
    // var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton = document.createElement('button'); //delete button

    label.innerText = elem.content;

    //Each elements, needs appending
    checkBox.type = 'checkbox';
    editInput.type = 'text';

    checkBox.addEventListener('click', (e) => {
      console.log(e.target.checked);
      if (e.target.checked) {
        this.displayList.markTaskAsDone(elem.id);
        listItem.style.textDecorationLine = 'line-through';
        listItem.style.backgroundColor = 'red';
        label.style.textDecorationLine = 'line-through';
        deleteButton.style.color = 'black';
      } else {
        this.displayList.markTaskAsUnDone(elem.id);
        listItem.style.textDecorationLine = '';
        listItem.style.backgroundColor = '';
        label.style.textDecorationLine = '';
        deleteButton.style.color = 'red';
      }
    });
    deleteButton.addEventListener('click', () => {
      this.displayList.removeElement(elem.id);
      this.updateList();
      this.renderList(this.allItems);
    });
    if (elem.state.toString() === Symbol('done').toString()) {
      checkBox.checked = 'true';
      listItem.style.textDecorationLine = 'line-through';
      listItem.style.backgroundColor = 'red';
      label.style.textDecorationLine = 'line-through';
    }
    //  else {
    //   listItem.style.textDecorationLine = '';
    //   listItem.style.backgroundColor = '';
    //   label.style.textDecorationLine = '';
    // }
    // editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
    // editButton.className="edit";
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    // listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  }

  addItem(task) {
    this.displayList.addItem(new ListItem(task));
    this.updateList();
    this.renderList(this.allItems);
  }

  setEvents() {
    let {
      userInput,
      addButton,
      mainTaskList,
      completedTasksButton,
      unCompletedTasksButton,
      allTasksButton,
    } = this.htmlElements;

    addButton.addEventListener('click', () => {
      if (userInput.value) {
        this.addItem(userInput.value);
        this.updateList();
      }
    });

    completedTasksButton.addEventListener('click', () => {
      this.updateList();
      this.renderList(this.doneItems);
    });
    unCompletedTasksButton.addEventListener('click', () => {
      this.updateList();
      this.renderList(this.activeItems);
    });
    allTasksButton.addEventListener('click', () => {
      this.updateList();
      this.renderList(this.allItems);
    });
  }
}
