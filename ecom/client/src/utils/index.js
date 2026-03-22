// utils/index.js — pure utility functions for ShopCraft

// Classnames utility (cn)
export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

// Format price as currency
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// Filter products by criteria
export function filterProducts(products, { category, priceRange, search, inStockOnly }) {
  let result = products;
  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }
  if (inStockOnly) {
    result = result.filter(p => p.inStock);
  }
  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  // Add price range filter if needed
  return result;
}

// Sort products
export function sortProducts(products, sortKey) {
  const sorted = [...products];
  switch (sortKey) {
    case 'price_asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'name_asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }
  return sorted;
}
