'use client';

import Link from 'next/link';
import {
    Box,
    Typography,
    Grid,
    Divider,
    IconButton,
} from '@mui/material';
import {
    LocalPharmacy,
    Phone,
    Email,
    LocationOn,
    Facebook,
    Twitter,
    Instagram,
} from '@mui/icons-material';

export function Footer() {
    const categories = [
        'Swami Shakti Juice'
    ];

    const quickLinks = [
        { label: 'About Us', href: '/about' },
        { label: 'Our Mission', href: '/mission' },
        // { label: 'FAQs', href: '/faq' },
        // { label: 'Return Policy', href: '/return-policy' },
        // { label: 'Privacy Policy', href: '/privacy-policy' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
                color: 'white',
                pt: 8,
                pb: 4,
                mt: 'auto',
            }}
        >
            <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 3, md: 6 } }}>
                <Grid container spacing={5}>
                    {/* Brand */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                            <LocalPharmacy sx={{ fontSize: 32, color: '#38bdf8' }} />
                            <Typography variant="h5" fontWeight={800} sx={{ color: '#38bdf8', letterSpacing: '-0.5px' }}>
                                Swami Shakti Ayurved
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.8, mb: 3 }}>
                            Your trusted online Ayurvedic pharmacy. Quality Ayurvedic medicines delivered to your doorstep with care and precision.
                        </Typography>
                        <Box display="flex" gap={1}>
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <IconButton
                                    key={i}
                                    size="small"
                                    sx={{
                                        color: '#94a3b8',
                                        border: '1px solid rgba(148,163,184,0.2)',
                                        '&:hover': { color: '#38bdf8', borderColor: '#38bdf8', background: 'rgba(56,189,248,0.1)' },
                                        transition: 'all 0.2s',
                                    }}
                                    aria-label={`Social link ${i + 1}`}
                                >
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* Categories */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="subtitle1" fontWeight={700} mb={2} sx={{ color: '#e2e8f0' }}>
                            Product Categories
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {categories.map((cat) => (
                                <Link key={cat}
                                    href={`/#products
                                 `}

                                    style={{ textDecoration: 'none' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#94a3b8', '&:hover': { color: '#38bdf8' }, transition: 'color 0.2s', cursor: 'pointer' }}
                                    >
                                        {cat}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="subtitle1" fontWeight={700} mb={2} sx={{ color: '#e2e8f0' }}>
                            Quick Links
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {quickLinks.map((link) => (
                                <Link key={link.label} href={link.href} style={{ textDecoration: 'none' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#94a3b8', '&:hover': { color: '#38bdf8' }, transition: 'color 0.2s', cursor: 'pointer' }}
                                    >
                                        {link.label}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Contact */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="subtitle1" fontWeight={700} mb={2} sx={{ color: '#e2e8f0' }}>
                            Contact Us
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {[
                                { icon: Phone, text: '+91 XXXXX XXXXX' },
                                { icon: Email, text: 'support@medicare.in' },
                                { icon: LocationOn, text: 'Mumbai, Maharashtra, India' },
                            ].map(({ icon: Icon, text }) => (
                                <Box key={text} display="flex" alignItems="flex-start" gap={1.5}>
                                    <Icon sx={{ fontSize: 18, color: '#38bdf8', mt: 0.2 }} />
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>{text}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.08)' }} />

                <Box
                    sx={{
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: 2,
                        p: 2,
                        mb: 3,
                    }}
                >
                    <Typography variant="caption" sx={{ color: '#fca5a5' }}>
                        ⚕️ Medical Disclaimer: Information on this website is for educational purposes only. Always consult a qualified healthcare professional before purchasing or consuming any medicine.
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                    <Typography variant="caption" sx={{ color: '#475569' }}>
                        © 2026 MediCare. All rights reserved.
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#475569' }}>
                        Made with ❤️ for better healthcare access
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}


