import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageProvider'
import { navItems } from './nav'

/** Navegação inferior fixa, só em telas < md. */
export function MobileDock({ active }: { active: string }) {
  const { t } = useLanguage()

  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <ul className="flex w-full max-w-md items-stretch justify-between rounded-2xl border border-line bg-card/85 p-1.5 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur-md">
        {navItems.map(({ id, key, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id} className="flex-1">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative isolate flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-medium transition-colors ${
                  isActive ? 'text-on-accent' : 'text-muted'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={18} aria-hidden />
                <span>{t.nav[key]}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
