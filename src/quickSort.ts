/* QuickSort */

export function qSort(arr: number[] = []) {
  let swapCount = 0;
  const quickSort = (arr: number[] = [], l: number = 0, h: number = arr.length) => {
    const swap = (i: number, j: number) => {
      if (i !== j) {
        swapCount++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    const partition = (l: number, h: number) => {
      const pivot = arr[l];
      let i = l,
        j = h;

      while (i < j) {
        do {
          i++;
        } while (arr[i] <= pivot);

        do {
          j--;
        } while (arr[j] > pivot);

        i < j && swap(i, j);
      }

      swap(l, j);
      return j;
    };

    if (l < h) {
      const j = partition(l, h);
      quickSort(arr, l, j);
      quickSort(arr, j + 1, h);
    }
    return arr;
  };

  quickSort(arr);
  return swapCount;
}
