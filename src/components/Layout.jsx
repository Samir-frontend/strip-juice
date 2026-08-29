import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import CartDrawer from './CartDrawer.jsx';
import LoginModal from './LoginModal.jsx';
import AccountModal from './AccountModal.jsx';
import CheckoutModal from './CheckoutModal.jsx';
import ContactModal from './ContactModal.jsx';
import SearchModal from './SearchModal.jsx';
import WishlistDrawer from './WishlistDrawer.jsx';
import Toast from './Toast.jsx';
import AmbientBackground from './AmbientBackground.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { showToast } = useShop();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#f2a340] selection:text-black">
      <AmbientBackground />
      <Toast />
      <Header
        onOpenDrawer={() => setDrawerOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {children}

      <Footer />

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenContact={() => setContactOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        showToast={showToast}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </div>
  );
}
