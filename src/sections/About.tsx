import { Layers, UserRound } from 'lucide-react'
import { BentoCard } from '../components/BentoCard'
import { SectionHeading } from '../components/SectionHeading'
import { TechIcon } from '../components/TechIcon'
import { profile } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'

export function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" aria-labelledby="about-title">
      <SectionHeading id="about-title" {...t.sections.about} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BentoCard className="md:col-span-2" featured>
          <div className="flex items-center justify-between">
            <h3 className="eyebrow">{t.about.title}</h3>
            <UserRound size={18} className="text-accent" aria-hidden />
          </div>
          <div className="mt-4 space-y-4 leading-relaxed text-pretty">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-2" delay={0.05}>
          <div className="flex items-center justify-between">
            <h3 className="eyebrow">{t.stack.title}</h3>
            <Layers size={18} className="text-accent" aria-hidden />
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.stack.map((tech) => (
              <li
                key={tech}
                className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm transition-colors hover:border-accent"
              >
                <span className="text-accent">
                  <TechIcon name={tech} size={18} />
                </span>
                {tech}
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </section>
  )
}
