import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Minus, Plus, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import ProductImage from './ProductImage.jsx';
import { FLAVOR } from '../theme.js';

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { cartItems, count, subtotal, shippingCost, total, freeShippingThreshold, changeQty, removeItem, addItem, products } = useShop();

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="cart-frag">
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-[28rem] h-full bg-[#0d0d0f] border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl"
          >
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} color={FLAVOR} />
                  <span className="font-semibold text-lg">Your Cart ({count} items)</span>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close cart">
                  <X size={16} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-10">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag size={24} className="text-gray-500" />
                  </div>
                  <div className="font-semibold">Your cart is empty</div>
                  <p className="text-sm text-gray-400 max-w-[220px]">
                    Looks like you haven't added anything yet. Grab a bottle and get moving.
                  </p>
                  <button
                    onClick={() => addItem(products[0]?.id)}
                    className="mt-2 px-5 py-2.5 rounded-xl font-semibold text-black text-sm"
                    style={{ backgroundColor: FLAVOR }}
                  >
                    Quick Add {products[0]?.name}
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-3">
                      <div className="w-14 h-16 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <ProductImage image={item.image} color={item.flavor} icon={item.icon} size={40} fill />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <span className="font-semibold text-sm">{item.name}</span>
                          <span className="font-mono text-sm" style={{ color: item.flavor || FLAVOR }}>
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-4 text-center">{item.qty}</span>
                            <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-300">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-[#f2a340]/5 border border-[#f2a340]/10 rounded-2xl p-4 flex items-center gap-3">
                    <Sparkles size={18} color={FLAVOR} />
                    <span className="text-xs text-white/70">
                      {subtotal >= freeShippingThreshold
                        ? 'You\u2019ve unlocked free shipping.'
                        : 'Add $' + (freeShippingThreshold - subtotal).toFixed(2) + ' more for free shipping.'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? <span className="text-green-400">FREE</span> : '$' + shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total</span>
                  <span className="font-mono" style={{ color: FLAVOR }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full mt-3 py-3 rounded-xl font-bold text-black"
                  style={{ backgroundColor: FLAVOR, boxShadow: '0 8px 24px -6px #f2a34040' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
