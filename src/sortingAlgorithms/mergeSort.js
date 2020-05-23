export const mergeSort = (array) => {
  if (array.length <= 1) return array;

  let animations = [];
  let helperArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, helperArray, animations);

  return animations;
};

function mergeSortHelper(mainArray, startIdx, endIdx, helperArray, animations) {
  if (startIdx === endIdx) return;

  let middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(helperArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(helperArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, helperArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  helperArray,
  animations
) {
  let i = startIdx;
  let k = startIdx;
  let j = middleIdx + 1;

  let informationObject;

  while (i <= middleIdx && j <= endIdx) {
    if (helperArray[i] <= helperArray[j]) {
      informationObject = {
        leftComparison: i,
        rightComparison: j,
        insertAt: k,
        insertHeight: helperArray[i],
      };
      mainArray[k++] = helperArray[i++];
    } else {
      informationObject = {
        leftComparison: i,
        rightComparison: j,
        insertAt: k,
        insertHeight: helperArray[j],
      };
      mainArray[k++] = helperArray[j++];
    }
    animations.push(informationObject);
  }

  fillRemaining(i, middleIdx, k, mainArray, helperArray, animations);
  fillRemaining(j, endIdx, k, mainArray, helperArray, animations);
}

function fillRemaining(
  startIdx,
  endIdx,
  mainArrayIdx,
  mainArray,
  helperArray,
  animations
) {
  while (startIdx <= endIdx) {
    let informationObject = {
      leftComparison: startIdx,
      rightComparison: startIdx,
      insertAt: mainArrayIdx,
      insertHeight: helperArray[startIdx],
    };
    mainArray[mainArrayIdx++] = helperArray[startIdx++];
    animations.push(informationObject);
  }
}

export default mergeSort;
