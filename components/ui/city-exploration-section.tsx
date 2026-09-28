"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Sparkles,
  MapPin,
  Landmark,
  ShieldCheck,
  ChevronRight,
  Flame,
  ArrowUp,
  Utensils,
  Layers,
  Heart,
  Eye,
  Clock,
  Phone,
  Calendar,
} from "lucide-react";

interface Monument {
  id: string;
  name: string;
  englishName: string;
  tag: string;
  year: string;
  image: string;
  description: string;
  facts: string[];
}

const MONUMENTS: Monument[] = [
  {
    id: "lete-hue-hanuman-ji",
    name: "प्राचीन श्री लेटे हुए हनुमान जी मंदिर",
    englishName: "Pracheen Lete Hue Hanuman Ji Mandir",
    tag: "२५०+ वर्ष प्राचीन सिद्ध विग्रह",
    year: "२५०+ वर्ष पूर्व",
    image: "/images/lete_hue_hanuman_ji.png",
    description:
      "लखनऊ के पंचवटी घाट (निकट लक्ष्मण टीला, पक्का पुल) पर गोमती तट पर स्थित लेटे हुए हनुमान जी का यह सिद्ध मंदिर लखनऊ की आस्था और इतिहास का अनुपम केंद्र है।",
    facts: [
      "गोमती तट की बालू से प्रकट स्वयं-भू शिला विग्रह",
      "संत मौनीबाबा व भक्त गोपाली दास द्वारा जीर्णोद्धार",
      "अहिमर्दन पातालपुरी हनुमान जी सेवा ट्रस्ट",
    ],
  },
  {
    id: "rumi-darwaza",
    name: "रूमी दरवाज़ा",
    englishName: "Rumi Darwaza (Turkish Gate)",
    tag: "शाही प्रवेश द्वार",
    year: "1784 ईस्वी",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&auto=format&fit=crop&q=80",
    description:
      "इस्तांबुल के 'बाबे हुमायूं' की तर्ज़ पर नवाब आसफ़ुद्दौला द्वारा निर्मित 60 फीट ऊंचा यह भव्य द्वार लखनवी वास्तुकला की शान है।",
    facts: ["60 फीट भव्य ऊंचाई", "बिना लकड़ी व लोहे का निर्माण", "अवधी व तुर्क शैली का संगम"],
  },
  {
    id: "bara-imambara",
    name: "बड़ा इमामबाड़ा व भूलभुलैया",
    englishName: "Bara Imambara & Labyrinth",
    tag: "इंजीनियरिंग का चमत्कार",
    year: "1784 ईस्वी",
    image: "/images/lucknow_bhul_bhulaiya.jpg",
    description:
      "दुनिया का सबसे बड़ा बिना खंभों का डाटदार हॉल और 489 एक जैसे दरवाज़ों वाली विश्वप्रसिद्ध 3D रहस्यमयी भूलभुलैया।",
    facts: ["50m लंबा बिना खंभे का हॉल", "489 दरवाज़ों की भूलभुलैया", "शाही बावली व आसफ़ी मस्जिद"],
  },
  {
    id: "clock-tower",
    name: "हुसैनाबाद क्लॉक टॉवर",
    englishName: "Husainabad Clock Tower",
    tag: "भारत का सबसे ऊंचा घंटाघर",
    year: "1881 ईस्वी",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1000&auto=format&fit=crop&q=80",
    description:
      "221 फीट ऊंचा यह ऐतिहासिक घंटाघर विक्टोरियन और गॉथिक वास्तुकला का बेजोड़ नमूना है, जिसका पेंडुलम 14 फीट लंबा है।",
    facts: ["221 फीट ऐतिहासिक ऊंचाई", "12 पंखुड़ियों वाला गन-मेटल डायल", "14 फीट का विशाल पेंडुलम"],
  },
  {
    id: "gomti-riverfront",
    name: "गोमती रिवरफ्रंट",
    englishName: "Gomti Riverfront Promenade",
    tag: "शाम-ए-अवध",
    year: "आधुनिक लखनऊ",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000&auto=format&fit=crop&q=80",
    description:
      "गोमती नदी के किनारों पर बना यह खूबसूरत रिवरफ्रंट शाम की रोशनी, संगीतमय फव्वारों और ठंडी हवाओं के लिए विख्यात है।",
    facts: ["रंगीन रोशनी व फव्वारे", "आकर्षक वॉकवे व साइकिल ट्रैक", "सुहावनी शाम-ए-अवध"],
  },
  {
    id: "hazratganj",
    name: "हज़रतगंज हेरिटेज मार्केट",
    englishName: "Hazratganj Heritage Market",
    tag: "दिल-ए-लखनऊ",
    year: "1810 ईस्वी",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80",
    description:
      "विक्टोरियन शैली के खंभे, क्लासिक स्ट्रीट लैंप्स और 'गंजींग' की ऐतिहासिक परंपरा—हज़रतगंज लखनऊ की धड़कन है।",
    facts: ["क्लासिक यूरोपियन कोलोनेड्स", "मशहूर 'गंजींग' परंपरा", "शाही शॉपिंग व कैफे हब"],
  },
];

