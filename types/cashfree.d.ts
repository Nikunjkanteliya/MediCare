// Type declarations for the Cashfree client-side JS SDK
// (loaded from https://sdk.cashfree.com/js/v3/cashfree.js)

interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: '_self' | '_blank' | '_top' | '_modal';
}

interface CashfreeTheme {
    backgroundColor?: string;
    color?: string;
}

interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<{ error?: { message: string }; redirect?: boolean; paymentDetails?: unknown }>;
}

interface CashfreeInitOptions {
    mode: 'sandbox' | 'production';
    theme?: CashfreeTheme;
}

interface Window {
    Cashfree: (options: CashfreeInitOptions) => CashfreeInstance;
}
