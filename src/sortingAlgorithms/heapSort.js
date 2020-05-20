export const heapSort = (array) => {
    let informations = []; 
    buildMaxHeap(array, informations); 

    for (let endIdx = array.length - 1; endIdx > 0; endIdx--){
        swap(0, endIdx, array); 
        informations.push({"comparing":[0, endIdx], "swap": true, "final": endIdx});
        bubbleDown(0, endIdx - 1, array, informations); 
    }

    return informations; 
}; 

function buildMaxHeap(array, informations) {
    let parentIdx = Math.floor((array.length - 1) / 2); 
    let endIdx = array.length - 1;
    while (parentIdx >= 0){
        bubbleDown(parentIdx, endIdx, array, informations);
        parentIdx--; 
    }
}

function bubbleDown(startIdx, endIdx, heap, informations){
    let currentIdx = startIdx; 
    let childOne = 2 * startIdx + 1; 
    let childTwo, largestChild; 

    while (childOne <= endIdx) {
        childTwo = childOne + 1 <= endIdx ? childOne + 1 : -1; 
         
        if (childTwo !== -1 && heap[childTwo] > heap[childOne]){
            largestChild = childTwo; 
        } else {
            largestChild = childOne; 
        }
        let information = {}; 
        information.comparing = [largestChild, currentIdx]; 
        information.swap = false; 
        if (heap[largestChild] > heap[currentIdx]){
            swap(currentIdx, largestChild, heap); 
            information.swap = true; 
            informations.push(information)
            currentIdx = largestChild; 
            childOne = 2 * currentIdx + 1; 
        } else {
            informations.push(information)
            return; 
        }
    }
}

function swap(i, j, a){
    const temp = a[j]; 
    a[j] = a[i]; 
    a[i] = temp; 
}

export default heapSort; 