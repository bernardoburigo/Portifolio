import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'
import { useLanguage } from '../i18n/LanguageProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const label = theme === 'dark' ? t.ui.theme.toLight : t.ui.theme.toDark

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full border border-line bg-card text-fg transition-colors hover:border-accent hover:text-accent"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
