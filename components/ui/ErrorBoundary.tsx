'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="50vh"
                    gap={2}
                    sx={{ color: 'text.secondary' }}
                >
                    <ErrorOutline sx={{ fontSize: 64, color: '#ef4444' }} />
                    <Typography variant="h5" fontWeight={700} color="error">
                        Something went wrong
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={400}>
                        {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => this.setState({ hasError: false, error: null })}
                        sx={{
                            mt: 1,
                            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                            '&:hover': { background: 'linear-gradient(135deg, #0284c7, #0369a1)' },
                        }}
                    >
                        Try Again
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}


