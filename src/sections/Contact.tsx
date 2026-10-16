import { Mail, Send } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { BentoCard } from '../components/BentoCard'
import { CopyEmailButton } from '../components/CopyEmailButton'
import { profile } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'

const linkClass =
  'inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent'

export function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contato" aria-labelledby="contact-title" className="pt-6">
      <BentoCard tilt={false}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 id="contact-title" className="text-3xl font-semibold tracking-tight">{t.contact.title}</h2>
            <p className="mt-2 text-muted">{t.contact.text}</p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto">
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-bg/60 p-2 pl-3 sm:pl-4">
              <Mail size={16} className="hidden shrink-0 text-accent sm:block" aria-hidden />
              <span className="sr-only">{t.contact.emailLabel}:</span>
              <span className="min-w-0 flex-1 truncate font-mono text-[13px] sm:text-sm">{profile.email}</span>
              <CopyEmailButton />
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${profile.email}`} className={`${linkClass} border-accent bg-accent text-on-accent hover:text-on-accent hover:opacity-90`}>
                <Send size={16} aria-hidden />
                {t.ui.sendEmail}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                <FaLinkedin size={16} aria-hidden />
                LinkedIn
              </a>
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className={linkClass}>
                  <FaGithub size={16} aria-hidden />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </BentoCard>
    </section>
  )
}
