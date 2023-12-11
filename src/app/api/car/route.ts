import Car from '@/models/Car';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newCarType = await new Car(data);
        await newCarType.save();
        return NextResponse.json({ message: 'Thêm xe thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const GET = withSetupHandler(async (req: NextRequest) => {
    try {
        const { query } = parse(req.url, true);
        const { page, limit } = query as any;

        //Pagination
        const skip = (page - 1) * limit;
        let carList = [];
        let totalCount = 0;
        carList = await Car.find().populate('vehicle_type').skip(skip).limit(limit);
        totalCount = await Car.find({}).count();
        return NextResponse.json({ carList, totalCount });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
