// productService.js — mock async API for ShopCraft

// Example in-memory product catalog (replace with real data as needed)
const PRODUCTS = [
  { id: 1, name: 'Ceramic Vase', category: 'ceramics', price: 40, inStock: true },
  { id: 2, name: 'Wooden Bowl', category: 'wood', price: 25, inStock: true },
  // ...add more products as needed
];

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export const productService = {
  async getAll() {
    await delay(300); // simulate network latency
    return PRODUCTS;
  },
  async getById(id) {
    await delay(200);
    return PRODUCTS.find(p => p.id === Number(id));
  },
  async getRelated(id) {
    await delay(150);
    const product = PRODUCTS.find(p => p.id === Number(id));
    if (!product) return [];
    return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  },
};
