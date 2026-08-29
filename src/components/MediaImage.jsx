import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function MediaImage({ image, color = '#f2a340', className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color + '30', border: '1px solid ' + color + '45' }}
      >
        <Sparkles size={20} color={color} />
      </div>
    );
  }

  return (
    <img
      src={'/images/' + image}
      alt=""
      onError={() => setFailed(true)}
      className={'w-full h-full object-cover ' + className}
    />
  );
}
