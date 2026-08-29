import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Star, Heart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import ProductImage from './ProductImage.jsx';
import QuickViewModal from './QuickViewModal.jsx';

export default function ProductsSection({ productsOverride, title, subtitle, id = 'products', viewAllTo, viewAllLabel }) {
  const { products: allProducts, addItem, wishlist, toggleWishlist } = useShop();
  const { accent, setAccent, resetAccent } = useTheme();
  const [viewing, setViewing] = useState(null);
  const products = productsOverride || allProducts;

  return (
    <section id={id} className="relative bg-black text-white py-24 px-8 lg:px-12">
      <div className="max-w-[1680px] mx-auto">
        <div className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Shop the lineup</span>
            <h2 className="font-display text-3xl lg:text-5xl font-semibold tracking-tight mt-3">
              {title || products.length + ' flavors. One mission.'}
            </h2>
            <p className="text-gray-400 mt-4 text-sm lg:text-base leading-relaxed">
              {subtitle ||
                'Every bottle is built on real fruit extracts and electrolytes — no artificial colors, flavors, or preservatives, ever.'}
            </p>
          </motion.div>
          {viewAllTo && (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={viewAllTo}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-500 flex-shrink-0 pb-1"
                style={{ color: accent }}
              >
                {viewAllLabel || 'View all'} <ArrowRight size={15} />
              </Link>
            </motion.div>
          )}
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-8 px-8 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-thin">
          {products.map((p, idx) => {
            const liked = wishlist.includes(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(idx, 4) * 0.05 }}
                onMouseEnter={() => setAccent(p.flavor)}
                onMouseLeave={resetAccent}
                onClick={() => setViewing(p)}
                className="relative flex-shrink-0 w-[240px] snap-start lg:w-auto bg-white/[0.04] border border-white/10 rounded-[24px] p-5 lg:p-6 flex flex-col hover:border-white/20 hover:bg-white/[0.06] transition-colors duration-300 cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
                  aria-label="Toggle wishlist"
                >
                  <Heart size={14} fill={liked ? p.flavor : 'none'} color={liked ? p.flavor : '#ffffff'} />
                </button>
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden mb-5"
                  style={{ backgroundColor: p.flavor + '14' }}
                >
                  <ProductImage image={p.image} color={p.flavor} icon={p.icon} size={92} fill />
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Star size={13} fill={p.flavor} color={p.flavor} />
                  <span className="text-xs text-gray-400">{p.rating ? p.rating.toFixed(1) : '4.8'}</span>
                  {p.bestSeller && (
                    <span
                      className="ml-auto text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: p.flavor + '20', color: p.flavor }}
                    >
                      Best Seller
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-gray-400 text-sm mt-1 flex-1">{p.tagline}</p>
                <div className="flex items-center justify-between mt-5">
                  <span className="font-mono text-lg" style={{ color: p.flavor }}>
                    ${p.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(p.id);
                    }}
                    disabled={p.stock === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-40"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <QuickViewModal product={viewing} onClose={() => setViewing(null)} />
    </section>
  );
}
