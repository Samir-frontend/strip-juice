import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { FLAVOR } from '../theme.js';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin, ADMIN_EMAIL, ADMIN_PASSWORD } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const ok = loginAdmin(email, password);
    if (ok) {
      navigate('/admin');
    } else {
      setError('Invalid email or password.');
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="flex items-center gap-2 justify-center mb-8">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={FLAVOR}>
            <path d="M19 10h-6V3L5 14h6v7z" />
          </svg>
          <span className="font-bold text-lg">Strip Admin</span>
        </div>
        <div className="bg-[#0d0d0f] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
            <Lock size={18} color={FLAVOR} />
          </div>
          <h1 className="text-xl font-bold mb-1">Admin sign in</h1>
          <p className="text-sm text-gray-400 mb-6">Manage products, orders, and customers.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Email</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="admin@strip.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-gray-500 block mb-2">Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none"
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black"
              style={{ backgroundColor: FLAVOR }}
            >
              Sign in <ArrowRight size={16} />
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-6 text-center font-mono">
            Demo credentials: {ADMIN_EMAIL} / {ADMIN_PASSWORD}
          </p>
        </div>
        <a href="/" className="block text-center text-sm text-gray-500 hover:text-white mt-6 transition-colors">
          ← Back to store
        </a>
      </div>
    </div>
  );
}
