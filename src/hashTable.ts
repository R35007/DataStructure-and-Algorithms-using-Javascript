/* Hash Table */
// functions : entries, add, remove, lookup

const hash = (string: string, max: number) => {
  const sumOfCharCode = string.split("").reduce((acc: number, _, i: number) => (acc += string.charCodeAt(i)), 0);
  return sumOfCharCode % max;
};

export class HashTable {
  #storage: Array<Array<[string, any]>>;
  #storageLimit: number;

  constructor(arr: Array<[string, any]> = [], limit: number = 5) {
    if (arr.length) {
      const newHashTable = new HashTable([], limit);
      arr.forEach(([key, value]) => newHashTable.add(key, value));
      this.#storage = newHashTable.entries();
    } else {
      this.#storage = [];
    }
    this.#storageLimit = limit;
  }

  add(key: string, value: any) {
    const hashIndex = hash(key, this.#storageLimit);
    if (this.#storage[hashIndex] === undefined) {
      this.#storage[hashIndex] = [[key, value]];
    } else {
      const foundIndex = this.#storage[hashIndex].findIndex(([_key, _]) => _key === key);
      foundIndex >= 0 ? (this.#storage[hashIndex][foundIndex][1] = value) : this.#storage[hashIndex].push([key, value]);
    }
    return this;
  }

  remove(key: string) {
    const hashIndex = hash(key, this.#storageLimit);
    if (this.#storage[hashIndex] === undefined) {
      return false;
    } else {
      const foundIndex = this.#storage[hashIndex].findIndex(([_key, _]) => _key === key);
      if (foundIndex >= 0) {
        delete this.#storage[hashIndex][foundIndex];
        return true;
      }
      return false;
    }
  }

  lookup(key: string) {
    const hashIndex = hash(key, this.#storageLimit);
    if (this.#storage[hashIndex] === undefined) {
      return;
    } else {
      const foundIndex = this.#storage[hashIndex].findIndex(([_key, _]) => _key === key);
      return foundIndex >= 0 ? this.#storage[hashIndex][foundIndex][1] : undefined;
    }
  }

  entries() {
    return this.#storage;
  }
}
