import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ScrollToHash from './components/ScrollToHash.jsx';
import Home from './pages/Home.jsx';
import DrinksPage from './pages/DrinksPage.jsx';
import BestSellersPage from './pages/BestSellersPage.jsx';
import StoriesPage from './pages/StoriesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <ThemeProvider>
          <BrowserRouter>
            <ScrollToHash />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drinks" element={<DrinksPage />} />
              <Route path="/bestsellers" element={<BestSellersPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ShopProvider>
    </AuthProvider>
  );
}
