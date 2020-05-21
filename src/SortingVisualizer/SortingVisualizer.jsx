import React from "react";
import "./SortingVisualizer.css";
import heapSort from "../sortingAlgorithms/heapSort.js";
import quickSort from "../sortingAlgorithms/quickSort.js";

const LOWERBOUND = 5;
const UPPERBOUND = 300;
const SIZE = 230;
const STANDARD_COLOR = "paleturquoise";
const COMPARING_COLOR = "lightcoral";
const SPEED = 1;
const ALTER_SPEED = 0.5;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < SIZE; i++) {
      array.push(generateRandomNumber(LOWERBOUND, UPPERBOUND));
    }
    this.setState({ array: array });

    const arrayBars = document.getElementsByClassName("array-bar");
    for (let bar of arrayBars) {
      bar.style.backgroundColor = STANDARD_COLOR;
    }
  }

  quickSort() {
    const [comparisons, sortedArray] = quickSort(this.state.array.slice());
    testQuickSort(sortedArray, this.state.array.slice());
    const states = ["HIGHLIGHT", "SWAP_HEIGHTS", "DEHIGHLIGHT"];
    let counts = 1;
    for (let i = 0; i < comparisons.length; i++) {
      const comparison = comparisons[i];
      const history = comparison.history;

      for (let j = 0; j < history.length; j++) {
        const arrayBars = document.getElementsByClassName("array-bar");
        const currentHistory = history[j];
        const left = currentHistory.left;
        const right = currentHistory.right;
        const didSwap = currentHistory.swap;

        for (let k = 0; k < states.length; k++) {
          const currentState = states[k];
          let color;
          if (currentState === "HIGHLIGHT" || currentState === "DEHIGHLIGHT") {
            color =
              currentState === "HIGHLIGHT" ? COMPARING_COLOR : STANDARD_COLOR;
            setTimeout(() => {
              setComparingColors(left, right, arrayBars, color);
            }, counts * ALTER_SPEED * SPEED);
          } else if (currentState === "SWAP_HEIGHTS" && didSwap) {
            setTimeout(() => {
              updateBarHeights(left, right, arrayBars);
            }, counts * ALTER_SPEED * SPEED);
          }
          counts++;
        }
        counts++;
      }
      counts++;
    }
  }

  heapSort() {
    const states = ["HIGHLIGHT", "SWAP_HEIGHTS", "DEHIGHLIGHT"];
    const information = heapSort(this.state.array.slice());
    let counts = 1;
    for (let i = 0; i < information.length; i++) {
      const elem = information[i];
      const [firstIdx, secondIdx] = elem.comparing;
      const arrayBars = document.getElementsByClassName("array-bar");

      for (let k = 0; k < states.length; k++) {
        const currentState = states[k];
        if (currentState === "HIGHLIGHT" || currentState === "DEHIGHLIGHT") {
          let color;
          color =
            currentState === "HIGHLIGHT" ? COMPARING_COLOR : STANDARD_COLOR;
          setTimeout(() => {
            setComparingColors(firstIdx, secondIdx, arrayBars, color);
          }, counts * ALTER_SPEED * SPEED);
        } else if (currentState === "SWAP_HEIGHTS" && elem.swap) {
          setTimeout(() => {
            updateBarHeights(firstIdx, secondIdx, arrayBars);
          }, counts * ALTER_SPEED * SPEED);
        }
        counts++;
      }
      counts++;
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div className="background">
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <button className="button" onClick={() => this.resetArray()}>
          Generate new array
        </button>
        <button className="button" onClick={() => this.heapSort()}>
          Heap Sort
        </button>
        <button className="button" onClick={() => this.quickSort()}>
          Quick Sort
        </button>
      </div>
    );
  }
}

function setComparingColors(firstIdx, secondIdx, bars, color) {
  const firstBarStyle = bars[firstIdx].style;
  const secondBarStyle = bars[secondIdx].style;
  firstBarStyle.backgroundColor = color;
  secondBarStyle.backgroundColor = color;
}

function updateBarHeights(firstIdx, secondIdx, bars) {
  const firstBarStyle = bars[firstIdx].style;
  const secondBarStyle = bars[secondIdx].style;
  const tmpHeight = firstBarStyle.height;
  firstBarStyle.height = secondBarStyle.height;
  secondBarStyle.height = tmpHeight;
}

function generateRandomNumber(lowerBound, upperBound) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}

function testQuickSort(sortedArray, unSortedArray) {
  const buildInSort = unSortedArray.slice().sort((a, b) => a - b);
  console.log(JSON.stringify(sortedArray) === JSON.stringify(buildInSort));
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
