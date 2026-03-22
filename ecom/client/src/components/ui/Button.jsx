// Button.jsx — UI primitive for ShopCraft
import React from 'react';
export function Button({ className = '', children, ...props }) {
  return (
    <button
      className={`btn-primary inline-flex items-center justify-center px-4 py-2 rounded bg-copper-400 text-white font-semibold shadow hover:bg-copper-500 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
