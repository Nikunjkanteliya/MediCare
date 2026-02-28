'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Divider,
    Chip,
} from '@mui/material';
import {
    CheckCircle,
    LocalShipping,
    Inventory,
    Home,
    ShoppingBag,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { resetCheckout } from '@/features/ui/uiSlice';
import { AppButton } from '@/components/ui/AppButton';
import { formatPrice, getExpectedDelivery } from '@/utils/formatters';

export default function OrderSuccessPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { currentOrder } = useAppSelector((state) => state.ui);
    const expectedDelivery = getExpectedDelivery();

    useEffect(() => {
        if (!currentOrder) router.push('/');
    }, [currentOrder, router]);

    if (!currentOrder) return null;

    return (
        <Box sx={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                {/* Success Header */}
                <Box textAlign="center" mb={6}>
                    <Box sx={{
                        width: 100, height: 100, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mx: 'auto', mb: 3, boxShadow: '0 20px 60px rgba(16, 185, 129, 0.35)',
                    }}>
                        <CheckCircle sx={{ fontSize: 56, color: 'white' }} />
                    </Box>
                    <Typography variant="h3" fontWeight={800} color="#0f172a" gutterBottom sx={{ letterSpacing: '-0.5px' }}>
                        Order Placed Successfully! 🎉
                    </Typography>
                    <Typography variant="h6" color="text.secondary" fontWeight={400}>
                        Your medicines are on their way. Thank you for choosing MediCare!
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Left: Order details */}
                    <Grid size={{ xs: 12, lg: 8 }}>
                        {/* Order Info Card */}
                        <Paper sx={{ borderRadius: 4, p: { xs: 3, md: 4 }, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', mb: 3 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={1}>Order ID</Typography>
                                    <Typography variant="h6" fontWeight={800} color="#0ea5e9" fontFamily="monospace">{currentOrder.orderId}</Typography>
                                </Box>
                                <Chip
                                    icon={<CheckCircle sx={{ fontSize: '16px !important', color: '#16a34a !important' }} />}
                                    label="Order Confirmed"
                                    sx={{ background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: '0.85rem', height: 34 }}
                                />
                            </Box>

                            {/* Timeline */}
                            <Box sx={{ background: '#f8fafc', borderRadius: 3, p: 2.5, mb: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                {[
                                    { icon: CheckCircle, label: 'Order Placed', color: '#10b981', done: true },
                                    { icon: Inventory, label: 'Processing', color: '#f59e0b', done: false },
                                    { icon: LocalShipping, label: 'Shipped', color: '#94a3b8', done: false },
                                    { icon: Home, label: 'Delivered', color: '#94a3b8', done: false },
                                ].map(({ icon: Icon, label, color, done }) => (
                                    <Box key={label} display="flex" alignItems="center" gap={1}>
                                        <Icon sx={{ fontSize: 20, color }} />
                                        <Typography variant="body2" fontWeight={done ? 700 : 500} color={done ? color : '#94a3b8'}>{label}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Expected Delivery */}
                            <Box sx={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', borderRadius: 3, p: 2.5, border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <LocalShipping sx={{ fontSize: 28, color: '#0284c7' }} />
                                <Box>
                                    <Typography variant="body2" color="#0369a1" fontWeight={700}>Expected Delivery</Typography>
                                    <Typography variant="h6" fontWeight={800} color="#0c4a6e">{expectedDelivery}</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Items */}
                            <Typography variant="h6" fontWeight={700} color="#0f172a" mb={2}>
                                Items Ordered ({currentOrder.items.reduce((s, i) => s + i.quantity, 0)} items)
                            </Typography>
                            {currentOrder.items.map((item) => (
                                <Box key={item.product.id} display="flex" justifyContent="space-between" alignItems="center" sx={{ py: 1.5, borderBottom: '1px solid #f1f5f9' }}>
                                    <Box>
                                        <Typography variant="body2" fontWeight={700} color="#0f172a">{item.product.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">{item.product.brand} · Qty: {item.quantity}</Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight={700} color="#0f172a">
                                        {formatPrice(item.product.price * item.quantity)}
                                    </Typography>
                                </Box>
                            ))}
                        </Paper>

                        {/* Delivery Address */}
                        <Paper sx={{ borderRadius: 4, p: { xs: 3, md: 4 }, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                            <Typography variant="h6" fontWeight={700} color="#0f172a" mb={2}>Delivery Address</Typography>
                            <Box sx={{ background: '#f8fafc', borderRadius: 3, p: 2.5, border: '1px solid #e2e8f0' }}>
                                <Typography variant="subtitle1" fontWeight={700} color="#0f172a">{currentOrder.address.fullName}</Typography>
                                <Typography variant="body2" color="text.secondary" mt={0.5}>+91 {currentOrder.address.phone}</Typography>
                                <Typography variant="body2" color="text.secondary" mt={0.5} lineHeight={1.6}>
                                    {currentOrder.address.addressLine}<br />
                                    {currentOrder.address.city}, {currentOrder.address.state} - {currentOrder.address.pincode}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right: Payment Summary */}
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Paper sx={{ borderRadius: 4, p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'sticky', top: 80 }}>
                            <Typography variant="h6" fontWeight={800} color="#0f172a" mb={3}>Payment Summary</Typography>
                            <Box display="flex" flexDirection="column" gap={1.5}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                                    <Typography variant="body2" fontWeight={600}>{formatPrice(currentOrder.totalAmount)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">Delivery</Typography>
                                    <Typography variant="body2" fontWeight={600} color={currentOrder.deliveryCharge === 0 ? '#10b981' : 'inherit'}>
                                        {currentOrder.deliveryCharge === 0 ? 'FREE' : formatPrice(currentOrder.deliveryCharge)}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h6" fontWeight={800}>Total Paid</Typography>
                                    <Typography variant="h6" fontWeight={800} color="#10b981">
                                        {formatPrice(currentOrder.totalAmount + currentOrder.deliveryCharge)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ background: '#f0fdf4', borderRadius: 2, p: 1.5, mt: 2, border: '1px solid #bbf7d0', textAlign: 'center' }}>
                                <Typography variant="body2" color="#16a34a" fontWeight={600}>💳 Payment via {currentOrder.paymentMethod} — Success</Typography>
                            </Box>

                            <Box display="flex" flexDirection="column" gap={1.5} mt={4}>
                                <Link href="/" style={{ textDecoration: 'none' }}>
                                    <AppButton variant="primary" fullWidth onClick={() => dispatch(resetCheckout())} sx={{ py: 1.5 }}>
                                        <ShoppingBag sx={{ mr: 1 }} />Continue Shopping
                                    </AppButton>
                                </Link>
                                <AppButton variant="outline" fullWidth onClick={() => window.print()} sx={{ py: 1.2 }}>
                                    Download Receipt
                                </AppButton>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
