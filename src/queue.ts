/* Queue */
// functions : enqueue, dequeue, front, size, values, search, isEmpty

type element = string | number | boolean;

export class Queue {
  #storage: Array<element>;

  constructor(arr: Array<element> = []) {
    if (arr.length) {
      const newQueue = new Queue();
      arr.forEach((e) => newQueue.enqueue(e));
      this.#storage = newQueue.values();
    } else {
      this.#storage = [];
    }
  }

  enqueue(element: element) {
    this.#storage.push(element);
    return this;
  }

  dequeue() {
    return this.#storage.shift();
  }

  front() {
    return this.#storage[0];
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
