"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sparkles,
  MapPin,
  Clock,
  Ticket,
  Eye,
  Volume2,
  Layers,
  ChevronRight,
  Shield,
  Landmark,
  Maximize2,
  Info,
} from "lucide-react";

interface ViewMode {
  id: "exterior" | "labyrinth" | "hall";
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  description: string;
  stat: string;
}

const VIEW_MODES: ViewMode[] = [
  {
    id: "exterior",
    title: "बड़ा इमामबाड़ा · भव्य शाही प्रांगण",
    subtitle: "Grand Mughal & Awadhi Architectural Complex (1784)",
    badge: "विश्व प्रसिद्ध वास्तुकला",
    image: "/images/lucknow_bada_imambada.jpg",
    description:
      "1784 ईस्वी में अकाल के समय नवाब आसफ़ुद्दौला द्वारा निर्मित यह विश्व का सबसे अनूठा वास्तुशिल्प है। इसका निर्माण गरीबों व नवाबों दोनों को स्वाभिमान से रोजगार देने के लिए कराया गया था।",
    stat: "२४०+ वर्ष प्राचीन",
  },
  {
    id: "labyrinth",
    title: "3D भूलभुलैया · 489 दरवाज़ों का रहस्य",
    subtitle: "The Mysterious 3D Labyrinth of Identical Arches",
    badge: "3D रहस्यमयी गलियारे",
    image: "/images/lucknow_bhul_bhulaiya.jpg",
    description:
      "छत पर जाने के लिए एक जैसे 489 मेहराबी गलियारे बने हैं, जहाँ बिना गाइड के रास्ता खोजना असंभव माना जाता है। रोशनी और ताज़ी हवा के लिए पत्थरों में नायाब झरोखे तराशे गए हैं।",
    stat: "489 एक जैसे दरवाज़े",
  },
  {
    id: "hall",
    title: "आसफ़ी हॉल · विश्व का सबसे बड़ा डाटदार हॉल",
    subtitle: "World's Largest Column-less Vaulted Hall",
    badge: "बिना खंभे का अजूबा",
    image: "/images/lucknow_bada_imambada.jpg",
    description:
      "50 मीटर लंबा, 16 मीटर चौड़ा और 15 मीटर ऊंचा यह विशाल केंद्रीय हॉल बिना किसी लोहे के गर्डर, बीम या खंभे के केवल लखौरी ईंटों और चूने के गच से टिका हुआ है।",
    stat: "शून्य खंभा (Zero Pillars)",
  },
];

interface SecretFeature {
  id: number;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  highlight: string;
}

const SECRETS: SecretFeature[] = [
  {
    id: 1,
    title: "फुसफुसाहट वाली दीवार (Whispering Gallery)",
    icon: "🔊",
    shortDesc: "50 मीटर दूर माचिस की तीली जलने की आवाज़ भी दीवार से साफ़ सुनाई देती है।",
    fullDesc:
      "हॉल की दीवारों के भीतर खोखले गुप्त ध्वनिक वायु-मार्ग (Acoustic Channels) बने हैं। एक कोने में दीवार की तरफ फुसफुसाने पर 50 मीटर दूर दूसरे कोने पर खड़ा व्यक्ति उसे स्पष्ट सुन सकता है।",
    highlight: "अद्भुत ध्वनि विज्ञान",
  },
  {
    id: 2,
    title: "बिना खंभों की विशाल छत (Zero Pillars)",
    icon: "🏛️",
    shortDesc: "लोहे या लकड़ी के बीम के बिना केवल लखौरी ईंटों से बनी विशाल छत।",
    fullDesc:
      "दिल्ली के वास्तुकार किफ़ायतुल्लाह ने छत को इतना हल्का और संतुलित बनाया कि इसमें उड़द की दाल, बेल का गूदा और चूने का मिश्रण इस्तेमाल हुआ। 240+ वर्षों से छत बिना किसी सहारे के शान से खड़ी है।",
    highlight: "इंजीनियरिंग का चमत्कार",
  },
  {
    id: 3,
    title: "शाही बावली जल दर्पण (Water Mirror)",
    icon: "💧",
    shortDesc: "पानी के प्रतिबिंब में छिपकर गुप्त सुरक्षा पहरा देने वाली तकनीक।",
    fullDesc:
      "बावली की बनावट ऐसी है कि मुख्य द्वार से अंदर आने वाले व्यक्ति का प्रतिबिंब पानी में तुरंत दिख जाता है, जबकि अंदर बैठे सैनिकों को बाहर से कोई नहीं देख सकता था।",
    highlight: "गुप्त सुरक्षा तंत्र",
  },
  {
    id: 4,
    title: "अकाल राहत का ऐतिहासिक संकल्प (1784)",
    icon: "👑",
    shortDesc: "'जिसको न दे मौला, उसको दे आसफ़ुद्दौला' की महान परंपरा।",
    fullDesc:
      "अवध में पड़े भयानक अकाल के समय दिन में आम जनता निर्माण करती और रात में स्वाभिमानी रईस काम करते ताकि किसी को दान न मांगना पड़े। इस तरह हज़ारों परिवारों का भरण-पोषण हुआ।",
    highlight: "गंगा-जमुनी तहज़ीब",
  },
];

