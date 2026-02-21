import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, AddressState } from '@/types';

const generateId = () => Math.random().toString(36).substring(2, 11);

const initialState: AddressState = {
    addresses: [],
    selectedAddressId: null,
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress: (state, action: PayloadAction<Omit<Address, 'id'>>) => {
            const newAddress: Address = {
                ...action.payload,
                id: generateId(),
            };
            if (state.addresses.length === 0) {
                newAddress.isDefault = true;
            }
            state.addresses.push(newAddress);
            if (!state.selectedAddressId) {
                state.selectedAddressId = newAddress.id;
            }
        },
        editAddress: (state, action: PayloadAction<Address>) => {
            const index = state.addresses.findIndex(
                (addr) => addr.id === action.payload.id
            );
            if (index !== -1) {
                state.addresses[index] = action.payload;
            }
        },
        deleteAddress: (state, action: PayloadAction<string>) => {
            state.addresses = state.addresses.filter(
                (addr) => addr.id !== action.payload
            );
            if (state.selectedAddressId === action.payload) {
                state.selectedAddressId =
                    state.addresses.length > 0 ? state.addresses[0].id : null;
            }
        },
        selectAddress: (state, action: PayloadAction<string>) => {
            state.selectedAddressId = action.payload;
        },
        setDefaultAddress: (state, action: PayloadAction<string>) => {
            state.addresses.forEach((addr) => {
                addr.isDefault = addr.id === action.payload;
            });
        },
    },
});

export const {
    addAddress,
    editAddress,
    deleteAddress,
    selectAddress,
    setDefaultAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
