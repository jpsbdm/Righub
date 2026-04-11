"use server";

import { stripe, STRIPE_PLANS } from "@/billing/lib/stripe";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSessionAction(planType: 'MONTHLY' | 'YEARLY') {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user) redirect("/login");

    const plan = STRIPE_PLANS[planType];
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: plan.currency,
                    product_data: {
                        name: plan.name,
                        description: `Acesso completo às ferramentas técnicas do RigHub`,
                    },
                    unit_amount: plan.price,
                    recurring: {
                        interval: plan.interval,
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${baseUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/pricing`,
        customer_email: user.email,
        metadata: {
            userId: user.id,
        },
    });

    if (!session.url) {
        throw new Error("Failed to create checkout session");
    }

    redirect(session.url);
}
