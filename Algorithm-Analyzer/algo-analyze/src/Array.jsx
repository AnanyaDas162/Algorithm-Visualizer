import React from "react";
import { useState } from "react";
import './App.css';
import Header from './Header.jsx';
import { ReactDOM } from "react";

const Array=()=>{
  const [array, setArray] = useState([]);
  const [arrayLength, setArrayLength]=useState(20);
  const [speed, setSpeed] = useState(25);
  const [sortType, setSortType]=useState("bubble");
  const [sorting, setSorting] = useState(false);


  const handleLength=(event)=>{
    if (event.target.value > 98)
    {
      setArrayLength(98);
      alert("Enter array length maximum to 99");
    }
    else if (event.target.value< 0){
      setArrayLength(0);
      alert("Array length should be greater or equal to 0");
    }
    else {
      setArrayLength(Math.floor(event.target.value));
    }
}
    
const handleSpeed=(event)=>{
    setSpeed(event.target.value);
}

const handleSortType=(event)=>{
    setSortType(event.target.value);
}

const handleSort=()=>{
  if (sortType === "bubble"){
    visualizeBubbleSort();
  }
  else if (sortType === "insertion"){
    insertionSort();
  }
  else if (sortType === "selection"){
    selectionSort();
  }
  else if (sortType === "quick"){
    setSorting(true);
    let newArray = [...array]; // Copy the array to avoid mutating the original state
    quickSort(newArray, 0, newArray.length - 1);
  }
  else if (sortType === "merge") {
    setSorting(true);
    let newArray = [...array];
    mergeSort(newArray, 0, newArray.length - 1);
  }
  else if (sortType === "heap") {
    setSorting(true);
    let newArray = [...array];
    heapSort(newArray);
  }
}


  function generateRandomArray(length) {
    let newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    setArray(newArray);
  }

// Heap Sort

async function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i);
  }

  // One by one extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    setArray([...arr]);
    await sleep(speed);

    // Call max heapify on the reduced heap
    await heapify(arr, i, 0);
  }
}

async function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    setArray([...arr]);
    await sleep(speed);

    // Recursively heapify the affected sub-tree
    await heapify(arr, n, largest);
  }
}


//Bubble Sort

  async function visualizeBubbleSort() {
    setSorting(true);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        await sleep(speed); // Adjust the delay here
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          setArray([...array]);
        }
        
      }
    }
    setSorting(false);
  }



  // Insertion Sort

  async function insertionSort()
  {
    setSorting(true);
      let i, key, j;
      for (i = 1; i < array.length; i++) {
          key = array[i];
          j = i - 1;
   
          // Move elements of arr[0..i-1],
          // that are greater than key, 
          // to one position ahead of their
          // current position
          while (j >= 0 && array[j] > key) {
            await sleep(speed); 
              array[j + 1] = array[j];
              j = j - 1;
              setArray([...array]);
          }
          array[j + 1] = key;
          setArray([...array]);
      }
      setSorting(false);
  }


  //Selection Sort

  async function selectionSort() 
{ 
  setSorting(true);
  setSpeed(50);
  let newArray = [...array]; // Copy the array to avoid mutating the original state
  let i, j, min_idx;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < newArray.length - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < newArray.length; j++) {
      if (newArray[j] < newArray[min_idx]) min_idx = j;
      // No need for await here as we're not visually updating in each iteration
    }

    // Swap the found minimum element with the first element
    if (min_idx !== i) {
      let temp = newArray[min_idx];
      newArray[min_idx] = newArray[i];
      newArray[i] = temp;
      // Update the state after each swap to reflect the changes
      setArray([...newArray]);
      await sleep(speed); // If you want to visualize each swap, you can use await here
    }
  }
  setSorting(false);
  setSpeed(25);
} 

// Quick Sort 

async function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high; j++) {
    if (arr[j] < pivot) {
      i++;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      setArray([...arr]);
      await sleep(speed);
    }
  }

  let t = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = t;
  setArray([...arr]);
  await sleep(speed);
  return i + 1;
}

async function quickSort(arr, low, high) {
  setSorting(true);
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
  setSorting(false);
}

// Merge Sort

async function mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  const mid = Math.floor((l + r) / 2);
  await mergeSort(arr, l, mid);
  await mergeSort(arr, mid + 1, r);
  await merge(arr, l, mid, r);
}

async function merge(arr, l, mid, r) {
  const n1 = mid - l + 1;
  const n2 = r - mid;

  // Create temporary arrays
  const L = [];
  const R =[];

  // Copy data to temporary arrays L[] and R[]
  for (let i = 0; i < n1; ++i) {
    L[i] = arr[l + i];
  }
  for (let j = 0; j < n2; ++j) {
    R[j] = arr[mid + 1 + j];
  }

  // Merge the temporary arrays back into arr[l..r]
  let i = 0,
    j = 0,
    k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
    setArray([...arr]); // Update the array for visualization
    await sleep(speed); // Add a delay for visualization
  }

  // Copy the remaining elements of L[], if any
  while (i < n1) {
    arr[k++] = L[i++];
    setArray([...arr]);
    await sleep(speed);
  }

  // Copy the remaining elements of R[], if any
  while (j < n2) {
    arr[k++] = R[j++];
    setArray([...arr]);
    await sleep(speed);
  }
}



  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <>
    <Header></Header>
    <div className="App flex justify-center items-center bg-black flex-col-reverse">
        
        <div className="h-full flex justify-center items-center menubar absolute left-0 bg-green-600 border-r-4 border-black flex-col flex-wrap">
                  <div className="w-full flex justify-center items-center flex-col flex-wrap p-5">
                       <h6 className="text-white font-medium p-3">Enter array length :</h6>
                       <input type="number" className="bg-green-100 w-full input-btn" onChange={handleLength}></input>
                      
                  </div>
                  <div className="w-full flex justify-center items-center flex-col flex-wrap p-5">
                       <h6 className="text-white font-medium p-3">Select the sorting algorithm :</h6>
                       <select className="select bg-green-100 w-full input-btn" onChange={handleSortType}>
                            <option value="bubble">Bubble Sort</option>
                            <option value="insertion">Insertion Sort</option>
                            <option value="selection">Selection Sort</option>
                            <option value="quick">Quick Sort</option>
                            <option value="merge">Merge Sort</option>
                            <option value="heap">Heap Sort</option>
                       </select>
                
                  </div>
                  <div className="w-full flex justify-center items-center flex-col flex-wrap p-5">
                       <h6 className="text-white font-medium p-3">Enter speed :</h6>
                       <input type="number" placeholder="between 50 to 100 recommended" onChange={handleSpeed} className="bg-green-100 w-full input-btn"></input>
                  </div>
             </div>
        <div className="array-container w-screen flex justify-center items-center scroll-m-0">
            <div className='flex w-screen h-full justify-center items-center scroll-m-0'>
            {array.map((num, index) => (
            <div
              className="bar"
              key={index}
              style={{ height: `${num * 3}px` }}
            ></div>
          ))}
            </div>
        </div>
        <div className='w-full flex justify-center items-center h-40 array-btn-container'>
              <button onClick={() => generateRandomArray(arrayLength)} className="bg-green-600 p-3 text-white rounded m-8 array-btn">Generate Array</button>
              <button onClick={handleSort} className="bg-green-600 p-3 text-white rounded m-8 array-btn">
               Sort Array
              </button>
        </div>
        {console.log(arrayLength)}
        {console.log(sortType)}
    </div>
    </>
    );
}

export default Array;