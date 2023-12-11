import Merchandise from '@/models/Merchandise';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newMerchandise = new Merchandise(data);
        await newMerchandise.save();
        const merchandise = await Merchandise.findOne({ _id: newMerchandise._id });
        return NextResponse.json({ message: 'Thêm thành công', data: merchandise });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const GET = withSetupHandler(async (req: NextRequest) => {
    try {
        return NextResponse.json({});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
