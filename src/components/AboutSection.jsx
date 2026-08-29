import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Droplet, Recycle, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function AboutSection({ preview = false, id = 'about' }) {
  const { accent } = useTheme();

  return (
    <section
      id={id}
      className="relative bg-black text-white py-24 px-8 lg:px-12 border-t border-white/5"
      style={{ backgroundImage: 'radial-gradient(ellipse 900px 500px at 15% -10%, ' + accent + '10, transparent 65%)' }}
    >
      <div className="max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-white/40">About Strip</span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold tracking-tight mt-3 leading-tight">
            Hydration built for people who don't sit still.
          </h2>
          <p className="text-gray-400 mt-6 text-sm lg:text-base leading-relaxed max-w-lg">
            Strip started in 2019 with one question: why does staying hydrated have to mean sugar-loaded
            sports drinks or bland electrolyte tablets? We partnered with small fruit farms to build a
            lineup that tastes like the fruit it's named after — no shortcuts, no artificial anything.
            Every batch is small, every bottle is recyclable, and every flavor is tested until it's
            something we'd actually reach for mid-run.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10 max-w-lg">
            <div>
              <div className="font-display text-3xl font-semibold">6</div>
              <div className="text-xs text-gray-500 mt-1">years in the field</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold">2.4M</div>
              <div className="text-xs text-gray-500 mt-1">bottles shipped</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold">100%</div>
              <div className="text-xs text-gray-500 mt-1">recyclable packaging</div>
            </div>
          </div>

          {preview && (
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-colors duration-500"
              style={{ color: accent }}
            >
              Read our full story <ArrowRight size={15} />
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-4"
        >
          {[
            { icon: Leaf, title: 'Sourced from real farms', desc: 'We work directly with fruit growers, not flavor labs.' },
            { icon: Droplet, title: 'Electrolyte-balanced', desc: 'Formulated with sports scientists for real hydration, not just taste.' },
            { icon: Recycle, title: 'Recyclable, always', desc: 'Bottles and caps are fully recyclable — no exceptions.' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
            >
              <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <item.icon size={18} color={accent} />
              </div>
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-400 text-sm mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
