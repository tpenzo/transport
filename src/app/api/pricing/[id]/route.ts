import Pricing from '@/models/Pricing';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const pricing = await Pricing.findOne({ vehicle_type: params.id });
        return NextResponse.json({ data: pricing });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
