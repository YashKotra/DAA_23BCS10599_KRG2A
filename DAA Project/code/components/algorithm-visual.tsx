"use client"

import type { VisualizationStep } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Info, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useVisualizerStore } from "@/lib/store"

interface AlgorithmVisualProps {
  state: VisualizationStep
}

const algorithmData: Record<
  string,
  { worstCase: string; averageCase: string; bestCase: string; space: string; code: string; description: string }
> = {
  bubble: {
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
    space: "O(1)",
    description:
      "Repeatedly steps through the array, compares adjacent elements and swaps them if they're in wrong order.",
    code: `public static void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`,
  },
  merge: {
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    space: "O(n)",
    description: "Divide-and-conquer algorithm that divides array into halves, recursively sorts them, then merges.",
    code: `public static void mergeSort(int[] arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

private static void merge(int[] arr, int l, 
                         int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int[] L = new int[n1];
  int[] R = new int[n2];
  
  System.arraycopy(arr, l, L, 0, n1);
  System.arraycopy(arr, m + 1, R, 0, n2);
  
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}`,
  },
  quick: {
    worstCase: "O(n²)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    space: "O(log n)",
    description: "Divide-and-conquer algorithm that picks a pivot and partitions array around it recursively.",
    code: `public static void quickSort(int[] arr, int l, int r) {
  if (l < r) {
    int pi = partition(arr, l, r);
    quickSort(arr, l, pi - 1);
    quickSort(arr, pi + 1, r);
  }
}

private static int partition(int[] arr, 
                             int l, int r) {
  int pivot = arr[r];
  int i = l - 1;
  
  for (int j = l; j < r; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  
  int temp = arr[i + 1];
  arr[i + 1] = arr[r];
  arr[r] = temp;
  return i + 1;
}`,
  },
  insertion: {
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
    space: "O(1)",
    description: "Builds the sorted array one item at a time by inserting elements into their correct position.",
    code: `public static void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
}`,
  },
  selection: {
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n²)",
    space: "O(1)",
    description: "Repeatedly finds the minimum element and places it at the beginning of the unsorted portion.",
    code: `public static void selectionSort(int[] arr) {
  for (int i = 0; i < arr.length - 1; i++) {
    int minIdx = i;
    
    for (int j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    int temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
}`,
  },
  heap: {
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    space: "O(1)",
    description: "Uses a heap data structure to repeatedly extract the max element and place it at the end.",
    code: `public static void heapSort(int[] arr) {
  int n = arr.length;
  
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
  
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
}

private static void heapify(int[] arr, 
                           int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  
  if (l < n && arr[l] > arr[largest])
    largest = l;
  if (r < n && arr[r] > arr[largest])
    largest = r;
  
  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, n, largest);
  }
}`,
  },
}

export default function AlgorithmVisual({ state }: AlgorithmVisualProps) {
  const [copied, setCopied] = useState(false)
  const { selectedAlgorithm } = useVisualizerStore()
  const maxValue = 100
  const data = algorithmData[selectedAlgorithm] || algorithmData.bubble

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">
            {Object.keys(algorithmData).find((key) => key === selectedAlgorithm)
              ? algorithmData[selectedAlgorithm].description.split(" ").slice(0, 4).join(" ") + "..."
              : "Algorithm Visualizer"}
          </h2>
          {state.message && (
            <p className="text-sm text-muted-foreground mt-2 font-mono bg-secondary/30 px-3 py-2 rounded">
              {state.message}
            </p>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 hover:bg-secondary rounded cursor-pointer transition-colors">
              <Info className="w-6 h-6 text-muted-foreground hover:text-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{data.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Time Complexity</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Worst</p>
                    <p className="font-mono font-bold text-primary">{data.worstCase}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Average</p>
                    <p className="font-mono font-bold text-primary">{data.averageCase}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Best</p>
                    <p className="font-mono font-bold text-primary">{data.bestCase}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Space Complexity</h4>
                <p className="font-mono font-bold text-sm text-primary">{data.space}</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm">Java Implementation</h4>
                  <Button size="sm" variant="outline" onClick={copyToClipboard} className="h-7 px-2 bg-transparent">
                    <Copy className="w-3 h-3 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <pre className="bg-secondary p-3 rounded text-xs overflow-x-auto text-foreground border border-border">
                  <code>{data.code}</code>
                </pre>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Visualization with bars */}
      <div className="h-80 bg-secondary/30 rounded flex items-end justify-center gap-0.5 p-4 w-full">
        {state.array.length === 0 ? (
          <div className="text-muted-foreground text-lg">Ready to sort...</div>
        ) : (
          state.array.map((value, idx) => {
            let color = "bg-chart-1"
            if (state.sorted.includes(idx)) {
              color = "bg-green-500"
            } else if (state.comparing.includes(idx)) {
              color = "bg-red-500"
            }

            return (
              <div
                key={idx}
                className={`${color} transition-all duration-100 rounded-sm flex-shrink-0 relative group hover:brightness-110`}
                style={{
                  height: `${(value / maxValue) * 100}%`,
                  width: `${100 / state.array.length}%`,
                  minWidth: "1px",
                }}
                title={`Index: ${idx}, Value: ${value}`}
              >
                {state.array.length <= 20 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-foreground text-background px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                    {value}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Array Values Display */}
      {state.array.length > 0 && state.array.length <= 20 && (
        <div className="bg-secondary/30 rounded p-4 max-h-32 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground mb-3">Array Values (Index: Value):</p>
          <div className="flex flex-wrap gap-2">
            {state.array.map((value, idx) => (
              <span
                key={idx}
                className={`px-3 py-2 rounded text-xs font-mono font-bold transition-colors ${
                  state.sorted.includes(idx)
                    ? "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/50"
                    : state.comparing.includes(idx)
                      ? "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/50"
                      : "bg-secondary text-foreground"
                }`}
              >
                {idx}: {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 text-sm">
        <div className="bg-secondary/50 rounded p-3 text-center">
          <div className="text-muted-foreground text-xs font-semibold">Comparisons</div>
          <div className="font-mono font-bold text-foreground text-lg">{state.comparisons}</div>
        </div>
        <div className="bg-secondary/50 rounded p-3 text-center">
          <div className="text-muted-foreground text-xs font-semibold">Swaps</div>
          <div className="font-mono font-bold text-foreground text-lg">{state.swaps}</div>
        </div>
        <div className="bg-secondary/50 rounded p-3 text-center">
          <div className="text-muted-foreground text-xs font-semibold">Time (ms)</div>
          <div className="font-mono font-bold text-foreground text-lg">{state.time}</div>
        </div>
        <div className="bg-secondary/50 rounded p-3 text-center">
          <div className="text-muted-foreground text-xs font-semibold">Array Size</div>
          <div className="font-mono font-bold text-foreground text-lg">{state.array.length}</div>
        </div>
      </div>
    </div>
  )
}
