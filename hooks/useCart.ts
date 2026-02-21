'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} from '@/features/cart/cartSlice';
import { Product } from '@/types';
import toast from 'react-hot-toast';

export function useCart() {
    const dispatch = useAppDispatch();
    const { items, totalAmount, totalItems } = useAppSelector(
        (state) => state.cart
    );

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`, {
            icon: '🛒',
        });
    };

    const handleRemoveFromCart = (productId: string, productName: string) => {
        dispatch(removeFromCart(productId));
        toast.success(`${productName} removed from cart`, { icon: '🗑️' });
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const isInCart = (productId: string): boolean => {
        return items.some((item) => item.product.id === productId);
    };

    const getQuantityInCart = (productId: string): number => {
        const item = items.find((item) => item.product.id === productId);
        return item ? item.quantity : 0;
    };

    return {
        items,
        totalAmount,
        totalItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        clearCart: handleClearCart,
        isInCart,
        getQuantityInCart,
    };
}
