/** Ponto com pulso (animate-ping), usado para indicar algo "ativo agora". */
export function PulseDot({ className = 'size-3', color = 'bg-accent-glow' }: { className?: string; color?: string }) {
  return (
    <span aria-hidden className={`relative flex shrink-0 ${className}`}>
      <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${color}`} />
      <span className={`relative inline-flex size-full rounded-full ${color}`} />
    </span>
  )
}
