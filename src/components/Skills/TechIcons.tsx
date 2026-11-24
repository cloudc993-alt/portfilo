interface TechIconProps {
  id: string;
  className?: string;
}

export function TechIcon({ id, className = 'h-9 w-9' }: TechIconProps) {
  switch (id) {
    case 'html5':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
          <path d="M9 6l3 33 12 3.5L36 39l3-33H9z" stroke="#FF5A1F" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M16 14h16l-.6 5H21.2l.4 4.5h9.3l-.9 9.2-6 1.7-6-1.7-.4-4.2" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'css3':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
          <path d="M9 6l3 33 12 3.5L36 39l3-33H9z" stroke="#FF7A24" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M16 14.5h16l-1 8.5h-9l-.3 3.5h8.7l-.8 7.5-5.6 1.6-5.6-1.6-.3-3.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'scss':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
          <rect x="6" y="8" width="36" height="32" rx="8" stroke="#FF2B1C" strokeWidth="2.4" />
          <path d="M18 19c-2.5 0-4 1.3-4 2.9 0 3.7 7.5 1.8 7.5 5.4 0 1.8-1.8 3.2-4.4 3.2-2.2 0-3.8-.8-4.8-1.8" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M31 19c-2.4 0-4 1.3-4 2.9 0 3.7 7.5 1.8 7.5 5.4 0 1.8-1.8 3.2-4.4 3.2-1.8 0-3.3-.6-4.2-1.4" stroke="#FF7A24" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
          <rect x="7" y="7" width="34" height="34" rx="7" stroke="#FF7A24" strokeWidth="2.4" />
          <path d="M22 21v11.5c0 2.3-1.4 3.5-3.6 3.5-1.5 0-2.6-.6-3.4-1.6" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M34 22.8c-.7-1.1-1.9-1.8-3.4-1.8-2.2 0-3.8 1.2-3.8 3 0 3.7 7.6 1.8 7.6 5.8 0 2-1.7 3.4-4.2 3.4-2 0-3.6-.8-4.6-2" stroke="#FF5A1F" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="3.4" fill="#FF2B1C" />
          <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#FFFFFF" strokeWidth="2" />
          <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" stroke="#FF5A1F" strokeWidth="2" />
          <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" stroke="#FF7A24" strokeWidth="2" />
        </svg>
      );
    case 'php':
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
          <ellipse cx="24" cy="24" rx="19" ry="11" stroke="#FF5A1F" strokeWidth="2.4" />
          <path d="M12.5 29v-9.5h3.8c1.9 0 3 1 3 2.7s-1.1 2.8-3 2.8h-3.8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22.5 18.5V29m0-5.2h4.2c1.1 0 1.8.8 1.8 2V29" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 29v-9.5h3.6c1.8 0 2.9 1 2.9 2.7s-1.1 2.8-2.9 2.8H32" stroke="#FF7A24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
