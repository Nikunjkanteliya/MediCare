'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Paper,
  InputBase,
} from '@mui/material';
import {
  LocalShipping,
  VerifiedUser,
  SupportAgent,
  ArrowForward,
  Search,
  MedicalServices,
  Science,
} from '@mui/icons-material';
import Link from 'next/link';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { categories } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/SkeletonCard';
import { AppButton } from '@/components/ui/AppButton';
import { useSearchParams, useRouter } from 'next/navigation';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';

  const fetchProducts = useCallback(async (category: string, query: string) => {
    setIsLoading(true);
    try {
      let result = await productService.getProducts(category === 'All' ? undefined : category);
      if (query) {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        );
      }
      setProducts(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
      fetchProducts(urlCategory, searchQuery);
    } else {
      fetchProducts(selectedCategory, searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategory, searchQuery, fetchProducts]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    fetchProducts(cat, searchQuery);
  };

  const trustBadges = [
    { icon: LocalShipping, title: 'Free Delivery', desc: 'On orders above ₹499' },
    { icon: VerifiedUser, title: 'Genuine Products', desc: '100% authentic medicines' },
    { icon: SupportAgent, title: '24/7 Support', desc: 'Expert pharmacist help' },
    { icon: Science, title: 'Lab Tested', desc: 'Quality assured products' },
  ];

  return (
    <Box>
      {/* ── Hero ───────────────────────────────────────────── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 40%, #0369a1 70%, #0ea5e9 100%)',
          py: { xs: 8, md: 14 },
          px: { xs: 2, md: 4 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
              width: [300, 500, 700][i],
              height: [300, 500, 700][i],
              top: ['10%', '-20%', '30%'][i],
              right: ['-5%', '-10%', '-20%'][i],
              border: '1px solid rgba(255,255,255,0.05)',
              pointerEvents: 'none',
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Chip
                label="🏥 India's Most Trusted Online Pharmacy"
                sx={{
                  background: 'rgba(14, 165, 233, 0.2)',
                  color: '#7dd3fc',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  fontWeight: 600,
                  mb: 3,
                  fontSize: '0.8rem',
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontSize: { xs: '2.2rem', md: '3.8rem' },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 2,
                  letterSpacing: '-1px',
                }}
              >
                Your Health,{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(90deg, #38bdf8, #7dd3fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Delivered
                </Box>
                <br />
                to Your Door
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#93c5fd',
                  fontWeight: 400,
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.7,
                  maxWidth: 500,
                }}
              >
                Shop from 1,000+ genuine medicines, vitamins, and healthcare products. Fast delivery, great prices, and expert guidance.
              </Typography>

              <Paper
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const q = fd.get('q') as string;
                  if (q?.trim()) router.push(`/?search=${encodeURIComponent(q)}`);
                }}
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 3,
                  pl: 2.5,
                  pr: 1,
                  py: 0.5,
                  maxWidth: 520,
                  mb: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  border: '2px solid rgba(14, 165, 233, 0.3)',
                }}
              >
                <Search sx={{ color: '#94a3b8', mr: 1 }} />
                <InputBase
                  name="q"
                  placeholder="Search medicines, vitamins, brands..."
                  defaultValue={searchQuery}
                  fullWidth
                  sx={{ fontSize: '0.95rem', py: 0.8 }}
                />
                <AppButton type="submit" sx={{ ml: 1, py: 1.2 }}>
                  Search
                </AppButton>
              </Paper>

              <Stack direction="row" spacing={2} flexWrap="wrap" gap={1.5}>
                {['Pain Relief', 'Vitamins', 'Skincare'].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleCategoryChange(tag === 'Vitamins' ? 'Vitamins & Supplements' : tag)}
                    sx={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#e2e8f0',
                      border: '1px solid rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      '&:hover': { background: 'rgba(14, 165, 233, 0.3)' },
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Grid container spacing={2}>
                {[
                  { value: '1,000+', label: 'Products Available' },
                  { value: '50,000+', label: 'Happy Customers' },
                  { value: '24/7', label: 'Customer Support' },
                  { value: '100%', label: 'Genuine Products' },
                ].map((stat) => (
                  <Grid key={stat.value} size={{ xs: 6 }}>
                    <Box
                      sx={{
                        background: 'rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 3,
                        p: 3,
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        '&:hover': {
                          background: 'rgba(14, 165, 233, 0.15)',
                          border: '1px solid rgba(14, 165, 233, 0.3)',
                        },
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{
                          background: 'linear-gradient(135deg, #38bdf8, #e0f2fe)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Trust Badges ──────────────────────────────────── */}
      <Box sx={{ background: 'white', borderBottom: '1px solid #e2e8f0', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <Grid key={title} size={{ xs: 6, sm: 3 }}>
                <Box display="flex" alignItems="center" gap={1.5} sx={{ py: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 20, color: '#0284c7' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={700} color="#0f172a">{title}</Typography>
                    <Typography variant="caption" color="text.secondary">{desc}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Products ──────────────────────────────────────── */}
      <Box id="products" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4} flexWrap="wrap" gap={2}>
            <Box>
              <Typography variant="h3" fontWeight={800} color="#0f172a" gutterBottom>
                {searchQuery ? `Results for "${searchQuery}"` : 'Our Products'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {products.length} products available
              </Typography>
            </Box>
          </Box>

          {/* Category chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5, pb: 2 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => handleCategoryChange(cat)}
                sx={{
                  background: selectedCategory === cat
                    ? 'linear-gradient(135deg, #0ea5e9, #0284c7)'
                    : '#f1f5f9',
                  color: selectedCategory === cat ? 'white' : '#475569',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: selectedCategory === cat
                      ? 'linear-gradient(135deg, #0284c7, #0369a1)'
                      : 'rgba(14, 165, 233, 0.1)',
                    color: selectedCategory === cat ? 'white' : '#0ea5e9',
                  },
                }}
              />
            ))}
          </Box>

          {/* Grid */}
          {isLoading ? (
            <Grid container spacing={3}>
              {[...Array(8)].map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ProductCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : products.length === 0 ? (
            <Box
              textAlign="center"
              py={12}
              sx={{ background: '#f8fafc', borderRadius: 4, border: '1px dashed #cbd5e1' }}
            >
              <MedicalServices sx={{ fontSize: 64, color: '#cbd5e1', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} color="#94a3b8">No medicines found</Typography>
              <Typography variant="body2" color="#94a3b8" mt={1} mb={3}>
                {searchQuery ? `No results for "${searchQuery}".` : 'No products in this category yet.'}
              </Typography>
              <AppButton onClick={() => { setSelectedCategory('All'); fetchProducts('All', ''); router.push('/'); }}>
                View All Products
              </AppButton>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* ── Promo Banner ──────────────────────────────────── */}
      <Box id="offers" sx={{ py: 6, px: { xs: 2, md: 4 }, background: '#f1f5f9' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute', width: 400, height: 400, borderRadius: '50%',
                background: 'rgba(14, 165, 233, 0.1)', top: '-100px', right: '-100px', pointerEvents: 'none',
              }}
            />
            <Box>
              <Chip label="🎉 Limited Time Offer" sx={{ background: 'rgba(14, 165, 233, 0.15)', color: '#7dd3fc', mb: 2, fontWeight: 600 }} />
              <Typography variant="h4" fontWeight={800} color="white" gutterBottom>
                Free Delivery on Your
                <Box component="span" sx={{ background: 'linear-gradient(90deg, #38bdf8, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', ml: 1 }}>
                  First Order!
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: '#93c5fd', mb: 3 }}>
                Use code <strong style={{ color: 'white' }}>FIRSTMED</strong> at checkout.
              </Typography>
              <AppButton
                variant="secondary"
                sx={{ fontSize: '1rem', px: 4, py: 1.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Shop Now <ArrowForward sx={{ ml: 1, fontSize: 18 }} />
              </AppButton>
            </Box>
            <Box
              sx={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
                p: 3,
                textAlign: 'center',
                minWidth: 200,
              }}
            >
              <Typography variant="h2" fontWeight={800} sx={{ color: '#38bdf8' }}>20%</Typography>
              <Typography variant="h6" color="white">OFF</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>On vitamins & supplements</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
