export interface ProcessStep {
  step: string;
  id: string;
  title: {
    uz: string;
    en: string;
  };
  description: {
    uz: string;
    en: string;
  };
}

export const processData: ProcessStep[] = [
  {
    step: 'STEP 01',
    id: 'idea-research',
    title: {
      uz: "G'OYA VA TADQIQOT",
      en: 'IDEA & RESEARCH',
    },
    description: {
      uz: "Loyiha maqsadi, foydalanuvchi ehtiyojlari va texnik talablarni chuqur o'rganish.",
      en: 'Understanding the project and its requirements.',
    },
  },
  {
    step: 'STEP 02',
    id: 'planning-design',
    title: {
      uz: 'REJALASHTIRISH VA DIZAYN',
      en: 'PLANNING & DESIGN',
    },
    description: {
      uz: "Tizim arxitekturasi, sahifalar tuzilmasi va vizual yo'nalishni tayyorlash.",
      en: 'Preparing the structure and visual direction.',
    },
  },
  {
    step: 'STEP 03',
    id: 'development',
    title: {
      uz: 'DASTURLASH',
      en: 'DEVELOPMENT',
    },
    description: {
      uz: 'Zamonaviy frontend va backend texnologiyalari yordamida sifatli kod yozish.',
      en: 'Building the website using modern technologies.',
    },
  },
  {
    step: 'STEP 04',
    id: 'testing',
    title: {
      uz: 'TESTLASH',
      en: 'TESTING',
    },
    description: {
      uz: "Barcha qurilmalarda moslashuvchanlik, tezlik va funksionallikni tekshirish.",
      en: 'Checking responsiveness and functionality.',
    },
  },
  {
    step: 'STEP 05',
    id: 'deployment',
    title: {
      uz: 'ISHGA TUSHIRISH',
      en: 'DEPLOYMENT',
    },
    description: {
      uz: "Yakuniy mahsulotni optimallashtirish, xostingka joylash va ishga tushirish.",
      en: 'Preparing and publishing the final product.',
    },
  },
];
