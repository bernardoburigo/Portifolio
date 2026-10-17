import { BentoCard } from '../components/BentoCard'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { Tag } from '../components/Tag'
import { TechIcon } from '../components/TechIcon'
import type { Project } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'

/** Curva suave (Catmull-Rom convertida em Bézier cúbica) passando pelos pontos. */
function smoothPath(points: number[][]) {
  let d = `M${points[0][0]} ${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [points[i - 1] ?? points[i], points[i], points[i + 1], points[i + 2] ?? points[i + 1]]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`
  }
  return d
}

/** Ilustração decorativa: gota (sensor) enviando leituras para um gráfico de vazão. */
function WaterFlowChart() {
  const readings = [[135, 130], [162, 96], [189, 116], [216, 72], [243, 92], [268, 58]]
  const baseline = 158
  const line = smoothPath(readings)
  const area = `${line} L${readings[readings.length - 1][0]} ${baseline} L${readings[0][0]} ${baseline} Z`

  return (
    <svg viewBox="0 0 290 200" aria-hidden className="h-auto w-full max-w-xs text-accent-glow">
      {/* gota */}
      <path
        d="M65 35 C65 35 30 80 30 112 A35 35 0 0 0 100 112 C100 80 65 35 65 35 Z"
        fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5"
      />
      <path d="M38 118 Q51.5 110 65 118 T92 118" fill="none" stroke="currentColor" strokeOpacity="0.6" className="flow-line" />
      <circle cx="65" cy="112" r="14" fill="currentColor" fillOpacity="0.08" />
      <circle cx="65" cy="112" r="5" fill="currentColor" />

      {/* sensor → gráfico */}
      <path d="M100 112 C115 112 120 130 135 130" fill="none" stroke="currentColor" strokeOpacity="0.35" className="flow-line" />

      {/* gráfico de vazão */}
      <path d={area} fill="currentColor" fillOpacity="0.06" />
      <path d={line} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" className="flow-line" />
      <line x1="128" y1={baseline} x2="275" y2={baseline} stroke="currentColor" strokeOpacity="0.35" />
      {readings.map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="14" fill="currentColor" fillOpacity="0.08" />
          <circle cx={x} cy={y} r="4.5" fill="currentColor" />
        </g>
      ))}
      <text x="275" y="178" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="currentColor" fillOpacity="0.6">
        L/min · 24h
      </text>
    </svg>
  )
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider">
        <span className="text-accent">{project.kind}</span>
        <span className="text-muted">{project.period}</span>
      </div>
      <h3 className={`mt-3 font-semibold tracking-tight text-balance ${project.featured ? 'text-2xl' : 'text-lg'}`}>
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Tag>
              <TechIcon name={tag} size={11} />
              {tag}
            </Tag>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const [featured, ...others] = t.projects.items

  return (
    <Section id="projetos" labelledBy="projects-title">
      <SectionHeading id="projects-title" title={t.projects.title} subtitle={t.projects.subtitle} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BentoCard className="md:col-span-2 lg:row-span-2" featured>
          <div className="flex h-full flex-col gap-6">
            <div className="flex justify-center rounded-xl border border-line bg-bg/60 py-6">
              <WaterFlowChart />
            </div>
            <div className="flex-1">
              <ProjectBody project={featured} />
            </div>
          </div>
        </BentoCard>

        {others.map((project, i) => (
          <BentoCard
            key={project.title}
            className={i === others.length - 1 && others.length % 2 === 1 ? 'md:col-span-2' : ''}
            delay={0.05 * (i + 1)}
          >
            <ProjectBody project={project} />
          </BentoCard>
        ))}
      </div>
    </Section>
  )
}
