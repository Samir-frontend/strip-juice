import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Search, Heart, User, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Header({ onOpenDrawer, onOpenCart, onOpenLogin, onOpenAccount, onOpenSearch, onOpenWishlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { count, wishlist } = useShop();
  const { customer } = useAuth();
  const { accent } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={
        'fixed top-0 left-0 w-full z-40 transition-all duration-300 ' +
        (scrolled ? 'bg-black/90 backdrop-blur-sm py-3 border-b border-white/5' : 'bg-transparent py-6')
      }
    >
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1e]/80 backdrop-blur-md border border-white/10 rounded-xl hover:bg-[#222226] transition-colors flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={accent} className="transition-colors duration-500">
            <path d="M19 10h-6V3L5 14h6v7z" />
          </svg>
          <span className="font-bold tracking-tight" style={{ fontSize: 16, lineHeight: '20px' }}>
            Strip
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-2 py-1.5">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
              Shop <ChevronDown size={14} />
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div className="bg-[#121214] border border-white/10 rounded-2xl p-2 shadow-2xl">
                  <Link to="/drinks" className="block px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                    All Flavors
                  </Link>
                  <Link to="/bestsellers" className="block px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                    Best Sellers
                  </Link>
                  <Link to="/drinks#top-buying" className="block px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                    Top Buying
                  </Link>
                  <Link to="/drinks#new-arrivals" className="block px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                    New Arrivals
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/about" className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            About
          </Link>
          <Link to="/stories" className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            Stories
          </Link>
          <Link to="/#reviews" className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            Reviews
          </Link>
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex p-2.5 rounded-xl bg-[#1a1a1e]/80 border border-white/10 hover:bg-[#222226] transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            onClick={onOpenWishlist}
            className="hidden sm:flex relative p-2.5 rounded-xl bg-[#1a1a1e]/80 border border-white/10 hover:bg-[#222226] transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-black transition-colors duration-500"
                style={{ backgroundColor: accent }}
              >
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={customer ? onOpenAccount : onOpenLogin}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#1a1a1e]/80 border border-white/10 hover:bg-[#222226] transition-colors"
          >
            {customer ? (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-black transition-colors duration-500"
                style={{ backgroundColor: accent }}
              >
                {customer.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User size={18} />
            )}
            <span className="hidden lg:inline text-sm font-medium">
              {customer ? customer.name.split(' ')[0] : 'Login'}
            </span>
          </button>
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-[#1a1a1e]/80 border border-white/10 hover:bg-[#222226] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-black transition-colors duration-500"
                style={{ backgroundColor: accent }}
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={onOpenDrawer}
            className="p-2.5 rounded-xl bg-[#1a1a1e]/80 border border-white/10 hover:bg-[#222226] transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
