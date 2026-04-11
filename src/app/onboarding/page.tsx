import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OnboardingWizard from "@/components/auth/onboarding-wizard";

export default async function OnboardingPage() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user) redirect("/login");

    // If user is already onboarded, we can redirect them to feed
    // (Wait for now, let them explore the wizard if they want)

    return (
        <main className="bg-background">
            <OnboardingWizard />
        </main>
    );
}
