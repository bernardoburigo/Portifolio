import type { PointerEvent, ReactNode } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointerMotion } from '../hooks/useMediaQuery'

interface BentoCardProps {
  children: ReactNode
  className?: string
  /** Atraso do reveal, em segundos. */
  delay?: number
  tilt?: boolean
  /** Card principal da seção: borda teal + brilho. */
  featured?: boolean
}

const spring = { stiffness: 180, damping: 18, mass: 0.6 }

export function BentoCard({ children, className = '', delay = 0, tilt = true, featured = false }: BentoCardProps) {
  const interactive = useFinePointerMotion()
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (tilt) {
      // Cards largos inclinam menos para não distorcer
      const max = Math.min(4, 1100 / rect.width)
      rotateY.set((x / rect.width - 0.5) * 2 * max)
      rotateX.set(-(y / rect.height - 0.5) * 2 * max)
    }
  }

  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className={`bento p-5 sm:p-6 ${featured ? 'bento-featured' : ''} ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={interactive ? { y: -3 } : undefined}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  )
}
