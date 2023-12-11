import Calendar from '@/models/Calendar';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newCalendar = new Calendar(data);
        await newCalendar.save();
        return NextResponse.json({ message: 'Thêm lịch thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const GET = withSetupHandler(async (req: NextRequest) => {
    try {
        const { query } = parse(req.url, true);
        const { driver, car } = query as { driver: string; car: string };
        let filter: any;
        if (driver) {
            filter = { driver_id: driver, status: true };
        } else if (car) {
            filter = { car_id: car, status: true };
        } else {
            filter = { status: true };
        }

        const calendars = await Calendar.find(filter);

        return NextResponse.json(calendars);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
