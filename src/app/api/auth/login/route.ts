import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return NextResponse.json({ message: 'Người dùng không tồn tại' }, { status: 400 });
        }
        const match = await bcrypt.compare(data.password, user.password);
        if (!match) {
            return NextResponse.json({ message: 'Mật khẩu không đúng' }, { status: 400 });
        }
        cookies().set({
            name: 'auth_cookie',
            value: user.role,
            httpOnly: true,
            path: '/',
        });
        return NextResponse.json({ message: 'Bạn đã đăng nhập thành công', user });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
