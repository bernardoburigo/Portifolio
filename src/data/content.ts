// Todo o conteúdo do site. Para editar textos, altere apenas este arquivo.

export type Lang = 'pt' | 'en'

/** Datas no formato 'AAAA-MM'. `end: null` significa "até hoje". */
export interface Period {
  start: string
  end: string | null
}

export interface Role {
  title: string
  period: Period
  description: string
}

export interface Education {
  institution: string
  course: string
  period: string
  note?: string
}

export interface Project {
  kind: string
  title: string
  period: string
  description: string
  tags: string[]
  featured?: boolean
}

export interface Content {
  nav: { home: string; about: string; experience: string; projects: string; contact: string }
  ui: {
    skip: string
    theme: { toLight: string; toDark: string }
    language: string
    present: string
    copy: string
    copied: string
    sendEmail: string
  }
  hero: {
    greeting: string
    role: string
    available: string
    availableDetail: string
    ctaContact: string
    /** {n} é substituído pelo número de anos. */
    yearsValue: string
    yearsLabel: string
    languagesValue: string
    languagesLabel: string
    leadershipTitle: string
    leadershipText: string
  }
  about: { title: string; paragraphs: string[] }
  stack: { title: string }
  experience: { title: string; roles: Role[] }
  education: { title: string; items: Education[] }
  projects: { title: string; subtitle: string; items: Project[] }
  contact: { title: string; text: string; emailLabel: string }
  footer: { built: string }
}

export const profile = {
  name: 'Bernardo Goulart Búrigo',
  shortName: 'Bernardo Búrigo',
  initials: 'BGB',
  email: 'bernardoburigo@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/bernardo-goulart-burigo',
  /** Deixe vazio para ocultar o link do GitHub. */
  github: '',
  /** Início da carreira, usado para calcular "Mais de X anos". */
  careerStart: '2023-09',
  stack: [
    'TypeScript',
    'Angular',
    'Node.js',
    'NestJS',
    'Spring Boot',
    'React',
    'React Native',
    'Ionic',
    'Capacitor',
    'PostgreSQL',
    'Docker',
  ],
  heroStack: ['Angular', 'TypeScript', 'Node.js', 'React'],
}

const periods = {
  fullStack: { start: '2026-03', end: null },
  scholarship: { start: '2025-10', end: '2026-02' },
  labAssistant: { start: '2024-09', end: '2025-09' },
  researcher: { start: '2023-09', end: '2024-08' },
} satisfies Record<string, Period>

