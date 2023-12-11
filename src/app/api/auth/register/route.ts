import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

// Create ==>  CUSTOMER
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
        const newUser = new User(data);
        await newUser.save();
        return NextResponse.json({ message: 'Bạn đã tạo tài khoản thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
