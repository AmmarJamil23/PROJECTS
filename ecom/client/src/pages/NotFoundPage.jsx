// NotFoundPage.jsx — 404 catch-all
import React from 'react';

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-bold text-copper-500 mb-4">404</h1>
      <p className="text-lg text-ink-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="btn-primary inline-block px-6 py-3 rounded bg-copper-400 text-white font-semibold shadow hover:bg-copper-500 transition-colors">Go Home</a>
    </main>
  );
}
