import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, ShieldCheck } from 'lucide-react';
import { FLAVOR, PRODUCT_COLORS } from '../theme.js';
import { useTheme } from '../context/ThemeContext.jsx';

const VIDEO_SRC = 'https://cdn.jiro.build/videos/header/Juice%20Video%20Header.mp4';

const INGREDIENTS = [
  { icon: Leaf, title: 'Real Fruit Extracts', desc: 'Made with real peaches for a naturally delicious taste.' },
  { icon: Droplet, title: 'Essential Hydration', desc: 'Electrolytes & minerals to support your daily hydration.' },
  { icon: ShieldCheck, title: 'Better for You', desc: 'No artificial colors, flavors, or preservatives.' },
];

export default function Hero() {
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const { accent } = useTheme();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const timer = setTimeout(() => {
      if (v.readyState === 0) setVideoFailed(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen pt-32 pb-16 lg:py-0 lg:h-screen flex items-center justify-center z-10 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 -z-20 bg-[#0a0a0c]" />

      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover -z-10"
          style={{ filter: 'brightness(0.85) contrast(1.08) saturate(1.15)' }}
          src={VIDEO_SRC}
          loop
          muted
          playsInline
          autoPlay
          onError={() => setVideoFailed(true)}
        />
      )}

      {videoFailed && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <radialGradient id="heroFallbackGrad" cx="50%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#26190f" />
                <stop offset="100%" stopColor="#08080a" />
              </radialGradient>
            </defs>
            <rect width="1600" height="900" fill="url(#heroFallbackGrad)" />
            <circle cx="800" cy="360" r="260" fill={FLAVOR} opacity="0.16" />
            <circle cx="1120" cy="560" r="180" fill={PRODUCT_COLORS['berry-boost']} opacity="0.1" />
            <circle cx="480" cy="600" r="200" fill={PRODUCT_COLORS['cherry-focus']} opacity="0.08" />
            <g opacity="0.5">
              <ellipse cx="800" cy="470" rx="120" ry="200" fill="#151516" stroke="rgba(255,255,255,0.08)" />
            </g>
          </svg>
        </div>
      )}

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-black/10" />
      <div
        className="absolute -z-10 w-96 h-96 rounded-full blur-[90px] opacity-20 mix-blend-screen transition-all duration-700 ease-in-out"
        style={{ backgroundColor: accent }}
      />

      <div className="max-w-[1680px] mx-auto px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 z-20">
            <h1 className="font-display font-normal tracking-tight text-[2.6rem] sm:text-[3.8rem] lg:text-[67px] leading-[1.1] lg:leading-[80px] uppercase">
              POWERFUL <br />
              DRINKS. <br />
              BUILT FOR <br />
              EVERY <br />
              ADVENTURE.
            </h1>
            <a
              href="#bestsellers"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-bold text-black text-sm transition-colors duration-500"
              style={{ backgroundColor: accent }}
            >
              Shop the lineup
            </a>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2 h-[220px] sm:h-[300px] lg:h-full" />

          <div className="lg:col-span-4 order-3 z-20 space-y-6 lg:items-end lg:text-right flex flex-col">
            <h2 className="font-display text-3xl lg:text-[32px] font-semibold tracking-tight leading-[1.15]">
              Clean Ingredients. <br /> Real Results.
            </h2>
            <div className="flex flex-col gap-4 w-full items-end">
              {INGREDIENTS.map((ing, idx) => (
                <motion.div
                  key={ing.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[20px] p-[18px] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 w-full max-w-[300px]"
                >
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                    <ing.icon size={18} color={accent} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold" style={{ fontSize: 18 }}>
                      {ing.title}
                    </div>
                    <div className="text-gray-400" style={{ fontSize: 16, lineHeight: '19px' }}>
                      {ing.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
