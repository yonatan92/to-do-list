class ListItem {
  #content;
  #state;
  #stateEnum = Object.freeze({
    ACTIVE: Symbol('active'),
    DONE: Symbol('done'),
  });
  constructor(text) {
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

  done() {
    this.state(this.#stateEnum.DONE);
  }

  unDone() {
    this.state(this.#stateEnum.ACTIVE);
  }
}
