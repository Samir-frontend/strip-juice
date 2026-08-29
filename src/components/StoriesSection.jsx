import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCT_COLORS, FLAVOR } from '../theme.js';
import MediaImage from './MediaImage.jsx';

const STORIES = [
  {
    tag: 'Journal',
    title: 'How we picked our first farm partner',
    excerpt: 'Six months of tastings across three states led us to a single peach orchard in Georgia.',
    color: PRODUCT_COLORS['peach-perfect'],
    image: 'story-farm.jpg',
  },
  {
    tag: 'Behind the bottle',
    title: 'The science of an electrolyte blend',
    excerpt: 'Why sodium, potassium, and magnesium ratios matter more than sugar content.',
    color: PRODUCT_COLORS['berry-boost'],
    image: 'story-science.jpg',
  },
  {
    tag: 'Community',
    title: '5,000 runners, one relay',
    excerpt: 'Inside the Strip-sponsored coast relay and what we learned about hydration on the move.',
    color: PRODUCT_COLORS['cherry-focus'],
    image: 'story-relay.jpg',
  },
  {
    tag: 'Behind the scenes',
    title: 'Meet the six-person tasting panel',
    excerpt: 'The team that rejects nine flavor ideas for every one that makes it to a bottle.',
    color: PRODUCT_COLORS['mango-rush'],
    image: 'story-team.jpg',
  },
  {
    tag: 'Sustainability',
    title: 'Why we switched to fully recyclable caps',
    excerpt: 'The eighteen-month search for a cap that seals well and breaks down responsibly.',
    color: FLAVOR,
    image: 'story-packaging.jpg',
  },
];

export default function StoriesSection({ limit, id = 'stories', title = 'From the field and the fridge.' }) {
  const list = limit ? STORIES.slice(0, limit) : STORIES;
  const tint = PRODUCT_COLORS['berry-boost'];

  return (
    <section
      id={id}
      className="relative bg-black text-white py-24 px-8 lg:px-12 border-t border-white/5"
      style={{ backgroundImage: 'radial-gradient(ellipse 900px 500px at 85% -10%, ' + tint + '10, transparent 65%)' }}
    >
      <div className="max-w-[1680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-white/40">Stories</span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold tracking-tight mt-3">{title}</h2>
        </motion.div>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-8 px-8 lg:mx-0 lg:px-0 md:grid md:grid-cols-3 md:overflow-visible">
          {list.map((s, idx) => (
            <motion.a
              key={s.title}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex-shrink-0 w-[260px] snap-start md:w-auto block bg-white/[0.03] border border-white/10 rounded-[24px] overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <div className="h-40 md:h-44 flex items-center justify-center overflow-hidden" style={{ backgroundColor: s.color + '14' }}>
                <MediaImage image={s.image} color={s.color} />
              </div>
              <div className="p-6">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: s.color }}>
                  {s.tag}
                </span>
                <h3 className="font-semibold text-lg mt-2 group-hover:text-white/90">{s.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{s.excerpt}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
