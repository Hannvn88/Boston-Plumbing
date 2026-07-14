import React from "react";
import { cn } from "@/lib/utils";
import { FlickeringGrid } from "./ui/FlickeringGrid";

export default function AuroraBackground({ className, children }) {
  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      <FlickeringGrid
        className="absolute inset-0 z-0 h-full w-full"
        squareSize={4}
        gridGap={6}
        color="#10b981"
        maxOpacity={0.35}
        flickerChance={0.08}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}