import React, { createContext, useReducer, useEffect, useContext, useCallback } from 'react';

// Helper to calculate totals (implement as needed)
function calcCartTotals(items) {
	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	return { subtotal, total: subtotal }; // Extend for tax/shipping if needed
}

const CartContext = createContext(null);

const initialState = { items: [] };

function cartReducer(state, action) {
	switch (action.type) {
		case 'ADD_ITEM': {
			const exists = state.items.find(i => i.id === action.item.id);
			let items;
			if (exists) {
				items = state.items.map(i =>
					i.id === action.item.id ? { ...i, quantity: i.quantity + (action.item.quantity || 1) } : i
				);
			} else {
				items = [...state.items, { ...action.item, quantity: action.item.quantity || 1 }];
			}
			return { ...state, items };
		}
		case 'REMOVE_ITEM': {
			return { ...state, items: state.items.filter(i => i.id !== action.id) };
		}
		case 'UPDATE_QTY': {
			return {
				...state,
				items: state.items.map(i =>
					i.id === action.id ? { ...i, quantity: action.quantity } : i
				),
			};
		}
		case 'CLEAR_CART': {
			return { ...state, items: [] };
		}
		case 'LOAD_CART': {
			return { ...state, items: action.items };
		}
		default:
			return state;
	}
}

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// Load from localStorage on mount
	useEffect(() => {
		const stored = localStorage.getItem('shopcraft_cart');
		if (stored) {
			try {
				const items = JSON.parse(stored);
				dispatch({ type: 'LOAD_CART', items });
			} catch {}
		}
		// eslint-disable-next-line
	}, []);

	// Persist to localStorage on every state change
	useEffect(() => {
		localStorage.setItem('shopcraft_cart', JSON.stringify(state.items));
	}, [state.items]);

	// Derived state
	const totals = calcCartTotals(state.items);
	const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

	// Action dispatchers
	const addItem = useCallback(item => dispatch({ type: 'ADD_ITEM', item }), []);
	const removeItem = useCallback(id => dispatch({ type: 'REMOVE_ITEM', id }), []);
	const updateQty = useCallback((id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity }), []);
	const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

	const value = {
		items: state.items,
		totals,
		itemCount,
		addItem,
		removeItem,
		updateQty,
		clearCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within <CartProvider>');
	return ctx;
}
