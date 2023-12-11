import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const carType = await User.findOne({ _id: params.id });
        return NextResponse.json({ data: carType });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const DELETE = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        await User.findByIdAndDelete({ _id: params.id });
        return NextResponse.json({ message: 'Xoá tài xế thành công!' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const PUT = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const data = await req.json();
        await User.findByIdAndUpdate({ _id: params.id }, data);
        return NextResponse.json({ message: 'Chỉnh sửa thành công!' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