export default function BadaImambaraShowcase() {
  const [activeViewIdx, setActiveViewIdx] = useState<number>(0);
  const [activeSecret, setActiveSecret] = useState<number | null>(1);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const activeView = VIEW_MODES[activeViewIdx];

  return (
    <motion.div
      id="bada-imambara-3d"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#141824] via-[#0b101c] to-[#050811] border-2 border-amber-500/40 p-5 sm:p-7 md:p-10 shadow-[0_25px_90px_rgba(245,158,11,0.2)] mb-20"
    >
      {/* 3D Ambient Aura */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-[500px] h-[500px] bg-amber-500/15 blur-[120px] rounded-full -z-10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-orange-500/15 blur-[120px] rounded-full -z-10" />

      {/* Top Header Badge & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-widest uppercase mb-2">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>अवध का आठवाँ अजूबा · ऐतिहासिक 3D हेरिटेज</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            बड़ा इमामबाड़ा <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300">& भूलभुलैया</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-amber-200/70 mt-1">
            Bara Imambara & The 3D Labyrinth · Lucknow (1784 ईस्वी)
          </p>
        </div>

        {/* 3D View Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md self-start md:self-auto">
          {VIEW_MODES.map((mode, idx) => (
            <button
              key={mode.id}
              onClick={() => setActiveViewIdx(idx)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeViewIdx === idx
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/30 font-extrabold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{mode.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        {/* Left Column: Interactive 3D Card with Tilt & Parallax */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-pointer group bg-black/50"
            style={{
              perspective: 1200,
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: isHovering ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
            }}
          >
            {/* Dynamic Specular Glare */}
            <div
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
              style={{
                opacity: isHovering ? 0.35 : 0,
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,215,0,0.4) 0%, transparent 60%)`,
              }}
            />

            {/* Main Monument Image with Smooth Fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src={activeView.image}
                  alt={activeView.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />
              </motion.div>
            </AnimatePresence>

            {/* Floating 3D Badges */}
            <div
              className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-md text-black font-extrabold text-xs shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                {activeView.badge}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 font-mono text-xs border border-amber-400/40">
                {activeView.stat}
              </span>
            </div>

            {/* Bottom 3D Info Overlay */}
            <div
              className="absolute bottom-3 left-3 right-3 z-20 p-3.5 rounded-xl bg-[#090d18]/90 backdrop-blur-md border border-amber-500/40"
              style={{ transform: "translateZ(45px)" }}
            >
              <div className="text-white font-black text-sm sm:text-base flex items-center justify-between">
                <span>{activeView.title}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  3D View
                </span>
              </div>
              <div className="text-xs text-white/70 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">हुसैनाबाद (निकट रूमी दरवाज़ा), चौक, लखनऊ</span>
              </div>
            </div>
          </div>

          {/* Interaction Helper Notice */}
          <div className="flex items-center gap-2 mt-3 text-xs text-amber-300/80 font-medium">
            <Compass className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>माउस घुमाएं (Hover) और 3D कोण में वास्तुकला देखें</span>
          </div>
        </div>

        {/* Right Column: Historical Mysteries & Architectural Secrets */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {activeView.title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {activeView.description}
            </p>
          </div>

          {/* 4 Interactive Secrets Cards */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-black tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>बड़ा इमामबाड़ा के ४ अनसुलझे रहस्य (रहस्य जानने के लिए क्लिक करें):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SECRETS.map((sec) => {
                const isSelected = activeSecret === sec.id;
                return (
                  <div
                    key={sec.id}
                    onClick={() => setActiveSecret(isSelected ? null : sec.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.25)]"
                        : "bg-white/5 hover:bg-white/10 border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{sec.icon}</span>
                      <span className="text-xs font-bold text-white leading-tight">
                        {sec.title}
                      </span>
                    </div>

                    <p className="text-[11px] text-white/70 mt-1.5 line-clamp-2">
                      {sec.shortDesc}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-amber-400">{sec.highlight}</span>
                      <span className="text-amber-300">
                        {isSelected ? "बंद करें ▲" : "विस्तार ▼"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expanded Secret Deep Detail Modal/Box */}
            {activeSecret && (
              <AnimatePresence>
                {(() => {
                  const s = SECRETS.find((x) => x.id === activeSecret);
                  if (!s) return null;
                  return (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-orange-950/30 border border-amber-500/40 text-xs sm:text-sm text-white/90 leading-relaxed shadow-lg"
                    >
                      <div className="font-black text-amber-300 mb-1 flex items-center gap-1.5">
                        <span>{s.icon}</span>
                        <span>{s.title}</span>
                      </div>
                      <p>{s.fullDesc}</p>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            )}
          </div>

          {/* Quick Tourist Guide & Information Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs border-t border-white/10">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Clock className="w-4 h-4" />
                <span>भ्रमण समय (Timings)</span>
              </div>
              <div className="text-white/80">प्रातः 06:00 AM – सायं 05:00 PM</div>
              <div className="text-white/60 text-[11px]">सूर्योदय से सूर्यास्त (सभी दिन खुला)</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Ticket className="w-4 h-4" />
                <span>प्रवेश टिकट (Tickets)</span>
              </div>
              <div className="text-white/80">भारतीय: ₹50 · विदेशी: ₹500</div>
              <div className="text-white/60 text-[11px]">रूमी दरवाज़ा व छोटा इमामबाड़ा कॉम्प्लेक्स</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
