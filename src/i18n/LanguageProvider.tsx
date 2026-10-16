import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from '../data/content'
import { readStorage, writeStorage } from '../lib/storage'

interface LanguageContextValue {
  lang: Lang
  t: Content
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLang(): Lang {
  const saved = readStorage('lang')
  if (saved === 'pt' || saved === 'en') return saved
  return /^pt/i.test(navigator.language) ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title =
      lang === 'pt'
        ? 'Bernardo Búrigo · Desenvolvedor Full Stack'
        : 'Bernardo Búrigo · Full Stack Developer'
  }, [lang])

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : 'pt'
    writeStorage('lang', next)
    setLang(next)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: content[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  return ctx
}
