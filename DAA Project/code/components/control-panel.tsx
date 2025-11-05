"use client"

import { useVisualizerStore } from "@/lib/store"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const ALGORITHMS = [
  { id: "bubble", name: "Bubble Sort", color: "bg-blue-500" },
  { id: "insertion", name: "Insertion Sort", color: "bg-purple-500" },
  { id: "selection", name: "Selection Sort", color: "bg-orange-500" },
  { id: "quick", name: "Quick Sort", color: "bg-red-500" },
  { id: "merge", name: "Merge Sort", color: "bg-green-500" },
  { id: "heap", name: "Heap Sort", color: "bg-pink-500" },
]

export default function ControlPanel() {
  const {
    arraySize,
    setArraySize,
    speed,
    setSpeed,
    isRunning,
    setIsRunning,
    customArray,
    setCustomArray,
    selectedAlgorithm,
    setSelectedAlgorithm,
  } = useVisualizerStore()
  const [inputValue, setInputValue] = useState("")

  const handleCustomArrayInput = () => {
    const numbers = inputValue
      .split(",")
      .map((n) => Number.parseInt(n.trim()))
      .filter((n) => !isNaN(n))

    if (numbers.length > 0 && numbers.length <= 50) {
      setCustomArray(numbers)
      setArraySize(numbers.length)
      setInputValue("")
    }
  }

  const handleRandomArray = () => {
    setCustomArray([])
    setInputValue("")
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Select Algorithm</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {ALGORITHMS.map((algo) => (
            <Button
              key={algo.id}
              onClick={() => setSelectedAlgorithm(algo.id)}
              disabled={isRunning}
              variant={selectedAlgorithm === algo.id ? "default" : "outline"}
              className="text-xs"
              size="sm"
            >
              {algo.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Array Input */}
      <div className="bg-secondary/30 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Custom Array (or use Random)</h3>
        <div className="flex gap-2 flex-wrap items-end">
          <div className="flex-1 min-w-64">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Enter numbers separated by commas (e.g., 45, 23, 51, 12, 98)
            </label>
            <Input
              type="text"
              placeholder="45, 23, 51, 12, 98, 34, 67"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isRunning}
              className="font-mono text-sm"
            />
          </div>
          <Button onClick={handleCustomArrayInput} disabled={isRunning} size="sm">
            Load Array
          </Button>
          <Button onClick={handleRandomArray} variant="outline" disabled={isRunning} size="sm">
            Random
          </Button>
        </div>
      </div>

      {/* Current Array Display */}
      {customArray.length > 0 && (
        <div className="bg-secondary/20 rounded-lg p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Current Array:</p>
          <div className="flex flex-wrap gap-2">
            {customArray.map((num, idx) => (
              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-sm font-bold">
                {num}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Array Size Control */}
        {customArray.length === 0 && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground">
              Array Size: <span className="text-primary">{arraySize}</span>
            </label>
            <Slider
              value={[arraySize]}
              onValueChange={(value) => setArraySize(value[0])}
              min={5}
              max={50}
              step={1}
              disabled={isRunning}
            />
            <p className="text-xs text-muted-foreground">Adjust the number of elements to sort</p>
          </div>
        )}

        {/* Speed Control */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">
            Speed: <span className="text-primary">{speed}%</span>
          </label>
          <Slider value={[speed]} onValueChange={(value) => setSpeed(value[0])} min={1} max={100} step={1} />
          <p className="text-xs text-muted-foreground">1% (Slow) to 100% (Fast)</p>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={() => setIsRunning(!isRunning)}
        className="w-full"
        size="lg"
        variant={isRunning ? "destructive" : "default"}
      >
        {isRunning ? "Stop Sorting" : "Start Sorting"}
      </Button>
    </div>
  )
}