function TiltCard({ monument, index }: { monument: Monument; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -14;
    const rY = ((x - centerX) / centerX) * 14;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full flex justify-center py-2">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
        }}
        className={`group relative w-full rounded-2xl bg-gradient-to-b from-[#131926]/90 to-[#070b12]/95 border p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_60px_rgba(255,106,0,0.25)] overflow-hidden cursor-pointer ${monument.id === "lete-hue-hanuman-ji"
            ? "border-orange-500/50 hover:border-orange-400 ring-1 ring-orange-500/20"
            : "border-white/10 hover:border-orange-500/50"
          }`}
      >
        {/* Dynamic Specular Glare */}
        <div
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,165,0,0.22) 0%, rgba(255,255,255,0) 65%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        />

        {/* Top Badge */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 flex items-center justify-between mb-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold tracking-wide">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            {monument.tag}
          </span>
          <span className="text-xs text-white/50 font-mono tracking-wider">
            {monument.year}
          </span>
        </div>

        {/* 3D Image Container */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/10 group-hover:border-white/20 transition-all"
        >
          <Image
            src={monument.image}
            alt={monument.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white/80">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-orange-400" /> लखनऊ
            </span>
            <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              <Eye className="w-3 h-3 text-orange-300" /> 3D View
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
          <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors tracking-tight">
            {monument.name}
          </h3>
          <p className="text-xs font-semibold text-white/50 tracking-wider uppercase mb-2">
            {monument.englishName}
          </p>

          <p className="text-sm text-white/80 leading-relaxed mb-3">
            {monument.description}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-white/10 mb-4">
            {monument.facts.map((fact, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-white/70 font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>{fact}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-orange-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>दर्शन व विवरण</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CityExplorationSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="explore-lucknow"
      className="relative z-10 bg-[#05070d] text-white pt-16 pb-28 px-4 md:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* 3D Ambient Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-orange-600/20 via-amber-500/10 to-transparent blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-20 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full -z-10" />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto">

        {/* Section Header for All 3D Monuments */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 text-xs md:text-sm font-extrabold tracking-widest uppercase mb-4 shadow-lg shadow-orange-500/10"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>अवध की शाही सरज़मीं · THE CITY OF NAWABS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-xl"
          >
            तहज़ीब, तारीख़ और <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">नवाबी नफ़ासत</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl text-white/80 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            "मुस्कुराइए, आप लखनऊ में हैं" — केवल एक वाक्य नहीं, सदियों पुरानी गंगा-जमुनी तहज़ीब, नायाब वास्तुकला और शाही सत्कार का प्रतीक है।
          </motion.p>
        </div>

        {/* 3D Depth Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20"
        >
          {[
            { value: "२५०+ वर्ष", label: "लेटे हुए हनुमान जी विग्रह", icon: Flame },
            { value: "50 मीटर", label: "बिना खंभे का विशाल हॉल", icon: ShieldCheck },
            { value: "60 फीट", label: "रूमी दरवाज़ा की ऊंचाई", icon: Compass },
            { value: "100%", label: "अदब और तहज़ीब का शहर", icon: Sparkles },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl bg-[#0c121e]/80 border border-white/10 p-5 text-center backdrop-blur-md hover:border-orange-500/40 transition-all hover:-translate-y-1 shadow-xl"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* 3D Monuments Section Title */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <Landmark className="w-6 h-6 text-orange-400" />
              <span>लखनऊ के प्रसिद्ध 3D स्थल व मंदिर</span>
            </h3>
            <p className="text-xs md:text-sm text-white/60 mt-1">
              कार्ड्स पर माउस ले जाएं (Hover) और 3D में घूमें
            </p>
          </div>

          <Link
            href="/heritage"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-xs font-bold transition-all"
          >
            <span>पूरा 3D हेरिटेज पेज देखें</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Tilt Cards Grid (With Hanuman Ji Temple as #1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {MONUMENTS.map((monument, index) => (
            <TiltCard key={monument.id} monument={monument} index={index} />
          ))}
        </div>

        {/* 4 Cultural Pillars of Lucknow */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              संस्कृति और पहचान
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-1">
              अवध के 4 अनमोल स्तम्भ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Landmark,
                title: "शाही वास्तुकला",
                desc: "लखौरी ईंटें, चूने का गच और बिना खंभों की विशाल छतें अवधी इंजीनियरिंग की मिसाल हैं।",
              },
              {
                icon: Utensils,
                title: "नवाबी दस्तरख्वान",
                desc: "गलोटी कबाब, दम पुख्त, शीरमाल और अवधी बिरयानी का ज़ायका जो दुनिया में कहीं नहीं।",
              },
              {
                icon: Layers,
                title: "नफ़ीस चिकनकारी",
                desc: "सैकड़ों सालों पुरानी सुई-धागे की नाज़ुक नक्काशी, जिसे दुनिया भर के फैशन डिजाइनर्स सराहते हैं।",
              },
              {
                icon: Heart,
                title: "अदब व तहज़ीब",
                desc: "'पहले आप' का मीठा शिष्टाचार और गंगा-जमुनी संस्कृति जो लखनऊ को सबसे अलग बनाती है।",
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-gradient-to-b from-[#101725] to-[#080c14] border border-white/10 p-6 hover:border-orange-500/40 transition-all hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{pillar.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-orange-950/40 via-[#0d1422] to-amber-950/40 border border-orange-500/30 p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-orange-400 mb-2">
              LUCKNOW 3D JOURNEY
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
              "लखनऊ हम पर फ़िदा और हम फ़िदा-ए-लखनऊ"
            </h3>
            <p className="text-sm md:text-base text-white/80 mb-8 leading-relaxed">
              हीरो पेज पर दोबारा जाने के लिए ऊपर स्क्रोल करें या नीचे दिए बटन पर क्लिक करें।
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-extrabold text-xs tracking-wider uppercase hover:bg-white/90 shadow-lg transition-all hover:scale-105"
              >
                <ArrowUp className="w-4 h-4" />
                <span>वापस ऊपर हीरो पेज पर जाएं ↑</span>
              </button>

              <Link
                href="/heritage"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>समर्पित 3D हेरिटेज पेज पर जाएं ➔</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
