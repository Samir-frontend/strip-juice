import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Plus, Minus, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import ProductImage from './ProductImage.jsx';

export default function QuickViewModal({ product, onClose, onBuyNow }) {
  const { addItem, wishlist, toggleWishlist } = useShop();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product]);

  const open = !!product;
  const liked = product ? wishlist.includes(product.id) : false;

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="quickview-frag">
          <motion.div
            key="quickview-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            key="quickview-modal"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-2xl w-full bg-[#0d0d0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-2 max-h-[90vh]">
              <div
                className="relative aspect-square sm:aspect-auto sm:h-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: (product?.flavor || '#f2a340') + '14' }}
              >
                <ProductImage image={product?.image} color={product?.flavor} icon={product?.icon} size={140} fill />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 sm:hidden"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 sm:p-8 flex flex-col overflow-y-auto">
                <div className="hidden sm:flex justify-end mb-2">
                  <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close">
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <Star size={13} fill={product?.flavor} color={product?.flavor} />
                  <span className="text-xs text-gray-400">{product?.rating?.toFixed(1)}</span>
                  {product?.bestSeller && (
                    <span
                      className="ml-2 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: product.flavor + '20', color: product.flavor }}
                    >
                      Best Seller
                    </span>
                  )}
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{product?.name}</h2>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{product?.description || product?.tagline}</p>

                <div className="flex items-center gap-3 mt-5">
                  <span className="font-mono text-2xl font-semibold" style={{ color: product?.flavor }}>
                    ${product?.price.toFixed(2)}
                  </span>
                  {typeof product?.stock === 'number' && (
                    <span className="text-xs text-gray-500 font-mono">
                      {product.stock > 0 ? product.stock + ' in stock' : 'Sold out'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-4 text-center font-mono">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    aria-label="Toggle wishlist"
                  >
                    <Heart size={16} fill={liked ? product?.flavor : 'none'} color={liked ? product?.flavor : '#fff'} />
                  </button>
                </div>

                <div className="flex flex-col gap-2.5 mt-6 mt-auto pt-6">
                  <button
                    onClick={() => {
                      addItem(product.id, qty);
                      onClose();
                    }}
                    disabled={product?.stock === 0}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black disabled:opacity-40"
                    style={{ backgroundColor: product?.flavor }}
                  >
                    <ShoppingBag size={16} /> Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      addItem(product.id, qty);
                      onClose();
                      onBuyNow && onBuyNow();
                    }}
                    disabled={product?.stock === 0}
                    className="w-full py-3 rounded-xl font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm disabled:opacity-40"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
