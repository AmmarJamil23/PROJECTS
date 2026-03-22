// WishlistPage.jsx — shows wishlist items
import React from 'react';

export default function WishlistPage() {
  // Placeholder: integrate with useUI/wishlist state
  const wishlist = [];
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-ink-600">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Render ProductCard for each wishlist item */}
        </div>
      )}
    </main>
  );
}
