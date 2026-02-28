import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const { amount, currency = 'INR', receipt } = await req.json();

        if (!amount || typeof amount !== 'number') {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        // Razorpay expects amount in paise (1 INR = 100 paise)
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency,
            receipt: receipt || `rcpt_${Date.now()}`,
        });

        return NextResponse.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('[Razorpay] create-order error:', error);
        return NextResponse.json(
            { error: 'Failed to create Razorpay order' },
            { status: 500 }
        );
    }
}
