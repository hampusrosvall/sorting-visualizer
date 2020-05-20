import React from 'react'; 
import './SortingVisualizer.css'; 
import heapSort from '../sortingAlgorithms/heapSort.js'; 
import quickSort from '../sortingAlgorithms/quickSort.js'; 

const LOWERBOUND = 5; 
const UPPERBOUND = 300; 
const SIZE = 60; 
const STANDARD_COLOR = "paleturquoise"; 
const COMPARING_COLOR = "lightcoral"; 
const FINAL_COLOR = "lightgreen"; 
const SPEED = 50; 

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray(){
        const array = []; 
        for (let i = 0; i < SIZE; i++){
            array.push(generateRandomNumber(LOWERBOUND, UPPERBOUND)); 
        }
        this.setState({array: array});

        const arrayBars = document.getElementsByClassName("array-bar"); 
        for (let bar of arrayBars){
            bar.style.backgroundColor = STANDARD_COLOR; 
        }
    }

    quickSort(){
        const comparisons = quickSort(this.state.array.slice());
        const PIVOT_COLOR = "yellow"; 

        let outerSpeed = 1; 
        for (let comparison of comparisons){
            const arrayBars = document.getElementsByClassName("array-bar")

            setTimeout(() => {
                let pivotIdx = comparison.pivotIdx; 
                let pivotStyle = arrayBars[pivotIdx].style; 
                pivotStyle.backgroundColor = PIVOT_COLOR; 
            }, SPEED * outerSpeed); 
            
            let innerSpeed = 1; 
            for (let history of comparison.history){
                setTimeout(() => {
                    let left = history.left; 
                    let right = history.right; 
                    let didSwap = history.swap; 
                    let leftBarStyle = arrayBars[left].style; 
                    let rightBarStyle = arrayBars[right].style; 

                    leftBarStyle.backgroundColor = COMPARING_COLOR; 
                    rightBarStyle.backgroundColor = COMPARING_COLOR;

                    if (didSwap){
                        const tmpHeight = leftBarStyle.height; 
                        leftBarStyle.height = rightBarStyle.height; 
                        rightBarStyle.height = tmpHeight; 

                    }
                }, SPEED * (outerSpeed + innerSpeed));
                innerSpeed++; 
            }
            outerSpeed++; 
        }
    }

    heapSort(){
        const states = ["HIGHLIGHT", "SWAP_HEIGHTS", "DEHIGHLIGHT"]; 
        const information = heapSort(this.state.array.slice());
        for (let i = 0; i < information.length; i ++){
            const elem = information[i]; 
            const [firstIdx, secondIdx] = elem.comparing; 
            const arrayBars = document.getElementsByClassName("array-bar"); 

            for (let k = 0; k < states.length; k++){
                const currentState = states[k];
                if (currentState === "HIGHLIGHT" || currentState === "DEHIGHLIGHT") {
                    let color; 
                    if (elem.final){
                        color = FINAL_COLOR;
                    } else {
                        color = currentState === "HIGHLIGHT" ? COMPARING_COLOR : STANDARD_COLOR;
                    }
                    setTimeout(() => {
                        setComparingColors(firstIdx, secondIdx, arrayBars, color); 
                        }, (i + k) * SPEED);
                } else if (currentState === "SWAP_HEIGHTS" && elem.swap){
                    setTimeout(() => {
                        updateBarHeights(firstIdx, secondIdx, arrayBars, i);  
                    }, (i + k) * SPEED);
                }
            }      
        }
    }

    render(){
        const {array} = this.state; 
        return (
            <div classname="background">
            <div className="array-container">
            {array.map((value, index) => (
                <div 
                    className="array-bar"
                    key={index}
                    style={{height: `${value}px`}}>
                </div>
            ))}
            </div>
            <button className="button" onClick={() => this.resetArray()}>Generate new array</button>
            <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
            <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
            </div>
        )
    }
}

function setComparingColors(firstIdx, secondIdx, bars, color){
    const firstBarStyle = bars[firstIdx].style; 
    const secondBarStyle = bars[secondIdx].style;
    firstBarStyle.backgroundColor = color;
    secondBarStyle.backgroundColor = color;
}

function updateBarHeights(firstIdx, secondIdx, bars){
    const firstBarStyle = bars[firstIdx].style; 
    const secondBarStyle = bars[secondIdx].style;
    const tmpHeight = firstBarStyle.height; 
    firstBarStyle.height = secondBarStyle.height;
    secondBarStyle.height = tmpHeight; 
}

function generateRandomNumber(lowerBound, upperBound){
    return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound); 
}

// function testSortingAlgorithm(sortingAlgo){
//     for (let i = 0; i < 100; i++){
//         const size = generateRandomNumber(1, 1000);
//         let unSortedArray = []; 
//         for (let j = 0; j < size; j++){
//             unSortedArray.push(generateRandomNumber(1, 1000)); 
//         }

//         const sortedArray = sortingAlgo(unSortedArray.slice()); 
//         const builtInSort = unSortedArray.slice().sort((a, b) => a - b); 
//         console.log(JSON.stringify(sortedArray) === JSON.stringify(builtInSort)); 
//     }
// } 