import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { PRODUCT_COLORS } from '../theme.js';

export default function AmbientBackground() {
  const { accent } = useTheme();

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          background: 'radial-gradient(circle 750px at 50% 0%, ' + accent + '22, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle 600px at 90% 25%, ' +
            PRODUCT_COLORS['berry-boost'] +
            '10, transparent 70%), radial-gradient(circle 600px at 5% 65%, ' +
            PRODUCT_COLORS['cherry-focus'] +
            '0d, transparent 70%)',
        }}
      />
    </div>
  );
}
