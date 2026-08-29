import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import ProductImage from './ProductImage.jsx';

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const { searchProducts, addItem } = useShop();
  const inputRef = useRef(null);
  const results = searchProducts(query);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="search-frag">
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            key="search-modal"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          >
            <div className="w-full max-w-lg bg-[#0d0d0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <Search size={18} className="text-gray-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search flavors..."
                  className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-gray-500"
                />
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/5" aria-label="Close search">
                  <X size={16} />
                </button>
              </div>
              {query.trim() && (
                <div className="max-h-80 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">No flavors match "{query}".</p>
                  ) : (
                    results.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors">
                        <div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <ProductImage image={p.image} color={p.flavor} icon={p.icon} size={32} fill />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{p.name}</div>
                          <div className="text-xs text-gray-500 truncate">{p.tagline}</div>
                        </div>
                        <span className="font-mono text-sm flex-shrink-0" style={{ color: p.flavor }}>
                          ${p.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addItem(p.id)}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex-shrink-0"
                          aria-label={'Add ' + p.name}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
