import React, { useState, useEffect } from 'react';
import {
  Radio,
  Clock,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Eye,
  Bell,
  Heart,
  Volume2,
  Maximize2,
  Calendar,
  CheckCircle,
  Play
} from 'lucide-react';
import { Language } from '../types';
import { templeAudio } from '../utils/audio';

interface LiveDarshanCardProps {
  language: Language;
  onOpenSankalp: () => void;
}

interface AartiTiming {
  nameHi: string;
  nameEn: string;
  time: string;
  hour: number;
  minute: number;
  descHi: string;
  descEn: string;
}

const AARTI_TIMINGS: AartiTiming[] = [
  { nameHi: 'मंगला आरती', nameEn: 'Mangala Aarti', time: '05:00 AM', hour: 5, minute: 0, descHi: 'प्रातः जागरण दर्शन व प्रथम महाआरती', descEn: 'First morning awakening aarti' },
  { nameHi: 'श्रृंगार आरती', nameEn: 'Shringar Aarti', time: '07:00 AM', hour: 7, minute: 0, descHi: 'अलौकिक पुष्प एवं मोरछड़ी श्रृंगार', descEn: 'Grand floral and morchhad shringar' },
  { nameHi: 'भोग आरती', nameEn: 'Bhog Aarti', time: '12:30 PM', hour: 12, minute: 30, descHi: 'सात्विक राजभोग अर्पण', descEn: 'Sacred afternoon Rajbhog offering' },
  { nameHi: 'संध्या आरती', nameEn: 'Sandhya Aarti', time: '07:30 PM', hour: 19, minute: 30, descHi: 'सायंकालीन दीप दर्शन महाआरती', descEn: 'Evening illuminated lamp aarti' },
  { nameHi: 'शयन आरती', nameEn: 'Shayan Aarti', time: '10:00 PM', hour: 22, minute: 0, descHi: 'रात्रि विश्राम एवं पावन शयन दर्शन', descEn: 'Night conclusion and rest aarti' },
];

