"use client";

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';

export function CSPostHogProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || 'ph_test_placeholder', {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
            person_profiles: 'always', 
            capture_pageview: false 
        });
    }, []);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

// Analytics helper for server actions / events
export function captureEvent(eventName: string, properties: Record<string, any> = {}) {
    if (typeof window !== 'undefined') {
        posthog.capture(eventName, properties);
    }
}
