"use client"

import { useEffect, useRef } from "react"

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    let animationFrameId: number
    let mouseX = -1000
    let mouseY = -1000
    let isMouseMoving = false
    let mouseTimeout: NodeJS.Timeout

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      const cellSize = 30
      const rows = Math.ceil(canvas.height / dpr / cellSize)
      const cols = Math.ceil(canvas.width / dpr / cellSize)

      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
          const x = j * cellSize
          const y = i * cellSize

          if (isMouseMoving) {
            const distanceFromMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))

            const maxDistance = 100
            const opacity = Math.max(0.1, Math.min(0.4, 1 - distanceFromMouse / maxDistance))
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`
          }

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + cellSize, y)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x, y + cellSize)
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(drawGrid)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      isMouseMoving = true

      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false
      }, 100)
    }

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    drawGrid()

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      clearTimeout(mouseTimeout)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-full w-full" style={{ width: "100%", height: "100%" }} />
  )
}

