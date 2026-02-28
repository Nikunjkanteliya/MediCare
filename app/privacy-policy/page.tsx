'use client';

import {
    Box,
    Typography,
    Chip,
    Divider,
} from '@mui/material';
import { Security } from '@mui/icons-material';

const sections = [
    {
        title: '1. Information We Collect',
        content: [
            'Personal Identification Information: Name, email address, mobile number, and delivery address when you create an account or place an order.',
            'Payment Information: We do not store your full card details. All payment processing is handled by our PCI-DSS compliant payment partners.',
            'Usage Data: Pages visited, time spent, clicks, and interactions on our platform to improve user experience.',
            'Device & Technical Data: IP address, browser type, operating system, and cookies to ensure security and optimal performance.',
            'Health-related Preferences: Product categories you browse or purchase to personalise recommendations (never shared without consent).',
        ],
    },
    {
        title: '2. How We Use Your Information',
        content: [
            'To process and fulfil your orders, including shipping and delivery updates.',
            'To send transactional communications such as order confirmations, invoices, and delivery notifications.',
            'To personalise your shopping experience and provide relevant product recommendations.',
            'To respond to your queries, complaints, and provide customer support.',
            'To analyse platform usage patterns and improve our products and services.',
            'To send promotional offers, newsletters, and health tips — only if you have opted in.',
        ],
    },
    {
        title: '3. Information Sharing & Disclosure',
        content: [
            'We DO NOT sell, rent, or trade your personal information to third parties.',
            'We share information with trusted service providers (shipping partners, payment gateways) only as necessary to fulfil your order.',
            'We may disclose information if required by law, government regulation, or court order.',
            'In the event of a merger or acquisition, your data may be transferred to the successor entity, and you will be notified.',
        ],
    },
    {
        title: '4. Cookies & Tracking',
        content: [
            'We use cookies to maintain your session, remember preferences, and analyse traffic.',
            'Essential cookies are required for the platform to function. You can disable non-essential cookies via your browser settings.',
            'We use analytics tools (e.g., Google Analytics) that may collect anonymised usage data.',
            'You can opt out of personalised advertising by adjusting settings in your account or browser.',
        ],
    },
    {
        title: '5. Data Security',
        content: [
            'All data is encrypted in transit using industry-standard TLS/SSL protocols.',
            'Sensitive data is stored in encrypted form on secure servers with restricted access.',
            'We conduct regular security audits and vulnerability assessments.',
            'Despite our best efforts, no online transmission is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.',
        ],
    },
    {
        title: '6. Your Rights & Choices',
        content: [
            'Access: You can view and download your personal data from the "My Account" section.',
            'Correction: You can update your profile information at any time.',
            'Deletion: You can request deletion of your account and data by contacting us. Note that some data may be retained for legal or regulatory purposes.',
            'Opt-out: You can unsubscribe from marketing emails at any time via the link in the email or account settings.',
            'Data Portability: You may request a copy of your data in a machine-readable format.',
        ],
    },
    {
        title: '7. Children\'s Privacy',
        content: [
            'MediCare is not intended for use by children under the age of 13.',
            'We do not knowingly collect personal information from children.',
            'If you believe a child has provided us with personal data, please contact us and we will promptly delete it.',
        ],
    },
    {
        title: '8. Changes to This Policy',
        content: [
            'We may update this Privacy Policy periodically to reflect changes in our practices or for legal reasons.',
            'We will notify you of significant changes via email or a prominent notice on our website.',
            'Your continued use of the platform after changes constitutes your acceptance of the updated policy.',
            'We encourage you to review this page periodically for the latest information.',
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <Box sx={{ background: 'linear-gradient(160deg, #0f172a 0%, #020617 100%)', minHeight: '100vh', color: 'white', py: 10 }}>
            <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 3, md: 6 } }}>

                {/* Hero */}
                <Box textAlign="center" mb={10}>
                    <Chip
                        label="Privacy Policy"
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
                        Privacy Policy
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: 650, mx: 'auto', lineHeight: 1.8, fontWeight: 400 }}>
                        Your privacy matters to us. This policy explains what data we collect, how we use it, and how we protect it.
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: '#475569', mt: 2 }}>
                        Last updated: February 2026
                    </Typography>
                </Box>

                {/* Security Notice */}
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
                    <Security sx={{ color: '#38bdf8', fontSize: 36, mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant="h6" fontWeight={700} mb={1} sx={{ color: '#e2e8f0' }}>
                            Our Commitment to Your Privacy
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 2 }}>
                            MediCare ("we," "our," or "us") is committed to protecting your personal information. This Privacy Policy applies to all services offered by MediCare through our website and mobile applications. By using our platform, you agree to the collection and use of information in accordance with this policy.
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
                        Questions about your privacy?
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                        Our Data Protection team is here to help.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 600 }}>
                        privacy@medicare.in &nbsp;|&nbsp; +91 XXXXX XXXXX
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
