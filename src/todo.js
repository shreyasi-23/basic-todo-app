class Todo {
  static #nextId = 1;
  #id
  #text
  #completed

  constructor(text, completed = false) {
    this.#id = Todo.#nextId++;
    this.#text = text;
    this.#completed = completed;
  }

  toggle() {
    this.#completed = !this.#completed;
  }

  get id() {
    return this.#id;
  }

  get text() {
    return this.#text;
  }

  get completed() {
    return this.#completed;
  }

  set text(newText) {
    this.#text = newText;
  }

  set completed(value) {
    this.#completed = value;
  }
}

const todo1 = new Todo("Buy milk", true);
const todo2 = new Todo("Buy coffee");

console.log(todo1.id);
console.log(todo1.text);
console.log(todo1.completed);

console.log(todo2.id);
console.log(todo2.text);
console.log(todo2.completed);

export default Todo;