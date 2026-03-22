// ProductDetailPage.jsx — shows details for a single product

import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return <div className="max-w-2xl mx-auto py-12 text-center text-ink-600">Loading product...</div>;
  }
  if (isError || !product) {
    return <div className="max-w-2xl mx-auto py-12 text-center text-ink-600">Product not found.</div>;
  }
  return (
    <section className="max-w-2xl mx-auto py-12 px-4">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-6" />
      <h2 className="text-3xl font-bold text-ink-900 mb-2">{product.name}</h2>
      <p className="text-copper-500 text-xl font-semibold mb-4">${product.price}</p>
      <p className="text-ink-600 mb-6">{product.description}</p>
      {/* Add to cart/wishlist buttons here */}
    </section>
  );
}
