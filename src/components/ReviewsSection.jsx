import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FLAVOR } from '../theme.js';


const REVIEWS = [
  { name: 'Aisha K.', role: 'Marathon runner', rating: 5, text: 'Peach Perfect is the first electrolyte drink that doesn\u2019t taste like a multivitamin. Genuinely refreshing.' },
  { name: 'Marcus T.', role: 'Gym coach', rating: 5, text: 'I hand these out to clients after sessions. Cherry Focus especially has zero that chemical aftertaste.' },
  { name: 'Priya N.', role: 'Home barista', rating: 4, text: 'Citrus Charge in the morning instead of coffee some days. Wish it came in a bigger bottle, honestly.' },
];

export default function ReviewsSection() {
  const tint = FLAVOR;

  return (
    <section
      id="reviews"
      className="relative bg-black text-white py-24 px-8 lg:px-12 border-t border-white/5"
      style={{ backgroundImage: 'radial-gradient(ellipse 900px 500px at 15% -10%, ' + tint + '0f, transparent 65%)' }}
    >
      <div className="max-w-[1680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-white/40">Reviews</span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold tracking-tight mt-3">
            What people are saying.
          </h2>
        </motion.div>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-8 px-8 lg:mx-0 lg:px-0 md:grid md:grid-cols-3 md:overflow-visible">
          {REVIEWS.map((r, idx) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-[280px] snap-start md:w-auto bg-white/[0.03] border border-white/10 rounded-[24px] p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < r.rating ? FLAVOR : 'transparent'} color={FLAVOR} />
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-5">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-black text-sm"
                  style={{ backgroundColor: FLAVOR }}
                >
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
