// Navbar.jsx — main navigation bar for ShopCraft
import React from 'react';

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-cream-50 shadow-sm sticky top-0 z-40">
      <div className="text-2xl font-bold text-copper-500 tracking-tight">ShopCraft</div>
      <div className="flex gap-6 items-center">
        {/* Add navigation links here */}
        <a href="/shop" className="text-ink-900 hover:text-copper-500 font-medium">Shop</a>
        <a href="/wishlist" className="text-ink-900 hover:text-copper-500 font-medium">Wishlist</a>
        <a href="/cart" className="text-ink-900 hover:text-copper-500 font-medium">Cart</a>
      </div>
    </nav>
  );
}
