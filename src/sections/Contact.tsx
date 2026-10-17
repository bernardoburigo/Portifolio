import { Mail, Send } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { BentoCard } from '../components/BentoCard'
import { Section } from '../components/Section'
import { CopyEmailButton } from '../components/CopyEmailButton'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'

const linkClass =
  'inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent'

export function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contato" labelledBy="contact-title">
      <SectionHeading id="contact-title" {...t.sections.contact} />

      <BentoCard tilt={false} featured>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h3 className="text-3xl font-semibold tracking-tight">{t.contact.title}</h3>
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
    </Section>
  )
}
