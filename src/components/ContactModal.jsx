import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import { FLAVOR } from '../theme.js';


export default function ContactModal({ open, onClose }) {
  const { showToast } = useShop();

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    showToast('Message sent — we will get back to you soon.');
  }

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="contact-frag">
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            key="contact-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full bg-[#0d0d0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Get In Touch</h3>
                <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Full Name</label>
                  <input required type="text" placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Email Address</label>
                  <input required type="email" placeholder="you@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Your Message</label>
                  <textarea required rows={3} placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black" style={{ backgroundColor: FLAVOR }}>
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
