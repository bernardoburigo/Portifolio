import { Briefcase, FolderGit2, House, Mail, User, type LucideIcon } from 'lucide-react'
import type { Content } from '../data/content'

export interface NavItem {
  id: string
  key: keyof Content['nav']
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'inicio', key: 'home', icon: House },
  { id: 'sobre', key: 'about', icon: User },
  { id: 'experiencia', key: 'experience', icon: Briefcase },
  { id: 'projetos', key: 'projects', icon: FolderGit2 },
  { id: 'contato', key: 'contact', icon: Mail },
]

export const sectionIds = navItems.map((item) => item.id)
