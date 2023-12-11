import Calendar from '@/models/Calendar';
import Order from '@/models/Order';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

// Cancle order
export const POST = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const data = await req.json();
        await Order.updateOne({ _id: params.id }, data);
        if (data?.status === 'CANCEL') {
            return NextResponse.json({
                message: 'Huỷ đơn hàng thành công',
                newStatus: data.status,
            });
        }
        return NextResponse.json({
            message: 'Cập nhật trạng thái thành công',
            newStatus: data.status,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
