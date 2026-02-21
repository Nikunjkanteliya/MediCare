import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutStep, Order, UIState } from '@/types';

const initialState: UIState = {
    isLoading: false,
    checkoutStep: 'cart',
    currentOrder: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setCheckoutStep: (state, action: PayloadAction<CheckoutStep>) => {
            state.checkoutStep = action.payload;
        },
        setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
            state.currentOrder = action.payload;
        },
        resetCheckout: (state) => {
            state.checkoutStep = 'cart';
            state.currentOrder = null;
        },
    },
});

export const { setLoading, setCheckoutStep, setCurrentOrder, resetCheckout } =
    uiSlice.actions;
export default uiSlice.reducer;
