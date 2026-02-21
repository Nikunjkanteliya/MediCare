'use client';

import { Button as MuiButton, ButtonProps, CircularProgress } from '@mui/material';
import { forwardRef } from 'react';

interface AppButtonProps extends Omit<ButtonProps, 'variant'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
    (
        {
            variant = 'primary',
            isLoading = false,
            fullWidth = false,
            children,
            disabled,
            sx,
            ...props
        },
        ref
    ) => {
        const variants = {
            primary: {
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: 'white',
                '&:hover': {
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)',
                    transform: 'translateY(-1px)',
                },
                '&:active': { transform: 'translateY(0px)' },
            },
            secondary: {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                    transform: 'translateY(-1px)',
                },
            },
            outline: {
                background: 'transparent',
                color: '#0ea5e9',
                border: '2px solid #0ea5e9',
                '&:hover': {
                    background: 'rgba(14, 165, 233, 0.08)',
                    borderColor: '#0284c7',
                },
            },
            ghost: {
                background: 'transparent',
                color: '#64748b',
                '&:hover': {
                    background: 'rgba(100, 116, 139, 0.08)',
                },
            },
            danger: {
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                '&:hover': {
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                },
            },
        };

        return (
            <MuiButton
                ref={ref}
                disabled={disabled || isLoading}
                fullWidth={fullWidth}
                sx={{
                    ...variants[variant],
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    boxShadow: 'none',
                    '&:disabled': {
                        opacity: 0.6,
                        cursor: 'not-allowed',
                    },
                    ...sx,
                }}
                {...props}
            >
                {isLoading ? (
                    <>
                        <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                        Loading...
                    </>
                ) : (
                    children
                )}
            </MuiButton>
        );
    }
);

AppButton.displayName = 'AppButton';


