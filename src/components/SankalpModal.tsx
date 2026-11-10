import React, { useState, useEffect } from 'react';
import {
  X,
  HeartHandshake,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Smartphone,
  QrCode
} from 'lucide-react';
import { Language, SevaCategoryKey, SevaOption, TrustAccount, SankalpReceipt } from '../types';
import {
  BHOOMI_DAAN_OPTIONS,
  MANDIR_NIRMAN_OPTIONS,
  JAL_SEVA_OPTIONS,
  BHAGWAT_KATHA_OPTIONS,
  TRUST_ACCOUNTS
} from '../data/sevaData';
import { templeAudio } from '../utils/audio';

interface SankalpModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preselectedOption?: SevaOption | null;
  preselectedTrustId?: string | null;
  onGenerateReceipt: (receipt: SankalpReceipt) => void;
}

export const SankalpModal: React.FC<SankalpModalProps> = ({
  isOpen,
  onClose,
  language,
  preselectedOption,
  preselectedTrustId,
  onGenerateReceipt,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [donorName, setDonorName] = useState('');
  const [gotra, setGotra] = useState('');
  const [phone, setPhone] = useState('');
  const [cityState, setCityState] = useState('');
  const [nimittType, setNimittType] = useState<'family' | 'ancestors' | 'special'>('ancestors');
  const [ancestorNames, setAncestorNames] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');

  // Seva Selection
  const [selectedCategory, setSelectedCategory] = useState<SevaCategoryKey>('bhoomi_daan');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('bhoomi-1');
  const [customAmount, setCustomAmount] = useState<number | ''>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Trust Selection & Payment
  const [selectedTrustId, setSelectedTrustId] = useState<string>('shree-shyam-trust');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync preselected option when opened
  useEffect(() => {
    if (preselectedOption) {
      setSelectedCategory(preselectedOption.category);
      setSelectedOptionId(preselectedOption.id);
      setIsCustom(false);
    }
    if (preselectedTrustId) {
      setSelectedTrustId(preselectedTrustId);
    }
  }, [preselectedOption, preselectedTrustId, isOpen]);

  if (!isOpen) return null;

  // Retrieve current category options
  const getCurrentCategoryOptions = (): SevaOption[] => {
    switch (selectedCategory) {
      case 'bhoomi_daan':
        return BHOOMI_DAAN_OPTIONS;
      case 'mandir_nirman':
        return MANDIR_NIRMAN_OPTIONS;
      case 'jal_seva':
        return JAL_SEVA_OPTIONS;
      case 'bhagwat_katha':
        return BHAGWAT_KATHA_OPTIONS;
      default:
        return BHOOMI_DAAN_OPTIONS;
    }
  };

  const currentOptions = getCurrentCategoryOptions();
  const activeOption = currentOptions.find((o) => o.id === selectedOptionId) || currentOptions[0];

  const currentAmount = isCustom ? Number(customAmount) || 0 : activeOption?.amount || 11000;
  const activeTrust = TRUST_ACCOUNTS.find((t) => t.id === selectedTrustId) || TRUST_ACCOUNTS[0];

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      alert(language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name');
      return;
    }
    if (!phone.trim()) {
      alert(language === 'hi' ? 'कृपया अपना मोबाइल/व्हाट्सएप नंबर दर्ज करें' : 'Please enter your phone number');
      return;
    }
    templeAudio.playTempleBell();
    setStep(2);
  };

  const handleCompleteSankalp = () => {
    templeAudio.playShankhChime();

    const sevaTitle = isCustom
      ? `${language === 'hi' ? 'विशेष सेवा समर्पण' : 'Custom Seva'}`
      : language === 'hi'
      ? activeOption.titleHi
      : activeOption.titleEn;

    const receipt: SankalpReceipt = {
      receiptNumber: `KSJ-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      donorName,
      gotra: gotra.trim() || 'कश्यप / सर्वगोत्र',
      cityState: cityState.trim() || 'भारत',
      phone,
      sevaCategory: selectedCategory,
      sevaTitle,
      amount: currentAmount,
      trustName: activeTrust.name,
      accountNumber: activeTrust.accountNumber,
      transactionRef: transactionRef.trim() || `TXN-REF-${Math.floor(100000 + Math.random() * 900000)}`,
      nimittType:
        nimittType === 'ancestors'
          ? 'पूर्वजों के निमित्त (Pitra Nimitt)'
          : nimittType === 'family'
          ? 'समस्त परिवार कल्याणार्थ'
          : `विशेष अवसर: ${specialOccasion || 'शुभ संकल्प'}`,
      nimittDetails: ancestorNames || specialOccasion,
    };

    onGenerateReceipt(receipt);
    onClose();
  };

  // UPI deep link
  const upiDeepLink = `upi://pay?pa=${activeTrust.accountNumber}@axisbank&pn=${encodeURIComponent(activeTrust.name)}&am=${currentAmount}&cu=INR&tn=${encodeURIComponent('Khatu Shyam Seva')}`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-amber-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-amber-200 font-semibold">
              ॥ ॐ श्री श्याम देवाय नमः ॥ मनुश्री महाराज रतनगढ़ वाले
            </div>
            <h3 className="text-xl font-heading font-bold mt-0.5">
              {step === 1
                ? language === 'hi'
                  ? 'श्री श्याम सेवा संकल्प पत्र'
                  : 'Sacred Seva Sankalp Form'
                : language === 'hi'
                ? 'दान सहयोग एवं बैंक भुगतान'
                : 'Donation & Bank Payment'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-amber-200 hover:text-white rounded-lg hover:bg-amber-600/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex border-b border-stone-200 text-xs font-semibold">
          <div
            className={`flex-1 py-3 px-4 text-center flex items-center justify-center gap-2 ${
              step === 1 ? 'bg-amber-50 text-amber-900 border-b-2 border-amber-600' : 'text-stone-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[11px]">
              1
            </span>
            <span>{language === 'hi' ? 'संकल्प विवरण' : 'Sankalp Details'}</span>
          </div>

          <div
            className={`flex-1 py-3 px-4 text-center flex items-center justify-center gap-2 ${
              step === 2 ? 'bg-amber-50 text-amber-900 border-b-2 border-amber-600' : 'text-stone-500'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
              step === 2 ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-700'
            }`}>
              2
            </span>
            <span>{language === 'hi' ? 'बैंक खाता व भुगतान' : 'Payment & Verification'}</span>
          </div>
        </div>

        {/* STEP 1: FORM DETAILS */}
        {step === 1 && (
          <form onSubmit={handleNextToPayment} className="p-6 space-y-5">
            {/* Seva Category Pill-less Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {language === 'hi' ? 'सेवा प्रकल्प चुनें' : 'Choose Seva Project'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'bhoomi_daan', labelHi: 'भूमिदान', labelEn: 'Land Daan' },
                  { key: 'mandir_nirman', labelHi: 'मंदिर ईंट सेवा', labelEn: 'Temple Bricks' },
                  { key: 'jal_seva', labelHi: 'प्याऊ जल सेवा', labelEn: 'Water Seva' },
                  { key: 'bhagwat_katha', labelHi: 'भागवत पोथी', labelEn: 'Bhagwat Pothi' },
                ].map((cat) => (
                  <button
                    type="button"
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key as SevaCategoryKey);
                      setIsCustom(false);
                      const opts = cat.key === 'bhoomi_daan'
                        ? BHOOMI_DAAN_OPTIONS
                        : cat.key === 'mandir_nirman'
                        ? MANDIR_NIRMAN_OPTIONS
                        : cat.key === 'jal_seva'
                        ? JAL_SEVA_OPTIONS
                        : BHAGWAT_KATHA_OPTIONS;
                      setSelectedOptionId(opts[0]?.id || '');
                    }}
                    className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      selectedCategory === cat.key
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    {language === 'hi' ? cat.labelHi : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Specific Package Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {language === 'hi' ? 'सेवा राशि व विकल्प' : 'Seva Tier'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentOptions.map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => {
                      setSelectedOptionId(opt.id);
                      setIsCustom(false);
                    }}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      !isCustom && selectedOptionId === opt.id
                        ? 'border-amber-600 bg-amber-50/70'
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sevaOption"
                        checked={!isCustom && selectedOptionId === opt.id}
                        onChange={() => {
                          setSelectedOptionId(opt.id);
                          setIsCustom(false);
                        }}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-xs font-bold text-stone-900">
                        {language === 'hi' ? opt.titleHi : opt.titleEn}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono text-amber-800 tabular-nums">
                      {formatRupees(opt.amount)}
                    </span>
                  </label>
                ))}

                {/* Custom Amount option */}
                <label
                  onClick={() => setIsCustom(true)}
                  className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    isCustom ? 'border-amber-600 bg-amber-50/70' : 'border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sevaOption"
                      checked={isCustom}
                      onChange={() => setIsCustom(true)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-xs font-bold text-stone-900">
                      {language === 'hi' ? 'अन्य इच्छानुसार राशि' : 'Custom Amount'}
                    </span>
                  </div>
                  {isCustom ? (
                    <div className="flex items-center">
                      <span className="text-xs text-stone-500 mr-1">₹</span>
                      <input
                        type="number"
                        min="500"
                        placeholder="राशि"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(parseInt(e.target.value) || '')}
                        className="w-24 text-xs font-bold font-mono border border-amber-300 rounded-md px-2 py-1 text-amber-900 focus:outline-hidden"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-stone-500">स्वेच्छानुसार</span>
                  )}
                </label>
              </div>
            </div>

            {/* Devotee Personal & Spiritual Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'hi' ? 'भक्त का पूरा नाम *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'hi' ? 'उदा. राजेश शर्मा' : 'e.g. Rajesh Sharma'}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'hi' ? 'गोत्र (Gotra - संकल्प हेतु)' : 'Gotra (for Sankalp)'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'उदा. कश्यप / भारद्वाज' : 'e.g. Kashyap / Garg'}
                  value={gotra}
                  onChange={(e) => setGotra(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'hi' ? 'मोबाइल / व्हाट्सएप नंबर *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10 digit mobile number'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'hi' ? 'शहर एवं राज्य' : 'City & State'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'उदा. जयपुर, राजस्थान' : 'e.g. Jaipur, Rajasthan'}
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Nimitt Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'hi' ? 'संकल्प का निमित्त (किसके नाम से सेवा समर्पित)' : 'Dedication Purpose (Nimitt)'}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { key: 'ancestors', label: 'पूर्वजों के निमित्त' },
                  { key: 'family', label: 'परिवार कल्याणार्थ' },
                  { key: 'special', label: 'शुभ अवसर / जन्मदिन' },
                ].map((n) => (
                  <button
                    type="button"
                    key={n.key}
                    onClick={() => setNimittType(n.key as 'family' | 'ancestors' | 'special')}
                    className={`p-2 rounded-md border text-center transition-colors ${
                      nimittType === n.key
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>

              {nimittType === 'ancestors' && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="पूज्य पूर्वज / पितृगणों के नाम (उदा. स्व. श्री रामप्रसाद जी)"
                    value={ancestorNames}
                    onChange={(e) => setAncestorNames(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-md p-2 focus:border-amber-600 focus:outline-hidden"
                  />
                </div>
              )}

              {nimittType === 'special' && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="अवसर का नाम (उदा. जन्मदिन, विवाह वर्षगांठ, एकादशी)"
                    value={specialOccasion}
                    onChange={(e) => setSpecialOccasion(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-md p-2 focus:border-amber-600 focus:outline-hidden"
                  />
                </div>
              )}
            </div>

            {/* Footer with Total and Proceed */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">कुल सेवा संकल्प:</span>
                <div className="text-xl font-bold font-mono text-amber-800">
                  {formatRupees(currentAmount)}
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>{language === 'hi' ? 'भुगतान एवं खाता विवरण' : 'Proceed to Payment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT & VERIFICATION */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            {/* Amount Summary Strip */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-stone-600">
                  संकल्पकर्ता: <span className="font-bold text-stone-900">{donorName}</span> ({gotra || 'सर्वगोत्र'})
                </div>
                <div className="text-xs text-amber-800 font-semibold mt-0.5">
                  {isCustom ? 'स्वेच्छानुसार सेवा' : activeOption.titleHi}
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-amber-900 tabular-nums">
                {formatRupees(currentAmount)}
              </div>
            </div>

            {/* Choose Between the 2 Trust Accounts */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {language === 'hi' ? 'सहयोग हेतु ट्रस्ट बैंक खाता चुनें' : 'Select Official Trust Account'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRUST_ACCOUNTS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTrustId(t.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      selectedTrustId === t.id
                        ? 'border-amber-600 bg-amber-50/80 shadow-xs ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <Building2 className={`w-5 h-5 shrink-0 mt-0.5 ${selectedTrustId === t.id ? 'text-amber-700' : 'text-stone-400'}`} />
                    <div>
                      <div className="text-xs font-bold text-stone-900 leading-snug">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                        A/C: {t.accountNumber}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Trust Payment Details with QR Code */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Real Scanned QR Code */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs">
                    <img
                      src={activeTrust.qrImagePath}
                      alt={activeTrust.name}
                      referrerPolicy="no-referrer"
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 text-center font-medium">
                    Google Pay / PhonePe / Paytm
                  </span>
                </div>

                {/* Account Details with Copy Buttons */}
                <div className="sm:col-span-7 space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] text-stone-500">खाताधारक नाम (A/C Name):</span>
                    <div className="font-bold text-stone-900">{activeTrust.name}</div>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-stone-200">
                    <div>
                      <span className="text-[10px] text-stone-500">खाता संख्या (A/C Number):</span>
                      <div className="font-mono font-bold text-stone-900 text-sm">
                        {activeTrust.accountNumber}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(activeTrust.accountNumber, 'modal-acc')}
                      className="p-1.5 hover:bg-stone-100 rounded text-stone-600"
                    >
                      {copiedKey === 'modal-acc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-stone-200">
                    <div>
                      <span className="text-[10px] text-stone-500">IFSC कोड:</span>
                      <div className="font-mono font-bold text-stone-900 text-sm">
                        {activeTrust.ifsc}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(activeTrust.ifsc, 'modal-ifsc')}
                      className="p-1.5 hover:bg-stone-100 rounded text-stone-600"
                    >
                      {copiedKey === 'modal-ifsc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500">बैंक व शाखा:</span>
                    <div className="font-medium text-stone-800">{activeTrust.bankName}, {activeTrust.branch}</div>
                  </div>
                </div>
              </div>

              {/* Mobile UPI Deep Link */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex justify-center">
                <a
                  href={upiDeepLink}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>मोबाइल UPI ऐप से सीधे भुगतान करें</span>
                </a>
              </div>
            </div>

            {/* Transaction / UTR Verification Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'hi'
                  ? 'भुगतान UTR / संदर्भ संख्या (Transaction Reference / UTR Number)'
                  : 'UTR / Transaction Reference Number'}
              </label>
              <input
                type="text"
                placeholder="उदा. 412356789012 (UPI अथवा बैंक ट्रांसफर के बाद प्राप्त संख्या)"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="w-full text-sm border border-stone-300 rounded-lg p-2.5 font-mono focus:border-amber-600 focus:outline-hidden"
              />
              <span className="text-[11px] text-stone-500 block mt-1">
                * यदि आपने अभी भुगतान किया है या करने वाले हैं, तो यह संख्या दर्ज करें। यह आपके पावन संकल्प पत्र पर अंकित होगी।
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-2.5 px-4 text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'वापस जाएं' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={handleCompleteSankalp}
                className="py-3 px-6 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-lg transition-all shadow-md flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'hi' ? 'संकल्प पूर्ण करें एवं संकल्प पत्र देखें' : 'Confirm & View Sankalp Patra'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
