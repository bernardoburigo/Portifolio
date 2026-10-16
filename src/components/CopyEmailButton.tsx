import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback para navegadores sem Clipboard API (ou fora de HTTPS)
    const area = document.createElement('textarea')
    area.value = text
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

export function CopyEmailButton() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(id)
  }, [copied])

  const onClick = async () => {
    if (await copyText(profile.email)) setCopied(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={t.ui.copy}
        title={t.ui.copy}
        className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
      </button>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center md:bottom-8">
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg shadow-lg"
            >
              <Check size={16} aria-hidden />
              {t.ui.copied}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
