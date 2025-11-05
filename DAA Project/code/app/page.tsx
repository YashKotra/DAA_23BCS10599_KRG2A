"use client";
import Visualizer from "@/components/visualizer";
import ControlPanel from "@/components/control-panel";
import AlgorithmDetails from "@/components/algorithm-details";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">
            Sorting Algorithm Visualizer By Yash Kotra
          </h1>
          <p className="text-muted-foreground text-lg">
            Select an algorithm and watch it sort your array step-by-step. See
            each comparison and swap with real numbers.
          </p>
          <p className="text-muted-foreground text-lg">
            Made By Yash Kotra KRG 2
          </p>
        </div>

        <div className="grid gap-6">
          <ControlPanel />
          <Visualizer />
          <AlgorithmDetails />
        </div>
      </div>
    </main>
  );
}
