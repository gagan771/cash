"use client"

import { useEffect, useState } from "react"
import { Star, Moon, Sun, Cloud } from "lucide-react"

const icons = [Star, Moon, Sun, Cloud]

export default function FloatingIcons() {
  const [floatingIcons, setFloatingIcons] = useState<JSX.Element[]>([])

  useEffect(() => {
    const newIcons = Array.from({ length: 20 }, (_, i) => {
      const Icon = icons[Math.floor(Math.random() * icons.length)]
      const size = Math.random() * 24 + 12
      const left = Math.random() * 100
      const animationDuration = Math.random() * 20 + 10
      const animationDelay = Math.random() * 5

      return (
        <Icon
          key={i}
          size={size}
          className="text-white opacity-30 absolute animate-float"
          style={{
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
          }}
        />
      )
    })

    setFloatingIcons(newIcons)
  }, [])

  return <div className="fixed inset-0 z-0 pointer-events-none">{floatingIcons}</div>
}

