"use client"

import { useEffect, useState, useCallback } from "react"
import AlgorithmVisual from "./algorithm-visual"
import { bubbleSort, mergeSort, quickSort, insertionSort, selectionSort, heapSort } from "@/lib/algorithms"
import type { VisualizationStep } from "@/lib/types"
import { useVisualizerStore } from "@/lib/store"

export default function Visualizer() {
  const { arraySize, speed, isRunning, setIsRunning, customArray, selectedAlgorithm } = useVisualizerStore()

  const [state, setState] = useState<VisualizationStep>({
    array: [],
    comparing: [],
    sorted: [],
    swaps: 0,
    comparisons: 0,
    time: 0,
    operation: undefined,
    message: undefined,
  })

  const generateArray = useCallback(() => {
    if (customArray.length > 0) {
      return customArray
    }
    return Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1)
  }, [arraySize, customArray])

  useEffect(() => {
    const initialArray = generateArray()
    setState((prev) => ({
      ...prev,
      array: [...initialArray],
      comparing: [],
      sorted: [],
      swaps: 0,
      comparisons: 0,
      time: 0,
    }))
  }, [arraySize, customArray.length, generateArray])

  useEffect(() => {
    if (!isRunning) return

    const delay = Math.max(1, 101 - speed)

    const runAlgorithm = async () => {
      const initialArray = generateArray()

      setState((prev) => ({
        ...prev,
        array: [...initialArray],
        comparing: [],
        sorted: [],
        swaps: 0,
        comparisons: 0,
        time: 0,
      }))

      const algorithmMap: Record<string, typeof bubbleSort> = {
        bubble: bubbleSort,
        merge: mergeSort,
        quick: quickSort,
        insertion: insertionSort,
        selection: selectionSort,
        heap: heapSort,
      }

      const algorithm = algorithmMap[selectedAlgorithm] || bubbleSort
      await algorithm([...initialArray], setState, delay)

      setIsRunning(false)
    }

    runAlgorithm()
  }, [isRunning, speed, selectedAlgorithm, arraySize, customArray.length, generateArray, setIsRunning])

  return (
    <div>
      <AlgorithmVisual state={state} />
    </div>
  )
}
