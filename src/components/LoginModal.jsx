import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { FLAVOR } from '../theme.js';


export default function LoginModal({ open, onClose }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginCustomer } = useAuth();
  const { showToast } = useShop();

  function handleSubmit(e) {
    e.preventDefault();
    loginCustomer(name, email);
    showToast(mode === 'signup' ? 'Welcome to Strip, ' + (name || email) : 'Welcome back');
    onClose();
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <AnimatePresence>
      {open && (
        <React.Fragment key="login-frag">
          <motion.div
            key="login-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            key="login-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full bg-[#0d0d0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h3>
                <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 border border-white/10" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                {mode === 'signup' ? 'Save your address and reorder your favorites in one click.' : 'Log in to track orders and reorder your favorites.'}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Email Address</label>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Password</label>
                  <input
                    required
                    minLength={4}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black"
                  style={{ backgroundColor: FLAVOR }}
                >
                  {mode === 'signup' ? 'Create account' : 'Log in'} <ArrowRight size={16} />
                </button>
              </form>
              <p className="text-center text-sm text-gray-400 mt-5">
                {mode === 'signup' ? 'Already growing with us?' : 'New to Strip?'}{' '}
                <button
                  onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                  className="font-bold"
                  style={{ color: FLAVOR }}
                >
                  {mode === 'signup' ? 'Log in' : 'Create an account'}
                </button>
              </p>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
