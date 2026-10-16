import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiCapacitor,
  SiDocker,
  SiIonic,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from 'react-icons/si'

const icons: Record<string, IconType> = {
  TypeScript: SiTypescript,
  Angular: SiAngular,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  React: SiReact,
  'React Native': SiReact,
  'Spring Boot': SiSpringboot,
  Ionic: SiIonic,
  Capacitor: SiCapacitor,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
}

export function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const Icon = icons[name]
  return Icon ? <Icon size={size} aria-hidden /> : null
}
