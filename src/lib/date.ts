import type { Lang, Period } from '../data/content'

const locales: Record<Lang, string> = { pt: 'pt-BR', en: 'en-US' }

function toDate(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1)
}

export function formatMonth(ym: string, lang: Lang) {
  const text = new Intl.DateTimeFormat(locales[lang], { month: 'short', year: 'numeric' })
    .format(toDate(ym))
    .replace(' de ', ' ')
    .replace('.', '')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatPeriod(period: Period, lang: Lang, present: string) {
  return `${formatMonth(period.start, lang)} – ${period.end ? formatMonth(period.end, lang) : present}`
}

export function yearsSince(ym: string) {
  const start = toDate(ym)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  if (now.getMonth() < start.getMonth()) years--
  return Math.max(years, 0)
}
