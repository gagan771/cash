
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "rgb(251, 0, 217",
      shimmerSize = "0.1em",
      borderRadius = "1000px",
      shimmerDuration = "1.5s",
      background = "radial-gradient(ellipse 80% 50% at 50% 120%,rgba(62, 61, 117),rgba(18, 18, 38))",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative cursor-pointer overflow-hidden whitespace-nowrap px-6 py-4 [background:var(--btn-bg)] [border:none]",
          className,
        )}
        style={
          {
            "--btn-bg": background,
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--shimmer-size": shimmerSize,
            "--speed": shimmerDuration,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 rounded-[inherit] [container-type:size]">
            <div className="absolute inset-0 h-[100cqh] animate-shimmer rounded-[inherit] [background:linear-gradient(90deg,transparent_0%,var(--shimmer-color)_30%,transparent_60%)] [width:var(--shimmer-size)]"></div>
          </div>
        </div>
      </button>
    )
  },
)
ShimmerButton.displayName = "ShimmerButton"

export { ShimmerButton }

