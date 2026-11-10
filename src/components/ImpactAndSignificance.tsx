import React from 'react';
import {
  Compass,
  Heart,
  Droplets,
  BookOpen,
  Sparkles,
  TreeDeciduous,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types';

interface ImpactAndSignificanceProps {
  language: Language;
}

export const ImpactAndSignificance: React.FC<ImpactAndSignificanceProps> = ({ language }) => {
  return (
    <section className="py-16 bg-white border-t border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-bold mb-2">
            आध्यात्मिक महत्व एवं महिमा
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight mb-4">
            {language === 'hi'
              ? 'खाटू श्याम जी में सेवा का अक्षय फल'
              : 'Spiritual Significance of Seva in Khatu Shyam Ji'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'महाराज श्री मनुश्री जी के मार्गदर्शन में चल रहे इन सेवा प्रकल्पों में किया गया दान आपके कुल, परिवार और पूर्वजों के लिए कल्याणकारी है।'
              : 'The sacred offerings made towards these consecrated initiatives bring eternal merit, peace to ancestors, and harmony to the family.'}
          </p>
        </div>

        {/* 4 Pillars Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* 1. Annakshetra & Bhoomi Daan */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  अन्नक्षेत्र एवं श्याम रसोई
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === 'hi' ? 'भूमिदान: अक्षय पुण्य का आधार' : 'Bhoomi Daan: Eternal Merit'}
                </h3>
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              {language === 'hi'
                ? 'शास्त्रों में कहा गया है कि अन्नक्षेत्र और मंदिर हेतु दी गई भूमि सूर्य और चंद्रमा के अस्तित्व तक दाता के कुल को पुण्य फल प्रदान करती है। खाटू धाम में लाखों पदयात्री दर्शनार्थ आते हैं, जहाँ श्याम रसोई द्वारा प्रतिदिन नि:शुल्क सात्विक भोजन महाप्रसाद वितरित किया जाता है।'
                : 'In sacred scriptures, land donated for God and free food distribution continues to bless the lineage of the donor as long as the sun and moon endure.'}
            </p>
            <div className="text-xs text-amber-900 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200/60">
              ✓ 1 गज से 11 गज अथवा स्वेच्छानुसार भूमि समर्पण उपलब्ध
            </div>
          </div>

          {/* 2. Temple Construction & Bricks */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  लक्ष्मी का सदुपयोग
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === 'hi' ? 'मंदिर निर्माण में ईंट व सामग्री' : 'Consecrated Temple Bricks'}
                </h3>
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              {language === 'hi'
                ? 'अपनी कमाई का एक अंश प्रभु के भव्य धाम निर्माण में लगाना लक्ष्मी का सर्वोत्तम सदुपयोग माना गया है। 11, 21, 51 अथवा 101 ईंटों का सहयोग या पत्थर, सीमेंट, बजरी व सरिया की सेवा मंदिर को युगों-युगों तक दृढ़ता प्रदान करती है।'
                : 'Dedicating a portion of wealth to sacred temple construction ensures divine protection and prosperity for generations.'}
            </p>
            <div className="text-xs text-amber-900 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200/60">
              ✓ गर्भगृह, सभा मंडप एवं परिक्रमा मार्ग निर्माण में समर्पण
            </div>
          </div>

          {/* 3. Scorching Summer Water Seva */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  पूर्वज व परिवार निमित्त
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === 'hi' ? 'भीषण गर्मी में प्याऊ जल सेवा' : 'Summer Water Seva (Pyaau)'}
                </h3>
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              {language === 'hi'
                ? 'राजस्थान की प्रचंड धूप एवं लू में नंगे पाँव खाटू धाम पहुँचने वाले भक्तों और राहगीरों को ठंडा जल पिलाना साक्षात् ईश्वर सेवा के समान है। अपने पूर्वजों की स्मृति अथवा परिवार के कल्याणार्थ 1 से 3 माह की जल सेवा का संकल्प लें।'
                : 'Quenching the intense thirst of pilgrims walking barefoot under 45°C summer heat across Rajasthan brings immense spiritual fulfillment and peace to departed souls.'}
            </p>
            <div className="text-xs text-amber-900 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200/60">
              ✓ मटका प्याऊ, वाटर कूलर एवं अनवरत छबील सेवा व्यवस्था
            </div>
          </div>

          {/* 4. 9 Sacred Trees Shrimad Bhagwat Katha */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <TreeDeciduous className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  दोष शांति एवं मोक्ष
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === 'hi' ? '9 पेड़ों के सामीप्य में भागवत कथा' : 'Bhagwat Parayan under 9 Trees'}
                </h3>
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              {language === 'hi'
                ? 'खाटू श्याम जी में 9 पावन वृक्षों की छांव में विद्वान आचार्यों द्वारा मूल श्रीमद्भागवत का परायण किया जाता है। यह पित्र दोष, काल सर्प दोष, मंगल दोष, संतान सुख में बाधा व पारिवारिक क्लेशों से मुक्ति दिलाने में अत्यंत प्रभावशाली है।'
                : 'Conducted under 9 sacred trees by Vedic pandits, this ritual alleviates ancestral Pitra Dosh, astrological afflictions, and restores family happiness.'}
            </p>
            <div className="text-xs text-amber-900 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200/60">
              ✓ 1 अथवा 2 पोथी सेवा (एक/दो परिवार व गोत्र अनुसार)
            </div>
          </div>
        </div>

        {/* Editorial Pull Quote */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-amber-900 text-amber-100 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-3xl font-serif text-amber-300 mb-2">“</div>
            <blockquote className="text-lg sm:text-xl font-serif italic text-white mb-4 leading-relaxed">
              आप जैसे भामाशाह ही सहयोग करके गर्मियों में प्यासे राहगीरों की प्यास बुझाते हैं, मंदिर की नींव को संवारते हैं और अन्नक्षेत्र में हर भूखे को भोजन उपलब्ध कराते हैं।
            </blockquote>
            <cite className="not-italic text-sm text-amber-300 font-semibold tracking-wide">
              — पूज्य महाराज श्री मनुश्री जी (रतनगढ़ वाले)
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};
