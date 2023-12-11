import Order from '@/models/Order';
import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const GET = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const { query } = parse(req.url, true);
        const { page, limit } = query as any;

        //Pagination
        const skip = (page - 1) * limit;
        const orderAssignList = await Order.find({ driver_id: params.id })
            .populate('customer_id merchandise_list vehicle_type driver_id car_id')
            .skip(skip)
            .limit(limit);
        const totalCount = await Order.find({ driver_id: params.id }).count();
        return NextResponse.json({ orderAssignList, totalCount });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
