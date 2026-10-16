import { BentoCard } from '../components/BentoCard'
import { Tag } from '../components/Tag'
import { TechIcon } from '../components/TechIcon'
import type { Project } from '../data/content'
import { useLanguage } from '../i18n/LanguageProvider'

/** Ilustração decorativa: nós de uma rede de sensores. */
function SensorNetwork() {
  const nodes = [
    [40, 60], [120, 30], [200, 70], [90, 120], [170, 140], [250, 120], [60, 170],
  ]
  const links = [[0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4], [4, 5], [2, 5], [3, 6]]
  return (
    <svg viewBox="0 0 290 200" aria-hidden className="h-auto w-full max-w-xs text-accent-glow">
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="currentColor" strokeOpacity="0.35" strokeDasharray="4 4"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" fill="currentColor" fillOpacity="0.08" />
          <circle cx={x} cy={y} r="5" fill="currentColor" />
        </g>
      ))}
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
    <section id="projetos" aria-labelledby="projects-title">
      <div className="mb-4 flex flex-col gap-1 px-1 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="projects-title" className="text-2xl font-semibold tracking-tight">{t.projects.title}</h2>
        <p className="text-sm text-muted">{t.projects.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BentoCard className="md:col-span-2 lg:row-span-2">
          <div className="flex h-full flex-col gap-6">
            <div className="flex justify-center rounded-xl border border-line bg-bg/60 py-6">
              <SensorNetwork />
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
    </section>
  )
}
