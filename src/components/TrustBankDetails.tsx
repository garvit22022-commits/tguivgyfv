import React, { useState } from 'react';
import {
  Copy,
  Check,
  Building2,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  X,
  PhoneCall,
  MessageCircle,
  Download
} from 'lucide-react';
import { Language } from '../types';
import { TRUST_ACCOUNTS } from '../data/sevaData';
import { templeAudio } from '../utils/audio';

interface TrustBankDetailsProps {
  language: Language;
  onInitiateSankalp: (trustId: string) => void;
}

export const TrustBankDetails: React.FC<TrustBankDetailsProps> = ({
  language,
  onInitiateSankalp,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section id="bank-details" className="py-16 bg-white border-t border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'अधिकृत बैंक खाता एवं QR कोड' : 'Official Trust Accounts & QR Codes'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight mb-4">
            {language === 'hi' ? 'सीधे ट्रस्ट के बैंक खाते में सहयोग करें' : 'Donate Directly to Verified Trust Accounts'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'खाटू श्याम जी में चल रही सेवाओं के लिए नीचे दिए गए दोनों अधिकृत एक्सिस बैंक खातों अथवा QR कोड को किसी भी UPI ऐप (GPay, PhonePe, Paytm, BHIM) से स्कैन करके सहयोग राशि भेज सकते हैं।'
              : 'Scan the official Axis Bank QR codes using PhonePe, Google Pay, Paytm or transfer directly via NEFT/RTGS/IMPS.'}
          </p>
        </div>

        {/* 2 Trust Accounts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TRUST_ACCOUNTS.map((trust, idx) => (
            <div
              key={trust.id}
              className="bg-stone-50 rounded-2xl border border-stone-200 hover:border-amber-300 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative"
            >
              <div>
                {/* Trust Header */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-100/80 text-amber-900 rounded-xl">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        {language === 'hi' ? `ट्रस्ट खाता #${idx + 1}` : `Trust Account #${idx + 1}`}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900 leading-snug">
                        {trust.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Account Details & QR layout */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6 items-center">
                  {/* QR Box with Scan prompt and zoom affordance */}
                  <div className="sm:col-span-5 flex flex-col items-center">
                    <div
                      onClick={() => setZoomedImage({ src: trust.qrImagePath, title: trust.name })}
                      className="cursor-zoom-in group relative bg-white p-3 rounded-xl border-2 border-dashed border-amber-300 hover:border-amber-500 transition-colors shadow-xs"
                      title="क्लिक करके बड़ा QR कोड देखें"
                    >
                      <img
                        src={trust.qrImagePath}
                        alt={`${trust.name} UPI QR Code`}
                        referrerPolicy="no-referrer"
                        className="w-44 h-44 sm:w-40 sm:h-40 object-contain mx-auto"
                      />
                      <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <span className="bg-stone-900/85 text-white text-[11px] font-semibold py-1 px-2 rounded-md flex items-center gap-1 shadow-xs">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>बड़ा करें</span>
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-2 font-medium text-center">
                      {trust.mid ? 'Axis Bank POS QR · All UPI Apps' : 'UPI QR · All UPI Apps'}
                    </span>
                  </div>

                  {/* Bank Field Details */}
                  <div className="sm:col-span-7 space-y-3.5 text-xs sm:text-sm">
                    {/* A/C Number */}
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-stone-500 font-medium">खाता संख्या (A/C No.)</div>
                        <div className="font-mono font-bold text-stone-900 text-base tabular-nums tracking-wide">
                          {trust.accountNumber}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(trust.accountNumber, `${trust.id}-acc`)}
                        className="p-2 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors"
                        title="Copy Account Number"
                      >
                        {copiedKey === `${trust.id}-acc` ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* IFSC Code */}
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-stone-500 font-medium">IFSC कोड</div>
                        <div className="font-mono font-bold text-stone-900 text-base tracking-wide">
                          {trust.ifsc}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(trust.ifsc, `${trust.id}-ifsc`)}
                        className="p-2 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors"
                        title="Copy IFSC"
                      >
                        {copiedKey === `${trust.id}-ifsc` ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Bank & Branch */}
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200">
                      <div className="text-[11px] text-stone-500 font-medium">बैंक एवं शाखा</div>
                      <div className="font-semibold text-stone-900">
                        {trust.bankName}, {trust.branch}
                      </div>
                    </div>

                    {/* POS MID/TID info if available */}
                    {trust.mid && (
                      <div className="text-[11px] text-stone-500 flex items-center gap-3">
                        <span>MID: {trust.mid}</span>
                        <span>·</span>
                        <span>TID: {trust.tid}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action inside card */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    templeAudio.playTempleBell();
                    onInitiateSankalp(trust.id);
                  }}
                  className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'hi' ? 'इस खाते के साथ संकल्प पत्र भरें' : 'Fill Sankalp with this Account'}</span>
                </button>

                <a
                  href={`https://wa.me/912262280555?text=${encodeURIComponent(`जय श्री श्याम। मैंने ${trust.name} में सेवा सहयोग किया है। कृपया संकल्प पावती प्रदान करें।`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Send payment screenshot on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">व्हाट्सएप सूचना</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note Banner */}
        <div className="mt-10 p-6 bg-amber-50/80 rounded-2xl border border-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-600 text-white rounded-xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-base">
                {language === 'hi' ? 'दान पावती एवं संकल्प पत्र की जानकारी' : 'Donation Receipt & Digital Sankalp Patra'}
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                {language === 'hi'
                  ? 'बैंक में राशि भेजने के उपरांत अपना नाम, गोत्र व UTR/संदर्भ संख्या भरकर तुरंत डिजिटल संकल्प पत्र (Sankalp Patra) डाउनलोड या प्रिंट कर सकते हैं।'
                  : 'After transferring funds, fill in your Name, Gotra and UTR number to immediately download your official digital Sankalp Patra.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              templeAudio.playTempleBell();
              onInitiateSankalp(TRUST_ACCOUNTS[0].id);
            }}
            className="px-5 py-2.5 bg-stone-900 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {language === 'hi' ? 'संकल्प पत्र जनरेट करें' : 'Generate Sankalp Patra'}
          </button>
        </div>
      </div>

      {/* High Resolution QR Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-amber-200">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-1">
                आधिकारिक QR कोड स्कैन करें
              </div>
              <h4 className="text-base font-bold text-stone-900 leading-snug px-6">
                {zoomedImage.title}
              </h4>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-center my-3">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                referrerPolicy="no-referrer"
                className="max-h-80 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-stone-500 text-center mb-4">
              किसी भी UPI ऐप (Google Pay, PhonePe, Paytm, BHIM) से इस QR को स्कैन करें।
            </p>

            <div className="flex items-center gap-3">
              <a
                href={zoomedImage.src}
                download="Khatu_Shyam_Trust_QR.jpeg"
                className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>QR कोड डाउनलोड करें</span>
              </a>

              <button
                onClick={() => setZoomedImage(null)}
                className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