export const content: Record<Lang, Content> = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      contact: 'Contato',
    },
    ui: {
      skip: 'Pular para o conteúdo',
      theme: { toLight: 'Ativar tema claro', toDark: 'Ativar tema escuro' },
      language: 'Mudar idioma',
      present: 'hoje',
      copy: 'Copiar e-mail',
      copied: 'E-mail copiado!',
      sendEmail: 'Enviar e-mail',
    },
    hero: {
      greeting: 'Olá, eu sou',
      role: 'Desenvolvedor Full Stack',
      available: 'Aberto a propostas',
      availableDetail: 'Novos desafios que combinem impacto técnico e crescimento em equipe.',
      ctaContact: 'Entrar em contato',
      yearsValue: 'Mais de {n}',
      yearsLabel: 'anos desenvolvendo soluções',
      languagesValue: 'PT · EN',
      languagesLabel: 'Português nativo, inglês fluente',
      leadershipTitle: 'Liderança de equipes',
      leadershipText: 'Diálogo aberto, transparência e colaboração como base do trabalho em time.',
    },
    about: {
      title: 'Sobre mim',
      paragraphs: [
        'Sou Desenvolvedor Full Stack especializado em soluções de software para mercados reais. Trabalho com TypeScript, Node.js, Angular, React e React Native, construindo aplicações robustas e escaláveis.',
        'Além da parte técnica, tenho experiência sólida em liderança de equipes. Acredito que organização pessoal e profissional, com clareza nas decisões e nas ações, é a base para entregar produtos de excelência.',
      ],
    },
    stack: { title: 'Stack' },
    experience: {
      title: 'Experiência',
      roles: [
        {
          title: 'Desenvolvedor Full Stack',
          period: periods.fullStack,
          description:
            'Desenvolvimento full stack de soluções de software internas e terceirizadas para empresas de todo o Brasil.',
        },
        {
          title: 'Bolsista · Estágio em laboratório de software',
          period: periods.scholarship,
          description:
            'Desenvolvimento de produtos para clientes e para o mercado, em contato diário com o time da empresa.',
        },
        {
          title: 'Assistente de Laboratório',
          period: periods.labAssistant,
          description:
            'Estágio como auxiliar do Laboratório de Tecnologia do curso de Ciência da Computação.',
        },
        {
          title: 'Aluno Pesquisador',
          period: periods.researcher,
          description:
            'Pesquisa sobre controle de variáveis de ambiente usando Redes de Sensores Sem Fio.',
        },
      ],
    },
    education: {
      title: 'Formação',
      items: [
        {
          institution: 'Unesc',
          course: 'Bacharelado em Ciência da Computação',
          period: '2023 – 2026',
          note: 'Conclusão prevista para dezembro de 2026',
        },
        {
          institution: 'Rockfeller Language Center',
          course: 'Inglês: fluência completa',
          period: '2015 – 2019',
        },
        {
          institution: 'Colégio Marista Criciúma',
          course: 'Ensino Fundamental e Médio',
          period: '2010 – 2021',
        },
      ],
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Pesquisas acadêmicas e trabalhos profissionais.',
      items: [
        {
          kind: 'Pesquisa - TCC',
          title: 'Sistema de Monitoramento de Fluxo de Água',
          period: '2023 – 2024',
          description:
            'Trabalho de Conclusão de Curso - Monitoramento de fluxo de água em condomínios residenciais por meio de sensores, microcontroladores e infraestrutura IoT, com acesso via web e app mobile.',
          tags: ['React Native', 'Spring Boot', 'IoT', 'Pesquisa aplicada'],
          featured: true,
        },
        {
          kind: 'Profissional',
          title: 'Gestão de Escalas com APP Mobile',
          period: '2026',
          description:
            'Plataforma web de gestão de escalas e equipes, com aplicativo mobile para os profissionais.',
          tags: ['Angular', 'Ionic', 'NestJS', 'PostgreSQL'],
        },
        {
          kind: 'Profissional',
          title: 'Gestão Jurídica com IA e Jurimetria',
          period: '2026',
          description:
            'Sistema voltado a escritórios de advocacia com integração ao Jusbrasil e assistente de IA.',
          tags: ['Angular', 'NestJS', 'PostgreSQL'],
        },
        {
          kind: 'Pesquisa',
          title: 'Controle de Variáveis de Ambiente com Redes de Sensores Sem Fio',
          period: '2023 – 2024',
          description:
            'Pesquisa sobre monitoramento e controle de variáveis de ambiente usando redes de sensores sem fio. Projeto concluído e apresentado na Semana de Ciência e Tecnologia 2024 da Unesc.',
          tags: ['RSSF', 'IoT', 'Pesquisa aplicada'],
          featured: true,
        },
      ],
    },
    contact: {
      title: 'Vamos conversar?',
      text: 'Estou sempre aberto a novos desafios. Mande uma mensagem ou me encontre no LinkedIn.',
      emailLabel: 'E-mail',
    },
    footer: { built: 'Feito com React, Vite e Tailwind.' },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
    },
    ui: {
      skip: 'Skip to content',
      theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
      language: 'Change language',
      present: 'present',
      copy: 'Copy email',
      copied: 'Email copied!',
      sendEmail: 'Send email',
    },
    hero: {
      greeting: "Hi, I'm",
      role: 'Full Stack Developer',
      available: 'Open to opportunities',
      availableDetail: 'New challenges that combine technical impact and team growth.',
      ctaContact: 'Get in touch',
      yearsValue: 'Over {n}',
      yearsLabel: 'years building solutions',
      languagesValue: 'PT · EN',
      languagesLabel: 'Native Portuguese, fluent English',
      leadershipTitle: 'Team leadership',
      leadershipText: 'Open dialogue, transparency and collaboration as the foundation of teamwork.',
    },
    about: {
      title: 'About me',
      paragraphs: [
        "I'm a Full Stack Developer specialized in software solutions for real-world markets. I work with TypeScript, Node.js, Angular, React and React Native, building robust and scalable applications.",
        'Beyond the technical side, I have solid experience leading teams. I believe that personal and professional organization, with clear decisions and actions, is the foundation for delivering excellent products.',
      ],
    },
    stack: { title: 'Stack' },
    experience: {
      title: 'Experience',
      roles: [
        {
          title: 'Full Stack Developer',
          period: periods.fullStack,
          description:
            'Full stack development of in-house and outsourced software solutions for companies across Brazil.',
        },
        {
          title: 'Scholarship intern · Software lab',
          period: periods.scholarship,
          description:
            'Building products for clients and the market, working daily with the company team.',
        },
        {
          title: 'Lab Assistant',
          period: periods.labAssistant,
          description:
            "Internship as assistant at the Computer Science program's Technology Lab.",
        },
        {
          title: 'Undergraduate Researcher',
          period: periods.researcher,
          description: 'Research on controlling environmental variables using Wireless Sensor Networks.',
        },
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          institution: 'Unesc',
          course: "Bachelor's in Computer Science",
          period: '2023 – 2026',
          note: 'Expected graduation: December 2026',
        },
        {
          institution: 'Rockfeller Language Center',
          course: 'English: full proficiency',
          period: '2015 – 2019',
        },
        {
          institution: 'Colégio Marista Criciúma',
          course: 'Elementary and High School',
          period: '2010 – 2021',
        },
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'Academic research and professional work.',
      items: [
        {
          kind: 'Research - Thesis',
          title: 'Water Flow Monitoring System',
          period: '2023 – 2024',
          description:
            'Undergraduate thesis - Water flow monitoring in residential condominiums using sensors, microcontrollers and IoT infrastructure, with web and mobile app access.',
          tags: ['React Native', 'Spring Boot', 'IoT', 'Applied research'],
          featured: true,
        },
        {
          kind: 'Professional',
          title: 'Shift Scheduling with Mobile App',
          period: '2026',
          description:
            'Web platform for managing shifts and teams, with a mobile app for the professionals.',
          tags: ['Angular', 'Ionic', 'NestJS', 'PostgreSQL'],
        },
        {
          kind: 'Professional',
          title: 'Legal Management with AI and Jurimetrics',
          period: '2026',
          description: 'System for law firms with Jusbrasil integration and an AI assistant.',
          tags: ['Angular', 'NestJS', 'PostgreSQL'],
        },
        {
          kind: 'Research',
          title: 'Environmental Variable Control with Wireless Sensor Networks',
          period: '2023 – 2024',
          description:
            "Research on monitoring and controlling environmental variables using wireless sensor networks. Completed and presented at Unesc's 2024 Science and Technology Week.",
          tags: ['WSN', 'IoT', 'Applied research'],
          featured: true,
        },
      ],
    },
    contact: {
      title: "Let's talk?",
      text: "I'm always open to new challenges. Send me a message or find me on LinkedIn.",
      emailLabel: 'Email',
    },
    footer: { built: 'Built with React, Vite and Tailwind.' },
  },
}
