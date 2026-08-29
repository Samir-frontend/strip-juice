import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useShop();
  const { accent } = useTheme();

  function handleSubmit(e) {
    e.preventDefault();
    showToast('Subscribed — look out for our next drop.');
    setEmail('');
  }

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 pb-14 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={accent} className="transition-colors duration-500">
                <path d="M19 10h-6V3L5 14h6v7z" />
              </svg>
              <span className="font-bold text-lg">Strip</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Small-batch hydration built from real fruit extracts. No artificial colors, flavors, or
              preservatives — ever.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Shop</h5>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/drinks" className="hover:text-white transition-colors">All Flavors</Link>
              <Link to="/bestsellers" className="hover:text-white transition-colors">Best Sellers</Link>
              <Link to="/drinks#top-buying" className="hover:text-white transition-colors">Top Buying</Link>
              <Link to="/drinks#new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Company</h5>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/stories" className="hover:text-white transition-colors">Stories</Link>
              <Link to="/#reviews" className="hover:text-white transition-colors">Reviews</Link>
              <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Stay in the loop</h5>
            <p className="text-sm text-gray-400 mb-4">New flavors and restock alerts, once or twice a month.</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl flex-shrink-0 transition-colors duration-500"
                style={{ backgroundColor: accent }}
                aria-label="Subscribe"
              >
                <ArrowRight size={16} className="text-black" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <span className="text-xs text-gray-500">© {new Date().getFullYear()} Strip Drinks — Built For Every Adventure.</span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
