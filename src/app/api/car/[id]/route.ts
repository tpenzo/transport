import Car from '@/models/Car';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const carType = await Car.findOne({ _id: params.id }).populate('vehicle_type');
        return NextResponse.json({ data: carType });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const POST = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const data = await req.json();
        await Car.findOneAndUpdate({ _id: params.id }, data);
        return NextResponse.json({ message: 'Cập nhật thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const DELETE = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        await Car.findOneAndDelete({ _id: params.id });
        return NextResponse.json({ message: 'Xoá xe thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
