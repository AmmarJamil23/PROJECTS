// HomePage.jsx — ShopCraft landing page
import React from 'react';

export default function HomePage() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-4 text-center">
      <h1 className="text-4xl font-bold text-copper-500 mb-4">Welcome to ShopCraft</h1>
      <p className="text-lg text-ink-600 mb-8">Discover unique handmade goods from artisans around the world.</p>
      <a href="/shop" className="btn-primary inline-block px-6 py-3 rounded bg-copper-400 text-white font-semibold shadow hover:bg-copper-500 transition-colors">Shop Now</a>
    </section>
  );
}
