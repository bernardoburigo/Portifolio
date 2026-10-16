import { profile } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-7">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>{t.footer.built}</p>
    </footer>
  )
}
