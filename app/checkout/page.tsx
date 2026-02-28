'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Divider,
    TextField,
    MenuItem,
    Chip,
    Alert,
} from '@mui/material';
import {
    LocationOn,
    Add,
    Edit,
    Delete,
    Home,
    Work,
    Phone,
    Lock,
} from '@mui/icons-material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/hooks/useCart';
import { useAddress } from '@/hooks/useAddress';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCheckoutStep, setCurrentOrder } from '@/features/ui/uiSlice';
import { clearCart } from '@/features/cart/cartSlice';
import { placeOrder } from '@/features/orders/ordersSlice';
import { AppButton } from '@/components/ui/AppButton';
import { Spinner } from '@/components/ui/Spinner';
import { formatPrice, calculateDelivery, generateOrderId } from '@/utils/formatters';
import { addressSchema, AddressFormValues, indianStates } from '@/utils/validators';
import { Address } from '@/types';
import toast from 'react-hot-toast';

const steps = ['Cart', 'Address', 'Payment'];

// ── Address Form ──────────────────────────────────────────────────────────────
function AddressForm({
    onSubmit,
    defaultValues,
    onCancel,
}: {
    onSubmit: SubmitHandler<AddressFormValues>;
    defaultValues?: Partial<AddressFormValues>;
    onCancel?: () => void;
}) {
    const { control, handleSubmit, formState: { errors } } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defaultValues: { type: 'Home', ...defaultValues },
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller name="fullName" control={control} render={({ field }) => (
                        <TextField {...field} label="Full Name *" fullWidth error={!!errors.fullName} helperText={errors.fullName?.message} placeholder="Enter full name" />
                    )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller name="phone" control={control} render={({ field }) => (
                        <TextField
                            {...field} label="Phone Number *" fullWidth error={!!errors.phone} helperText={errors.phone?.message}
                            placeholder="10-digit mobile number" inputProps={{ maxLength: 10 }}
                            InputProps={{ startAdornment: <Typography variant="body2" sx={{ color: '#64748b', mr: 0.5 }}>+91</Typography> }}
                        />
                    )} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Controller name="addressLine" control={control} render={({ field }) => (
                        <TextField {...field} label="Address Line *" fullWidth multiline rows={2} error={!!errors.addressLine} helperText={errors.addressLine?.message} placeholder="Flat / House No., Building, Street, Area" />
                    )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller name="city" control={control} render={({ field }) => (
                        <TextField {...field} label="City *" fullWidth error={!!errors.city} helperText={errors.city?.message} placeholder="Your city" />
                    )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller name="state" control={control} render={({ field }) => (
                        <TextField {...field} select label="State *" fullWidth error={!!errors.state} helperText={errors.state?.message}>
                            <MenuItem value=""><em>Select State</em></MenuItem>
                            {indianStates.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                    )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller name="pincode" control={control} render={({ field }) => (
                        <TextField {...field} label="PIN Code *" fullWidth error={!!errors.pincode} helperText={errors.pincode?.message} placeholder="6-digit PIN code" inputProps={{ maxLength: 6 }} />
                    )} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" fontWeight={600} color="#0f172a" mb={1}>Address Type</Typography>
                    <Controller name="type" control={control} render={({ field }) => (
                        <RadioGroup {...field} row>
                            {(['Home', 'Work', 'Other'] as const).map((type) => (
                                <FormControlLabel key={type} value={type} control={<Radio sx={{ '&.Mui-checked': { color: '#0ea5e9' } }} />} label={type} sx={{ mr: 3 }} />
                            ))}
                        </RadioGroup>
                    )} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box display="flex" gap={2}>
                        <AppButton type="submit" variant="primary" sx={{ flex: 1, py: 1.5 }}>Save Address</AppButton>
                        {onCancel && <AppButton type="button" variant="ghost" onClick={onCancel} sx={{ px: 3 }}>Cancel</AppButton>}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

// ── Address Step ──────────────────────────────────────────────────────────────
function AddressStep({ onNext }: { onNext: () => void }) {
    const { addresses, selectedAddressId, addAddress, editAddress, deleteAddress, selectAddress } = useAddress();
    const [showForm, setShowForm] = useState(addresses.length === 0);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const handleAddAddress: SubmitHandler<AddressFormValues> = (data) => {
        addAddress(data);
        setShowForm(false);
        toast.success('Address saved!');
    };

    const handleEditAddress: SubmitHandler<AddressFormValues> = (data) => {
        if (editingAddress) {
            editAddress({ ...editingAddress, ...data });
            setEditingAddress(null);
            toast.success('Address updated!');
        }
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight={800} color="#0f172a" mb={3}>Delivery Address</Typography>

            {addresses.length > 0 && !showForm && !editingAddress && (
                <Box mb={3}>
                    {addresses.map((addr) => (
                        <Paper
                            key={addr.id}
                            onClick={() => selectAddress(addr.id)}
                            sx={{
                                p: 2.5, mb: 2, borderRadius: 3, cursor: 'pointer', transition: 'all 0.2s',
                                border: selectedAddressId === addr.id ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                                background: selectedAddressId === addr.id ? '#f0f9ff' : 'white',
                                '&:hover': { borderColor: '#0ea5e9', background: '#f0f9ff' },
                            }}
                        >
                            <Box display="flex" alignItems="flex-start" gap={2}>
                                <Radio checked={selectedAddressId === addr.id} onChange={() => selectAddress(addr.id)} sx={{ '&.Mui-checked': { color: '#0ea5e9' }, mt: -0.5 }} aria-label={`Select address for ${addr.fullName}`} />
                                <Box flex={1}>
                                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                        <Typography variant="subtitle1" fontWeight={700} color="#0f172a">{addr.fullName}</Typography>
                                        <Chip
                                            label={addr.type || 'Home'} size="small"
                                            icon={addr.type === 'Work' ? <Work sx={{ fontSize: '14px !important' }} /> : <Home sx={{ fontSize: '14px !important' }} />}
                                            sx={{ background: '#f1f5f9', color: '#475569', height: 22, fontSize: '0.7rem' }}
                                        />
                                        {addr.isDefault && <Chip label="Default" size="small" sx={{ background: '#dcfce7', color: '#16a34a', height: 22, fontSize: '0.7rem', fontWeight: 700 }} />}
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                                        <Phone sx={{ fontSize: 14, color: '#94a3b8' }} />
                                        <Typography variant="body2" color="text.secondary">+91 {addr.phone}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="flex-start" gap={0.5}>
                                        <LocationOn sx={{ fontSize: 14, color: '#94a3b8', mt: 0.2 }} />
                                        <Typography variant="body2" color="text.secondary">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" gap={0.5}>
                                    <AppButton variant="ghost" onClick={(e: React.MouseEvent) => { e.stopPropagation(); setEditingAddress(addr); }} sx={{ p: 0.8, minWidth: 'auto', color: '#64748b' }} aria-label="Edit address"><Edit sx={{ fontSize: 16 }} /></AppButton>
                                    <AppButton variant="ghost" onClick={(e: React.MouseEvent) => { e.stopPropagation(); deleteAddress(addr.id); }} sx={{ p: 0.8, minWidth: 'auto', color: '#94a3b8', '&:hover': { color: '#ef4444' } }} aria-label="Delete address"><Delete sx={{ fontSize: 16 }} /></AppButton>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}

            {editingAddress && (
                <Paper sx={{ p: 3, borderRadius: 3, mb: 3, border: '2px solid #0ea5e9' }}>
                    <Typography variant="h6" fontWeight={700} mb={2.5}>Edit Address</Typography>
                    <AddressForm onSubmit={handleEditAddress} defaultValues={editingAddress} onCancel={() => setEditingAddress(null)} />
                </Paper>
            )}

            {showForm && !editingAddress && (
                <Paper sx={{ p: 3, borderRadius: 3, mb: 3, border: '2px solid #0ea5e9' }}>
                    <Typography variant="h6" fontWeight={700} mb={2.5}>Add New Address</Typography>
                    <AddressForm onSubmit={handleAddAddress} onCancel={addresses.length > 0 ? () => setShowForm(false) : undefined} />
                </Paper>
            )}

            {!showForm && !editingAddress && (
                <>
                    <AppButton variant="outline" onClick={() => setShowForm(true)} sx={{ mb: 4 }}>
                        <Add sx={{ mr: 0.5 }} />Add New Address
                    </AppButton>
                    <AppButton variant="primary" fullWidth onClick={() => {
                        if (!selectedAddressId) { toast.error('Please select a delivery address'); return; }
                        onNext();
                    }} sx={{ py: 1.8, fontSize: '1rem' }}>
                        Deliver to this Address
                    </AppButton>
                </>
            )}
        </Box>
    );
}

// ── Payment Step ──────────────────────────────────────────────────────────────
function PaymentStep({ onPlaceOrder }: { onPlaceOrder: (method: 'UPI' | 'Card' | 'COD') => void }) {
    const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
    const [upiId, setUpiId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { totalAmount } = useCart();
    const deliveryCharge = calculateDelivery(totalAmount);

    if (isProcessing) {
        return (
            <Box textAlign="center" py={8}>
                <Spinner />
                <Typography variant="h6" fontWeight={700} mt={3} color="#0f172a">Processing your order...</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>Please do not close this window</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" fontWeight={800} color="#0f172a" mb={3}>Payment Method</Typography>

            <Grid container spacing={2} mb={3}>
                {[
                    { value: 'UPI', label: 'UPI Payment', icon: '📱', desc: 'Pay using any UPI app' },
                    { value: 'Card', label: 'Debit/Credit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                    { value: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when delivered' },
                ].map(({ value, label, icon, desc }) => (
                    <Grid key={value} size={{ xs: 12, sm: 4 }}>
                        <Paper
                            onClick={() => setSelectedMethod(value as 'UPI' | 'Card' | 'COD')}
                            sx={{
                                p: 2, borderRadius: 3, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                                border: selectedMethod === value ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                                background: selectedMethod === value ? '#f0f9ff' : 'white',
                                '&:hover': { borderColor: '#0ea5e9', background: '#f0f9ff' },
                            }}
                        >
                            <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>{icon}</Typography>
                            <Typography variant="subtitle2" fontWeight={700} color="#0f172a">{label}</Typography>
                            <Typography variant="caption" color="text.secondary">{desc}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {selectedMethod === 'UPI' && (
                <Paper sx={{ p: 3, borderRadius: 3, mb: 3, background: '#f9fafb', border: '1px solid #e2e8f0' }}>
                    <Typography variant="subtitle1" fontWeight={700} mb={2}>Enter UPI ID</Typography>
                    <TextField fullWidth label="UPI ID" placeholder="yourname@upi or phone@bank" value={upiId} onChange={(e) => setUpiId(e.target.value)} helperText="Example: 9876543210@paytm" />
                    <Box display="flex" gap={1} mt={2} flexWrap="wrap">
                        {['@paytm', '@phonepe', '@okaxis', '@ybl'].map((upi) => (
                            <Chip key={upi} label={upi} size="small" onClick={() => setUpiId((prev) => prev.split('@')[0] + upi)} sx={{ cursor: 'pointer', '&:hover': { background: '#dbeafe', color: '#1d4ed8' } }} />
                        ))}
                    </Box>
                </Paper>
            )}

            {selectedMethod === 'COD' && (
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                    Cash on delivery is available for orders below ₹5,000. Additional ₹25 COD fee may apply.
                </Alert>
            )}

            <Box display="flex" alignItems="center" gap={1} sx={{ background: '#f8fafc', borderRadius: 2, p: 2, mb: 3, border: '1px solid #e2e8f0' }}>
                <Lock sx={{ fontSize: 18, color: '#10b981' }} />
                <Typography variant="caption" color="text.secondary">Your payment information is encrypted and secure.</Typography>
            </Box>

            <AppButton variant="primary" fullWidth sx={{ py: 1.8, fontSize: '1.05rem' }} onClick={async () => {
                if (selectedMethod === 'UPI' && !upiId.trim()) { toast.error('Please enter your UPI ID'); return; }
                setIsProcessing(true);
                await onPlaceOrder(selectedMethod);
                setIsProcessing(false);
            }}>
                Pay {formatPrice(totalAmount + deliveryCharge)} Securely
            </AppButton>
        </Box>
    );
}

// ── Main Checkout Page ────────────────────────────────────────────────────────
export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { items, totalAmount } = useCart();
    const { selectedAddress } = useAddress();
    const { checkoutStep } = useAppSelector((state) => state.ui);

    const stepIndex = ['cart', 'address', 'payment'].indexOf(checkoutStep);
    const deliveryCharge = calculateDelivery(totalAmount);

    const handlePlaceOrder = async (paymentMethod: 'UPI' | 'Card' | 'COD') => {
        if (!selectedAddress) return;

        // Build the API request payload
        const payload = {
            phone: selectedAddress.phone,
            full_name: selectedAddress.fullName,
            address_line: selectedAddress.addressLine,
            city: selectedAddress.city,
            state: selectedAddress.state,
            pincode: selectedAddress.pincode,
            delivery_charge: deliveryCharge,
            payment_method: paymentMethod,
            items: items.map((item) => ({
                product_id: parseInt(item.product.id, 10) || 1,
                quantity: item.quantity,
                price: item.product.price,
            })),
        };

        const result = await dispatch(placeOrder(payload));

        if (placeOrder.fulfilled.match(result)) {
            // Success: store order in UI state, clear cart, go to success page
            const order = {
                orderId: String(result.payload.order_id),
                items,
                address: selectedAddress,
                totalAmount,
                deliveryCharge,
                discount: 0,
                paymentMethod,
                paymentStatus: 'success' as const,
                status: 'placed' as const,
                createdAt: new Date().toISOString(),
            };
            dispatch(setCurrentOrder(order));
            dispatch(clearCart());
            dispatch(setCheckoutStep('success'));
            toast.success(`Order #${result.payload.order_id} placed successfully!`);
            router.push('/order-success');
        } else {
            // Error: show toast
            const errorMsg = (result.payload as string) || 'Failed to place order. Please try again.';
            toast.error(errorMsg);
        }
    };

    if (items.length === 0) {
        router.push('/cart');
        return <Spinner fullPage />;
    }

    return (
        <Box sx={{ background: '#f8fafc', minHeight: '100vh', py: { xs: 3, md: 6 } }}>
            <Container maxWidth="lg">
                <Typography variant="h4" fontWeight={800} color="#0f172a" mb={4}>Checkout</Typography>

                <Stepper activeStep={stepIndex} sx={{
                    mb: 5,
                    '& .MuiStepLabel-label': { fontWeight: 600, fontSize: '0.9rem' },
                    '& .MuiStepIcon-root.Mui-active': { color: '#0ea5e9' },
                    '& .MuiStepIcon-root.Mui-completed': { color: '#10b981' },
                }}>
                    {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                </Stepper>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Paper sx={{ borderRadius: 4, p: { xs: 3, md: 4 }, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            {checkoutStep === 'address' && <AddressStep onNext={() => dispatch(setCheckoutStep('payment'))} />}
                            {checkoutStep === 'payment' && <PaymentStep onPlaceOrder={handlePlaceOrder} />}
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Paper sx={{ borderRadius: 4, p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'sticky', top: 80 }}>
                            <Typography variant="h6" fontWeight={800} color="#0f172a" mb={2.5}>Order Summary</Typography>
                            <Box display="flex" flexDirection="column" gap={1.5} mb={2.5}>
                                {items.map((item) => (
                                    <Box key={item.product.id} display="flex" justifyContent="space-between" gap={1}>
                                        <Typography variant="body2" color="#475569" sx={{ flex: 1 }} noWrap>
                                            {item.product.name} × {item.quantity}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600} color="#0f172a">
                                            {formatPrice(item.product.price * item.quantity)}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Divider sx={{ mb: 2 }} />

                            {selectedAddress && checkoutStep === 'payment' && (
                                <>
                                    <Typography variant="body2" fontWeight={700} color="#0f172a" mb={1}>Delivering to:</Typography>
                                    <Box sx={{ background: '#f0fdf4', borderRadius: 2, p: 1.5, border: '1px solid #bbf7d0', mb: 2 }}>
                                        <Typography variant="caption" color="#166534" fontWeight={600} display="block">{selectedAddress.fullName}</Typography>
                                        <Typography variant="caption" color="#16a34a">{selectedAddress.addressLine}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                </>
                            )}

                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                                <Typography variant="body2" fontWeight={600}>{formatPrice(totalAmount)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body2" color="text.secondary">Delivery</Typography>
                                <Typography variant="body2" fontWeight={600} color={deliveryCharge === 0 ? '#10b981' : 'inherit'}>
                                    {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6" fontWeight={800}>Total</Typography>
                                <Typography variant="h6" fontWeight={800} color="#0ea5e9">{formatPrice(totalAmount + deliveryCharge)}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
