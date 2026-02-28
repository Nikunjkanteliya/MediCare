'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Rating,
} from '@mui/material';
import { ShoppingCart, LocalPharmacy, Verified } from '@mui/icons-material';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { AppButton } from '@/components/ui/AppButton';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
    product: Product;
}

const badgeColors: Record<string, string> = {
    bestseller: '#f59e0b',
    new: '#10b981',
    sale: '#e11d48',
    limited: '#8b5cf6',
};

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart, isInCart } = useCart();
    const inCart = isInCart(product.id);

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                '&:hover': {
                    boxShadow: '0 12px 40px rgba(14, 165, 233, 0.15)',
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(14, 165, 233, 0.3)',
                },
            }}
        >
            {/* Image section */}
            <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <Box
                    sx={{
                        position: 'relative',
                        height: 220,
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'contain', transition: 'transform 0.4s ease' }}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Badge */}
                    {product.badge && (
                        <Chip
                            label={product.badge.toUpperCase()}
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                background: badgeColors[product.badge],
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.65rem',
                                letterSpacing: '0.5px',
                                height: 22,
                            }}
                        />
                    )}
                    {/* Prescription badge */}
                    {product.requiresPrescription && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'rgba(239, 68, 68, 0.85)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: 1,
                                px: 1,
                                py: 0.3,
                            }}
                        >
                            <Typography sx={{ color: 'white', fontSize: '0.6rem', fontWeight: 700 }}>
                                Rx
                            </Typography>
                        </Box>
                    )}
                    {/* Discount badge */}
                    {product.originalPrice && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 12,
                                right: 12,
                                background: '#e11d48',
                                borderRadius: 1.5,
                                px: 1.2,
                                py: 0.4,
                            }}
                        >
                            <Typography sx={{ color: 'white', fontSize: '0.7rem', fontWeight: 700 }}>
                                {calculateDiscount(product.originalPrice, product.price)}% OFF
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Link>

            {/* Content */}
            <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="caption"
                    sx={{ color: '#0ea5e9', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                    {product.brand}
                </Typography>

                <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{
                            color: '#1e293b',
                            mt: 0.3,
                            lineHeight: 1.3,
                            '&:hover': { color: '#0ea5e9' },
                            transition: 'color 0.2s',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {product.name}
                    </Typography>
                </Link>

                <Typography
                    variant="body2"
                    sx={{
                        color: '#64748b',
                        mt: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '0.8rem',
                        lineHeight: 1.5,
                        flex: 1,
                    }}
                >
                    {product.shortDescription}
                </Typography>

                {/* Rating */}
                <Box display="flex" alignItems="center" gap={0.5} mt={1.5}>
                    <Rating value={product.rating} precision={0.5} size="small" readOnly />
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        ({product.reviewCount.toLocaleString()})
                    </Typography>
                </Box>

                {/* Price and Cart */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={800}
                            sx={{ color: '#0f172a', lineHeight: 1 }}
                        >
                            {formatPrice(product.price)}
                        </Typography>
                        {product.originalPrice && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#94a3b8',
                                    textDecoration: 'line-through',
                                }}
                            >
                                {formatPrice(product.originalPrice)}
                            </Typography>
                        )}
                    </Box>

                    <AppButton
                        variant={inCart ? 'secondary' : 'primary'}
                        onClick={() => addToCart(product)}
                        sx={{ px: 2, py: 0.8, fontSize: '0.8rem', minWidth: 'auto' }}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart sx={{ fontSize: 16, mr: 0.5 }} />
                        {inCart ? 'Added' : 'Add'}
                    </AppButton>
                </Box>

                {/* Stock indicator */}
                {product.stock < 50 && (
                    <Typography
                        variant="caption"
                        sx={{ color: '#f59e0b', mt: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        ⚡ Only {product.stock} left in stock
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}


