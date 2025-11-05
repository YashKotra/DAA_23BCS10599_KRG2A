"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const algorithmDetails = [
  {
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they're in wrong order. Simple but inefficient for large datasets.",
    bestFor: "Educational purposes, nearly sorted data",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
    space: "O(1)",
    stable: "Yes",
  },
  {
    name: "Merge Sort",
    description:
      "Divide-and-conquer algorithm that divides array into halves, sorts them recursively, and merges them back. Guaranteed O(n log n) performance.",
    bestFor: "Large datasets, guaranteed performance, external sorting",
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
  },
  {
    name: "Quick Sort",
    description:
      "Divides array using a pivot element and recursively sorts the partitions. Very efficient in practice with good cache locality.",
    bestFor: "General purpose, in-place sorting, average case performance",
    worstCase: "O(n²)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    space: "O(log n)",
    stable: "No",
  },
  {
    name: "Insertion Sort",
    description:
      "Builds final sorted array one element at a time by inserting elements into the sorted portion. Works well with small or nearly sorted data.",
    bestFor: "Small datasets, nearly sorted data, online sorting",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
    space: "O(1)",
    stable: "Yes",
  },
  {
    name: "Selection Sort",
    description:
      "Selects minimum element repeatedly and places it at the beginning. Simple but makes many comparisons regardless of data state.",
    bestFor: "Educational purposes, when memory writes are expensive",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n²)",
    space: "O(1)",
    stable: "No",
  },
  {
    name: "Heap Sort",
    description:
      "Uses a heap data structure to sort elements by repeatedly extracting maximum. Guaranteed O(n log n) with constant space.",
    bestFor: "Guaranteed O(n log n) performance, memory constrained systems",
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
    space: "O(1)",
    stable: "No",
  },
]

export default function AlgorithmDetails() {
  const [copiedAlgo, setCopiedAlgo] = useState<string | null>(null)

  const copyToClipboard = (algo: string) => {
    navigator.clipboard.writeText(algo)
    setCopiedAlgo(algo)
    setTimeout(() => setCopiedAlgo(null), 2000)
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-2xl font-bold mb-6 text-card-foreground">Algorithm Analysis & Comparison</h2>

      <Tabs defaultValue="Bubble Sort" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
          {algorithmDetails.map((algo) => (
            <TabsTrigger key={algo.name} value={algo.name} className="text-xs sm:text-sm">
              {algo.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {algorithmDetails.map((algo) => (
          <TabsContent key={algo.name} value={algo.name} className="space-y-4">
            <Card className="p-4 bg-secondary/30">
              <h3 className="text-lg font-semibold mb-2">{algo.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{algo.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Best For:</p>
                  <p className="text-sm text-muted-foreground">{algo.bestFor}</p>
                </div>

                <div className="bg-background rounded p-3">
                  <p className="text-sm font-semibold text-foreground mb-3">Complexity Analysis</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Worst Case:</span>
                      <span className="font-mono font-bold text-primary">{algo.worstCase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Case:</span>
                      <span className="font-mono font-bold text-primary">{algo.averageCase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Case:</span>
                      <span className="font-mono font-bold text-primary">{algo.bestCase}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="text-muted-foreground">Space:</span>
                      <span className="font-mono font-bold text-primary">{algo.space}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stable:</span>
                      <span
                        className={`font-semibold ${algo.stable === "Yes" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {algo.stable}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded p-3">
                <p className="text-xs font-semibold text-foreground mb-2 uppercase">Key Characteristics:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {algo.name === "Bubble Sort" && (
                    <>
                      <li>• Simple to understand and implement</li>
                      <li>• Adaptive - faster on nearly sorted data</li>
                      <li>• Stable sorting algorithm</li>
                      <li>• In-place sorting (no extra space needed)</li>
                    </>
                  )}
                  {algo.name === "Merge Sort" && (
                    <>
                      <li>• Stable sorting algorithm</li>
                      <li>• Guaranteed O(n log n) performance</li>
                      <li>• Divide-and-conquer approach</li>
                      <li>• Requires O(n) extra space for temporary arrays</li>
                      <li>• Good for external sorting and linked lists</li>
                    </>
                  )}
                  {algo.name === "Quick Sort" && (
                    <>
                      <li>• Most efficient in-place sorting</li>
                      <li>• Unstable sorting algorithm</li>
                      <li>• Cache-friendly due to good data locality</li>
                      <li>• Average case very efficient (O(n log n))</li>
                      <li>• Worst case can occur with poor pivot selection</li>
                    </>
                  )}
                  {algo.name === "Insertion Sort" && (
                    <>
                      <li>• Efficient for small datasets (typically n &lt; 50)</li>
                      <li>• Stable sorting algorithm</li>
                      <li>• Online algorithm (can sort as data arrives)</li>
                      <li>• In-place sorting with minimal extra space</li>
                      <li>• Highly efficient on nearly sorted data</li>
                    </>
                  )}
                  {algo.name === "Selection Sort" && (
                    <>
                      <li>• Simple and straightforward implementation</li>
                      <li>• Unstable sorting algorithm</li>
                      <li>• Minimizes memory writes (useful for flash memory)</li>
                      <li>• Always O(n²) - no optimization for nearly sorted data</li>
                      <li>• Consistent performance regardless of input</li>
                    </>
                  )}
                  {algo.name === "Heap Sort" && (
                    <>
                      <li>• Guaranteed O(n log n) performance</li>
                      <li>• In-place sorting with O(1) extra space</li>
                      <li>• Unstable sorting algorithm</li>
                      <li>• Not cache-friendly but very reliable</li>
                      <li>• Used in real-time systems requiring worst-case guarantees</li>
                    </>
                  )}
                </ul>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Comparison Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Quick Comparison Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-2 font-semibold">Algorithm</th>
                <th className="text-center py-3 px-2 font-semibold">Best</th>
                <th className="text-center py-3 px-2 font-semibold">Average</th>
                <th className="text-center py-3 px-2 font-semibold">Worst</th>
                <th className="text-center py-3 px-2 font-semibold">Space</th>
                <th className="text-center py-3 px-2 font-semibold">Stable</th>
              </tr>
            </thead>
            <tbody>
              {algorithmDetails.map((algo) => (
                <tr key={algo.name} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-2 font-semibold">{algo.name}</td>
                  <td className="text-center py-3 px-2 font-mono text-primary">{algo.bestCase}</td>
                  <td className="text-center py-3 px-2 font-mono text-primary">{algo.averageCase}</td>
                  <td className="text-center py-3 px-2 font-mono text-primary">{algo.worstCase}</td>
                  <td className="text-center py-3 px-2 font-mono text-primary">{algo.space}</td>
                  <td className="text-center py-3 px-2">
                    <span
                      className={`font-semibold ${algo.stable === "Yes" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {algo.stable}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