export const LiveDarshanCard: React.FC<LiveDarshanCardProps> = ({
  language,
  onOpenSankalp,
}) => {
  const [activeTab, setActiveTab] = useState<'shringar' | 'stream'>('shringar');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [flowerCount, setFlowerCount] = useState(108);
  const [fallingFlowers, setFallingFlowers] = useState<{ id: number; left: number }[]>([]);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [nextAarti, setNextAarti] = useState<AartiTiming>(AARTI_TIMINGS[3]);

  // Periodic fetch / update effect every 30 seconds
  useEffect(() => {
    const updateTimeAndAarti = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let upcoming = AARTI_TIMINGS[0];
      for (const aarti of AARTI_TIMINGS) {
        const aartiMinutes = aarti.hour * 60 + aarti.minute;
        if (aartiMinutes > currentMinutes) {
          upcoming = aarti;
          break;
        }
      }
      setNextAarti(upcoming);
    };

    updateTimeAndAarti();
    const interval = setInterval(() => {
      updateTimeAndAarti();
      setLastRefreshed(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    templeAudio.playTempleBell();
    setTimeout(() => {
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 600);
  };

  const handleOfferFlower = () => {
    templeAudio.playTempleBell();
    setFlowerCount((prev) => prev + 1);
    const newFlower = { id: Date.now(), left: Math.random() * 80 + 10 };
    setFallingFlowers((prev) => [...prev, newFlower]);
    setTimeout(() => {
      setFallingFlowers((prev) => prev.filter((f) => f.id !== newFlower.id));
    }, 1500);
  };

  return (
    <section id="live-darshan" className="py-12 bg-linear-to-b from-stone-900 via-amber-950 to-stone-900 text-white relative overflow-hidden">
      {/* Decorative Traditional Border Patterns */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-amber-500 via-amber-300 to-amber-500" />

      {/* Floating Flowers Animation container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {fallingFlowers.map((flower) => (
          <div
            key={flower.id}
            style={{ left: `${flower.left}%` }}
            className="absolute top-0 text-amber-400 text-2xl animate-bounce transition-all duration-1000 opacity-90 select-none"
          >
            🌸
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-amber-500/20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-400 uppercase mb-1">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>श्री खाटू श्याम जी मंदिर · पावन लाइव दर्शन</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-amber-100">
              {language === 'hi' ? 'दैनिक लाइव दर्शन एवं आरती समय सारणी' : 'Daily Live Darshan & Aarti Schedule'}
            </h2>
            <div className="text-xs sm:text-sm text-amber-300/80 mt-1 font-devanagari">
              मनुश्री महाराज रतनगढ़ वाले के सानिध्य में खाटू धाम से सीधा जुड़ाव
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status indicator */}
            <div className="px-3 py-1.5 bg-red-950/80 border border-red-500/50 rounded-lg flex items-center gap-2 text-xs text-red-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold">दर्शन खुला है (Live)</span>
            </div>

            {/* Periodic Fetch Refresh Button */}
            <button
              onClick={handleManualRefresh}
              className="p-2 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg border border-amber-500/30 transition-all flex items-center gap-1.5 text-xs"
              title="दर्शन स्टेटस रिफ्रेश करें"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">रिफ्रेश</span>
            </button>
          </div>
        </div>

        {/* Main Live Darshan Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Darshan Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-stone-950/70 rounded-2xl border-2 border-amber-500/40 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
            {/* View Mode Toggle: Shringar Photo vs Official Stream Link */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg border border-amber-500/30 text-xs">
                <button
                  onClick={() => setActiveTab('shringar')}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    activeTab === 'shringar'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {language === 'hi' ? 'दैनिक पावन श्रृंगार' : 'Daily Shringar Darshan'}
                </button>
                <button
                  onClick={() => setActiveTab('stream')}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    activeTab === 'stream'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {language === 'hi' ? 'आधिकारिक लाइव फीड' : 'Official Live Broadcast'}
                </button>
              </div>

              <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>अंतिम अपडेट: {lastRefreshed.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            {/* Visual Frame */}
            <div className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-black flex-1 flex items-center justify-center min-h-[320px] sm:min-h-[380px]">
              {activeTab === 'shringar' ? (
                <>
                  <img
                    src="/src/assets/images/khatu_shyam_darshan_live_1794295414914.jpg"
                    alt="Baba Khatu Shyam Ji Live Shringar Darshan Rajasthan"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center max-h-[460px]"
                  />
                  {/* Subtle Inscription Scrim */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black via-black/60 to-transparent text-white">
                    <div className="text-amber-300 text-xs font-semibold tracking-wider uppercase mb-0.5">
                      ॥ हारे का सहारा, बाबा श्याम हमारा ॥
                    </div>
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <span>श्री श्याम शीश दानी दिव्य श्रृंगार दर्शन</span>
                      <span className="text-xs text-amber-200 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/50">
                        खाटू धाम
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* YouTube Official Live Stream Embed & Official Access */
                <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center p-6 text-center bg-stone-900/90 relative">
                  <div className="p-4 bg-amber-600/20 rounded-full border border-amber-500/40 text-amber-400 mb-4 animate-pulse">
                    <Radio className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-amber-100 mb-2">
                    श्री श्याम मंदिर कमेटी आधिकारिक यूट्यूब लाइव प्रसारण
                  </h4>
                  <p className="text-xs text-stone-300 max-w-md mb-6 leading-relaxed">
                    खाटू श्याम जी मंदिर के मुख्य गर्भगृह से 24x7 सीधा प्रसारण देखने हेतु नीचे दिए गए बटन से आधिकारिक मंदिर चैनल पर जुड़ें:
                  </p>
                  <a
                    href="https://www.youtube.com/@ShreeShyamMandirCommittee/live"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-red-600/30 group"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>यूट्यूब पर सीधा लाइव प्रसारण देखें</span>
                    <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-0.5" />
                  </a>
                  <span className="text-[11px] text-stone-400 mt-3">
                    अधिकृत स्रोत: Shree Shyam Mandir Committee (Official Live Stream)
                  </span>
                </div>
              )}
            </div>

            {/* Interactive Devotional Actions Strip */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleOfferFlower}
                className="px-4 py-2 bg-amber-700/60 hover:bg-amber-600 border border-amber-400/40 text-amber-100 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <span>🌸</span>
                <span>पुष्प अर्पण करें ({flowerCount})</span>
              </button>

              <button
                onClick={() => {
                  templeAudio.playTempleBell();
                }}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>घंटी बजाएं (प्रणाम)</span>
              </button>

              <button
                onClick={onOpenSankalp}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
                <span>दर्शन उपरांत सेवा संकल्प लें</span>
              </button>
            </div>
          </div>

          {/* Right Column: Aarti Timetable & Next Aarti Highlight (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-950/70 rounded-2xl border border-amber-500/30 p-5 shadow-xl">
            <div>
              {/* Next Upcoming Aarti Banner */}
              <div className="p-4 bg-linear-to-r from-amber-900/60 to-amber-950/80 rounded-xl border border-amber-500/40 mb-5">
                <div className="text-[11px] uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>अगली पावन आरती</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-heading font-bold text-white">
                      {language === 'hi' ? nextAarti.nameHi : nextAarti.nameEn}
                    </h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      {language === 'hi' ? nextAarti.descHi : nextAarti.descEn}
                    </p>
                  </div>
                  <div className="text-xl font-bold font-mono text-amber-400 tabular-nums bg-stone-900/80 px-3 py-1.5 rounded-lg border border-amber-500/40">
                    {nextAarti.time}
                  </div>
                </div>
              </div>

              {/* Complete Daily 5-Aarti Schedule */}
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                खाटू श्याम जी दैनिक 5 महाआरती समय
              </div>

              <div className="space-y-2">
                {AARTI_TIMINGS.map((aarti, idx) => {
                  const isCurrent = aarti.nameHi === nextAarti.nameHi;
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-amber-900/40 border-amber-400/60 shadow-xs'
                          : 'bg-stone-900/50 border-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <div className={`text-xs font-bold ${isCurrent ? 'text-amber-200' : 'text-stone-200'}`}>
                            {language === 'hi' ? aarti.nameHi : aarti.nameEn}
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {language === 'hi' ? aarti.descHi : aarti.descEn}
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold text-amber-400 tabular-nums">
                        {aarti.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Spiritual Message by Maharaj Shri */}
            <div className="mt-5 pt-4 border-t border-stone-800 text-xs text-stone-300 flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="leading-relaxed">
                <strong className="text-amber-300">मनुश्री महाराज (रतनगढ़ वाले)</strong>: “घर बैठे श्याम बाबा के पावन दर्शन कर अपने दिन की शुरुआत करें एवं मंदिर निर्माण व अन्नक्षेत्र सेवा में भागीदार बनें।”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
