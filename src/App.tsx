import { Header } from './components/Header'
import { MobileDock } from './components/MobileDock'
import { ActiveSectionContext } from './components/Section'
import { sectionIds } from './components/nav'
import { useActiveSection } from './hooks/useActiveSection'
import { useLanguage } from './i18n/LanguageProvider'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'

export default function App() {
  const { t } = useLanguage()
  const { active, select } = useActiveSection(sectionIds)

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {t.ui.skip}
      </a>

      <Header active={active} onSelect={select} />

      <ActiveSectionContext.Provider value={active}>
        <main id="conteudo" className="mx-auto max-w-6xl space-y-4 px-4 pt-4 pb-4 sm:px-6">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </ActiveSectionContext.Provider>

      <Footer />
      {/* espaço para o dock no mobile */}
      <div aria-hidden className="h-24 md:hidden" />
      <MobileDock active={active} onSelect={select} />
    </>
  )
}
