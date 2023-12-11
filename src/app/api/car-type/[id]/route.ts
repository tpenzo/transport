import CarType from '@/models/CarType';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const carType = await CarType.findOne({ _id: params.id });
        return NextResponse.json({ data: carType });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
