export interface ServicePageData {
  slug: string;
  aliases?: string[];
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
    artType: 'vision' | 'test' | 'hardware' | 'plc' | 'refactor' | 'battery' | 'hil' | 'rf';
    statsText?: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    paragraph1: string;
    paragraph2: string;
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
      bullets: string[];
    }>;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    flowNote: string;
  };
  technologies: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    languages: string[];
    frameworks: string[];
    note: string;
  };
  architecture: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  hardware: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    col1Title: string;
    col1List: string[];
    col1ChipsTitle?: string;
    col1Chips?: string[];
    col1Note?: string;
    col2Title: string;
    col2List: string[];
    col2Note?: string;
  };
  performance: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    metrics: Array<{
      value: string;
      label: string;
    }>;
    leftTitle: string;
    leftBullets: string[];
    rightTitle: string;
    rightBullets: string[];
  };
  process: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
  deliverables: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    col1: string[];
    col2: string[];
  };
  applications: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  whyUs: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    col1: string[];
    col2: string[];
  };
  perspective: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    leftTitle: string;
    leftBullets: string[];
    rightTitle: string;
    rightBullets: string[];
    recommendationTitle: string;
    recommendationText: string;
  };
  mistakes: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  projectPlanning: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    lead: string;
    costDriversCol1: string[];
    costDriversCol2: string[];
    phases: Array<{
      badge: string;
      title: string;
      description: string;
    }>;
  };
  faq: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

