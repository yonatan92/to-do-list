var uuid = require('uuid');

class ListItem {
  #id;
  #content;
  #state;
  #stateEnum = Object.freeze({
    ACTIVE: Symbol('active'),
    DONE: Symbol('done'),
  });
  constructor(text) {
    this.#id = uuid.v4();
    this.#content = text;
    this.#state = this.#stateEnum.ACTIVE;
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
    this.state(this.#stateEnum.DONE);
  }

  unDone() {
    this.state(this.#stateEnum.ACTIVE);
  }
}
