'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Divider,
    IconButton,
} from '@mui/material';
import {
    ShoppingCart,
    Delete,
    Add,
    Remove,
    ArrowBack,
    LocalShipping,
    ShoppingBag,
} from '@mui/icons-material';
import { useCart } from '@/hooks/useCart';
import { useAppDispatch } from '@/redux/hooks';
import { setCheckoutStep } from '@/features/ui/uiSlice';
import { AppButton } from '@/components/ui/AppButton';
import { formatPrice, calculateDelivery } from '@/utils/formatters';

export default function CartPage() {
    const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const deliveryCharge = calculateDelivery(totalAmount);
    const grandTotal = totalAmount + deliveryCharge;

    const handleCheckout = () => {
        dispatch(setCheckoutStep('address'));
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
                <Box
                    sx={{
                        background: 'white',
                        borderRadius: 4,
                        p: 8,
                        boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
                        border: '1px dashed #cbd5e1',
                    }}
                >
                    <ShoppingCart sx={{ fontSize: 80, color: '#cbd5e1', mb: 3 }} />
                    <Typography variant="h4" fontWeight={700} color="#94a3b8" gutterBottom>
                        Your cart is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Looks like you haven&apos;t added any medicines yet. Browse our products and take care of your health.
                    </Typography>
                    <AppButton
                        onClick={() => router.push('/')}
                        sx={{ px: 5, py: 1.5, fontSize: '1rem' }}
                    >
                        <ShoppingBag sx={{ mr: 1 }} />
                        Start Shopping
                    </AppButton>
                </Box>
            </Container>
        );
    }

    return (
        <Box sx={{ background: '#f8fafc', minHeight: '100vh', py: { xs: 3, md: 6 } }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                    <AppButton
                        variant="ghost"
                        onClick={() => router.back()}
                        sx={{ p: 0.5, minWidth: 'auto' }}
                        aria-label="Go back"
                    >
                        <ArrowBack />
                    </AppButton>
                    <Box>
                        <Typography variant="h4" fontWeight={800} color="#0f172a">
                            Shopping Cart
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {items.length}{items.length !== 1 ? 's' : ''} in your cart
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={4}>
                    {/* Cart Items */}
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Paper sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            {/* Cart Header */}
                            <Box
                                sx={{
                                    px: 3,
                                    py: 2,
                                    borderBottom: '1px solid #f1f5f9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: '#fafafa',
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight={700} color="#0f172a">
                                    Cart Items
                                </Typography>
                                <AppButton
                                    variant="ghost"
                                    onClick={() => clearCart()}
                                    sx={{ color: '#ef4444', fontSize: '0.8rem', py: 0.5 }}
                                >
                                    <Delete sx={{ fontSize: 16, mr: 0.5 }} />
                                    Clear All
                                </AppButton>
                            </Box>

                            {/* Items */}
                            {items.map((item, index) => (
                                <Box key={item.product.id}>
                                    <Box sx={{ p: 3 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            {/* Product Image */}
                                            <Grid size={{ xs: 3, sm: 2 }}>
                                                <Link href={`/products/${item.product.id}`}>
                                                    <Box
                                                        sx={{
                                                            position: 'relative',
                                                            width: '100%',
                                                            paddingTop: '100%',
                                                            borderRadius: 2,
                                                            overflow: 'hidden',
                                                            background: '#f1f5f9',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <Image
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                            sizes="80px"
                                                        />
                                                    </Box>
                                                </Link>
                                            </Grid>

                                            {/* Product Details */}
                                            <Grid size={{ xs: 9, sm: 6 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: '#0ea5e9', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}
                                                >
                                                    {item.product.brand}
                                                </Typography>
                                                <Link href={`/products/${item.product.id}`} style={{ textDecoration: 'none' }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight={700}
                                                        sx={{
                                                            color: '#0f172a',
                                                            '&:hover': { color: '#0ea5e9' },
                                                            transition: 'color 0.2s',
                                                            lineHeight: 1.3,
                                                        }}
                                                    >
                                                        {item.product.name}
                                                    </Typography>
                                                </Link>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3 }}>
                                                    {item.product.shortDescription}
                                                </Typography>
                                                <Typography variant="body1" fontWeight={800} color="#0f172a" sx={{ mt: 1, display: { sm: 'none' } }}>
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </Typography>
                                            </Grid>

                                            {/* Quantity Controls */}
                                            <Grid size={{ xs: 6, sm: 2 }}>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    sx={{
                                                        border: '1.5px solid #e2e8f0',
                                                        borderRadius: 2,
                                                        width: 'fit-content',
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        aria-label="Decrease quantity"
                                                        sx={{ color: '#475569', '&:hover': { color: '#0ea5e9' } }}
                                                    >
                                                        <Remove sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight={700}
                                                        sx={{ px: 1.5, minWidth: 32, textAlign: 'center', color: '#0f172a' }}
                                                    >
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.product.stock}
                                                        aria-label="Increase quantity"
                                                        sx={{ color: '#475569', '&:hover': { color: '#0ea5e9' } }}
                                                    >
                                                        <Add sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                </Box>
                                            </Grid>

                                            {/* Price */}
                                            <Grid size={{ xs: 4, sm: 1 }} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
                                                <Box textAlign="right">
                                                    <Typography variant="subtitle1" fontWeight={800} color="#0f172a">
                                                        {formatPrice(item.product.price * item.quantity)}
                                                    </Typography>
                                                    {item.quantity > 1 && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            {formatPrice(item.product.price)} each
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Grid>

                                            {/* Delete */}
                                            <Grid size={{ xs: 2, sm: 1 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeFromCart(item.product.id, item.product.name)}
                                                    sx={{
                                                        color: '#94a3b8',
                                                        '&:hover': { color: '#ef4444', background: '#fef2f2' },
                                                        transition: 'all 0.2s',
                                                    }}
                                                    aria-label={`Remove ${item.product.name} from cart`}
                                                >
                                                    <Delete sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    {index < items.length - 1 && <Divider sx={{ mx: 3 }} />}
                                </Box>
                            ))}
                        </Paper>
                    </Grid>

                    {/* Order Summary */}
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Paper
                            sx={{
                                borderRadius: 4,
                                p: 3.5,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                position: 'sticky',
                                top: 80,
                            }}
                        >
                            <Typography variant="h6" fontWeight={800} color="#0f172a" mb={3}>
                                Order Summary
                            </Typography>

                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>{formatPrice(totalAmount)}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Box display="flex" alignItems="center" gap={0.5}>
                                        <LocalShipping sx={{ fontSize: 16, color: '#94a3b8' }} />
                                        <Typography variant="body2" color="text.secondary">Delivery</Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        sx={{ color: deliveryCharge === 0 ? '#10b981' : '#0f172a' }}
                                    >
                                        {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                                    </Typography>
                                </Box>

                                {deliveryCharge > 0 && (
                                    <Box sx={{ background: '#f0fdf4', borderRadius: 2, p: 1.5, border: '1px solid #bbf7d0' }}>
                                        <Typography variant="caption" color="#16a34a" fontWeight={500}>
                                            💚 Add {formatPrice(499 - totalAmount)} more to get FREE delivery!
                                        </Typography>
                                    </Box>
                                )}

                                <Divider />

                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h6" fontWeight={800} color="#0f172a">Total</Typography>
                                    <Typography variant="h6" fontWeight={800} color="#0f172a">
                                        {formatPrice(grandTotal)}
                                    </Typography>
                                </Box>

                                {deliveryCharge === 0 && (
                                    <Typography variant="caption" color="#10b981" textAlign="center" fontWeight={600}>
                                        🎉 You saved ₹40 on delivery!
                                    </Typography>
                                )}
                            </Box>

                            <AppButton
                                variant="primary"
                                fullWidth
                                onClick={handleCheckout}
                                sx={{ mt: 3, py: 1.8, fontSize: '1rem' }}
                            >
                                Proceed to Checkout
                            </AppButton>

                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <AppButton variant="ghost" fullWidth sx={{ mt: 1.5, color: '#64748b' }}>
                                    Continue Shopping
                                </AppButton>
                            </Link>

                            {/* Trust badges */}
                            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {['🔒 Secure & encrypted checkout', '✅ 100% genuine products', '💊 Licensed online pharmacy'].map((text) => (
                                    <Typography key={text} variant="caption" color="text.secondary">
                                        {text}
                                    </Typography>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}


