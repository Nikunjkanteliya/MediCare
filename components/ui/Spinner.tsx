'use client';

import { CircularProgress, Box } from '@mui/material';

interface SpinnerProps {
    fullPage?: boolean;
    size?: number;
    color?: 'primary' | 'secondary' | 'inherit';
}

export function Spinner({
    fullPage = false,
    size = 40,
    color = 'primary',
}: SpinnerProps) {
    if (fullPage) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                sx={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
            >
                <CircularProgress size={size} sx={{ color: '#0ea5e9' }} />
            </Box>
        );
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center" py={4}>
            <CircularProgress size={size} sx={{ color: '#0ea5e9' }} />
        </Box>
    );
}


