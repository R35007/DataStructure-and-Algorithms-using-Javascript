/* Linked List */
// functions : head, add, remove, size, min, max, entries, find, indexOf, elementAt, removeAt, addAt, previous, isPresent, reverse

type element = string | number | boolean;

class Node {
  data: element;
  next: Node | null;
  constructor(data: element, next: Node | null = null) {
    this.data = data;
    this.next = next;
  }
}

export class LinkedList {
  #head: Node | null;
  #length: number;

  constructor(arr: element[] = []) {
    if (arr.length) {
      const newBts = new LinkedList();
      arr.forEach((element) => newBts.add(element));
      this.#head = newBts.head();
      this.#length = newBts.size();
    } else {
      this.#head = null;
      this.#length = 0;
    }
  }

  head() {
    return this.#head;
  }

  size() {
    return this.#length;
  }

  entries() {
    const result = [];
    let currentNode = this.#head;
    while (currentNode) {
      result.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return result;
  }

  add(data: element) {
    const node = this.#head;
    if (!node) {
      this.#head = new Node(data);
    } else {
      let currentNode: Node = node;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = new Node(data);
    }
    this.#length++;
    return this;
  }

  remove(data: element) {
    if (!this.isPresent(data)) return false;

    let currentNode = this.#head;
    let previousNode: Node | null;

    if (currentNode && currentNode.data === data) {
      this.#head = currentNode.next;
    } else {
      while (currentNode && currentNode.data !== data) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode!.next = currentNode!.next;
    }
    this.#length--;
    return true;
  }

  indexOf(data: element) {
    let currentNode: Node | null = this.#head;
    let index = -1;
    while (currentNode) {
      index++;
      if (currentNode.data === data) return index;
      currentNode = currentNode.next;
    }
    return -1;
  }

  elementAt(index: number) {
    let currentNode: Node | null = this.#head;
    if (!currentNode || index > this.#length - 1 || index < 0) return;
    let count = 0;
    while (currentNode!.next && count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode.data;
  }

  removeAt(index: number) {
    let currentNode: Node | null = this.#head;
    let previousNode: Node | null = null;
    if (!currentNode || index > this.#length - 1 || index < 0) return;
    let count = -1;
    while (currentNode!.next && count < index) {
      count++;
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode!.next = currentNode.next;
    this.#length--;
    return true;
  }

  addAt(index: number, data: element) {
    let currentNode: Node | null = this.#head;
    let previousNode: Node | null = null;
    if (!currentNode || index > this.#length || index < 0) return;
    if (index === 0) {
      this.#head = new Node(data, currentNode);
    } else {
      let count = -1;
      while (currentNode!.next && count < index) {
        count++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode!.next = new Node(data, currentNode.next);
    }
    length++;
    return true;
  }

  find(data: element) {
    const node = this.#head;
    let currentNode: Node | null = node;
    while (currentNode && currentNode.data !== data) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  previous(data: element) {
    if (!this.isPresent(data)) return null;
    const node = this.#head;
    let previousNode: Node | null = null;
    let currentNode: Node | null = node;
    while (currentNode && currentNode.data !== data) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return previousNode;
  }

  isPresent(data: element) {
    let currentNode: Node | null = this.#head;
    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  min(otherNode: Node | null = this.#head) {
    let currentNode: Node | null = otherNode;
    let min = currentNode?.data;
    while (currentNode) {
      if (currentNode.data < min!) {
        min = currentNode.data;
      }
      currentNode = currentNode.next;
    }
    return min;
  }

  max(otherNode: Node | null = this.#head) {
    let currentNode: Node | null = otherNode;
    let max = currentNode?.data;
    while (currentNode) {
      if (currentNode.data > max!) {
        max = currentNode.data;
      }
      currentNode = currentNode.next;
    }
    return max;
  }

  reverse(otherNode?: Node | null) {
    let currentNode = JSON.parse(JSON.stringify(otherNode || this.#head));
    let previous = null;
    while (currentNode) {
      const tempNextNode = currentNode.next;
      currentNode.next = previous;
      previous = currentNode;
      if (!tempNextNode) break;
      currentNode = tempNextNode;
    }
    if (!otherNode) {
      this.#head = currentNode;
    }
    return currentNode;
  }
}
