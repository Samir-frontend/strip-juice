import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, PhoneCall, ArrowRight, Search, Heart, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const NAV_ITEMS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Shop', to: '/drinks' },
  { label: 'Best Sellers', to: '/bestsellers' },
  { label: 'About', to: '/about' },
  { label: 'Stories', to: '/stories' },
  { label: 'Reviews', to: '/#reviews' },
];

export default function MobileDrawer({ open, onClose, onOpenContact, onOpenSearch, onOpenWishlist, showToast }) {
  const [active, setActive] = useState('Home');
  const { accent } = useTheme();

  function handleClick(item) {
    setActive(item.label);
    onClose();
    showToast('Navigated to ' + item.label);
  }

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="mobile-drawer-frag">
          <motion.div
            key="mdrawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            key="mdrawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-80 h-full bg-[#0d0d0f] border-l border-white/5 z-50 p-6 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Link
                    to="/"
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
                      <path d="M19 10h-6V3L5 14h6v7z" />
                    </svg>
                  </Link>
                  <span className="text-xl font-bold">strip</span>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close menu">
                  <X size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSearch();
                  }}
                  className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300"
                >
                  <Search size={15} /> Search
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenWishlist();
                  }}
                  className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300"
                >
                  <Heart size={15} /> Wishlist
                </button>
              </div>

              <nav className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => handleClick(item)}
                    className={
                      'flex items-center gap-2.5 text-lg font-medium py-2 text-left transition-colors ' +
                      (active === item.label ? '' : 'text-gray-400 hover:text-white')
                    }
                    style={active === item.label ? { color: accent } : undefined}
                  >
                    {item.icon && <item.icon size={17} />}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#161619] flex items-center justify-center flex-shrink-0">
                  <PhoneCall size={16} />
                </div>
                <div>
                  <div className="font-mono uppercase text-[11px] tracking-widest text-white/40">Call Support</div>
                  <div className="text-sm font-medium">+1 (800) 555-STRIP</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black transition-colors duration-500"
                style={{ backgroundColor: accent }}
              >
                Contact Us <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
