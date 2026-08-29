import React, { createContext, useContext, useState } from 'react';
import { FLAVOR } from '../theme.js';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [accent, setAccent] = useState(FLAVOR);

  return (
    <ThemeContext.Provider value={{ accent, setAccent, resetAccent: () => setAccent(FLAVOR) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
