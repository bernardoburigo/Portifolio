import { createContext, useContext, type ReactNode } from 'react'

/** Id da seção ativa (scroll-spy), usado para destacar só o card principal dela. */
export const ActiveSectionContext = createContext<string | null>(null)

interface SectionProps {
  id: string
  labelledBy: string
  className?: string
  children: ReactNode
}

export function Section({ id, labelledBy, className, children }: SectionProps) {
  const active = useContext(ActiveSectionContext)
  return (
    <section id={id} aria-labelledby={labelledBy} data-active={active === id} className={className}>
      {children}
    </section>
  )
}
