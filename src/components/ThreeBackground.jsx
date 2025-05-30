import React, { useEffect, useRef } from 'react'
import './ThreeBackground.css'

const CIRCLE_COLORS = [
  'rgba(139,92,246,0.25)', // purple
  'rgba(168,85,247,0.18)', // light purple
  'rgba(192,132,252,0.15)', // accent
  'rgba(168,85,247,0.12)',
  'rgba(139,92,246,0.10)'
]

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

const AnimatedCirclesBackground = () => {
  const canvasRef = useRef(null)
  const circles = useRef([])
  const numCircles = 10

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    let animationId

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize circles
    circles.current = Array.from({ length: numCircles }).map(() => {
      const r = randomBetween(120, 260)
      return {
        x: randomBetween(r, width - r),
        y: randomBetween(r, height - r),
        r,
        color: CIRCLE_COLORS[Math.floor(Math.random() * CIRCLE_COLORS.length)],
        dx: randomBetween(-0.2, 0.2),
        dy: randomBetween(-0.2, 0.2),
        blur: randomBetween(40, 120)
      }
    })

    function animate() {
      ctx.clearRect(0, 0, width, height)
      for (const c of circles.current) {
        ctx.save()
        ctx.globalAlpha = 1
        ctx.filter = `blur(${c.blur}px)`
        const grad = ctx.createRadialGradient(c.x, c.y, c.r * 0.2, c.x, c.y, c.r)
        grad.addColorStop(0, c.color)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
        // Move
        c.x += c.dx
        c.y += c.dy
        // Bounce off edges
        if (c.x - c.r < 0 || c.x + c.r > width) c.dx *= -1
        if (c.y - c.r < 0 || c.y + c.r > height) c.dy *= -1
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="three-background" />
}

export default AnimatedCirclesBackground 