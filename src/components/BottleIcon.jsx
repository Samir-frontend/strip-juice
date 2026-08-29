import React from 'react';
import { Leaf, Citrus, Sparkles, Cherry, Droplet } from 'lucide-react';

const ICONS = { leaf: Leaf, citrus: Citrus, sparkles: Sparkles, cherry: Cherry, droplet: Droplet };

export default function BottleIcon({ color = '#f2a340', icon = 'leaf', size = 96 }) {
  const IconComp = ICONS[icon] || Leaf;
  const gradId = 'bottleGrad-' + color.replace('#', '');

  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 100 135" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="40" y="4" width="20" height="14" rx="3" fill="#1a1a1e" stroke="rgba(255,255,255,0.15)" />
      <path d="M42 18 L42 32 Q42 38 36 42 L64 42 Q58 38 58 32 L58 18 Z" fill="#26262b" />
      <path
        d="M34 42 Q20 46 18 68 L18 118 Q18 128 28 128 L72 128 Q82 128 82 118 L82 68 Q80 46 66 42 Z"
        fill="#101012"
        stroke="rgba(255,255,255,0.08)"
      />
      <path
        d="M21 70 Q20 68 22 66 L78 66 Q80 68 79 70 L79 116 Q79 125 71 125 L29 125 Q21 125 21 116 Z"
        fill={'url(#' + gradId + ')'}
      />
      <path d="M27 70 L27 118" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
      <rect x="18" y="82" width="64" height="30" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
      <foreignObject x="34" y="88" width="32" height="18">
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconComp size={16} color={color} />
        </div>
      </foreignObject>
    </svg>
  );
}
