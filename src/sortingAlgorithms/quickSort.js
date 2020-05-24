export const quickSort = (array) => {
  let comparisons = [];
  quickSortHelper(0, array.length - 1, array, comparisons);
  return [comparisons, array];
};

function quickSortHelper(startIdx, endIdx, array, comparisons) {
  if (startIdx >= endIdx) {
    return;
  }
  const pivotIdx = generatePivotIdx(startIdx, endIdx, "first");

  let left = startIdx + 1,
    right = endIdx;
  while (left <= right) {
    let currentComp = {
      left: left,
      right: right,
      swap: false,
      leftHeight: -1,
      rightHeight: -1,
    };

    if (array[left] > array[pivotIdx] && array[right] < array[pivotIdx]) {
      currentComp.swap = true;
      currentComp.leftHeight = array[left];
      currentComp.rightHeight = array[right];
      swap(left, right, array);
    }
    if (array[left] <= array[pivotIdx]) left++;
    if (array[right] >= array[pivotIdx]) right--;

    comparisons.push(currentComp);
  }

  const finalSwap = {
    left: pivotIdx,
    right: right,
    swap: true,
    leftHeight: array[pivotIdx],
    rightHeight: array[right],
  };
  comparisons.push(finalSwap);
  swap(right, pivotIdx, array);

  quickSortHelper(startIdx, right - 1, array, comparisons);
  quickSortHelper(right + 1, endIdx, array, comparisons);
}

function generatePivotIdx(startIdx, endIdx, strategy) {
  if (strategy === "first") return startIdx;
}

function swap(i, j, a) {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

export default quickSort;
