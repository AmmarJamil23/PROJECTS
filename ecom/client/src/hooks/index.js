// Custom hooks for ShopCraft
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// useFilters: manages filtering, sorting, and search state for products
export function useFilters(products = []) {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const sortKey = searchParams.get('sort') || 'default';
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtering and sorting logic (implement filterProducts/sortProducts as needed)
  const filteredProducts = useMemo(() => {
    let result = products;
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    // Add price range filter and sorting as needed
    return result;
  }, [products, category, priceRange, search, inStockOnly, sortKey]);

  return {
    category,
    sortKey,
    search,
    priceRange,
    inStockOnly,
    setCategory: cat => setSearchParams({ ...Object.fromEntries([...searchParams]), category: cat }),
    setSortKey: key => setSearchParams({ ...Object.fromEntries([...searchParams]), sort: key }),
    setSearch,
    setPriceRange,
    setInStockOnly,
    filteredProducts,
  };
}

// useDebounce: delays updating value until after delay ms
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// useClickOutside: calls handler if click is outside ref
export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

// useScrollLock: disables body scroll when locked
export function useScrollLock(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [locked]);
}
