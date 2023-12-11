import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const data = await req.json();
        console.log(data);
        await User.updateOne({ _id: params.id }, data);
        const user = await User.findById({ _id: params.id });
        return NextResponse.json({ user, message: 'Cập nhật thông tin thanh công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
