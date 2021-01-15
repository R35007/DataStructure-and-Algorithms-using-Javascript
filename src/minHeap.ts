/* Max Heap */
// functions : add, remove, values

export class MinHeap {
  #heap: [null, ...number[]];

  constructor(arr: number[] = []) {
    if (arr.length) {
      const newMaxHeap = new MinHeap();
      arr.forEach((e) => newMaxHeap.add(e));
      this.#heap = [null, ...newMaxHeap.values()];
    } else {
      this.#heap = [null];
    }
  }

  add(element: number) {
    this.#heap.push(element);
    let index = this.#heap.length - 1;
    if (this.#heap.length > 2) {
      while (index > 0 && this.#heap[index]! < this.#heap[Math.floor(index / 2)]!) {
        [this.#heap[index], this.#heap[Math.floor(index / 2)]] = [this.#heap[Math.floor(index / 2)], this.#heap[index]];
        index = Math.floor(index / 2);
        if (index <= 1) break;
      }
    }
  }

  values() {
    return this.#heap.slice(1, this.#heap.length) as number[];
  }
}

const arr = [20, 13, 17, 1, 36, 35, 25, 47];
const mh = new MinHeap(arr);
console.log(mh.values());
