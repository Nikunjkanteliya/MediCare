import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import addressReducer from '@/features/address/addressSlice';
import uiReducer from '@/features/ui/uiSlice';
import ordersReducer from '@/features/orders/ordersSlice';

const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items', 'totalAmount', 'totalItems'],
};

const addressPersistConfig = {
    key: 'address',
    storage,
};

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartReducer),
    address: persistReducer(addressPersistConfig, addressReducer),
    ui: uiReducer,
    orders: ordersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
