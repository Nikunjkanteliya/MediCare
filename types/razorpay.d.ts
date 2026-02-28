// Type declarations for the Razorpay client-side checkout script
// (loaded from https://checkout.razorpay.com/v1/checkout.js)

interface RazorpayOptions {
    key: string;
    amount: number;        // in paise
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;      // Razorpay order id from server
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayInstance {
    open(): void;
    on(event: string, callback: () => void): void;
}

interface RazorpayConstructor {
    new(options: RazorpayOptions): RazorpayInstance;
}

interface Window {
    Razorpay: RazorpayConstructor;
}
