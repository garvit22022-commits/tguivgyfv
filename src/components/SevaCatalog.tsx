import React, { useState } from 'react';
import {
  Compass,
  Hammer,
  Droplets,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  Calculator,
  Flame,
  Info
} from 'lucide-react';
import { Language, SevaCategoryKey, SevaOption } from '../types';
import {
  BHOOMI_DAAN_OPTIONS,
  MANDIR_NIRMAN_OPTIONS,
  NIRMAN_MATERIALS,
  JAL_SEVA_OPTIONS,
  BHAGWAT_KATHA_OPTIONS,
  KATHA_PROBLEMS_RELIEF
} from '../data/sevaData';
import { templeAudio } from '../utils/audio';

interface SevaCatalogProps {
  language: Language;
  onSelectOption: (option: SevaOption) => void;
  onSelectCustom: (category: SevaCategoryKey, title: string, amount: number) => void;
}

export const SevaCatalog: React.FC<SevaCatalogProps> = ({
  language,
  onSelectOption,
  onSelectCustom,
}) => {
  const [activeTab, setActiveTab] = useState<SevaCategoryKey>('bhoomi_daan');
  const [customGaj, setCustomGaj] = useState<number>(3);
  const [customBricks, setCustomBricks] = useState<number>(31);

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleOptionClick = (option: SevaOption) => {
    templeAudio.playTempleBell();
    onSelectOption(option);
  };

  return (
    <section id="sevas" className="py-16 lg:py-24 bg-amber-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-amber-800 text-sm font-semibold tracking-wide uppercase mb-2">
            {language === 'hi' ? 'पावन सेवा प्रकल्प' : 'Sacred Seva Projects'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight mb-4">
            {language === 'hi'
              ? 'खाटू श्याम जी में चल रही मुख्य सेवाएं'
              : 'Divine Seva Offerings in Khatu Shyam Ji'}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            {language === 'hi'
              ? 'पूज्य महाराज श्री मनुश्री जी (रतनगढ़ वाले) के पावन सानिध्य में समर्पित सेवा श्रेणियों में से अपनी इच्छानुसार सेवा का चयन कर संकल्प धारण करें।'
              : 'Select your preferred Seva contribution under the divine patronage of Pujya Maharaj Shri Manushree Ji (Ratangarh Wale).'}
          </p>

          {/* Interactive Segmented Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/80 rounded-xl max-w-2xl mx-auto border border-amber-200">
            <button
              onClick={() => setActiveTab('bhoomi_daan')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'bhoomi_daan'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'hi' ? 'भूमिदान सेवा' : 'Bhoomi Daan'}</span>
            </button>

            <button
              onClick={() => setActiveTab('mandir_nirman')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'mandir_nirman'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Hammer className="w-4 h-4" />
              <span>{language === 'hi' ? 'मंदिर निर्माण व ईंट' : 'Temple Construction'}</span>
            </button>

            <button
              onClick={() => setActiveTab('jal_seva')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'jal_seva'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>{language === 'hi' ? 'प्याऊ जल सेवा' : 'Summer Water Seva'}</span>
            </button>

            <button
              onClick={() => setActiveTab('bhagwat_katha')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'bhagwat_katha'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'hi' ? 'श्रीमद्भागवत पोथी' : 'Bhagwat Pothi'}</span>
            </button>
          </div>
        </div>

        {/* 1. BHOOMI DAAN SECTION */}
        {activeTab === 'bhoomi_daan' && (
          <div id="bhoomi-daan" className="space-y-10">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
              <div className="max-w-3xl">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                  प्रकल्प 1 · अन्नक्षेत्र व मंदिर हेतु भूमिदान
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 mt-1 mb-3">
                  {language === 'hi'
                    ? 'आओ करें खाटू श्याम जी में भूमिदान'
                    : 'Sacred Land Donation in Khatu Shyam Ji'}
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {language === 'hi'
                    ? 'खाटू श्याम जी राजस्थान में बन रहे विशाल अन्नक्षेत्र (जहाँ हजारों पदयात्रियों को नि:शुल्क भोजन प्रसादी मिलती है), अनवरत चलने वाली श्याम रसोई और भव्य मंदिर निर्माण के लिए भूमिदान कर अपनी धन रूपी लक्ष्मी को प्रभु सेवा में लगाएं।'
                    : 'Dedicate land for the mega Anna Kshetra, round-the-clock Shyam Rasoi (free community kitchen for thousands of pilgrims), and the sacred temple complex.'}
                </p>
              </div>

              {/* Bhoomi Daan Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {BHOOMI_DAAN_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex flex-col justify-between bg-stone-50 hover:bg-white rounded-xl p-6 border border-stone-200 hover:border-amber-400 transition-all shadow-xs hover:shadow-md relative group"
                  >
                    {opt.popular && (
                      <span className="absolute -top-3 left-4 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
                        अति लोकप्रिय
                      </span>
                    )}

                    <div>
                      <div className="text-lg font-bold text-stone-900 mb-1">
                        {language === 'hi' ? opt.titleHi : opt.titleEn}
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-amber-700 font-mono tabular-nums mb-3">
                        {formatRupees(opt.amount)}
                      </div>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                        {language === 'hi' ? opt.descriptionHi : opt.descriptionEn}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOptionClick(opt)}
                      className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:shadow-sm"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>{language === 'hi' ? 'भूमिदान संकल्प लें' : 'Pledge Land Seva'}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Custom Land Calculator */}
              <div className="mt-8 p-6 bg-amber-50/70 rounded-xl border border-amber-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-200/80 rounded-lg text-amber-900">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm sm:text-base">
                        {language === 'hi' ? 'अपनी इच्छानुसार कितने भी गज भूमि का दान करें' : 'Custom Square Yard Land Donation'}
                      </div>
                      <div className="text-xs text-stone-600">
                        {language === 'hi' ? '₹11,000 प्रति गज के आधार पर' : 'Calculated at ₹11,000 per Gaj'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white rounded-lg border border-amber-300 p-1">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={customGaj}
                        onChange={(e) => setCustomGaj(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 px-2 py-1 text-center font-bold text-stone-900 focus:outline-hidden"
                      />
                      <span className="text-xs font-semibold text-stone-500 pr-2">गज</span>
                    </div>

                    <div className="text-lg font-bold text-amber-800 font-mono tabular-nums whitespace-nowrap">
                      = {formatRupees(customGaj * 11000)}
                    </div>

                    <button
                      onClick={() => {
                        templeAudio.playTempleBell();
                        onSelectCustom(
                          'bhoomi_daan',
                          `${customGaj} गज भूमिदान (अन्नक्षेत्र व मंदिर निर्माण)`,
                          customGaj * 11000
                        );
                      }}
                      className="px-4 py-2 bg-stone-900 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                      {language === 'hi' ? 'यह दान चुनें' : 'Select Custom'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MANDIR NIRMAN & BRICK SEVA */}
        {activeTab === 'mandir_nirman' && (
          <div id="mandir-nirman" className="space-y-10">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
              <div className="max-w-3xl">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                  प्रकल्प 2 · मंदिर निर्माण में ईंट व सामग्री सेवा
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 mt-1 mb-2">
                  {language === 'hi'
                    ? 'आओ करें मंदिर निर्माण में सहयोग अपनी धन रूपी लक्ष्मी का सदुपयोग'
                    : 'Grand Temple Construction & Sacred Bricks Seva'}
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {language === 'hi'
                    ? 'खाटू श्याम जी में बन रहे भव्य मंदिर के दिव्य गर्भगृह, सभा मंडप और परिक्रमा मार्ग के निर्माण हेतु पवित्र ईंटों एवं निर्माण सामग्री का समर्पण करें।'
                    : 'Contribute consecrated bricks, carved stone, cement, sand, and steel rods for the sanctum and spire.'}
                </p>
              </div>

              {/* Brick Packages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {MANDIR_NIRMAN_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex flex-col justify-between bg-stone-50 hover:bg-white rounded-xl p-6 border border-stone-200 hover:border-amber-400 transition-all shadow-xs hover:shadow-md relative group"
                  >
                    {opt.popular && (
                      <span className="absolute -top-3 left-4 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
                        अति लोकप्रिय
                      </span>
                    )}

                    <div>
                      <div className="text-lg font-bold text-stone-900 mb-1">
                        {language === 'hi' ? opt.titleHi : opt.titleEn}
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-amber-700 font-mono tabular-nums mb-3">
                        {formatRupees(opt.amount)}
                      </div>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                        {language === 'hi' ? opt.descriptionHi : opt.descriptionEn}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOptionClick(opt)}
                      className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:shadow-sm"
                    >
                      <Hammer className="w-4 h-4" />
                      <span>{language === 'hi' ? 'ईंट सेवा संकल्प लें' : 'Pledge Brick Seva'}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Building Material Offerings mentioned in user prompt */}
              <div className="mt-12 pt-8 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-700 font-bold text-sm tracking-wide uppercase">
                    {language === 'hi' ? '👉🏻 और सेवाएं (निर्माण सामग्री)' : 'Other Construction Material Sevas'}
                  </span>
                </div>
                <h4 className="text-xl font-heading font-bold text-stone-900 mb-6">
                  {language === 'hi'
                    ? 'पत्थर, सीमेंट, बजरी व सरिया सेवा'
                    : 'Stone, Cement, Sand & Steel Seva'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {NIRMAN_MATERIALS.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/70 hover:bg-white hover:border-amber-400 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-stone-900 text-base mb-1">
                          {language === 'hi' ? mat.titleHi : mat.titleEn}
                        </div>
                        <p className="text-stone-600 text-xs leading-relaxed mb-4">
                          {language === 'hi' ? mat.descriptionHi : mat.descriptionEn}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-amber-200/50 flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-amber-800">
                          {formatRupees(mat.suggestedAmount)}
                        </span>
                        <button
                          onClick={() => {
                            templeAudio.playTempleBell();
                            onSelectCustom('mandir_nirman', mat.titleHi, mat.suggestedAmount);
                          }}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap"
                        >
                          {language === 'hi' ? 'यह सेवा लें' : 'Select Seva'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. JAL SEVA / PYAAU IN SUMMER */}
        {activeTab === 'jal_seva' && (
          <div id="jal-seva" className="space-y-10">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
              <div className="max-w-3xl">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                  प्रकल्प 3 · भीषण गर्मी में प्यासे को पानी
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 mt-1 mb-2">
                  {language === 'hi'
                    ? '◆ आओ महाराज श्री के सानिध्य में भीषण गर्मी में पिलाये प्यासे को पानी ◆'
                    : 'Quench the Thirst of Devotees in Scorching Summer'}
                </h3>
                <p className="text-stone-700 leading-relaxed text-sm sm:text-base font-medium">
                  {language === 'hi' ? (
                    <>
                      ● अपने पूर्वजों के निमित्त... अपने परिवार के निमित्त महाराज श्री के द्वारा जगह जगह प्याऊ सेवा के माध्यम से शीतल जल पिलाएं... आप जैसे भामाशाह ही सहयोग करके ही गर्मियों में प्यासे राहगीरों की प्यास बुझाते हैं।
                    </>
                  ) : (
                    'Sponsor cool drinking water kiosks for walking pilgrims and devotees across Khatu Dham under the heatwave. Dedicated in memory of ancestors or family welfare.'
                  )}
                </p>
              </div>

              {/* Water Seva Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {JAL_SEVA_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex flex-col justify-between bg-stone-50 hover:bg-white rounded-xl p-6 border border-stone-200 hover:border-amber-400 transition-all shadow-xs hover:shadow-md relative group"
                  >
                    {opt.popular && (
                      <span className="absolute -top-3 left-4 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
                        अति लोकप्रिय
                      </span>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-amber-600" />
                        <span className="text-lg font-bold text-stone-900">
                          {language === 'hi' ? opt.titleHi : opt.titleEn}
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-amber-700 font-mono tabular-nums mb-3">
                        {formatRupees(opt.amount)}
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed mb-6">
                        {language === 'hi' ? opt.descriptionHi : opt.descriptionEn}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOptionClick(opt)}
                      className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:shadow-sm"
                    >
                      <Droplets className="w-4 h-4" />
                      <span>{language === 'hi' ? 'जल सेवा संकल्प लें' : 'Pledge Water Seva'}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Ancestral Blessing Callout */}
              <div className="mt-8 p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-100 rounded-lg text-amber-800">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm sm:text-base">
                      {language === 'hi' ? 'पूर्वजों के नाम से विशेष प्याऊ पट्टिका (Name Plaque)' : 'Ancestral Memorial Water Kiosk'}
                    </div>
                    <div className="text-xs text-stone-600">
                      {language === 'hi'
                        ? '3 महीने की पूर्ण ग्रीष्मकालीन जल सेवा पर प्याऊ स्थल पर आपके पूज्य पूर्वजों के नाम की पट्टिका लगाई जाएगी।'
                        : 'On 3-month water seva, a dedicated plaque with your ancestor names is affixed at the holy water kiosk.'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOptionClick(JAL_SEVA_OPTIONS[2])}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {language === 'hi' ? '3 माह सेवा चुनें (₹21,000)' : 'Select 3 Months (₹21,000)'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. SHRIMAD BHAGWAT KATHA POTHI SEVA */}
        {activeTab === 'bhagwat_katha' && (
          <div id="bhagwat-katha" className="space-y-10">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                    प्रकल्प 4 · 9 पेड़ों के सामीप्य में श्रीमद्भागवत कथा
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 mt-1 mb-2">
                    {language === 'hi'
                      ? '■ विद्वान पंडितों और आचार्यों द्वारा श्रीमद्भागवत कथा परायण पोथी सेवा'
                      : 'Sacred Shrimad Bhagwat Katha Parayan & Pothi Seva'}
                  </h3>
                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {language === 'hi' ? (
                      <>
                        महाराज श्री के सानिध्य में खाटू श्याम जी राजस्थान में संकल्पित श्रीमद्भागवत कथा का परायण विद्वान पंडितों और आचार्यों द्वारा 9 पेड़ों के सामीप्य में विशाल श्रीमद्भागवत कथा का परायण पोथी सेवा करा सकते हैं।
                      </>
                    ) : (
                      'Under the sacred shelter of 9 consecrated trees in Khatu Shyam Ji, Rajasthan, participate in the divine Shrimad Bhagwat Katha Parayan guided by learned Vedic acharyas.'
                    )}
                  </p>

                  {/* 4 Dosha Relief Points from user prompt */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {KATHA_PROBLEMS_RELIEF.map((rel, i) => (
                      <div key={i} className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/60">
                        <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5 mb-0.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{language === 'hi' ? rel.titleHi : rel.titleEn}</span>
                        </div>
                        <p className="text-xs text-stone-600">{language === 'hi' ? rel.descHi : rel.descEn}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pothi Seva Options from prompt */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BHAGWAT_KATHA_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        className="p-5 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-white transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-base font-bold text-stone-900 mb-1">
                            {language === 'hi' ? opt.titleHi : opt.titleEn}
                          </div>
                          <div className="text-2xl font-bold text-amber-700 font-mono tabular-nums mb-2">
                            {formatRupees(opt.amount)}
                          </div>
                          <p className="text-xs text-stone-600 mb-4">
                            {language === 'hi' ? opt.descriptionHi : opt.descriptionEn}
                          </p>
                        </div>

                        <button
                          onClick={() => handleOptionClick(opt)}
                          className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>{language === 'hi' ? 'पोथी सेवा संकल्प लें' : 'Pledge Pothi Seva'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real Katha Image generated from Prompt */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl overflow-hidden border border-amber-200 shadow-md">
                    <img
                      src="/src/assets/images/maharaj_shri_katha_satsang_1794294740351.jpg"
                      alt="Shrimad Bhagwat Katha Vyaspeeth under holy trees"
                      referrerPolicy="no-referrer"
                      className="w-full h-72 object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4 bg-stone-900 text-white">
                      <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        पवित्र व्यासपीठ एवं वृक्ष छांव
                      </div>
                      <div className="text-xs text-stone-300 leading-relaxed">
                        9 पावन वृक्षों (वट, पीपल, नीम, आंवला, कदम्ब, विल्व आदि) के सामीप्य में वेदपाठी ब्राह्मणों द्वारा मूल पारायण।
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
