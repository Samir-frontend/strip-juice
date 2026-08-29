import React, { useState } from 'react';
import BottleIcon from './BottleIcon.jsx';

export default function ProductImage({ image, color, icon, size = 92, fill = false, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div className={fill ? 'w-full h-full flex items-center justify-center' : ''}>
        <BottleIcon color={color} icon={icon} size={fill ? size : size} />
      </div>
    );
  }

  if (fill) {
    return (
      <img
        src={'/images/' + image}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={'w-full h-full object-cover ' + className}
      />
    );
  }

  return (
    <img
      src={'/images/' + image}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={'object-contain ' + className}
      style={{ width: size, height: size * 1.35 }}
    />
  );
}
