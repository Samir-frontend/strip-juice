import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

export default function PageBanner({ eyebrow, title, subtitle }) {
  const { accent } = useTheme();

  return (
    <section
      className="relative pt-40 pb-16 px-8 lg:px-12 border-b border-white/5 transition-colors duration-700"
      style={{ backgroundImage: 'radial-gradient(ellipse 900px 500px at 50% -20%, ' + accent + '18, transparent 65%)' }}
    >
      <div className="max-w-[1680px] mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono uppercase tracking-widest transition-colors duration-700"
          style={{ color: accent }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl lg:text-6xl font-semibold tracking-tight mt-3"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mt-4 max-w-xl text-sm lg:text-base leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
