'use client';

import { Card, CardContent, Skeleton, Box } from '@mui/material';

export function ProductCardSkeleton() {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                height: '100%',
            }}
        >
            <Skeleton variant="rectangular" height={220} animation="wave" />
            <CardContent sx={{ p: 2 }}>
                <Skeleton variant="text" width="40%" height={20} animation="wave" />
                <Skeleton variant="text" width="85%" height={24} animation="wave" sx={{ mt: 0.5 }} />
                <Skeleton variant="text" width="90%" height={16} animation="wave" />
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Skeleton variant="text" width="30%" height={28} animation="wave" />
                    <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} animation="wave" />
                </Box>
            </CardContent>
        </Card>
    );
}

export function ProductDetailSkeleton() {
    return (
        <Box>
            <Skeleton variant="rectangular" height={450} sx={{ borderRadius: 3 }} animation="wave" />
            <Box mt={3}>
                <Skeleton variant="text" width="30%" height={24} />
                <Skeleton variant="text" width="70%" height={36} />
                <Skeleton variant="text" width="100%" height={18} />
                <Skeleton variant="text" width="90%" height={18} />
                <Skeleton variant="text" width="40%" height={32} sx={{ mt: 2 }} />
            </Box>
        </Box>
    );
}


