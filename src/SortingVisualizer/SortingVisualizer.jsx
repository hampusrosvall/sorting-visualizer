import React from "react";
import "./SortingVisualizer.css";
import heapSort from "../sortingAlgorithms/heapSort.js";
import quickSort from "../sortingAlgorithms/quickSort.js";
import mergeSort from "../sortingAlgorithms/mergeSort.js";

const LOWERBOUND = 5;
const UPPERBOUND = 600;
const SIZE = 60;
const STANDARD_COLOR = "paleturquoise";
const COMPARING_COLOR = "red";
const SPEED = 30;

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

  disableButtons() {
    let buttons = document.querySelectorAll("button");
    Array.prototype.map.call(buttons, (button) => (button.disabled = true));
  }

  enableButtons() {
    let buttons = document.querySelectorAll("button");
    Array.prototype.map.call(buttons, (button) => (button.disabled = false));
  }

  async quickSort() {
    this.disableButtons();
    const [comparisons, sortedArray] = quickSort(this.state.array.slice());
    testSortingAlgorithm(sortedArray, this.state.array.slice());

    for (let i = 0; i < comparisons.length; i++) {
      const comparison = comparisons[i];
      const history = comparison.history;

      for (let j = 0; j < history.length; j++) {
        const arrayBars = document.getElementsByClassName("array-bar");
        const currentHistory = history[j];
        const left = currentHistory.left;
        const right = currentHistory.right;
        const didSwap = currentHistory.swap;

        updateColors(left, right, arrayBars, COMPARING_COLOR);
        if (didSwap) {
          let leftStyle = arrayBars[left].style;
          const leftHeight = leftStyle.height;
          let rightStyle = arrayBars[right].style;
          leftStyle.height = rightStyle.height;
          await sleep(SPEED * 1.5);
          rightStyle.height = leftHeight;
          await sleep(SPEED * 1.5);
        }
        updateColors(left, right, arrayBars, STANDARD_COLOR);
      }
    }
    this.enableButtons();
  }

  async heapSort() {
    this.disableButtons();
    const [information, sortedArray] = heapSort(this.state.array.slice());
    testSortingAlgorithm(sortedArray, this.state.array.slice());

    for (let info of information) {
      const left = info.left;
      const right = info.right;
      const didSwap = info.swap;

      const arrayBars = document.getElementsByClassName("array-bar");

      updateColors(left, right, arrayBars, COMPARING_COLOR);
      if (didSwap) {
        let leftStyle = arrayBars[left].style;
        const leftHeight = leftStyle.height;
        let rightStyle = arrayBars[right].style;
        leftStyle.height = rightStyle.height;
        await sleep(SPEED);
        rightStyle.height = leftHeight;
        await sleep(SPEED);
      }
      updateColors(left, right, arrayBars, STANDARD_COLOR);
    }
    this.enableButtons();
  }

  async mergeSort() {
    this.disableButtons();
    const animations = mergeSort(this.state.array.slice());

    for (let animation of animations) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const leftComparison = animation.leftComparison;
      const rightComparison = animation.rightComparison;
      const insertAt = animation.insertAt;
      const insertHeight = animation.insertHeight;

      updateColors(leftComparison, rightComparison, arrayBars, COMPARING_COLOR);
      let insertAtStyle = arrayBars[insertAt].style;

      await sleep(SPEED);
      insertAtStyle.height = `${insertHeight}px`;
      updateColors(leftComparison, rightComparison, arrayBars, STANDARD_COLOR);
    }
    this.enableButtons();
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
        <button className="button" onClick={() => this.mergeSort()}>
          Merge Sort
        </button>
      </div>
    );
  }
}

function generateRandomNumber(lowerBound, upperBound) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}

function testSortingAlgorithm(sortedArray, unSortedArray) {
  const buildInSort = unSortedArray.slice().sort((a, b) => a - b);
  console.log(JSON.stringify(sortedArray) === JSON.stringify(buildInSort));
}

function updateColors(firstIdx, secondIdx, bars, color) {
  const firstBarStyle = bars[firstIdx].style;
  const secondBarStyle = bars[secondIdx].style;
  firstBarStyle.backgroundColor = color;
  secondBarStyle.backgroundColor = color;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
