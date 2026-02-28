'use client';

import { useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { ExpandMore, HelpOutline } from '@mui/icons-material';

const faqs = [
    {
        category: 'Orders & Delivery',
        questions: [
            {
                q: 'How long does delivery take?',
                a: 'Standard delivery takes 3–7 business days. Express delivery (1–2 business days) is available in selected cities. You will receive a tracking link via SMS and email once your order is shipped.',
            },
            {
                q: 'Do you deliver across India?',
                a: 'Yes! We ship to 200+ cities across India. For remote areas, delivery may take a few additional days depending on courier availability.',
            },
            {
                q: 'Can I modify or cancel my order after placing it?',
                a: 'You can modify or cancel your order within 2 hours of placing it. After that, the order enters processing and cannot be changed. Please contact our support team immediately if you need assistance.',
            },
            {
                q: 'Is there a minimum order amount?',
                a: 'There is no minimum order amount. However, orders above ₹499 qualify for free standard shipping.',
            },
        ],
    },
    {
        category: 'Products & Quality',
        questions: [
            {
                q: 'Are your products genuine and authentic?',
                a: 'Absolutely. Every product sold on MediCare is sourced directly from certified manufacturers or authorized distributors. We conduct rigorous quality checks before listing any product.',
            },
            {
                q: 'Do you sell expired or near-expiry products?',
                a: 'Never. All products on our platform have a minimum shelf life of 6 months from the date of delivery. We regularly audit our inventory to ensure freshness.',
            },
            {
                q: 'Are your Ayurvedic medicines safe to take without a prescription?',
                a: 'Many Ayurvedic supplements and general wellness products are safe for over-the-counter use. However, for specific health conditions, we strongly recommend consulting a qualified Ayurvedic practitioner. Always read the product label carefully.',
            },
        ],
    },
    {
        category: 'Payments & Offers',
        questions: [
            {
                q: 'What payment methods do you accept?',
                a: 'We accept UPI, Credit/Debit Cards, Net Banking, Wallets (Paytm, PhonePe, etc.), and Cash on Delivery (COD) for eligible orders.',
            },
            {
                q: 'Is Cash on Delivery (COD) available?',
                a: 'COD is available for orders up to ₹5,000 in most cities. It may not be available in certain remote areas or for specific product categories.',
            },
            {
                q: 'How do I apply a discount or coupon code?',
                a: 'During checkout, you\'ll find a "Apply Coupon" field. Enter your coupon code there and click Apply. The discount will be reflected in your order total instantly.',
            },
        ],
    },
    {
        category: 'Account & Support',
        questions: [
            {
                q: 'How do I track my order?',
                a: 'Once your order is shipped, you\'ll receive a tracking link via SMS and email. You can also track your order by visiting the "My Orders" section in your account dashboard.',
            },
            {
                q: 'How can I contact customer support?',
                a: 'You can reach us via: Email: support@medicare.in | Phone: +91 XXXXX XXXXX (Mon–Sat, 9 AM – 6 PM). We aim to respond to all queries within 24 hours.',
            },
        ],
    },
];

export default function FAQPage() {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ background: 'linear-gradient(160deg, #0f172a 0%, #020617 100%)', minHeight: '100vh', color: 'white', py: 10 }}>
            <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 3, md: 6 } }}>

                {/* Hero */}
                <Box textAlign="center" mb={10}>
                    <Chip
                        label="FAQs"
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
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: 600, mx: 'auto', lineHeight: 1.8, fontWeight: 400 }}>
                        Got a question? We've got the answer. Browse through our most commonly asked questions below.
                    </Typography>
                </Box>

                {/* FAQ Sections */}
                {faqs.map((section) => (
                    <Box key={section.category} mb={6}>
                        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                            <HelpOutline sx={{ color: '#38bdf8' }} />
                            <Typography variant="h5" fontWeight={700} sx={{ color: '#e2e8f0' }}>
                                {section.category}
                            </Typography>
                        </Box>
                        {section.questions.map((item, idx) => {
                            const panelId = `${section.category}-${idx}`;
                            return (
                                <Accordion
                                    key={panelId}
                                    expanded={expanded === panelId}
                                    onChange={handleChange(panelId)}
                                    sx={{
                                        background: expanded === panelId ? 'rgba(56,189,248,0.06)' : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${expanded === panelId ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.08)'}`,
                                        borderRadius: '12px !important',
                                        mb: 1.5,
                                        '&:before': { display: 'none' },
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore sx={{ color: '#38bdf8' }} />}
                                        sx={{ px: 3, py: 1 }}
                                    >
                                        <Typography variant="body1" fontWeight={600} sx={{ color: '#e2e8f0' }}>
                                            {item.q}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ px: 3, pb: 3 }}>
                                        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.9 }}>
                                            {item.a}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </Box>
                ))}

                {/* Contact CTA */}
                <Box
                    textAlign="center"
                    sx={{
                        background: 'rgba(56,189,248,0.06)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        borderRadius: 4,
                        p: 5,
                        mt: 4,
                    }}
                >
                    <Typography variant="h5" fontWeight={700} mb={1} sx={{ color: '#e2e8f0' }}>
                        Still have questions?
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94a3b8', mb: 1 }}>
                        Our support team is happy to help.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 600 }}>
                        support@medicare.in &nbsp;|&nbsp; +91 XXXXX XXXXX
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
