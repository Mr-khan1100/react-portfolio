import { useEffect, useState, useRef } from 'react'

export default function MouseTrail() {
  const [particles, setParticles] = useState([])
  const mousePos = useRef({ x: 0, y: 0 })
  const particleCount = 20 // Adjust number of particles

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: particleCount }).map((_, i) => ({
      x: 0,
      y: 0,
      size: Math.random() * 3 + 2, // Random size between 2-5
      delay: i * 0.1, // Staggered delay
      angle: Math.random() * Math.PI * 2 // Random start angle
    }))
    setParticles(initialParticles)

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Animation loop
    let animationFrame
    const animate = () => {
      setParticles(prev => prev.map(particle => {
        // Smooth follow with delay
        const dx = mousePos.current.x - particle.x
        const dy = mousePos.current.y - particle.y
        
        return {
          ...particle,
          x: particle.x + dx * 0.1,
          y: particle.y + dy * 0.1,
          angle: particle.angle + 0.05
        }
      }))
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-900 pointer-events-none -z-10">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-purple-400 to-blue-400"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `translate(
              ${particle.x}px, 
              ${particle.y}px
            )`,
            opacity: 0.7,
            filter: `blur(${Math.random() * 2}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      ))}
    </div>
  )
}