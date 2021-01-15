/* Priority Queue */
// functions : enqueue, dequeue, front, size, values, search, isEmpty

type element = string | number | boolean;

export class PriorityQueue {
  #storage: Array<[element, number]>;

  constructor(arr: Array<[element, number]> = []) {
    if (arr.length) {
      const newPriorityQueue = new PriorityQueue();
      arr.forEach((e) => newPriorityQueue.enqueue(e));
      this.#storage = newPriorityQueue.values();
    } else {
      this.#storage = [];
    }
  }

  enqueue(element: [element, number]) {
    if (this.isEmpty()) {
      this.#storage.push(element);
    } else {
      let isAdded = false;
      this.#storage.forEach((e, i) => {
        if (element[1] < e[1]) {
          this.#storage.splice(i, 0, element);
          isAdded = true;
        }
      });
      if (!isAdded) {
        this.#storage.push(element);
      }
    }
    return this;
  }

  dequeue() {
    return this.#storage.shift();
  }

  front() {
    return this.#storage[0];
  }

  search(element: element) {
    return this.#storage.findIndex((s) => s[0] === element);
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
