// constants/index.js — enums, labels, storage keys for ShopCraft

export const STORAGE_KEYS = {
  CART: 'shopcraft_cart',
  WISHLIST: 'shopcraft_wishlist',
};

export const CATEGORIES = [
  'all',
  'ceramics',
  'wood',
  'textiles',
  'glass',
  // ...add more as needed
];

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A-Z' },
  { value: 'name_desc', label: 'Name: Z-A' },
];
