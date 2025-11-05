export interface VisualizationState {
  array: number[]
  comparing: number[]
  sorted: number[]
  swaps: number
  comparisons: number
  time: number
  operation?: string // "compare", "swap", "place"
  message?: string // description of current operation
}

export type VisualizationStep = VisualizationState
