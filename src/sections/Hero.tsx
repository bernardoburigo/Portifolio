import { ArrowRight, Clock, Languages, Users } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import avatar320 from '../assets/avatar-320.webp'
import avatar640 from '../assets/avatar-640.webp'
import avatarJpg from '../assets/avatar-320.jpg'
import { BentoCard } from '../components/BentoCard'
import { PulseDot } from '../components/PulseDot'
import { profile } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'
import { yearsSince } from '../lib/date'

export function Hero() {
  const { t } = useLanguage()
  const years = yearsSince(profile.careerStart)
  const [yearsBefore, yearsAfter] = t.hero.yearsValue.split('{n}')

  return (
    <section id="inicio" aria-labelledby="hero-name" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BentoCard className="md:col-span-2 lg:col-span-3" tilt={false} featured>
        <div className="flex h-full flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left lg:gap-8">
          <picture className="shrink-0">
            <source type="image/webp" srcSet={`${avatar320} 320w, ${avatar640} 640w`} sizes="(min-width: 1024px) 160px, 128px" />
            <img
              src={avatarJpg}
              alt={profile.name}
              width={160}
              height={160}
              fetchPriority="high"
              className="size-32 rounded-full object-cover ring-4 ring-accent/25 lg:size-40"
            />
          </picture>

          <div className="min-w-0">
            <p className="eyebrow">{t.hero.greeting}</p>
            <h1 id="hero-name" className="mt-1 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-accent sm:text-xl">{t.hero.role}</p>

            <ul className="mt-3 flex flex-wrap justify-center gap-x-3 font-mono text-sm text-muted sm:justify-start sm:gap-x-2">
              {profile.heroStack.map((tech, i) => (
                <li key={tech}>
                  {i > 0 && <span aria-hidden className="mr-2 hidden text-line sm:inline">·</span>}
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href="#contato"
                className="group inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
              >
                {t.hero.ctaContact}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <FaLinkedin size={16} aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </BentoCard>

      <BentoCard className="md:col-span-2 lg:col-span-1" delay={0.05}>
        <div className="flex h-full flex-col justify-center">
          <div className="flex items-center gap-2.5">
            <PulseDot />
            <p className="text-lg font-semibold">{t.hero.available}</p>
          </div>
          <p className="mt-1 text-sm text-muted">{t.hero.availableDetail}</p>
        </div>
      </BentoCard>

      <BentoCard delay={0.1}>
        <div className="flex h-full flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock size={20} className="shrink-0 text-accent" aria-hidden />
            <p className="font-mono text-2xl font-semibold">
              {yearsBefore}
              <span className="text-accent">{years}</span>
              {yearsAfter}
            </p>
          </div>
          <p className="text-sm text-muted">{t.hero.yearsLabel}</p>
        </div>
      </BentoCard>

      <BentoCard delay={0.15}>
        <div className="flex h-full flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <Languages size={20} className="shrink-0 text-accent" aria-hidden />
            <p className="font-mono text-2xl font-semibold">{t.hero.languagesValue}</p>
          </div>
          <p className="text-sm text-muted">{t.hero.languagesLabel}</p>
        </div>
      </BentoCard>

      <BentoCard className="md:col-span-2" delay={0.2}>
        <div className="flex items-start gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
            <Users size={20} aria-hidden />
          </span>
          <div>
            <p className="font-semibold">{t.hero.leadershipTitle}</p>
            <p className="mt-1 text-sm text-muted">{t.hero.leadershipText}</p>
          </div>
        </div>
      </BentoCard>
    </section>
  )
}
