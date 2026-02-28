import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrdersDetailed } from '@/services/orderService';
import {
    CreateOrderRequest,
    CreateOrderResponse,
    OrderDetailRow,
} from '@/types';

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const placeOrder = createAsyncThunk<
    CreateOrderResponse,
    CreateOrderRequest,
    { rejectValue: string }
>('orders/placeOrder', async (payload, { rejectWithValue }) => {
    try {
        return await createOrder(payload);
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to place order'
        );
    }
});

export const fetchOrders = createAsyncThunk<
    OrderDetailRow[],
    void,
    { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
    try {
        return await getOrdersDetailed();
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to fetch orders'
        );
    }
});

// ── Slice ─────────────────────────────────────────────────────────────────────

interface OrdersState {
    // Place order
    isPlacing: boolean;
    placedOrderId: number | null;
    placedUserId: number | null;
    placeError: string | null;

    // Fetch orders
    isFetching: boolean;
    orders: OrderDetailRow[];
    fetchError: string | null;
}

const initialState: OrdersState = {
    isPlacing: false,
    placedOrderId: null,
    placedUserId: null,
    placeError: null,

    isFetching: false,
    orders: [],
    fetchError: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.isPlacing = false;
            state.placedOrderId = null;
            state.placedUserId = null;
            state.placeError = null;
        },
    },
    extraReducers: (builder) => {
        // placeOrder
        builder
            .addCase(placeOrder.pending, (state) => {
                state.isPlacing = true;
                state.placeError = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.isPlacing = false;
                state.placedOrderId = action.payload.order_id;
                state.placedUserId = action.payload.user_id;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.isPlacing = false;
                state.placeError = action.payload ?? 'Unknown error';
            });

        // fetchOrders
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isFetching = true;
                state.fetchError = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isFetching = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isFetching = false;
                state.fetchError = action.payload ?? 'Unknown error';
            });
    },
});

export const { clearOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
