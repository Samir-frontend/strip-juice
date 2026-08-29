import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext.jsx';
import { FLAVOR } from '../theme.js';


export default function Toast() {
  const { toast, dismissToast } = useShop();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 3000);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[#121214] border border-white/10 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: FLAVOR }} />
          <span className="text-sm font-medium">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
