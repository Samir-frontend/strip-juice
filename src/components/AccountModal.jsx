import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { FLAVOR } from '../theme.js';


export default function AccountModal({ open, onClose }) {
  const { customer, logoutCustomer } = useAuth();
  const { orders, showToast } = useShop();

  function handleLogout() {
    logoutCustomer();
    showToast('Logged out');
    onClose();
  }

  if (!customer) return null;

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="account-frag">
          <motion.div
            key="account-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            key="account-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full bg-[#0d0d0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black"
                    style={{ backgroundColor: FLAVOR }}
                  >
                    {customer.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-xs text-gray-400">{customer.email}</div>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close">
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">Order history</div>
                {orders.length === 0 ? (
                  <div className="text-sm text-gray-400 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                    No orders yet — your first order will show up here.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {orders.map((o) => (
                      <div key={o.id} className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Package size={14} color={FLAVOR} />
                          <span className="font-mono text-xs">{o.id}</span>
                        </div>
                        <span className="text-xs text-gray-400">{o.status}</span>
                        <span className="font-mono" style={{ color: FLAVOR }}>
                          ${o.total.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
