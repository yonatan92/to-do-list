// import { EventEmitter } from 'events';
import { DisplayList } from './DisplayList.js';
import { ListItem } from './listItem.js';
const $ = (s, p = document) => p.querySelector(s);

export class TodoApp extends EventTarget {
  constructor() {
    super();
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
    this.addEventListener('TASKS_CHANGED', (e) => this.saveSession(e.detail));
  }
  renderList(list) {
    this.htmlElements.mainTaskList.innerHTML = '';
    let test = list.map((element) => this.creatHtmlNode(element));
    test.forEach((element) => {
      this.htmlElements.mainTaskList.appendChild(element);
    });
  }

  async saveSession(list) {
    console.log(JSON.stringify(list[0]));
    // list.forEach((e) => console.log(JSON.stringify(e)));
    // let jsonArr = list.map((element) => JSON.stringify({ ...element }));
    // await localStorage.setItem('autosave', JSON.stringify(list));
    // console.log(jsonArr, list);

    let indexedDB = window.indexedDB.open('autossave', { test: 1 });
    console.log(indexedDB);
  }

  updateList() {
    this.allItems = this.displayList.arrItems;
    this.activeItems = this.displayList.activeItems();
    this.doneItems = this.displayList.doneItems();
    let event = new CustomEvent('TASKS_CHANGED', { detail: this.allItems });
    this.dispatchEvent(event);
  }

  creatHtmlNode(elem) {
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
        this.updateList();
      } else {
        this.displayList.markTaskAsUnDone(elem.id);
        listItem.style.textDecorationLine = '';
        listItem.style.backgroundColor = '';
        label.style.textDecorationLine = '';
        deleteButton.style.color = 'red';
        this.updateList();
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
      deleteButton.style.color = 'black';
    }

    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
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
