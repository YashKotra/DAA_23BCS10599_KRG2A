import type { VisualizationStep } from "./types"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function updateVisualization(
  array: number[],
  comparing: number[],
  sorted: number[],
  swaps: number,
  comparisons: number,
  startTime: number,
  callback: (state: VisualizationStep) => void,
  delay: number,
  operation?: string,
  message?: string,
) {
  await sleep(delay)
  callback({
    array: [...array],
    comparing,
    sorted,
    swaps,
    comparisons,
    time: Date.now() - startTime,
    operation,
    message,
  })
}

export async function bubbleSort(arr: number[], callback: (state: VisualizationStep) => void, delay: number) {
  const array = [...arr]
  let swaps = 0
  let comparisons = 0
  const startTime = Date.now()
  const sorted: number[] = []

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      comparisons++
      const msg = `Comparing array[${j}]=${array[j]} with array[${j + 1}]=${array[j + 1]}`
      await updateVisualization(
        array,
        [j, j + 1],
        sorted,
        swaps,
        comparisons,
        startTime,
        callback,
        delay,
        "compare",
        msg,
      )

      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        swaps++
        const swapMsg = `Swapped: array[${j}]=${array[j + 1]} ↔ array[${j + 1}]=${array[j]}`
        await updateVisualization(
          array,
          [j, j + 1],
          sorted,
          swaps,
          comparisons,
          startTime,
          callback,
          delay,
          "swap",
          swapMsg,
        )
      }
    }
    sorted.push(array.length - i - 1)
    const placeMsg = `Element ${array[array.length - i - 1]} placed in correct position`
    await updateVisualization(array, [], sorted, swaps, comparisons, startTime, callback, delay, "place", placeMsg)
  }
  sorted.push(0)
  await updateVisualization(
    array,
    [],
    sorted,
    swaps,
    comparisons,
    startTime,
    callback,
    delay,
    "complete",
    "Sorting complete!",
  )
}

export async function insertionSort(arr: number[], callback: (state: VisualizationStep) => void, delay: number) {
  const array = [...arr]
  let swaps = 0
  let comparisons = 0
  const startTime = Date.now()
  const sorted: number[] = [0]

  for (let i = 1; i < array.length; i++) {
    const key = array[i]
    let j = i - 1
    const msg = `Inserting element ${key} at position ${i}`
    await updateVisualization(array, [i], sorted, swaps, comparisons, startTime, callback, delay, "start", msg)

    while (j >= 0 && array[j] > key) {
      comparisons++
      const cmpMsg = `Comparing ${array[j]} > ${key}, shifting left`
      await updateVisualization(
        array,
        [j, i],
        sorted,
        swaps,
        comparisons,
        startTime,
        callback,
        delay,
        "compare",
        cmpMsg,
      )
      array[j + 1] = array[j]
      swaps++
      j--
    }
    array[j + 1] = key
    sorted.push(i)
    const placeMsg = `Element ${key} inserted in correct position`
    await updateVisualization(array, [], sorted, swaps, comparisons, startTime, callback, delay, "place", placeMsg)
  }
  await updateVisualization(
    array,
    [],
    sorted,
    swaps,
    comparisons,
    startTime,
    callback,
    delay,
    "complete",
    "Sorting complete!",
  )
}

export async function selectionSort(arr: number[], callback: (state: VisualizationStep) => void, delay: number) {
  const array = [...arr]
  let swaps = 0
  let comparisons = 0
  const startTime = Date.now()
  const sorted: number[] = []

  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i
    const msg = `Finding minimum from position ${i} onwards`
    await updateVisualization(array, [i], sorted, swaps, comparisons, startTime, callback, delay, "start", msg)

    for (let j = i + 1; j < array.length; j++) {
      comparisons++
      const cmpMsg = `Comparing array[${j}]=${array[j]} with min=${array[minIdx]}`
      await updateVisualization(
        array,
        [i, j, minIdx],
        sorted,
        swaps,
        comparisons,
        startTime,
        callback,
        delay,
        "compare",
        cmpMsg,
      )

      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      ;[array[i], array[minIdx]] = [array[minIdx], array[i]]
      swaps++
      const swapMsg = `Swapped position ${i} (${array[minIdx]}) with minimum ${array[i]}`
      await updateVisualization(
        array,
        [i, minIdx],
        sorted,
        swaps,
        comparisons,
        startTime,
        callback,
        delay,
        "swap",
        swapMsg,
      )
    }

    sorted.push(i)
    const placeMsg = `Element ${array[i]} placed in sorted position`
    await updateVisualization(array, [], sorted, swaps, comparisons, startTime, callback, delay, "place", placeMsg)
  }
  sorted.push(array.length - 1)
  await updateVisualization(
    array,
    [],
    sorted,
    swaps,
    comparisons,
    startTime,
    callback,
    delay,
    "complete",
    "Sorting complete!",
  )
}

