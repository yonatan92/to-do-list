// import {uuid} from 'uuid';
// const uuid = require('uuid')
let count = 0;

export class ListItem {
  #id;
  #content;
  #state;
  #stateEnum = Object.freeze({
    ACTIVE: Symbol('active'),
    DONE: Symbol('done'),
  });
  constructor(text) {
    // this.#id = uuid.v4();
    this.#id = count;
    count++;
    this.#content = text;
    this.#state = this.#stateEnum.ACTIVE;
    this.test = Object.freeze({
      ACTIVE: Symbol('active'),
      DONE: Symbol('done'),
    });
    // this.test = this.state;
  }

  get content() {
    return this.#content;
  }
  set content(text) {
    this.#content = text;
  }

  get state() {
    return this.#state;
  }
  set state(newState) {
    this.#state = newState;
  }
  get id() {
    return this.#id;
  }

  done() {
    this.state = this.#stateEnum.DONE;
    console.log('done');
  }

  unDone() {
    this.state = this.#stateEnum.ACTIVE;
    console.log('undone');
  }
}
