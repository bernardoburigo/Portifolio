import { useCallback, useEffect, useRef, useState } from 'react'

/** Fração da altura da tela usada como linha de leitura. */
const READING_LINE = 0.35

/**
 * Scroll-spy por posição: a seção ativa é a última cujo topo passou da linha de leitura.
 * No fim da página, a última seção fica ativa (ela pode ser curta demais para alcançar a linha).
 * `select(id)` fixa o item clicado até o scroll suave terminar.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const locked = useRef(false)
  const unlockTimer = useRef<number | undefined>(undefined)

  const unlockAfter = (ms: number) => {
    window.clearTimeout(unlockTimer.current)
    unlockTimer.current = window.setTimeout(() => {
      locked.current = false
    }, ms)
  }

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      if (locked.current) return

      const root = document.documentElement
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
        setActive(ids[ids.length - 1])
        return
      }

      const line = window.innerHeight * READING_LINE
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      // Durante o scroll suave do clique, só adia a liberação
      if (locked.current) unlockAfter(150)
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
      window.clearTimeout(unlockTimer.current)
    }
  }, [ids])

  const select = useCallback((id: string) => {
    locked.current = true
    setActive(id)
    // Liberação de segurança caso não haja scroll (já estava na posição)
    unlockAfter(800)
  }, [])

  return { active, select }
}
