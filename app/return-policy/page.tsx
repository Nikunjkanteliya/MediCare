'use client';

import {
    Box,
    Typography,
    Chip,
    Divider,
} from '@mui/material';
import { Autorenew } from '@mui/icons-material';

const sections = [
    {
        title: '1. Eligibility for Returns',
        content: [
            'Products must be returned within 7 days of delivery.',
            'The item must be unused, unopened, and in its original packaging.',
            'Products with broken seals, tampered packaging, or signs of use are not eligible for return.',
            'Prescription-based medicines and perishable items are non-returnable.',
        ],
    },
    {
        title: '2. Non-Returnable Items',
        content: [
            'Opened or used medicines and supplements.',
            'Products with a shelf life of less than 6 months at the time of purchase.',
            'Personalised or custom-made health products.',
            'Items purchased during clearance or final sale.',
            'Products damaged due to improper storage by the customer.',
        ],
    },
    {
        title: '3. How to Initiate a Return',
        content: [
            'Contact our support team at support@medicare.in or call +91 XXXXX XXXXX within 7 days of delivery.',
            'Provide your Order ID, the reason for return, and clear photos of the product (especially if damaged or wrong item received).',
            'Our team will review your request within 48 hours and share a return shipping label if approved.',
            'Pack the item securely in its original packaging and hand it over to our courier partner.',
        ],
    },
    {
        title: '4. Refund Process',
        content: [
            'Once the returned item is received and inspected, we will process your refund within 5–7 business days.',
            'Refunds are credited to the original payment method (UPI, Card, Wallet, etc.).',
            'For COD orders, refunds are processed via bank transfer. Please share your bank account details with our support team.',
            'Shipping charges are non-refundable unless the return is due to our error (wrong/damaged item).',
        ],
    },
    {
        title: '5. Damaged or Wrong Items',
        content: [
            'If you received a damaged, defective, or incorrect product, please contact us within 48 hours of delivery.',
            'Share clear photographs of the product and packaging.',
            'We will arrange a free pickup and send a replacement or process a full refund, as per your preference.',
        ],
    },
    {
        title: '6. Exchange Policy',
        content: [
            'We currently do not offer direct exchanges. To exchange a product, please initiate a return and place a new order.',
            'If you received the wrong product, we will send the correct item at no additional cost after the return is processed.',
        ],
    },
];

export default function ReturnPolicyPage() {
    return (
        <Box sx={{ background: 'linear-gradient(160deg, #0f172a 0%, #020617 100%)', minHeight: '100vh', color: 'white', py: 10 }}>
            <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 3, md: 6 } }}>

                {/* Hero */}
                <Box textAlign="center" mb={10}>
                    <Chip
                        label="Return Policy"
                        sx={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', fontWeight: 700, mb: 3, fontSize: '0.85rem', px: 1 }}
                    />
                    <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                            background: 'linear-gradient(135deg, #e2e8f0 0%, #38bdf8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 3,
                            fontSize: { xs: '2.2rem', md: '3rem' },
                        }}
                    >
                        Return & Refund Policy
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: 650, mx: 'auto', lineHeight: 1.8, fontWeight: 400 }}>
                        We want you to be completely satisfied with your purchase. If something isn't right, we're here to make it right.
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: '#475569', mt: 2 }}>
                        Last updated: February 2026
                    </Typography>
                </Box>

                {/* Quick Summary */}
                <Box
                    sx={{
                        background: 'rgba(56,189,248,0.06)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        borderRadius: 4,
                        p: { xs: 3, md: 4 },
                        mb: 8,
                        display: 'flex',
                        gap: 3,
                        alignItems: 'flex-start',
                    }}
                >
                    <Autorenew sx={{ color: '#38bdf8', fontSize: 36, mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant="h6" fontWeight={700} mb={1} sx={{ color: '#e2e8f0' }}>
                            Quick Summary
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 2 }}>
                            • 7-day return window from date of delivery &nbsp;•&nbsp; Unused & original packaging required<br />
                            • Refunds processed in 5–7 business days &nbsp;•&nbsp; Free return pickup for damaged/wrong items<br />
                            • Prescription medicines & opened products are non-returnable
                        </Typography>
                    </Box>
                </Box>

                {/* Sections */}
                {sections.map((section, idx) => (
                    <Box key={section.title} mb={5}>
                        <Typography variant="h5" fontWeight={700} mb={3} sx={{ color: '#e2e8f0' }}>
                            {section.title}
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                pl: 0,
                                m: 0,
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                            }}
                        >
                            {section.content.map((item, i) => (
                                <Box
                                    component="li"
                                    key={i}
                                    sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}
                                >
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: '#38bdf8',
                                            mt: 1,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.9 }}>
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        {idx < sections.length - 1 && (
                            <Divider sx={{ mt: 5, borderColor: 'rgba(255,255,255,0.06)' }} />
                        )}
                    </Box>
                ))}

                {/* Contact */}
                <Box
                    textAlign="center"
                    sx={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 4,
                        p: 5,
                        mt: 6,
                    }}
                >
                    <Typography variant="h6" fontWeight={700} mb={1} sx={{ color: '#e2e8f0' }}>
                        Need Help with a Return?
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                        Our team is available Monday to Saturday, 9 AM – 6 PM
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 600 }}>
                        support@medicare.in &nbsp;|&nbsp; +91 XXXXX XXXXX
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
