import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCT_COLORS } from '../theme.js';

const ShopContext = createContext(null);

const INITIAL_PRODUCTS = [
  {
    id: 'peach-perfect',
    name: 'Peach Perfect',
    tagline: 'Real fruit extract + electrolytes',
    description:
      'Our flagship flavor — made with real peach extract from a single Georgia orchard, balanced with electrolytes for genuine hydration, not just sweetness.',
    price: 2.99,
    flavor: PRODUCT_COLORS['peach-perfect'],
    icon: 'leaf',
    image: 'peach-perfect.webp',
    rating: 4.8,
    stock: 240,
    sold: 5200,
    bestSeller: true,
  },
  {
    id: 'citrus-charge',
    name: 'Citrus Charge',
    tagline: 'Vitamin C boost for busy mornings',
    description:
      'A bright blend of orange and lemon extract with a full day\u2019s vitamin C — built for mornings that need a real kickstart, not just caffeine.',
    price: 2.99,
    flavor: PRODUCT_COLORS['citrus-charge'],
    icon: 'citrus',
    image: 'citrus-charge.webp',
    rating: 4.6,
    stock: 180,
    sold: 3000,
    bestSeller: true,
  },
  {
    id: 'berry-boost',
    name: 'Berry Boost',
    tagline: 'Antioxidant-rich mixed berry blend',
    description:
      'Blueberry, blackberry, and raspberry extract combined for one of our highest-rated flavors — rich, a little tart, and never overly sweet.',
    price: 3.29,
    flavor: PRODUCT_COLORS['berry-boost'],
    icon: 'sparkles',
    image: 'berry-boost.webp',
    rating: 4.9,
    stock: 95,
    sold: 2600,
    bestSeller: false,
  },
  {
    id: 'cherry-focus',
    name: 'Cherry Focus',
    tagline: 'Tart cherry with a clean finish',
    description:
      'Tart cherry extract known for its clean aftertaste — a favorite for evening wind-downs after a long training day.',
    price: 3.29,
    flavor: PRODUCT_COLORS['cherry-focus'],
    icon: 'cherry',
    image: 'cherry-focus.webp',
    rating: 4.7,
    stock: 130,
    sold: 2100,
    bestSeller: false,
  },
  {
    id: 'mango-rush',
    name: 'Mango Rush',
    tagline: 'Tropical mango with a bright finish',
    description:
      'A tropical, sun-ripened mango extract blend — one of our fastest-growing flavors since launch, especially popular in summer.',
    price: 3.19,
    flavor: PRODUCT_COLORS['mango-rush'],
    icon: 'citrus',
    image: 'mango-rush.webp',
    rating: 4.7,
    stock: 200,
    sold: 3200,
    bestSeller: true,
    isNewArrival: true,
  },
  {
    id: 'watermelon-splash',
    name: 'Watermelon Splash',
    tagline: 'Light, crisp, and endlessly drinkable',
    description:
      'Watermelon extract with a splash of lime — our lightest flavor, built for hot days and post-workout cooldowns.',
    price: 2.99,
    flavor: PRODUCT_COLORS['watermelon-splash'],
    icon: 'sparkles',
    image: 'watermelon-splash.webp',
    rating: 4.5,
    stock: 160,
    sold: 1400,
    bestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'ginger-zing',
    name: 'Ginger Zing',
    tagline: 'Bold ginger with a warm bite',
    description:
      'Real ginger root extract for a warm, spicy edge — popular for settling stomachs before long runs.',
    price: 3.09,
    flavor: PRODUCT_COLORS['ginger-zing'],
    icon: 'leaf',
    image: 'ginger-zing.webp',
    rating: 4.4,
    stock: 110,
    sold: 900,
    bestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'coconut-cool',
    name: 'Coconut Cool',
    tagline: 'Creamy coconut water base',
    description:
      'A naturally creamy coconut water base with a light electrolyte profile — closest thing we make to a still, quiet flavor.',
    price: 3.19,
    flavor: PRODUCT_COLORS['coconut-cool'],
    icon: 'droplet',
    image: 'coconut-cool.webp',
    rating: 4.6,
    stock: 140,
    sold: 1100,
    bestSeller: false,
    isNewArrival: true,
  },
];

const SHIPPING_RATE = 0.5;
const FREE_SHIPPING_THRESHOLD = 15;

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [orders, setOrders] = useState([]);

  function showToast(message) {
    setToast({ id: Date.now() + Math.random(), message });
  }
  function dismissToast() {
    setToast(null);
  }

  function findProduct(id) {
    return products.find((p) => p.id === id);
  }

  function addItem(id, qty = 1) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
    const p = findProduct(id);
    showToast((p ? p.name : 'Item') + ' added to cart');
  }

  function changeQty(id, delta) {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  function toggleWishlist(id) {
    setWishlist((prev) => {
      const isIn = prev.includes(id);
      const p = findProduct(id);
      showToast((p ? p.name : 'Item') + (isIn ? ' removed from wishlist' : ' added to wishlist'));
      return isIn ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }

  function addProduct(product) {
    setProducts((prev) => [...prev, product]);
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    setWishlist((prev) => prev.filter((x) => x !== id));
  }

  function calcShipping(amount) {
    if (amount <= 0) return 0;
    if (amount >= FREE_SHIPPING_THRESHOLD) return 0;
    return Math.round(amount * SHIPPING_RATE * 100) / 100;
  }

  function placeOrder(shipping) {
    const orderItems = cartItems.map((i) => ({ ...i, ...findProduct(i.id) }));
    const itemsTotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingCost = calcShipping(itemsTotal);
    const total = itemsTotal + shippingCost;
    const order = {
      id: 'STRIP-' + Math.floor(100000 + Math.random() * 899999),
      items: orderItems,
      subtotal: itemsTotal,
      shippingCost,
      total,
      shipping,
      status: 'Processing',
      date: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  }

  function searchProducts(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)
    );
  }

  const detailedItems = cartItems.map((i) => ({ ...i, ...findProduct(i.id) })).filter((i) => i.name);
  const wishlistItems = useMemo(
    () => wishlist.map((id) => findProduct(id)).filter(Boolean),
    [wishlist, products]
  );
  const subtotal = useMemo(() => detailedItems.reduce((s, i) => s + i.price * i.qty, 0), [detailedItems]);
  const shippingCost = useMemo(() => calcShipping(subtotal), [subtotal]);
  const total = subtotal + shippingCost;
  const count = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);

  const bestSellers = useMemo(() => products.filter((p) => p.bestSeller), [products]);
  const newArrivals = useMemo(() => products.filter((p) => p.isNewArrival), [products]);
  const topBuying = useMemo(
    () => [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 4),
    [products]
  );

  const value = {
    products,
    bestSellers,
    newArrivals,
    topBuying,
    addProduct,
    deleteProduct,
    cartItems: detailedItems,
    count,
    subtotal,
    shippingCost,
    total,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addItem,
    changeQty,
    removeItem,
    clearCart,
    wishlist,
    wishlistItems,
    toggleWishlist,
    searchProducts,
    toast,
    showToast,
    dismissToast,
    orders,
    placeOrder,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
