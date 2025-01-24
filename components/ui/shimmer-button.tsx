"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600",
        "relative overflow-hidden",
        className,
      )}
      ref={ref}
      {...props}
    >
      <span className="relative z-10">{props.children}</span>
      <span className="absolute inset-0 overflow-hidden rounded-md">
        <span className="absolute inset-0 rounded-md bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
      </span>
    </button>
  )
})
ShimmerButton.displayName = "ShimmerButton"

export { ShimmerButton }