export async function quickSort(arr: number[], callback: (state: VisualizationStep) => void, delay: number) {
  const array = [...arr]
  let swaps = 0
  let comparisons = 0
  const startTime = Date.now()
  const sorted: number[] = []

  async function partition(low: number, high: number) {
    const pivot = array[high]
    let i = low - 1
    const msg = `Partitioning with pivot=${pivot}`
    await updateVisualization(array, [high], sorted, swaps, comparisons, startTime, callback, delay, "pivot", msg)

    for (let j = low; j < high; j++) {
      comparisons++
      const cmpMsg = `Comparing array[${j}]=${array[j]} with pivot ${pivot}`
      await updateVisualization(
        array,
        [j, high],
        sorted,
        swaps,
        comparisons,
        startTime,
        callback,
        delay,
        "compare",
        cmpMsg,
      )

      if (array[j] < pivot) {
        i++
        ;[array[i], array[j]] = [array[j], array[i]]
        swaps++
        const swapMsg = `Swapped array[${i}]=${array[j]} with array[${j}]=${array[i]}`
        await updateVisualization(
          array,
          [i, j],
          sorted,
          swaps,
          comparisons,
          startTime,
          callback,
          delay,
          "swap",
          swapMsg,
        )
      }
    }
    ;[array[i + 1], array[high]] = [array[high], array[i + 1]]
    swaps++
    return i + 1
  }

  async function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = await partition(low, high)
      sorted.push(pi)
      await quickSortHelper(low, pi - 1)
      await quickSortHelper(pi + 1, high)
    } else if (low === high) {
      sorted.push(low)
    }
  }

  await quickSortHelper(0, array.length - 1)
  await updateVisualization(
    array,
    [],
    sorted,
    swaps,
    comparisons,
    startTime,
    callback,
    delay,
    "complete",
    "Sorting complete!",
  )
}

export async function mergeSort(arr: number[], callback: (state: VisualizationStep) => void, delay: number) {
  const array = [...arr]
  let swaps = 0
  let comparisons = 0
  const startTime = Date.now()
  const sorted: number[] = []

  async function merge(left: number, mid: number, right: number) {
    const leftArr = array.slice(left, mid + 1)
    const rightArr = array.slice(mid + 1, right + 1)
    let i = 0,
      j = 0,
      k = left
    const msg = `Merging arrays from position ${left} to ${right}`
    await updateVisualization(
      array,
      [left, right],
      sorted,
      swaps,
      comparisons,
      startTime,
      callback,
      delay,
      "merge",
      msg,
    )

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++
      const cmpMsg = `Comparing ${leftArr[i]} ≤ ${rightArr[j]}`
      await updateVisualization(
        array,
        [i + left, j + mid + 1],
        sorted,
        swaps,
        comparisons,
        startTime,
        callback,
        delay,
        "compare",
        cmpMsg,
      )

      if (leftArr[i] <= rightArr[j]) {
        array[k++] = leftArr[i++]
      } else {
        array[k++] = rightArr[j++]
      }
      swaps++
    }

    while (i < leftArr.length) array[k++] = leftArr[i++]
    while (j < rightArr.length) array[k++] = rightArr[j++]
  }

  async function mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      await mergeSortHelper(left, mid)
      await mergeSortHelper(mid + 1, right)
      await merge(left, mid, right)
    }
  }

  await mergeSortHelper(0, array.length - 1)
  for (let i = 0; i < array.length; i++) sorted.push(i)
  await updateVisualization(
    array,
    [],
    sorted,
    swaps,
    comparisons,
    startTime,
    callback,
    delay,
    "complete",
    "Sorting complete!",
  )
}

export async function heapSort(arr: number[], callback: (state: VisualizationStep) => void, delay: number) {
  const array = [...arr]
  let swaps = 0
  let comparisons = 0
  const startTime = Date.now()
  const sorted: number[] = []

  async function heapify(n: number, i: number) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && array[left] > array[largest]) {
      comparisons++
      largest = left
    }
    if (right < n && array[right] > array[largest]) {
      comparisons++
      largest = right
    }

    if (largest !== i) {
      ;[array[i], array[largest]] = [array[largest], array[i]]
      swaps++
      const msg = `Swapped heap elements at positions ${i} and ${largest}`
      await updateVisualization(
        array,
        [i, largest],
        sorted,
        swaps,
        comparisons,
        startTime,
        callback,
        delay,
        "swap",
        msg,
      )
      await heapify(n, largest)
    }
  }

  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    await heapify(array.length, i)
  }

  for (let i = array.length - 1; i > 0; i--) {
    ;[array[0], array[i]] = [array[i], array[0]]
    swaps++
    sorted.unshift(i)
    const msg = `Extracted max ${array[i]} to position ${i}`
    await updateVisualization(array, [0, i], sorted, swaps, comparisons, startTime, callback, delay, "swap", msg)
    await heapify(i, 0)
  }
  sorted.unshift(0)
  await updateVisualization(
    array,
    [],
    sorted,
    swaps,
    comparisons,
    startTime,
    callback,
    delay,
    "complete",
    "Sorting complete!",
  )
}
