import CarType from '@/models/CarType';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newCarType = new CarType(data);
        await newCarType.save();
        return NextResponse.json({ message: 'Thêm loại xe thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const GET = withSetupHandler(async (req: NextRequest) => {
    try {
        const carTypes = await CarType.find();
        return NextResponse.json(carTypes);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
