import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const media = '(prefers-color-scheme: dark)'

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement
  if (animate) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 250)
  }
  root.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // O script inline do index.html já aplicou a classe correta
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  // Segue o sistema enquanto o usuário não escolher manualmente
  useEffect(() => {
    const mq = window.matchMedia(media)
    const onChange = (e: MediaQueryListEvent) => {
      const saved = readStorage('theme')
      if (saved === 'light' || saved === 'dark') return
      const next = e.matches ? 'dark' : 'light'
      applyTheme(next, true)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    writeStorage('theme', next)
    applyTheme(next, true)
    setTheme(next)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  return ctx
}
