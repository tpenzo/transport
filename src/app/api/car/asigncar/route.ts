import Car from '@/models/Car';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const GET = withSetupHandler(async (req: NextRequest) => {
    try {
        const { query } = parse(req.url, true);
        const { type, search } = query as any;

        let carList = [];
        let queryData: {
            vehicle_type?: string;
            license_plate?: any;
        } = {};

        if (search) {
            queryData.license_plate = new RegExp(search, 'i');
        }
        queryData.vehicle_type = type;
        carList = await Car.find(queryData).populate('vehicle_type');
        return NextResponse.json({ carList });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
