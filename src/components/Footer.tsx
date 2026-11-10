import React from 'react';
import { ShieldCheck, Heart, Phone, MapPin, Mail } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Trust Profile */}
          <div className="space-y-3">
            <div className="text-white font-bold text-base font-heading tracking-wide">
              मनुश्री महाराज रतनगढ़ वाले
            </div>
            <div className="text-amber-400 text-xs font-devanagari">
              ◆ पूज्य महाराज श्री मनुश्री जी (रतनगढ़ वाले) के पावन सानिध्य में ◆
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              श्री श्याम जन कल्याणार्थ मनुश्री चैरिटेबल ट्रस्ट एवं विश्व कल्याणार्थ मनुश्री चैरिटेबल ट्रस्ट द्वारा संचालित पावन जनहित एवं धार्मिक सेवा कार्य।
            </p>
            <div className="text-[11px] text-stone-500 font-mono">
              स्थान: खाटू श्याम जी (सीकर), राजस्थान, भारत
            </div>
          </div>

          {/* Col 2: Seva Offerings */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              सेवा प्रकल्प
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#bhoomi-daan" className="hover:text-amber-400 transition-colors">
                  भूमिदान (अन्नक्षेत्र, रसोई व मंदिर निर्माण)
                </a>
              </li>
              <li>
                <a href="#mandir-nirman" className="hover:text-amber-400 transition-colors">
                  मंदिर निर्माण ईंट व निर्माण सामग्री सेवा
                </a>
              </li>
              <li>
                <a href="#jal-seva" className="hover:text-amber-400 transition-colors">
                  भीषण गर्मी में प्याऊ जल सेवा
                </a>
              </li>
              <li>
                <a href="#bhagwat-katha" className="hover:text-amber-400 transition-colors">
                  9 पेड़ों के सामीप्य में श्रीमद्भागवत कथा पोथी सेवा
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Bank Details Recap */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              अधिकृत बैंक खाते
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="text-stone-300 font-medium">खाता 1: श्री श्याम जन कल्याणार्थ</div>
                <div className="font-mono text-stone-400">A/C: 922020018151609</div>
                <div className="font-mono text-[11px] text-stone-500">IFSC: UTIB0001427</div>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <div className="text-stone-300 font-medium">खाता 2: विश्व कल्याणार्थ मनुश्री</div>
                <div className="font-mono text-stone-400">A/C: 925010045269278</div>
                <div className="font-mono text-[11px] text-stone-500">IFSC: UTIB0001427</div>
              </div>
              <div className="text-[11px] text-stone-500">एक्सिस बैंक, खाटू श्याम जी शाखा</div>
            </div>
          </div>

          {/* Col 4: Contact & Helpdesk */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              सहायता एवं संकल्प संपर्क
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              दान सहयोग, संकल्प पत्र प्राप्ति अथवा रसीद के लिए ट्रस्ट के अधिकृत सेवा केंद्र पर संपर्क करें:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>हेल्पडेस्क: +91 22 6228 0555</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>खाटू श्याम जी, जिला सीकर, राजस्थान</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} श्री श्याम जन कल्याणार्थ एवं विश्व कल्याणार्थ मनुश्री चैरिटेबल ट्रस्ट। सर्व अधिकार सुरक्षित।
          </div>
          <div className="flex items-center gap-2 text-amber-400/90 font-serif">
            <span>॥ हारे का सहारा, बाबा श्याम हमारा ॥</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
