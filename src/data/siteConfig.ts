export interface SocialLinkConfig {
  id: 'github' | 'telegram' | 'instagram' | 'linkedin';
  label: string;
  url: string | null;
  placeholderHandle: string;
}

export const siteConfig = {
  owner: {
    fullName: "NE'MATOV ISLOMJON",
    shortMark: 'NI',
    title: 'FULL-STACK DEVELOPER',
    additionalTitles: [
      'Frontend Developer',
      'Backend Developer',
      'React.js Developer',
      'Web Developer',
    ],
    portraitPath: '/images/islomjon.jpg',
    slogan: 'Turning Ideas Into Digital Experiences.',
    altSlogan: 'Code. Create. Innovate.',
  },
  // Configure a real PDF file at public/cv/Nematov_Islomjon_CV.pdf and set cvUrl to '/cv/Nematov_Islomjon_CV.pdf'
  cvUrl: null as string | null,
  expectedCvPath: 'public/cv/Nematov_Islomjon_CV.pdf',
  // Configure a real Formspree / backend API endpoint to enable live email delivery
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || null,
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || null,
  // Add real profile URLs here; unconfigured links stay hidden on the public UI
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      url: null,
      placeholderHandle: 'https://github.com/username',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      url: null,
      placeholderHandle: 'https://t.me/username',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: null,
      placeholderHandle: 'https://instagram.com/username',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: null,
      placeholderHandle: 'https://linkedin.com/in/username',
    },
  ] satisfies SocialLinkConfig[],
};
