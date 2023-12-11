import CarType from '@/models/CarType';
import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const carType = await CarType.findOne({ _id: data?.id }).select('license_class'); // Get CarType
        const drivers = await User.find({
            role: 'DRIVER',
            driver_license_class: { $in: carType.license_class },
        });
        return NextResponse.json(drivers);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
