import React, { useRef } from 'react';
import {
  X,
  Printer,
  Share2,
  CheckCircle,
  Download,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SankalpReceipt, Language } from '../types';

interface SankalpCertificateModalProps {
  receipt: SankalpReceipt | null;
  onClose: () => void;
  language: Language;
}

export const SankalpCertificateModal: React.FC<SankalpCertificateModalProps> = ({
  receipt,
  onClose,
  language,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const shareText = `जय श्री श्याम! मैंने पूज्य महाराज श्री मनुश्री जी के सानिध्य में खाटू श्याम जी राजस्थान में ${receipt.sevaTitle} (राशि ₹${receipt.amount.toLocaleString('en-IN')}) का पावन संकल्प लिया है। संदर्भ क्रमांक: ${receipt.receiptNumber}। हारे का सहारा, बाबा श्याम हमारा!`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-amber-300 overflow-hidden my-4">
        {/* Action Bar */}
        <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>पावन संकल्प पत्र सफलतापूर्वक तैयार हो गया</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>शेयर करें</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिंट / सेव PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Royal Parchment Certificate Body */}
        <div
          ref={certificateRef}
          className="p-6 sm:p-10 bg-amber-50/50 relative border-8 border-double border-amber-700/60 m-2 sm:m-4 rounded-xl shadow-inner font-serif"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-800 text-xl font-bold select-none">卐</div>
          <div className="absolute top-2 right-2 text-amber-800 text-xl font-bold select-none">ॐ</div>
          <div className="absolute bottom-2 left-2 text-amber-800 text-xl font-bold select-none">ॐ</div>
          <div className="absolute bottom-2 right-2 text-amber-800 text-xl font-bold select-none">卐</div>

          {/* Certificate Header */}
          <div className="text-center pb-4 border-b-2 border-amber-800/40">
            <div className="text-xs uppercase tracking-widest text-amber-900 font-bold mb-1">
              ॥ श्री खाटू श्याम जी जयते ॥ हारे का सहारा बाबा श्याम हमारा ॥
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-950 tracking-wide mt-1">
              पावन सेवा संकल्प पत्र
            </h2>
            <div className="text-xs sm:text-sm text-stone-800 mt-1 font-devanagari font-medium">
              ◆ पूज्य महाराज श्री मनुश्री जी (रतनगढ़ वाले) के पावन सानिध्य में ◆
            </div>
            <div className="text-[11px] text-stone-600 mt-0.5 font-sans">
              स्थान: खाटू श्याम जी (सीकर), राजस्थान · अन्नक्षेत्र, मंदिर निर्माण, जल सेवा एवं श्रीमद्भागवत कथा
            </div>
          </div>

          {/* Receipt Info Sub-strip */}
          <div className="flex justify-between items-center text-xs text-stone-600 font-sans py-2 border-b border-amber-200">
            <div>
              <span className="font-semibold text-stone-700">संकल्प क्रमांक:</span>{' '}
              <span className="font-mono font-bold text-amber-900">{receipt.receiptNumber}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-700">दिनांक:</span>{' '}
              <span className="font-medium text-stone-900">{receipt.date}</span>
            </div>
          </div>

          {/* Main Sanskrit Inscription & Devotee Credentials */}
          <div className="my-6 space-y-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-devanagari">
            <p className="text-center italic text-stone-700">
              सत्यं वद धर्मं चर। दानेन प्राप्यते राज्यं दानेन भुवि कीर्तयः।
            </p>

            <div className="bg-white/80 p-4 rounded-lg border border-amber-200/80 space-y-2.5 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-500 text-xs">संकल्पकर्ता का नाम:</span>
                  <div className="font-bold text-base text-amber-950 font-serif">
                    {receipt.donorName}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 text-xs">गोत्र:</span>
                  <div className="font-bold text-stone-900">{receipt.gotra}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-500 text-xs">शहर / निवास:</span>
                  <div className="font-medium text-stone-900">{receipt.cityState}</div>
                </div>
                <div>
                  <span className="text-stone-500 text-xs">संपर्क सूत्र:</span>
                  <div className="font-mono text-stone-900">{receipt.phone}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-500 text-xs">समर्पित सेवा प्रकल्प:</span>
                  <div className="font-bold text-amber-900 text-sm">
                    {receipt.sevaTitle}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 text-xs">सेवा समर्पण राशि:</span>
                  <div className="font-bold font-mono text-lg text-emerald-800">
                    {formatRupees(receipt.amount)}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-100">
                <span className="text-stone-500 text-xs">संकल्प का निमित्त:</span>
                <div className="font-medium text-stone-900">
                  {receipt.nimittType} {receipt.nimittDetails ? `(${receipt.nimittDetails})` : ''}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-stone-700 px-4">
              भगवान श्री खाटू श्याम जी एवं पूज्य महाराज श्री के आशीर्वाद से आपके द्वारा समर्पित यह सेवा राशि अन्नक्षेत्र, निर्माण कार्य, ग्रीष्म जल सेवा अथवा श्रीमद्भागवत कथा परायण में सदुपयोग की जा रही है। प्रभु आपके कुल एवं परिवार में सुख, शांति, समृद्धि एवं निरोगिता प्रदान करें।
            </p>
          </div>

          {/* Official Trust Footer & Signatures */}
          <div className="pt-4 border-t-2 border-amber-800/40 grid grid-cols-2 items-end text-center font-sans">
            <div>
              <div className="text-[11px] text-stone-500 mb-1">प्राप्तकर्ता अधिकृत ट्रस्ट</div>
              <div className="text-xs font-bold text-stone-900">{receipt.trustName}</div>
              <div className="text-[10px] text-stone-500 font-mono">खाता: {receipt.accountNumber}</div>
              <div className="text-[10px] text-stone-500 font-mono">UTR: {receipt.transactionRef}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-700 flex items-center justify-center p-1 text-center text-[9px] text-amber-900 font-bold mb-1">
                श्री श्याम कृपा अधिकृत मुद्रा
              </div>
              <div className="text-xs font-bold text-amber-950 font-serif">
                पूज्य महाराज श्री मनुश्री जी (रतनगढ़ वाले)
              </div>
              <div className="text-[10px] text-stone-600">अध्यक्ष / संरक्षक ट्रस्ट मंडल</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="bg-stone-100 p-4 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
