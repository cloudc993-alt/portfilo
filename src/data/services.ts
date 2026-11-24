export interface ServiceItem {
  number: string;
  id: string;
  iconName: 'layout' | 'server' | 'atom' | 'smartphone' | 'layers' | 'gauge';
  title: {
    uz: string;
    en: string;
  };
  description: {
    uz: string;
    en: string;
  };
}

export const servicesData: ServiceItem[] = [
  {
    number: '01',
    id: 'frontend-development',
    iconName: 'layout',
    title: {
      uz: 'Frontend Development',
      en: 'Frontend Development',
    },
    description: {
      uz: "Zamonaviy, moslashuvchan va vizual jihatdan ta'sirchan foydalanuvchi interfeyslari yaratish.",
      en: 'Modern, responsive, and visually impressive user interfaces.',
    },
  },
  {
    number: '02',
    id: 'backend-development',
    iconName: 'server',
    title: {
      uz: 'Backend Development',
      en: 'Backend Development',
    },
    description: {
      uz: "Server tomoni funksionalligi, mantiqiy jarayonlar va ishonchli backend tizimlarini qurish.",
      en: 'Server-side functionality and backend implementation.',
    },
  },
  {
    number: '03',
    id: 'react-development',
    iconName: 'atom',
    title: {
      uz: 'React.js Development',
      en: 'React.js Development',
    },
    description: {
      uz: "Tezkor, modulli va interaktiv zamonaviy React web-ilovalarini ishlab chiqish.",
      en: 'Modern interactive React applications.',
    },
  },
  {
    number: '04',
    id: 'responsive-web-design',
    iconName: 'smartphone',
    title: {
      uz: 'Responsive Web Design',
      en: 'Responsive Web Design',
    },
    description: {
      uz: "Smartfonlar, planshetlar va desktop ekranlar uchun to'liq moslashtirilgan web-saytlar.",
      en: 'Websites optimized for smartphones, tablets, and desktops.',
    },
  },
  {
    number: '05',
    id: 'ui-implementation',
    iconName: 'layers',
    title: {
      uz: 'UI Implementation',
      en: 'UI Implementation',
    },
    description: {
      uz: "Dizayn g'oyalarini aniq detallar va silliq animatsiyalar bilan ishlaydigan interfeysga aylantirish.",
      en: 'Transforming design concepts into functional interfaces.',
    },
  },
  {
    number: '06',
    id: 'website-optimization',
    iconName: 'gauge',
    title: {
      uz: 'Website Optimization',
      en: 'Website Optimization',
    },
    description: {
      uz: "Web-sayt yuklanish tezligini, unumdorligini va foydalanuvchi tajribasini oshirish.",
      en: 'Improving website performance and user experience.',
    },
  },
];
