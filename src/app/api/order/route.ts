import Order from '@/models/Order';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';
import uuid4 from 'uuid4';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        // Random
        data.code = uuid4().substring(0, 6);
        const newPricing = new Order(data);
        await newPricing.save();
        return NextResponse.json({ message: 'Tạo đơn hàng thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

// order/?status=&page=limit
export const GET = withSetupHandler(async (req: NextRequest, res: NextResponse) => {
    try {
        const { query } = parse(req.url, true);
        const { status, page, limit } = query as any;

        //Pagination
        const skip = (page - 1) * limit;
        let orderList = [];
        let totalCount = 0;

        if (status) {
            orderList = await Order.find({ status: status.toUpperCase() })
                .populate('customer_id merchandise_list vehicle_type driver_id car_id')
                .skip(skip)
                .limit(limit);
            totalCount = await Order.find({ status: status.toUpperCase() }).count();
        } else {
            orderList = await Order.find({ status: { $ne: 'WAIT' } })
                .populate('customer_id merchandise_list vehicle_type driver_id car_id')
                .skip(skip)
                .limit(limit);
            totalCount = await Order.find({ status: { $ne: 'WAIT' } }).count();
        }
        return NextResponse.json({ orderList, totalCount });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
