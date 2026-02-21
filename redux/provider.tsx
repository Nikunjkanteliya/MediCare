'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Spinner } from '@/components/ui/Spinner';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<Spinner fullPage />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
