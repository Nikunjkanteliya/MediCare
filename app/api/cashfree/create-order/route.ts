import { NextRequest, NextResponse } from 'next/server';

// Cashfree Production API base (use https://sandbox.cashfree.com/pg/orders for testing)
const CASHFREE_API = 'https://api.cashfree.com/pg/orders';

export async function POST(req: NextRequest) {
    try {
        const { amount, customerId, customerPhone, customerEmail } = await req.json();

        if (!amount || typeof amount !== 'number') {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        const orderId = `order_${Date.now()}`;

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
        // Cashfree requires HTTPS for return_url / notify_url — skip them in local dev
        const isHttps = appUrl.startsWith('https://');

        const payload = {
            order_id: orderId,
            order_amount: Math.round(amount * 100) / 100, // Up to 2 decimal places
            order_currency: 'INR',
            customer_details: {
                // customer_id must be alphanumeric only – Cashfree rejects special chars
                customer_id: (customerId || `cust${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 50),
                customer_phone: customerPhone || '9999999999',
                customer_email: customerEmail || 'customer@medicare.in',
                customer_name: customerId || 'Customer',
            },
            ...(isHttps && {
                order_meta: {
                    return_url: `${appUrl}/order-success?order_id={order_id}`,
                    notify_url: `${appUrl}/api/cashfree/webhook`,
                },
            }),
        };

        const response = await fetch(CASHFREE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': process.env.CASHFREE_APP_ID!,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
                'x-api-version': '2023-08-01',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error('[Cashfree] create-order error:', errData);
            return NextResponse.json(
                { error: errData.message || 'Failed to create Cashfree order' },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Log the full Cashfree response in development to help debug
        console.log('[Cashfree] create-order response:', JSON.stringify(data));

        if (!data.payment_session_id) {
            console.error('[Cashfree] No payment_session_id in response:', data);
            return NextResponse.json(
                { error: data.message || 'Cashfree did not return a payment session' },
                { status: 502 }
            );
        }

        return NextResponse.json({
            order_id: data.order_id,
            payment_session_id: data.payment_session_id,
        });
    } catch (error) {
        console.error('[Cashfree] create-order error:', error);
        return NextResponse.json(
            { error: 'Failed to create Cashfree order' },
            { status: 500 }
        );
    }
}
