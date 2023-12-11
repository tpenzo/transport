import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

// Create ==>  DRIVER
export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const found = await User.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
        if (found) {
            return NextResponse.json(
                { message: 'Email hoặc số điện thoại đã tồn tại' },
                { status: 400 },
            );
        }
        const newUser = new User({ ...data, role: 'DRIVER' });
        await newUser.save();
        return NextResponse.json({ message: 'Thêm tài xế thành công' });
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
        const driverList = await User.find({ role: 'DRIVER' }).skip(skip).limit(limit);
        const totalCount = await User.find({ role: 'DRIVER' }).count();
        return NextResponse.json({ driverList, totalCount });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
