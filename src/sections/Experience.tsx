import { GraduationCap, History } from 'lucide-react'
import { BentoCard } from '../components/BentoCard'
import { Section } from '../components/Section'
import { PulseDot } from '../components/PulseDot'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageProvider'
import { formatPeriod } from '../lib/date'

export function Experience() {
  const { t, lang } = useLanguage()

  return (
    <Section id="experiencia" labelledBy="exp-title">
      <SectionHeading id="exp-title" {...t.sections.experience} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BentoCard className="md:col-span-2 lg:col-span-3" tilt={false} featured>
          <div className="flex items-center justify-between">
            <h3 className="eyebrow">{t.experience.title}</h3>
            <History size={18} className="text-accent" aria-hidden />
          </div>

          <ol className="mt-6">
            {t.experience.roles.map((role, i) => {
              const current = role.period.end === null
              const last = i === t.experience.roles.length - 1
              return (
                <li key={role.title} className="grid gap-x-6 sm:grid-cols-[10rem_1fr]">
                  <p className="pb-1 pl-7 font-mono text-xs text-muted sm:pt-1 sm:pl-0 sm:text-right">
                    {formatPeriod(role.period, lang, t.ui.present)}
                  </p>
                  <div className={`relative pl-7 ${last ? '' : 'pb-8'}`}>
                    {/* linha */}
                    {!last && <span aria-hidden className="absolute top-3 bottom-0 left-[5px] w-px bg-line" />}
                    {/* ponto */}
                    {current ? (
                      <span className="absolute top-1.5 left-0">
                        <PulseDot className="size-[11px]" color="bg-accent" />
                      </span>
                    ) : (
                      <span aria-hidden className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-line bg-card" />
                    )}
                    <h4 className="font-semibold">{role.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{role.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </BentoCard>

        <BentoCard className="md:col-span-2 lg:col-span-1" delay={0.05}>
          <div className="flex items-center justify-between">
            <h3 className="eyebrow">{t.education.title}</h3>
            <GraduationCap size={18} className="text-accent" aria-hidden />
          </div>
          <ul className="mt-6 space-y-6">
            {t.education.items.map((item) => (
              <li key={item.course}>
                <p className="font-mono text-xs text-muted">
                  {item.institution} · {item.period}
                </p>
                <p className="mt-1 font-semibold">{item.course}</p>
                {item.note && <p className="mt-1 text-sm text-muted">{item.note}</p>}
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </Section>
  )
}
