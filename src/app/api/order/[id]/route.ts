import Calendar from '@/models/Calendar';
import Car from '@/models/Car';
import Order from '@/models/Order';
import User from '@/models/User';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const data = await Order.findOne({ _id: params.id }).populate(
            'customer_id merchandise_list vehicle_type driver_id car_id',
        );
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const DELETE = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        // Delete order
        const data = await Order.findOneAndDelete({ _id: params.id });
        // Delete calender
        await Calendar.findOneAndDelete({
            driver_id: data.driver_id,
            car_id: data.car_id,
            start: data?.pickup_information?.time,
            end: data?.pickup_information?.time,
        });
        return NextResponse.json({ message: 'Xoá đơn hàng thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const POST = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        const data = await req.json();

        await Order.updateOne({ _id: params.id }, data);

        await Calendar.findOneAndDelete({
            driver_id: data.oldDriver_id,
            car_id: data.oldCar_id,
            start: data.oldTime,
            end: data.oldTime,
        });

        const { firstName, lastName } = await User.findById(data.driver_id);
        const { license_plate } = await Car.findById(data.car_id);

        const newCalendar = new Calendar({
            title: `MĐH:${data.code}, TX:${firstName} ${lastName}, XE:${license_plate}`,
            driver_id: data.driver_id,
            car_id: data.car_id,
            start: data.time,
            end: data.time,
        });

        await newCalendar.save();

        return NextResponse.json({ message: 'Xác nhận thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
