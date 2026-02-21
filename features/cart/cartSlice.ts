import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState, Product } from '@/types';

const calculateTotals = (items: CartItem[]) => {
    const totalAmount = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { totalAmount, totalItems };
};

const initialState: CartState = {
    items: [],
    totalAmount: 0,
    totalItems: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
            const totals = calculateTotals(state.items);
            state.totalAmount = totals.totalAmount;
            state.totalItems = totals.totalItems;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
            const totals = calculateTotals(state.items);
            state.totalAmount = totals.totalAmount;
            state.totalItems = totals.totalItems;
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (i) => i.product.id === action.payload.productId
            );
            if (item) {
                if (action.payload.quantity <= 0) {
                    state.items = state.items.filter(
                        (i) => i.product.id !== action.payload.productId
                    );
                } else {
                    item.quantity = action.payload.quantity;
                }
            }
            const totals = calculateTotals(state.items);
            state.totalAmount = totals.totalAmount;
            state.totalItems = totals.totalItems;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalItems = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
