// ShopPage.jsx — product catalog with filters
import React from 'react';
import { ProductCard } from '../components/product/ProductCard';
// import { useProducts } from '../hooks'; // To be implemented with React Query

export default function ShopPage() {
  // const { data: products = [], isLoading } = useProducts();
  const products = [];
  // Placeholder: Replace with real data and loading state
  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Shop Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-ink-600">No products found.</div>
        ) : (
          products.map(product => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </main>
  );
}
