/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveDarshanCard } from './components/LiveDarshanCard';
import { SevaCatalog } from './components/SevaCatalog';
import { TrustBankDetails } from './components/TrustBankDetails';
import { ImpactAndSignificance } from './components/ImpactAndSignificance';
import { Footer } from './components/Footer';
import { SankalpModal } from './components/SankalpModal';
import { SankalpCertificateModal } from './components/SankalpCertificateModal';
import { Language, SevaOption, SevaCategoryKey, SankalpReceipt } from './types';
import { HeartHandshake } from 'lucide-react';
import { templeAudio } from './utils/audio';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [isSankalpModalOpen, setIsSankalpModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SevaOption | null>(null);
  const [selectedTrustId, setSelectedTrustId] = useState<string | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<SankalpReceipt | null>(null);

  const handleOpenSankalpModal = (trustId?: string) => {
    setSelectedOption(null);
    setSelectedTrustId(trustId || null);
    setIsSankalpModalOpen(true);
  };

  const handleSelectOption = (option: SevaOption) => {
    setSelectedOption(option);
    setSelectedTrustId(null);
    setIsSankalpModalOpen(true);
  };

  const handleSelectCustom = (category: SevaCategoryKey, title: string, amount: number) => {
    setSelectedOption({
      id: `custom-${Date.now()}`,
      category,
      titleHi: title,
      titleEn: title,
      amount,
      unitHi: 'इच्छानुसार',
      unitEn: 'Custom',
      descriptionHi: 'विशेष सेवा समर्पण',
      descriptionEn: 'Custom Seva Offering',
    });
    setSelectedTrustId(null);
    setIsSankalpModalOpen(true);
  };

  const handleScrollToBank = () => {
    const elem = document.getElementById('bank-details');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReceiptGenerated = (receipt: SankalpReceipt) => {
    setActiveReceipt(receipt);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Top Navigation conforming to strict 3-zone contract */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenSankalpModal={() => handleOpenSankalpModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Showcase with authentic temple image */}
        <Hero
          language={language}
          onOpenSankalp={() => handleOpenSankalpModal()}
          onScrollToBank={handleScrollToBank}
        />

        {/* 2. Official Live Darshan Card with Aarti Schedule and Periodic Fetch */}
        <LiveDarshanCard
          language={language}
          onOpenSankalp={() => handleOpenSankalpModal()}
        />

        {/* 3. Primary Seva Offerings Catalog (Bhoomi Daan, Mandir Nirman, Jal Seva, Katha Pothi) */}
        <SevaCatalog
          language={language}
          onSelectOption={handleSelectOption}
          onSelectCustom={handleSelectCustom}
        />

        {/* 3. Official Trust Bank Accounts & Uploaded QR Codes */}
        <TrustBankDetails
          language={language}
          onInitiateSankalp={(trustId) => handleOpenSankalpModal(trustId)}
        />

        {/* 4. Spiritual Impact & Cultural Significance */}
        <ImpactAndSignificance language={language} />
      </main>

      {/* Quiet Respectful Footer */}
      <Footer language={language} />

      {/* Floating Mobile Bottom CTA (compliant with 15% mobile sticky cap) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30">
        <button
          onClick={() => {
            templeAudio.playTempleBell();
            handleOpenSankalpModal();
          }}
          className="w-full py-3 px-4 bg-linear-to-r from-amber-600 to-amber-700 active:from-amber-700 active:to-amber-800 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>{language === 'hi' ? 'खाटू श्याम सेवा संकल्प करें' : 'Make Seva Sankalp'}</span>
        </button>
      </div>

      {/* Interactive 2-Step Sankalp & Payment Modal */}
      <SankalpModal
        isOpen={isSankalpModalOpen}
        onClose={() => setIsSankalpModalOpen(false)}
        language={language}
        preselectedOption={selectedOption}
        preselectedTrustId={selectedTrustId}
        onGenerateReceipt={handleReceiptGenerated}
      />

      {/* Royal Digital Sankalp Patra / Receipt Modal */}
      <SankalpCertificateModal
        receipt={activeReceipt}
        onClose={() => setActiveReceipt(null)}
        language={language}
      />
    </div>
  );
}
