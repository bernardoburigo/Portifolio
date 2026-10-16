import { useLanguage } from '../i18n/LanguageProvider'

export function LangToggle() {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      title={t.ui.language}
      className="flex h-9 items-center rounded-full border border-line bg-card p-1 font-mono text-xs transition-colors hover:border-accent"
    >
      {(['pt', 'en'] as const).map((code) => (
        <span
          key={code}
          className={`rounded-full px-2 py-1 uppercase transition-colors ${
            lang === code ? 'bg-accent text-on-accent' : 'text-muted'
          }`}
        >
          {code}
        </span>
      ))}
      <span className="sr-only"> · {t.ui.language}</span>
    </button>
  )
}
