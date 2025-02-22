import type React from "react"

export function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent [will-change:background-position]">
      {children}
    </span>
  )
}

