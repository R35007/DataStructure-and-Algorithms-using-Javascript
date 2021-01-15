/* Max Heap */
// functions : add, remove, values

export class MaxHeap {
  #heap: [null, ...number[]];

  constructor(arr: number[] = []) {
    if (arr.length) {
      const newMaxHeap = new MaxHeap();
      arr.forEach((e) => newMaxHeap.add(e));
      this.#heap = newMaxHeap.values();
    } else {
      this.#heap = [null];
    }
  }

  add(element: number) {
    this.#heap.push(element);
    let index = this.#heap.length - 1;
    if (this.#heap.length > 2) {
      while (index > 0 && this.#heap[index]! > this.#heap[Math.floor(index / 2)]!) {
        [this.#heap[index], this.#heap[Math.floor(index / 2)]] = [this.#heap[Math.floor(index / 2)], this.#heap[index]];
        index = Math.floor(index / 2);
        if (index <= 1) break;
      }
    }
  }

  remove() {
    if (this.#heap.length > 1) {
      [this.#heap[1], this.#heap[this.#heap.length - 1]] = [this.#heap[this.#heap.length - 1]!, this.#heap[1]];
      const removedElement = this.#heap.pop();
      let index = 1,
        left = index * 2,
        right = index * 2 + 1;
      while (index < this.#heap.length && !(this.#heap[left] === undefined && this.#heap[right] === undefined)) {
        if (this.#heap[right] === undefined || this.#heap[left]! > this.#heap[right]!) {
          [this.#heap[index], this.#heap[left]] = [this.#heap[left], this.#heap[index]];
          index = left;
        } else {
          [this.#heap[index], this.#heap[right]] = [this.#heap[right], this.#heap[index]];
          index = right;
        }
        left = index * 2;
        right = index * 2 + 1;
      }
      return removedElement;
    }
  }

  values() {
    return this.#heap;
  }

  heapSort(heap = this.#heap) {
    const result = [];
    while (heap.length >= 2) {
      const removedElement = this.remove();
      result.push(removedElement);
      console.log(removedElement);
      console.log(mh.values());
      console.log("\n");
    }
    return result;
  }
}

const arr = [50, 30, 20, 15, 10, 8, 16, 60];
const mh = new MaxHeap(arr);
console.log(mh.values());
// console.log(mh.remove());
// console.log(mh.values());
console.log(mh.heapSort());
