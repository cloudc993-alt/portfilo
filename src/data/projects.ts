export type ProjectCategory = 'all' | 'education' | 'ecommerce' | 'games' | 'webapp';

export interface ProjectItem {
  id: string;
  slug: string;
  index: string;
  name: string;
  url: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: {
    uz: string;
    en: string;
  };
  shortDescription: {
    uz: string;
    en: string;
  };
  fullDescription: {
    uz: string;
    en: string;
  };
  highlights: {
    uz: string[];
    en: string[];
  };
  technologies: string[];
  artwork: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'talabaga-yordam',
    slug: 'talabaga-yordam',
    index: '01',
    name: 'Talabaga Yordam',
    url: 'https://talabaga-yordam.netlify.app/',
    category: 'education',
    categoryLabel: {
      uz: "Ta'lim",
      en: 'Education',
    },
    shortDescription: {
      uz: "Talabalar uchun unumdorlik va o'quv jarayonida ko'maklashuvchi zamonaviy web-platforma.",
      en: 'A student-oriented productivity and assistance website.',
    },
    fullDescription: {
      uz: "Talabalar kundalik o'quv vazifalarini tartibga solishi, kerakli resurslarni tez topishi va samarali ishlashi uchun ishlab chiqilgan qulay web-ilova.",
      en: 'A streamlined web platform built to help students organize academic tasks, access useful resources quickly, and maintain daily study productivity.',
    },
    highlights: {
      uz: [
        'Talabalar ehtiyojiga moslashtirilgan sodda va tezkor interfeys',
        'Mobil va desktop qurilmalar uchun moslashuvchan dizayn',
        'Aniq tuzilma va qulay navigatsiya',
      ],
      en: [
        'Focused and accessible interface tailored for student workflows',
        'Responsive layout across mobile and desktop screens',
        'Structured content hierarchy for rapid navigation',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    artwork: '/src/assets/images/project_talabaga_yordam_1795501643349.jpg',
  },
  {
    id: 'dinshunoslik-38-guruh',
    slug: 'dinshunoslik-38-guruh',
    index: '02',
    name: 'Dinshunoslik — 38-guruh',
    url: 'https://dinshunoslik-38-guruh-islomjon.netlify.app/',
    category: 'education',
    categoryLabel: {
      uz: "Ta'lim",
      en: 'Education',
    },
    shortDescription: {
      uz: "Dinshunoslik yo'nalishi va 38-guruh materiallari uchun yaratilgan ta'limiy web-sayt.",
      en: 'An educational website related to Islamic studies.',
    },
    fullDescription: {
      uz: "O'quv guruhi talabalari uchun dars materiallari, ma'lumotlar va o'quv qo'llanmalarini qulay shaklda taqdim etuvchi maxsus ta'limiy platforma.",
      en: 'A dedicated educational portal designed to organize course materials, study references, and group resources cleanly for students.',
    },
    highlights: {
      uz: [
        "O'quv materiallarini tizimli va oson o'qiladigan ko'rinishda taqdim etish",
        "Barcha ekran o'lchamlariga moslashuvchan tartib",
        'Tezkor yuklanish va toza tipografika',
      ],
      en: [
        'Readable presentation of structured educational materials',
        'Adaptive layout optimized for smartphones and desktops',
        'Fast load performance with clean editorial typography',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    artwork: '/src/assets/images/project_dinshunoslik_1795501644011.jpg',
  },
  {
    id: 'islomjonning-online-bozori',
    slug: 'islomjonning-online-bozori',
    index: '03',
    name: 'Islomjonning Online Bozori',
    url: 'https://islomjonning-online-bozori.netlify.app/',
    category: 'ecommerce',
    categoryLabel: {
      uz: 'Elektron tijorat',
      en: 'E-commerce',
    },
    shortDescription: {
      uz: 'Mahsulotlarni namoyish qilish va xarid jarayonini qulaylashtiruvchi onlayn bozor sayti.',
      en: 'An online marketplace website.',
    },
    fullDescription: {
      uz: 'Zamonaviy onlayn savdo vitrinasi tamoyillari asosida qurilgan, foydalanuvchilarga mahsulotlarni ko‘rish va tanlash imkonini beruvchi elektron tijorat loyihasi.',
      en: 'An interactive online marketplace storefront crafted with clear product presentation, structured catalog browsing, and responsive shopping interactions.',
    },
    highlights: {
      uz: [
        'Tovar kartochkalari va vitrina tuzilmasi',
        'Interaktiv xarid foydalanuvchi tajribasi',
        'Barcha qurilmalarda barqaror ishlovchi moslashuvchan grid',
      ],
      en: [
        'Clean product catalog grid and storefront architecture',
        'Interactive browsing and selection flows',
        'Responsive grid engineered for desktop and mobile shoppers',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    artwork: '/src/assets/images/project_online_bozor_1795501645093.jpg',
  },
  {
    id: 'imtihon-i',
    slug: 'imtihon-i',
    index: '04',
    name: 'Imtihon I',
    url: 'http://imtihon-i.netlify.app/',
    category: 'education',
    categoryLabel: {
      uz: "Ta'lim",
      en: 'Education',
    },
    shortDescription: {
      uz: "Imtihon jarayonlari va bilimlarni sinashga mo'ljallangan amaliy web-loyiha.",
      en: 'An examination-related web project.',
    },
    fullDescription: {
      uz: "Amaliy imtihon topshiriqlari va tuzilgan sahifa komponentlari asosida tayyorlangan, aniqlik va tuzilmaga urg'u beruvchi web-loyiha.",
      en: 'A practical examination web project focused on clean semantic layout, disciplined styling, and structured frontend implementation.',
    },
    highlights: {
      uz: [
        'Semantik HTML va tartibli CSS arxitekturasi',
        'Aniqlik va foydalanish qulayligiga qaratilgan interfeys',
        'Tezkor va yengil sahifa tuzilishi',
      ],
      en: [
        'Semantic HTML structure and disciplined CSS architecture',
        'Clear, distraction-free interface layout',
        'Lightweight, fast-rendering static deployment',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'SCSS'],
    artwork: '/src/assets/images/project_imtihon_1795501645209.jpg',
  },
  {
    id: 'lucky-seahorse',
    slug: 'lucky-seahorse',
    index: '05',
    name: 'Lucky Seahorse',
    url: 'http://lucky-seahorse-64a554.netlify.app/',
    category: 'webapp',
    categoryLabel: {
      uz: 'Web-ilova',
      en: 'Web Applications',
    },
    shortDescription: {
      uz: 'Zamonaviy frontend yondashuvlari bilan yaratilgan kreativ web-ishlanma.',
      en: 'A web development project.',
    },
    fullDescription: {
      uz: 'Interaktiv interfeys elementlari, vizual muvozanat va zamonaviy frontend texnologiyalarini amalda namoyish etuvchi web-loyiha.',
      en: 'A creative web development project showcasing interactive UI components, visual polish, and responsive frontend engineering.',
    },
    highlights: {
      uz: [
        'Kreativ vizual kompozitsiya va interaktiv elementlar',
        'Silliq o‘tishlar va zamonaviy dizayn detallari',
        'Mobil ekranlar uchun moslashtirilgan tuzilma',
      ],
      en: [
        'Custom visual composition and interactive elements',
        'Smooth hover transitions and refined interface details',
        'Fully responsive viewport behavior',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    artwork: '/src/assets/images/project_lucky_seahorse_1795501644725.jpg',
  },
  {
    id: 'oyin-islomjon',
    slug: 'oyin-islomjon',
    index: '06',
    name: "O'yin Islomjon",
    url: 'http://oyin-islomjon.netlify.app/',
    category: 'games',
    categoryLabel: {
      uz: "O'yinlar",
      en: 'Games',
    },
    shortDescription: {
      uz: "Brauzerda to'g'ridan-to'g'ri o'ynash mumkin bo'lgan interaktiv o'yin web-sayti.",
      en: 'An interactive gaming website.',
    },
    fullDescription: {
      uz: "JavaScript mantiqi va dinamik interfeys yangilanishlari yordamida qurilgan, foydalanuvchilarga qiziqarli o'yin tajribasini taqdim etuvchi loyiha.",
      en: 'An interactive browser-based gaming experience powered by JavaScript state logic, responsive controls, and real-time UI feedback.',
    },
    highlights: {
      uz: [
        "Real vaqtda ishlovchi o'yin mantiqi va dinamik holat boshqaruvi",
        'Sensorli va klaviatura boshqaruviga mos qulaylik',
        "Qiziqarli va tezkor o'yin jarayoni",
      ],
      en: [
        'Real-time game state loop and responsive interaction handling',
        'Accessible controls across desktop and touch devices',
        'Engaging visual feedback during gameplay',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    artwork: '/src/assets/images/project_oyin_islomjon_1795501646162.jpg',
  },
  {
    id: 'barcha-kodlar',
    slug: 'barcha-kodlar',
    index: '07',
    name: 'Barcha Kodlar',
    url: 'https://barcha-kodlar.netlify.app/',
    category: 'webapp',
    categoryLabel: {
      uz: 'Web-ilova',
      en: 'Web Applications',
    },
    shortDescription: {
      uz: 'Dasturlash kodlari va foydali snippetlar jamlangan maxsus web-katalog.',
      en: 'A programming code collection website.',
    },
    fullDescription: {
      uz: "Dasturchilar va o'rganuvchilar uchun kod namunalarini tartibli saqlash, ko'rish va nusxalashni osonlashtiruvchi amaliy web-resurs.",
      en: 'A structured programming snippet and code repository website built to organize, browse, and reference useful code examples efficiently.',
    },
    highlights: {
      uz: [
        "Kod namunalarini tushunarli bo'limlarga ajratilgan tuzilma",
        'Tezkor qidirish va foydalanish qulayligi',
        'Dasturchilar uchun qulay qorong‘u va o‘qishli interfeys',
      ],
      en: [
        'Clean categorization of practical programming snippets',
        'Fast browsing and readable code formatting',
        'Developer-oriented interface clarity',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
    artwork: '/src/assets/images/project_barcha_kodlar_1795501646039.jpg',
  },
  {
    id: 'food-saytim',
    slug: 'food-saytim',
    index: '08',
    name: 'Food Saytim',
    url: 'https://food-saytim-islomjon.netlify.app/',
    category: 'webapp',
    categoryLabel: {
      uz: 'Web-ilova',
      en: 'Web Applications',
    },
    shortDescription: {
      uz: 'Taomlar va gastronomiya mavzusiga bag‘ishlangan zamonaviy web-sayt.',
      en: 'A food-themed website.',
    },
    fullDescription: {
      uz: 'Taomlar menyusi, vizual taqdimot va jozibali sahifa kompozitsiyasini birlashtirgan gastronomik yo‘nalishdagi frontend loyiha.',
      en: 'A culinary-themed web showcase combining appetizing menu presentation, clean layout rhythm, and responsive UI sections.',
    },
    highlights: {
      uz: [
        'Taomlar va menyu bo‘limlari uchun estetik vizual tartib',
        'Katta va kichik ekranlarga to‘liq moslashuvchan dizayn',
        'Silliq animatsiyalar va aniq navigatsiya',
      ],
      en: [
        'Structured menu and culinary showcase sections',
        'Responsive design optimized across mobile and desktop viewports',
        'Smooth transitions and clean visual hierarchy',
      ],
    },
    technologies: ['HTML5', 'CSS3', 'SCSS', 'JavaScript'],
    artwork: '/src/assets/images/project_food_saytim_1795501647525.jpg',
  },
];
