'use client'
import { useRef, useState, useCallback } from 'react'

export function useMouseGlow(radius = 380) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => setHovered(false), [])

  const glowBg = hovered
    ? `radial-gradient(${radius}px circle at ${mouse.x}px ${mouse.y}px, var(--card-glow-color), transparent 70%), var(--bg-card)`
    : 'var(--bg-card)'

  return { ref, glowBg, onMouseMove, onMouseEnter, onMouseLeave }
}
