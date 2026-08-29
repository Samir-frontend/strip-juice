import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import ProductImage from './ProductImage.jsx';

const FLAVOR_FALLBACK = '#f2a340';

export default function WishlistDrawer({ open, onClose }) {
  const { wishlistItems, toggleWishlist, addItem } = useShop();

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="wishlist-frag">
          <motion.div
            key="wishlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            key="wishlist-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-[#0d0d0f] border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Heart size={18} color={FLAVOR_FALLBACK} />
                <span className="font-semibold text-lg">Your Wishlist ({wishlistItems.length})</span>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close wishlist">
                <X size={16} />
              </button>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <Heart size={24} className="text-gray-500" />
                </div>
                <div className="font-semibold">Nothing saved yet</div>
                <p className="text-sm text-gray-400 max-w-[220px]">
                  Tap the heart on a bottle to keep track of your favorites.
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-3">
                {wishlistItems.map((p) => (
                  <div key={p.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-3">
                    <div className="w-14 h-16 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <ProductImage image={p.image} color={p.flavor} icon={p.icon} size={40} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-sm">{p.name}</span>
                        <span className="font-mono text-sm" style={{ color: p.flavor }}>
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{p.tagline}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => addItem(p.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold"
                        >
                          <Plus size={12} /> Add to cart
                        </button>
                        <button onClick={() => toggleWishlist(p.id)} className="text-xs text-red-400 hover:text-red-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
