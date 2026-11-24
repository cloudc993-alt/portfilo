export interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend';
  accent: string;
  description: {
    uz: string;
    en: string;
  };
}

export const skillsData: SkillItem[] = [
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    accent: '#FF5A1F',
    description: {
      uz: 'Semantik belgilash, qulaylik (accessibility) va SEOga tayyor sahifa tuzilmasi.',
      en: 'Semantic document architecture, accessibility standards, and SEO-ready markup.',
    },
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    accent: '#FF7A24',
    description: {
      uz: 'Grid, Flexbox, zamonaviy animatsiyalar va barcha qurilmalarga moslashuvchan dizayn.',
      en: 'Grid, Flexbox, fluid responsive layouts, and hardware-accelerated visual styling.',
    },
  },
  {
    id: 'scss',
    name: 'SCSS',
    category: 'frontend',
    accent: '#FF2B1C',
    description: {
      uz: 'Modulli uslublar, mixinlar, o‘zgaruvchilar va kengaytiriladigan dizayn tizimlari.',
      en: 'Modular stylesheets, reusable mixins, design tokens, and maintainable architecture.',
    },
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    accent: '#FF7A24',
    description: {
      uz: 'Zamonaviy ES6+ mantiq, asinxron API integratsiyalari va dinamik DOM boshqaruvi.',
      en: 'Modern ES6+ application logic, asynchronous APIs, and interactive browser behavior.',
    },
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    accent: '#FF2B1C',
    description: {
      uz: 'Komponentga asoslangan arxitektura, hooklar va yuqori samaradorlikdagi SPA ilovalar.',
      en: 'Component-driven UI architecture, custom hooks, and responsive single-page applications.',
    },
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    accent: '#FF5A1F',
    description: {
      uz: 'Server tomoni mantiqi, ma’lumotlarni qayta ishlash va barqaror backend yechimlari.',
      en: 'Server-side request handling, form processing, and dependable backend architecture.',
    },
  },
];
