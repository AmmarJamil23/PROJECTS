// ProductCard.jsx — displays a single product
import React from 'react';
import { formatPrice } from '../../utils';

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover rounded mb-3 border border-cream-200"
      />
      <div className="w-full flex flex-col items-center">
        <h3 className="text-lg font-semibold text-ink-900 mb-1">{product.name}</h3>
        <p className="text-copper-500 font-bold mb-2">{formatPrice(product.price)}</p>
        {/* Add to cart/wishlist buttons here */}
      </div>
    </div>
  );
}
