import { create } from "zustand"

interface VisualizerStore {
  arraySize: number
  setArraySize: (size: number) => void
  speed: number
  setSpeed: (speed: number) => void
  isRunning: boolean
  setIsRunning: (running: boolean) => void
  customArray: number[]
  setCustomArray: (array: number[]) => void
  selectedAlgorithm: string
  setSelectedAlgorithm: (algo: string) => void
}

export const useVisualizerStore = create<VisualizerStore>((set) => ({
  arraySize: 20,
  setArraySize: (size) => set({ arraySize: size }),
  speed: 50,
  setSpeed: (speed) => set({ speed }),
  isRunning: false,
  setIsRunning: (running) => set({ isRunning: running }),
  customArray: [],
  setCustomArray: (array) => set({ customArray: array }),
  selectedAlgorithm: "bubble",
  setSelectedAlgorithm: (algo) => set({ selectedAlgorithm: algo }),
}))
