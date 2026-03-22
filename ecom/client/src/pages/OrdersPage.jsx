// OrdersPage.jsx — shows order history
import React from 'react';

export default function OrdersPage() {
  // Placeholder: integrate with React Query/orders
  const orders = [];
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-ink-600">No orders found.</div>
      ) : (
        <ul className="space-y-4">
          {/* Render order summary for each order */}
        </ul>
      )}
    </main>
  );
}
