import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Helper for localStorage
function getStored(key, fallback) {
	try {
		const val = localStorage.getItem(key);
		return val ? JSON.parse(val) : fallback;
	} catch {
		return fallback;
	}
}

const UIContext = createContext(null);

const initialState = {
	wishlist: [],
	isCartOpen: false,
	toasts: [],
};

function uiReducer(state, action) {
	switch (action.type) {
		case 'ADD_WISHLIST': {
			if (state.wishlist.includes(action.id)) return state;
			return { ...state, wishlist: [...state.wishlist, action.id] };
		}
		case 'REMOVE_WISHLIST': {
			return { ...state, wishlist: state.wishlist.filter(id => id !== action.id) };
		}
		case 'TOGGLE_CART': {
			return { ...state, isCartOpen: !state.isCartOpen };
		}
		case 'OPEN_CART': {
			return { ...state, isCartOpen: true };
		}
		case 'CLOSE_CART': {
			return { ...state, isCartOpen: false };
		}
		case 'ADD_TOAST': {
			return { ...state, toasts: [...state.toasts, action.toast] };
		}
		case 'REMOVE_TOAST': {
			return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
		}
		case 'LOAD_WISHLIST': {
			return { ...state, wishlist: action.wishlist };
		}
		default:
			return state;
	}
}

export function UIProvider({ children }) {
	const [state, dispatch] = useReducer(uiReducer, initialState);

	// Load wishlist from localStorage on mount
	useEffect(() => {
		const wishlist = getStored('shopcraft_wishlist', []);
		dispatch({ type: 'LOAD_WISHLIST', wishlist });
		// eslint-disable-next-line
	}, []);

	// Persist wishlist to localStorage
	useEffect(() => {
		localStorage.setItem('shopcraft_wishlist', JSON.stringify(state.wishlist));
	}, [state.wishlist]);

	// Wishlist actions
	const addWishlist = useCallback(id => dispatch({ type: 'ADD_WISHLIST', id }), []);
	const removeWishlist = useCallback(id => dispatch({ type: 'REMOVE_WISHLIST', id }), []);

	// Cart drawer actions
	const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
	const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
	const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

	// Toast actions
	const addToast = useCallback(toast => dispatch({ type: 'ADD_TOAST', toast }), []);
	const removeToast = useCallback(id => dispatch({ type: 'REMOVE_TOAST', id }), []);

	const value = {
		wishlist: state.wishlist,
		isCartOpen: state.isCartOpen,
		toasts: state.toasts,
		addWishlist,
		removeWishlist,
		toggleCart,
		openCart,
		closeCart,
		addToast,
		removeToast,
	};

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
	const ctx = useContext(UIContext);
	if (!ctx) throw new Error('useUI must be used within <UIProvider>');
	return ctx;
}
