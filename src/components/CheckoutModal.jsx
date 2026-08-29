import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, CreditCard } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import { FLAVOR } from '../theme.js';

export default function CheckoutModal({ open, onClose }) {
  const { cartItems, subtotal, shippingCost, total, freeShippingThreshold, placeOrder } = useShop();
  const [step, setStep] = useState('form');
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({ name: '', address: '', card: '', expiry: '', cvv: '' });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function formatCard(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function formatExpiry(v) {
    let d = v.replace(/\D/g, '').slice(0, 4);
    if (d.length > 2) d = d.slice(0, 2) + '/' + d.slice(2);
    return d;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const placed = placeOrder({ name: form.name, address: form.address });
    setOrder(placed);
    setStep('success');
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep('form');
      setForm({ name: '', address: '', card: '', expiry: '', cvv: '' });
      setOrder(null);
    }, 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="checkout-frag">
          <motion.div
            key="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            key="checkout-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full bg-[#0d0d0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              {step === 'form' ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">Checkout</h3>
                    <button onClick={handleClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
                    <CreditCard size={14} /> Demo checkout — no real payment is processed.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        type="text"
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Shipping Address</label>
                      <input
                        required
                        value={form.address}
                        onChange={(e) => update('address', e.target.value)}
                        type="text"
                        placeholder="Street, city, ZIP"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 pt-2 pb-1">
                      <span className="flex-1 h-px bg-white/10" /> Payment details <span className="flex-1 h-px bg-white/10" />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Card Number</label>
                      <input
                        required
                        value={form.card}
                        onChange={(e) => update('card', formatCard(e.target.value))}
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Expiry</label>
                        <input
                          required
                          value={form.expiry}
                          onChange={(e) => update('expiry', formatExpiry(e.target.value))}
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">CVV</label>
                        <input
                          required
                          value={form.cvv}
                          onChange={(e) => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                          type="text"
                          placeholder="123"
                          maxLength={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-3 space-y-1.5 border-t border-white/10 mt-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Shipping {subtotal > 0 && subtotal < freeShippingThreshold ? '(50% of subtotal)' : ''}</span>
                        <span className="font-mono">
                          {shippingCost === 0 ? <span className="text-green-400">FREE</span> : '$' + shippingCost.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span className="font-mono" style={{ color: FLAVOR }}>
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={cartItems.length === 0}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black disabled:opacity-40"
                      style={{ backgroundColor: FLAVOR }}
                    >
                      Place Order <ArrowRight size={16} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: FLAVOR }}>
                    <CheckCircle2 size={30} className="text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Order placed</h3>
                  <p className="text-sm text-gray-400">Your bottles ship within 2 business days.</p>
                  <div className="font-mono text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 inline-block my-4">
                    {order?.id}
                  </div>
                  <p className="text-xs text-gray-500 mb-6">This is a demo store — no real payment was charged.</p>
                  <button onClick={handleClose} className="w-full py-3 rounded-xl font-bold text-black" style={{ backgroundColor: FLAVOR }}>
                    Continue browsing
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
