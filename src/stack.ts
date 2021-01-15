/* Stack */
// functions : push, pop, peek, size, values, search, isEmpty

type element = string | number | boolean;

export class Stack {
  #storage: Array<element>;

  constructor(arr: Array<element> = []) {
    if (arr.length) {
      const newStack = new Stack();
      arr.forEach((e) => newStack.push(e));
      this.#storage = newStack.values();
    } else {
      this.#storage = [];
    }
  }

  push(element: element) {
    this.#storage.push(element);
    return this;
  }

  pop() {
    return this.#storage.pop();
  }

  peek() {
    return this.#storage[this.#storage.length - 1];
  }

  search(element: element) {
    return this.#storage.findIndex((s) => s === element);
  }

  size() {
    return this.#storage.length;
  }

  values() {
    return this.#storage;
  }

  isEmpty() {
    return this.#storage.length === 0;
  }
}
