export const quickSort = (array) => {
    let comparisons = []; 
    quickSortHelper(0, array.length - 1, array, comparisons); 
    return comparisons; 
}; 

function quickSortHelper(startIdx, endIdx, array, comparisons){
    if (startIdx >= endIdx) return; 
    const pivotIdx = generatePivotIdx(startIdx, endIdx, "first"); 

    let history = []; 

    let left = startIdx, right = endIdx; 
    while (left <= right){
        let currentComp = {"left": left, "right": right, "swap": false}; 
    
        if (array[left] > array[pivotIdx] && array[right] < array[pivotIdx]){
            swap(left, right, array); 
            currentComp.swap = true; 
        }
        if (array[left] <= array[pivotIdx]) left++; 
        if (array[right] >= array[pivotIdx]) right--; 

        history.push(currentComp)
    }

    let finalSwap = {"left": pivotIdx, "right": right, "swap": true};
    swap(right, pivotIdx, array); 
    
    history.push(finalSwap); 
    let informationObject = {"pivotIdx": pivotIdx, "history": history}; 
    comparisons.push(informationObject); 

    quickSortHelper(startIdx, right - 1, array, comparisons); 
    quickSortHelper(right + 1, endIdx, array, comparisons); 
}

function generatePivotIdx(startIdx, endIdx, strategy){
    if (strategy === "first") return startIdx; 
}

function swap(i, j, a){
    const tmp = a[i]; 
    a[i] = a[j]; 
    a[j] = tmp; 
}

export default quickSort;