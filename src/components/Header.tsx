import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'
import { LangToggle } from './LangToggle'
import { ThemeToggle } from './ThemeToggle'
import { navItems } from './nav'

/** Desktop: logo, links e controles. Mobile: só logo e controles (links ficam no dock). */
export function Header({ active }: { active: string }) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        scrolled ? 'border-line bg-bg/80' : 'border-transparent bg-bg/0'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#inicio"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-[11px] text-on-accent">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.shortName}</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-card/70 p-1">
            {navItems.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === id ? 'text-on-accent' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
