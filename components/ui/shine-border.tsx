import type React from "react";
import { cn } from "@/lib/utils";

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function ShineBorder({ children, className }: ShineBorderProps) {
  return (
    <div className={cn("relative rounded-lg p-[1px] overflow-hidden", className)}>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-shine" />
      <div className="relative bg-black rounded-lg z-10">{children}</div>
    </div>
  );
}
