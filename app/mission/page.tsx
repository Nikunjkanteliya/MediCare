'use client';

import {
    Box,
    Typography,
    Grid,
    Avatar,
    Chip,
    Divider,
} from '@mui/material';
import {
    TrackChanges,
    Favorite,
    EmojiNature,
    School,
    Speed,
    VerifiedUser,
    Public,
    AutoAwesome,
} from '@mui/icons-material';

const missionPillars = [
    { icon: EmojiNature, label: 'Rooted in Tradition', desc: 'Formulations grounded in authentic Ayurvedic principles passed down through generations.', color: '#22c55e' },
    { icon: AutoAwesome, label: 'Refined by Modern Standards', desc: 'GMP-compliant manufacturing with strict quality control and contemporary compliance.', color: '#38bdf8' },
    { icon: Public, label: 'Global Wellness Movement', desc: 'Elevating Ayurvedic wellness into a globally respected and trusted healthcare movement.', color: '#a78bfa' },
    { icon: Favorite, label: 'Holistic Well-being', desc: 'Promoting holistic vitality, immunity, and long-term well-being through natural formulations.', color: '#f43f5e' },
    { icon: School, label: 'Preventive Healthcare', desc: 'Empowering individuals to embrace preventive and holistic healthcare for a healthier life.', color: '#fb923c' },
    { icon: VerifiedUser, label: 'Credibility & Trust', desc: 'Building long-term customer trust through transparency, ethics, and uncompromising purity.', color: '#facc15' },
];

export default function MissionPage() {
    return (
        <Box sx={{ background: 'linear-gradient(160deg, #0f172a 0%, #020617 100%)', minHeight: '100vh', color: 'white', py: 10 }}>
            <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 3, md: 6 } }}>

                {/* Hero */}
                <Box textAlign="center" mb={10}>
                    <Chip
                        label="Vision & Mission"
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
                        Our Vision & Mission
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: 700, mx: 'auto', lineHeight: 1.8, fontWeight: 400 }}>
                        Swami Shakti Ayurved is driven by a commitment to integrate the timeless wisdom of Ayurveda with the precision and standards of modern wellness.
                    </Typography>
                </Box>

                {/* Vision + Mission Cards */}
                <Grid container spacing={4} mb={10}>
                    {/* Vision */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.03) 100%)',
                                border: '1px solid rgba(56,189,248,0.25)',
                                borderRadius: 4,
                                p: { xs: 4, md: 5 },
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -40,
                                    right: -40,
                                    width: 130,
                                    height: 130,
                                    borderRadius: '50%',
                                    background: 'rgba(56,189,248,0.06)',
                                },
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <Avatar sx={{ background: 'rgba(56,189,248,0.15)', width: 52, height: 52 }}>
                                    <TrackChanges sx={{ color: '#38bdf8', fontSize: 26 }} />
                                </Avatar>
                                <Typography variant="h5" fontWeight={800} sx={{ color: '#38bdf8', letterSpacing: 1, textTransform: 'uppercase', fontSize: '1rem' }}>
                                    Vision
                                </Typography>
                            </Box>
                            <Typography variant="h5" fontWeight={700} sx={{ color: '#e2e8f0', lineHeight: 1.7, mb: 2 }}>
                                To emerge as a globally admired Ayurvedic brand symbolizing purity, credibility, and excellence.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Mission */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.03) 100%)',
                                border: '1px solid rgba(168,85,247,0.25)',
                                borderRadius: 4,
                                p: { xs: 4, md: 5 },
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -40,
                                    right: -40,
                                    width: 130,
                                    height: 130,
                                    borderRadius: '50%',
                                    background: 'rgba(168,85,247,0.06)',
                                },
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <Avatar sx={{ background: 'rgba(168,85,247,0.15)', width: 52, height: 52 }}>
                                    <Speed sx={{ color: '#a78bfa', fontSize: 26 }} />
                                </Avatar>
                                <Typography variant="h5" fontWeight={800} sx={{ color: '#a78bfa', letterSpacing: 1, textTransform: 'uppercase', fontSize: '1rem' }}>
                                    Mission
                                </Typography>
                            </Box>
                            <Typography variant="h5" fontWeight={700} sx={{ color: '#e2e8f0', lineHeight: 1.7, mb: 2 }}>
                                To deliver refined Ayurvedic wellness solutions that integrate tradition with modern standards — empowering individuals to embrace preventive and holistic healthcare.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 10 }} />

                {/* Pillars */}
                <Box mb={10}>
                    <Typography variant="h4" fontWeight={700} mb={2} textAlign="center" sx={{ color: '#e2e8f0' }}>
                        How We Live Our Mission
                    </Typography>
                    <Typography variant="body1" textAlign="center" sx={{ color: '#64748b', mb: 6, maxWidth: 600, mx: 'auto' }}>
                        Every decision we make is grounded in these core principles.
                    </Typography>
                    <Grid container spacing={3}>
                        {missionPillars.map((p) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.label}>
                                <Box
                                    sx={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 3,
                                        p: 4,
                                        height: '100%',
                                        '&:hover': { borderColor: `${p.color}50`, background: `${p.color}08` },
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    <Avatar sx={{ background: `${p.color}20`, width: 52, height: 52, mb: 2 }}>
                                        <p.icon sx={{ color: p.color }} />
                                    </Avatar>
                                    <Typography variant="subtitle1" fontWeight={700} mb={1} sx={{ color: '#e2e8f0' }}>
                                        {p.label}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.8 }}>
                                        {p.desc}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Legacy Banner */}
                <Box
                    textAlign="center"
                    sx={{
                        background: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(168,85,247,0.08) 100%)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        borderRadius: 4,
                        p: { xs: 4, md: 6 },
                    }}
                >
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#e2e8f0', lineHeight: 1.8, fontStyle: 'italic' }}>
                        "Swami Shakti Ayurved — A Legacy of Wellness. A Future of Trust."
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
}
