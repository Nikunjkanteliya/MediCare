// ============================================================
// Utility Formatters
// ============================================================

/**
 * Format price to Indian Rupees
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (
    originalPrice: number,
    salePrice: number
): number => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Generate a random order ID
 */
export const generateOrderId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const prefix = 'MED';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `${prefix}-${result}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trimEnd() + '...';
};

/**
 * Get delivery date (3-5 business days from now)
 */
export const getExpectedDelivery = (): string => {
    const today = new Date();
    const deliveryDays = Math.floor(Math.random() * 3) + 3; // 3-5 days
    today.setDate(today.getDate() + deliveryDays);
    return today.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Calculate delivery charge based on cart total
 */
export const calculateDelivery = (totalAmount: number): number => {
    return totalAmount >= 499 ? 0 : 40;
};
