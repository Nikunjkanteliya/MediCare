'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TextField,
    InputAdornment,
    Avatar,
    CircularProgress,
    Alert,
    Divider,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Search,
    Refresh,
    ShoppingBag,
    AttachMoney,
    PeopleAlt,
    Inventory2,
    FilterList,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOrders } from '@/features/orders/ordersSlice';
import { OrderDetailRow } from '@/types';
import { formatPrice } from '@/utils/formatters';

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
    icon,
    label,
    value,
    color,
    bg,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
    bg: string;
}) {
    return (
        <Box
            sx={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                flex: 1,
                minWidth: 180,
            }}
        >
            <Avatar sx={{ background: bg, width: 50, height: 50 }}>
                <Box sx={{ color }}>{icon}</Box>
            </Avatar>
            <Box>
                <Typography variant="h5" fontWeight={800} sx={{ color: 'white', lineHeight: 1 }}>
                    {value}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                    {label}
                </Typography>
            </Box>
        </Box>
    );
}

// ── Payment Chip ──────────────────────────────────────────────────────────────
function PaymentChip({ method }: { method: string }) {
    const map: Record<string, { bg: string; color: string }> = {
        COD: { bg: '#fef3c7', color: '#92400e' },
        UPI: { bg: '#dbeafe', color: '#1e40af' },
        Card: { bg: '#f3e8ff', color: '#6b21a8' },
    };
    const style = map[method] ?? { bg: '#f1f5f9', color: '#475569' };
    return (
        <Chip
            label={method}
            size="small"
            sx={{ background: style.bg, color: style.color, fontWeight: 700, fontSize: '0.72rem' }}
        />
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminOrdersPage() {
    const dispatch = useAppDispatch();
    const { orders, isFetching, fetchError } = useAppSelector((s) => s.orders);

    const [search, setSearch] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('All');

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // ── Derived stats ──────────────────────────────────────────────────────────
    const uniqueOrders = new Set(orders.map((o) => o.order_id)).size;
    const uniqueCustomers = new Set(orders.map((o) => o.contact_number)).size;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total_bill, 0);
    const totalItems = orders.reduce((sum, o) => sum + o.quantity, 0);

    // ── Filtered rows ─────────────────────────────────────────────────────────
    const filtered = orders.filter((o) => {
        const matchesSearch =
            search === '' ||
            o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
            o.contact_number.includes(search) ||
            o.product_name.toLowerCase().includes(search.toLowerCase()) ||
            String(o.order_id).includes(search);
        const matchesPayment = paymentFilter === 'All' || o.payment_method === paymentFilter;
        return matchesSearch && matchesPayment;
    });

    return (
        <Box sx={{ background: 'linear-gradient(160deg, #0f172a 0%, #020617 100%)', minHeight: '100vh', color: 'white' }}>
            {/* Header */}
            <Box
                sx={{
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    px: { xs: 3, md: 6 },
                    py: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="h5" fontWeight={800} sx={{ color: '#38bdf8', letterSpacing: '-0.5px' }}>
                        🛡️ Admin Dashboard
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#475569' }}>
                        Swami Shakti Ayurved · Orders Management
                    </Typography>
                </Box>
                <Tooltip title="Refresh orders">
                    <IconButton
                        onClick={() => dispatch(fetchOrders())}
                        sx={{ color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)', '&:hover': { background: 'rgba(56,189,248,0.08)' } }}
                    >
                        <Refresh />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 6 }, py: 5 }}>
                {/* Stats Row */}
                <Box display="flex" flexWrap="wrap" gap={2} mb={5}>
                    <StatCard
                        icon={<ShoppingBag />}
                        label="Total Orders"
                        value={String(uniqueOrders)}
                        color="#38bdf8"
                        bg="rgba(56,189,248,0.15)"
                    />
                    <StatCard
                        icon={<AttachMoney />}
                        label="Total Revenue"
                        value={`₹${totalRevenue.toLocaleString()}`}
                        color="#22c55e"
                        bg="rgba(34,197,94,0.15)"
                    />
                    <StatCard
                        icon={<PeopleAlt />}
                        label="Unique Customers"
                        value={String(uniqueCustomers)}
                        color="#a78bfa"
                        bg="rgba(167,139,250,0.15)"
                    />
                    <StatCard
                        icon={<Inventory2 />}
                        label="Items Ordered"
                        value={String(totalItems)}
                        color="#fb923c"
                        bg="rgba(251,146,60,0.15)"
                    />
                </Box>

                {/* Filters */}
                {/* <Box
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    mb={3}
                    alignItems="center"
                >
                    <TextField
                        placeholder="Search by name, phone, product, order ID…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        sx={{
                            flex: 1,
                            minWidth: 240,
                            '& .MuiOutlinedInput-root': {
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                borderRadius: 2,
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                                '&:hover fieldset': { borderColor: '#38bdf8' },
                                '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                            },
                            '& input::placeholder': { color: '#64748b' },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: '#64748b', fontSize: 18 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel sx={{ color: '#64748b', '&.Mui-focused': { color: '#38bdf8' } }}>
                            <FilterList sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                            Payment
                        </InputLabel>
                        <Select
                            value={paymentFilter}
                            label="Payment"
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            sx={{
                                color: 'white',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.12)' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#38bdf8' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#38bdf8' },
                                '& .MuiSvgIcon-root': { color: '#64748b' },
                            }}
                            MenuProps={{ PaperProps: { sx: { background: '#1e293b', color: 'white' } } }}
                        >
                            {['All', 'COD', 'UPI', 'Card'].map((m) => (
                                <MenuItem key={m} value={m}>{m}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="caption" sx={{ color: '#475569', ml: 'auto' }}>
                        {filtered.length} row{filtered.length !== 1 ? 's' : ''}
                    </Typography>
                </Box> */}

                {/* Table */}
                {isFetching ? (
                    <Box textAlign="center" py={10}>
                        <CircularProgress sx={{ color: '#38bdf8' }} size={48} />
                        <Typography variant="body2" sx={{ color: '#64748b', mt: 2 }}>Loading orders…</Typography>
                    </Box>
                ) : fetchError ? (
                    <Alert
                        severity="error"
                        sx={{ borderRadius: 3, background: 'rgba(239,68,68,0.08)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                        {fetchError}
                    </Alert>
                ) : (
                    <Paper
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        elevation={0}
                    >
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ background: 'rgba(56,189,248,0.06)' }}>
                                        {[
                                            'Order ID',
                                            'Customer',
                                            'Contact',
                                            'Address',
                                            'Product',
                                            'Qty',
                                            'Price',
                                            'Total',
                                            'Payment',
                                            'Date',
                                        ].map((col) => (
                                            <TableCell
                                                key={col}
                                                sx={{
                                                    color: '#38bdf8',
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 0.8,
                                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                                    whiteSpace: 'nowrap',
                                                    py: 2,
                                                }}
                                            >
                                                {col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filtered.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={10} align="center" sx={{ py: 8, color: '#475569', borderBottom: 'none' }}>
                                                No orders found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filtered.map((row: OrderDetailRow, idx: number) => (
                                            <TableRow
                                                key={`${row.order_id}-${idx}`}
                                                sx={{
                                                    '&:hover': { background: 'rgba(56,189,248,0.04)' },
                                                    transition: 'background 0.15s',
                                                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                                                }}
                                            >
                                                <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 }}>
                                                    <Chip
                                                        label={`#${row.order_id}`}
                                                        size="small"
                                                        sx={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', fontWeight: 700, fontFamily: 'monospace' }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ color: '#e2e8f0', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap', py: 1.5 }}>
                                                    {row.customer_name}
                                                </TableCell>
                                                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: 'monospace', whiteSpace: 'nowrap', py: 1.5 }}>
                                                    {row.contact_number}
                                                </TableCell>
                                                <TableCell sx={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)', maxWidth: 200, py: 1.5 }}>
                                                    <Typography variant="caption" sx={{ color: '#64748b', lineHeight: 1.5 }}>
                                                        {row.full_address}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.04)', maxWidth: 180, py: 1.5 }}>
                                                    <Typography variant="caption" fontWeight={600} sx={{ color: '#e2e8f0' }}>
                                                        {row.product_name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.04)', textAlign: 'center', py: 1.5 }}>
                                                    <Chip
                                                        label={row.quantity}
                                                        size="small"
                                                        sx={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', fontWeight: 700, minWidth: 32 }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap', py: 1.5 }}>
                                                    ₹{row.price}
                                                </TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap', py: 1.5 }}>
                                                    <Typography variant="body2" fontWeight={700} sx={{ color: '#22c55e' }}>
                                                        ₹{row.total_bill}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 }}>
                                                    <PaymentChip method={row.payment_method} />
                                                </TableCell>
                                                <TableCell sx={{ color: '#475569', borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap', py: 1.5, fontSize: '0.75rem' }}>
                                                    {new Date(row.ordered_date).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                    <br />
                                                    <span style={{ color: '#334155', fontSize: '0.7rem' }}>
                                                        {new Date(row.ordered_date).toLocaleTimeString('en-IN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {filtered.length > 0 && (
                            <>
                                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    px={3}
                                    py={1.5}
                                    flexWrap="wrap"
                                    gap={1}
                                >
                                    <Typography variant="caption" sx={{ color: '#475569' }}>
                                        Showing {filtered.length} of {orders.length} rows
                                    </Typography>
                                    <Typography variant="caption" fontWeight={700} sx={{ color: '#22c55e' }}>
                                        Filtered Revenue: ₹{filtered.reduce((s, o) => s + o.total_bill, 0).toLocaleString()}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Paper>
                )}
            </Box>
        </Box>
    );
}
