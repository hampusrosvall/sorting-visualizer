import React from "react";
import "./SortingVisualizer.css";
import heapSort from "../sortingAlgorithms/heapSort.js";
import quickSort from "../sortingAlgorithms/quickSort.js";

const LOWERBOUND = 5;
const UPPERBOUND = 750;
const SIZE = 230;
const STANDARD_COLOR = "white";
const COMPARING_COLOR = "red";
const SPEED = 15;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
    document.body.style.backgroundColor = "black";
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

  async quickSortAsync() {
    const [comparisons, sortedArray] = quickSort(this.state.array.slice());
    testQuickSort(sortedArray, this.state.array.slice());

    const states = ["HIGHLIGHT", "SWAP_HEIGHTS", "DEHIGHLIGHT"];

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
            updateColors(left, right, arrayBars, color);
          } else if (currentState === "SWAP_HEIGHTS" && didSwap) {
            await sleep(SPEED);
            updateHeights(left, right, arrayBars);
          }
        }
      }
    }
  }

  async heapSort() {
    const states = ["HIGHLIGHT", "SWAP_HEIGHTS", "DEHIGHLIGHT"];
    const information = heapSort(this.state.array.slice());

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
          updateColors(firstIdx, secondIdx, arrayBars, color);
        } else if (currentState === "SWAP_HEIGHTS" && elem.swap) {
          await sleep(SPEED);
          updateHeights(firstIdx, secondIdx, arrayBars);
        }
      }
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
        <button className="button" onClick={() => this.quickSortAsync()}>
          Quick Sort
        </button>
      </div>
    );
  }
}

function generateRandomNumber(lowerBound, upperBound) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}

function testQuickSort(sortedArray, unSortedArray) {
  const buildInSort = unSortedArray.slice().sort((a, b) => a - b);
  console.log(JSON.stringify(sortedArray) === JSON.stringify(buildInSort));
}

function updateColors(firstIdx, secondIdx, bars, color) {
  const firstBarStyle = bars[firstIdx].style;
  const secondBarStyle = bars[secondIdx].style;
  firstBarStyle.backgroundColor = color;
  secondBarStyle.backgroundColor = color;
}

function updateHeights(firstIdx, secondIdx, bars) {
  const firstBarStyle = bars[firstIdx].style;
  const secondBarStyle = bars[secondIdx].style;
  const tmpHeight = firstBarStyle.height;
  firstBarStyle.height = secondBarStyle.height;
  secondBarStyle.height = tmpHeight;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
