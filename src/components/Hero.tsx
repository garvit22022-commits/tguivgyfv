import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, ArrowRight, QrCode } from 'lucide-react';
import { Language } from '../types';
import { templeAudio } from '../utils/audio';

interface HeroProps {
  language: Language;
  onOpenSankalp: () => void;
  onScrollToBank: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenSankalp,
  onScrollToBank,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Image with warm devotional scrim overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_khatu_shyam_mandir_1794294738394.jpg"
          alt="Shree Khatu Shyam Ji Temple Rajasthan Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/60 to-stone-950/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-3xl">
          {/* Sacred Opening Inscription */}
          <div className="inline-flex items-center gap-2 text-amber-300 font-serif text-sm tracking-widest uppercase mb-4">
            <span className="w-6 h-px bg-amber-400/60" />
            <span>॥ ॐ श्री श्याम देवाय नमः ॥ हारे का सहारा, बाबा श्याम हमारा</span>
            <span className="w-6 h-px bg-amber-400/60" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-amber-50 tracking-tight leading-tight mb-3 text-balance">
            {language === 'hi' ? (
              <>
                <span className="text-amber-400">मनुश्री महाराज रतनगढ़ वाले</span>
                <span className="block text-2xl sm:text-3xl text-stone-200 mt-1 font-semibold">
                  खाटू श्याम जी में चल रही पावन सेवाएं
                </span>
              </>
            ) : (
              <>
                <span className="text-amber-400">Manushree Maharaj Ratangarh Wale</span>
                <span className="block text-2xl sm:text-3xl text-stone-200 mt-1 font-semibold">
                  Divine Charitable Services in Khatu Shyam Ji
                </span>
              </>
            )}
          </h1>

          {/* Patronage Subtitle */}
          <div className="text-base sm:text-lg text-amber-200/95 font-devanagari font-medium mb-5 flex items-center gap-2">
            <span>◆ पूज्य महाराज श्री मनुश्री जी (रतनगढ़ वाले) के पावन सानिध्य में ◆</span>
          </div>

          {/* Core Mission Paragraph */}
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl font-light">
            {language === 'hi' ? (
              'राजस्थान की पावन धरा खाटू श्याम जी में बन रहे विशाल अन्नक्षेत्र, 365 दिन अनवरत चलने वाली श्याम रसोई, भव्य मंदिर निर्माण, ग्रीष्मकालीन प्याऊ जल सेवा एवं 9 पेड़ों के सामीप्य में श्रीमद्भागवत कथा परायण में अपनी धन रूपी लक्ष्मी का सदुपयोग कर पावन पुण्य संचय करें।'
            ) : (
              'Contribute towards the consecrated Anna Kshetra, 24x7 Shyam Rasoi community kitchen, grand temple construction, summer drinking water pyaau, and holy Shrimad Bhagwat Katha Parayan in Khatu Shyam Ji, Rajasthan.'
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => {
                templeAudio.playTempleBell();
                onOpenSankalp();
              }}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 text-sm sm:text-base group"
            >
              <HeartHandshake className="w-5 h-5 text-stone-950 group-hover:scale-110 transition-transform" />
              <span>{language === 'hi' ? 'अभी सेवा संकल्प लें' : 'Take Seva Sankalp'}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onScrollToBank}
              className="px-6 py-3.5 bg-stone-800/80 hover:bg-stone-800 border border-amber-400/30 text-amber-200 hover:text-white font-medium rounded-lg transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <QrCode className="w-5 h-5 text-amber-400" />
              <span>{language === 'hi' ? 'बैंक खाता व QR कोड' : 'Bank Account & QR Code'}</span>
            </button>
          </div>

          {/* 4 Pillars Summary Pill-less Editorial Metadata */}
          <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-300">
            <div>
              <div className="text-amber-400 font-semibold mb-0.5">भूमिदान सेवा</div>
              <div className="text-stone-400 text-xs">₹11,000 प्रति गज से</div>
            </div>
            <div>
              <div className="text-amber-400 font-semibold mb-0.5">मंदिर ईंट सेवा</div>
              <div className="text-stone-400 text-xs">11 ईंटें ₹11,000 से</div>
            </div>
            <div>
              <div className="text-amber-400 font-semibold mb-0.5">ग्रीष्म जल सेवा</div>
              <div className="text-stone-400 text-xs">1 माह ₹7,100 से</div>
            </div>
            <div>
              <div className="text-amber-400 font-semibold mb-0.5">श्रीमद्भागवत पोथी</div>
              <div className="text-stone-400 text-xs">1 पोथी ₹11,000 से</div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Trust Ribbon */}
      <div className="bg-amber-600/20 border-y border-amber-500/30 backdrop-blur-xs py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-amber-200/90">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>पंजीकृत चैरिटेबल ट्रस्ट · एक्सिस बैंक खाटू श्याम जी शाखा · 100% पारदर्शी सेवा</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span>स्थान: खाटू श्याम जी (सीकर), राजस्थान</span>
            <span>हेल्पलाइन: +91 22 6228 0555</span>
          </div>
        </div>
      </div>
    </section>
  );
};
