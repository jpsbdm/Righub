import { stripe } from "@/billing/lib/stripe";
import { db } from "@/lib/db";
import { users } from "@/core-platform/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ""
        );
    } catch (err: any) {
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const session = event.data.object as any;

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const userId = session.metadata?.userId;
        const stripeCustomerId = session.customer as string;

        if (userId) {
            await db.update(users)
                .set({ 
                    isPro: true, 
                    stripeCustomerId,
                    updatedAt: new Date()
                })
                .where(eq(users.id, userId));
            
            console.log(`User ${userId} upgraded to PRO via Stripe.`);
        }
    }

    if (event.type === 'customer.subscription.deleted') {
        const stripeCustomerId = session.customer as string;
        
        await db.update(users)
            .set({ isPro: false, updatedAt: new Date() })
            .where(eq(users.stripeCustomerId, stripeCustomerId));
            
        console.log(`Subscription deleted for customer ${stripeCustomerId}. User set back to Free.`);
    }

    return new NextResponse(null, { status: 200 });
}
