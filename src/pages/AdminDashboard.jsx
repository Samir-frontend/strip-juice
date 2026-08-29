import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useShop } from '../context/ShopContext.jsx';
import BottleIcon from '../components/BottleIcon.jsx';
import { FLAVOR } from '../theme.js';

const TABS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'orders', label: 'Orders', icon: ShoppingCart },
  { key: 'customers', label: 'Customers', icon: Users },
];

const MOCK_CUSTOMERS = [
  { name: 'Aisha K.', email: 'aisha@example.com', orders: 4 },
  { name: 'Marcus T.', email: 'marcus@example.com', orders: 2 },
  { name: 'Priya N.', email: 'priya@example.com', orders: 7 },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const { admin, logoutAdmin } = useAuth();
  const { products, addProduct, deleteProduct, orders } = useShop();
  const [newProduct, setNewProduct] = useState({ name: '', price: '', tagline: '', flavor: '#f2a340', icon: 'leaf', stock: '' });

  function handleAddProduct(e) {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    addProduct({
      id: newProduct.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name: newProduct.name,
      tagline: newProduct.tagline || 'A new Strip flavor.',
      price: parseFloat(newProduct.price) || 0,
      flavor: newProduct.flavor,
      icon: newProduct.icon,
      rating: 4.5,
      stock: parseInt(newProduct.stock, 10) || 0,
    });
    setNewProduct({ name: '', price: '', tagline: '', flavor: '#f2a340', icon: 'leaf', stock: '' });
  }

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 flex-shrink-0 border-r border-white/10 flex flex-col p-5 hidden md:flex">
        <div className="flex items-center gap-2 mb-10 px-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={FLAVOR}>
            <path d="M19 10h-6V3L5 14h6v7z" />
          </svg>
          <span className="font-bold">Strip Admin</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ' +
                (tab === t.key ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5')
              }
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 pt-4 px-2">
          <div className="text-xs text-gray-500 mb-3">{admin?.email}</div>
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="flex items-center justify-between mb-8 md:hidden">
          <span className="font-bold">Strip Admin</span>
          <button onClick={logoutAdmin} className="text-sm text-gray-400 flex items-center gap-1">
            <LogOut size={14} /> Log out
          </button>
        </div>

        {tab === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <div className="text-xs text-gray-500 mb-2">Total revenue</div>
                <div className="text-2xl font-bold font-mono" style={{ color: FLAVOR }}>
                  ${totalRevenue.toFixed(2)}
                </div>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <div className="text-xs text-gray-500 mb-2">Orders placed</div>
                <div className="text-2xl font-bold font-mono">{orders.length}</div>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <div className="text-xs text-gray-500 mb-2">Active products</div>
                <div className="text-2xl font-bold font-mono">{products.length}</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              This is a demo dashboard — data resets on page refresh since there's no backend connected yet.
            </p>
          </div>
        )}

        {tab === 'products' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <form onSubmit={handleAddProduct} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              <div className="lg:col-span-1">
                <label className="text-xs text-gray-500 block mb-1.5">Name</label>
                <input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Mango Rush"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="lg:col-span-1">
                <label className="text-xs text-gray-500 block mb-1.5">Tagline</label>
                <input
                  value={newProduct.tagline}
                  onChange={(e) => setNewProduct((p) => ({ ...p, tagline: e.target.value }))}
                  placeholder="Tropical & bold"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Price ($)</label>
                <input
                  value={newProduct.price}
                  onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
                  type="number"
                  step="0.01"
                  placeholder="3.49"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Stock</label>
                <input
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct((p) => ({ ...p, stock: e.target.value }))}
                  type="number"
                  placeholder="150"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-black text-sm"
                style={{ backgroundColor: FLAVOR }}
              >
                <Plus size={15} /> Add product
              </button>
            </form>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 last:border-0">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                          <BottleIcon color={p.flavor} icon={p.icon} size={26} />
                        </div>
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.tagline}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono">${p.price.toFixed(2)}</td>
                      <td className="p-4">{p.stock ?? '—'}</td>
                      <td className="p-4">{p.rating ? p.rating.toFixed(1) : '—'}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders placed yet — orders from the storefront checkout will appear here.</p>
            ) : (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-white/5 last:border-0">
                        <td className="p-4 font-mono text-xs">{o.id}</td>
                        <td className="p-4">{o.shipping?.name || '—'}</td>
                        <td className="p-4">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                        <td className="p-4 font-mono" style={{ color: FLAVOR }}>${o.total.toFixed(2)}</td>
                        <td className="p-4 text-xs text-gray-400">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'customers' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Customers</h1>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CUSTOMERS.map((c) => (
                    <tr key={c.email} className="border-b border-white/5 last:border-0">
                      <td className="p-4">{c.name}</td>
                      <td className="p-4 text-gray-400">{c.email}</td>
                      <td className="p-4">{c.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-4">Sample data — connect a database to track real customers.</p>
          </div>
        )}
      </main>
    </div>
  );
}
