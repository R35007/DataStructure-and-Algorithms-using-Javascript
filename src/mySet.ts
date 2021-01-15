/* Set */
// functions : has, add, remove, values, size, union, intersection, difference, isSubset, isEmpty

type element = string | number | boolean;

export class MySet {
  #storage: Array<element>;

  constructor(arr: Array<element> = []) {
    if (arr.length) {
      const newSet = new MySet();
      arr.forEach((e) => newSet.add(e));
      this.#storage = newSet.values();
    } else {
      this.#storage = [];
    }
  }

  has(element: element) {
    return this.#storage.indexOf(element) >= 0;
  }

  add(element: element) {
    if (this.has(element)) return this;
    this.#storage.push(element);
    return this;
  }

  remove(element: element) {
    if (!this.has(element)) return false;
    const elementIndex = this.#storage.findIndex((s) => s === element);
    this.#storage.splice(elementIndex, 1);
    return this;
  }

  values() {
    return this.#storage;
  }

  size() {
    return this.#storage.length;
  }

  union(otherSet: MySet) {
    const unionSet = new MySet();
    const currentSetValues = this.values();
    const otherSetValues = otherSet.values();
    [...otherSetValues, ...currentSetValues].forEach((element) => unionSet.add(element));
    return unionSet;
  }

  intersection(otherSet: MySet) {
    const intersectionSet = new MySet();
    const currentSetValues = this.values();
    currentSetValues.forEach((element) => {
      if (otherSet.has(element)) intersectionSet.add(element);
    });
    return intersectionSet;
  }

  difference(otherSet: MySet) {
    const differenceSet = new MySet();
    const currentSetValues = this.values();
    currentSetValues.forEach((element) => {
      if (!otherSet.has(element)) differenceSet.add(element);
    });
    return differenceSet;
  }

  isSubSet(otherSet: MySet) {
    const currentSetValues = this.values();
    return currentSetValues.every((element) => otherSet.has(element));
  }

  isEmpty() {
    return this.#storage.length === 0;
  }
}
