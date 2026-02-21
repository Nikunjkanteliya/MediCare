'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    addAddress,
    editAddress,
    deleteAddress,
    selectAddress,
    setDefaultAddress,
} from '@/features/address/addressSlice';
import { Address } from '@/types';

export function useAddress() {
    const dispatch = useAppDispatch();
    const { addresses, selectedAddressId } = useAppSelector(
        (state) => state.address
    );

    const selectedAddress = addresses.find(
        (addr) => addr.id === selectedAddressId
    );

    const handleAddAddress = (address: Omit<Address, 'id'>) => {
        dispatch(addAddress(address));
    };

    const handleEditAddress = (address: Address) => {
        dispatch(editAddress(address));
    };

    const handleDeleteAddress = (id: string) => {
        dispatch(deleteAddress(id));
    };

    const handleSelectAddress = (id: string) => {
        dispatch(selectAddress(id));
    };

    const handleSetDefault = (id: string) => {
        dispatch(setDefaultAddress(id));
    };

    return {
        addresses,
        selectedAddressId,
        selectedAddress,
        addAddress: handleAddAddress,
        editAddress: handleEditAddress,
        deleteAddress: handleDeleteAddress,
        selectAddress: handleSelectAddress,
        setDefaultAddress: handleSetDefault,
    };
}
