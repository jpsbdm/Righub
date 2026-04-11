import { db } from "@/lib/db";
import { calculationRuns, calculationItems } from "@/tools-energy/schema";
import { users } from "@/core-platform/schema";
import { vehicles } from "@/garage/schema";
import { eq, and, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import PublicSetupView from "@/components/tools/public-setup-view";
import { calculateSystemRating, RatingInput } from "@/tools-energy/services/rating.service";
import { Metadata } from 'next';

interface Props {
    params: { slug: string };
}

// SEO Metadata for Social Previews
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    const [run] = await db
        .select()
        .from(calculationRuns)
        .where(eq(calculationRuns.shareSlug, slug))
        .limit(1);

    if (!run || run.visibility === 'private') return { title: 'RigHub | Relatório não encontrado' };

    return {
        title: `${run.name} | RigHub System Report`,
        description: `Confira a análise técnica deste projeto off-grid no RigHub. Nota: ${run.ratingScore || 'N/A'}/10.`,
        openGraph: {
            title: run.name,
            description: `Análise de Energia 2.0 - RigHub`,
            type: 'website',
            images: ['/og-image-default.png'], // Placeholder for now
        },
    };
}

export default async function RigReportPage({ params }: Props) {
    const slug = (await params).slug;

    // 1. Fetch the Calculation Run
    const [run] = await db
        .select()
        .from(calculationRuns)
        .where(eq(calculationRuns.shareSlug, slug))
        .limit(1);

    if (!run || run.visibility === 'private') {
        notFound();
    }

    // 2. Fetch the User and Vehicle (optional)
    const [user] = await db.select().from(users).where(eq(users.id, run.userId)).limit(1);
    
    let vehicleName = "Custom Rig";
    if (run.vehicleId) {
        const [v] = await db.select().from(vehicles).where(eq(vehicles.id, run.vehicleId)).limit(1);
        if (v) vehicleName = `${v.make} ${v.model}`;
    }

    // 3. Re-calculate Rating to ensure current logic
    const input: RatingInput = {
        dailyConsumptionWh: Number(run.totalWh),
        peakConsumptionWatts: 1500, // Placeholder if not saved
        solarWatts: run.solarWatts || 0,
        peakSunHours: 4.5,
        dcdcAmps: 30,
        avgDrivingHours: 2,
        batteryAh: run.batteryAh || 0,
        batteryVoltage: run.voltage,
        batteryType: 'lithium', // Default for now
        inverterWatts: 2000 // Placeholder
    };

    const rating = calculateSystemRating(input);

    const publicData = {
        name: run.name,
        userName: user?.name || "Usuário RigHub",
        rating,
        consumptionWh: Number(run.totalWh),
        solarWatts: run.solarWatts || 0,
        batteryAh: run.batteryAh || 0,
        vehicleName
    };

    return <PublicSetupView data={publicData} />;
}
