import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';
import { templeAudio } from '../utils/audio';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSankalpModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenSankalpModal,
}) => {
  const [audioActive, setAudioActive] = React.useState(true);

  const toggleSound = () => {
    const newState = templeAudio.toggleSound();
    setAudioActive(newState);
  };

  const navLinks = language === 'hi' ? [
    { label: 'लाइव दर्शन', href: '#live-darshan' },
    { label: 'भूमिदान', href: '#bhoomi-daan' },
    { label: 'मंदिर निर्माण', href: '#mandir-nirman' },
    { label: 'जल सेवा', href: '#jal-seva' },
    { label: 'भागवत कथा', href: '#bhagwat-katha' },
    { label: 'बैंक विवरण', href: '#bank-details' },
  ] : [
    { label: 'Live Darshan', href: '#live-darshan' },
    { label: 'Land Donation', href: '#bhoomi-daan' },
    { label: 'Temple Seva', href: '#mandir-nirman' },
    { label: 'Water Seva', href: '#jal-seva' },
    { label: 'Bhagwat Katha', href: '#bhagwat-katha' },
    { label: 'Bank Details', href: '#bank-details' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg md:text-xl font-bold tracking-tight text-amber-950 font-heading whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors"
        >
          {language === 'hi' ? 'मनुश्री महाराज रतनगढ़ वाले' : 'Manushree Maharaj Ratangarh Wale'}
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-amber-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + minimal utility toggles */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            aria-label={audioActive ? 'Mute bell' : 'Enable bell'}
            className="p-2 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
            title={audioActive ? 'मंदिर ध्वनि चालू' : 'मंदिर ध्वनि बंद'}
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          <button
            onClick={() => onLanguageChange(language === 'hi' ? 'en' : 'hi')}
            className="px-2.5 py-1 text-xs font-semibold text-stone-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-200/70 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            {language === 'hi' ? 'English' : 'हिंदी'}
          </button>

          <button
            onClick={() => {
              templeAudio.playTempleBell();
              onOpenSankalpModal();
            }}
            className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>{language === 'hi' ? 'पावन संकल्प करें' : 'Make Seva Sankalp'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
