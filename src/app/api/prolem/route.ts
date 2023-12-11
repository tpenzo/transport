import Prolem from '@/models/Prolem';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newProlem = new Prolem(data);
        await newProlem.save();
        return NextResponse.json({ message: 'Phản hồi sự cố thành công' });
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

        const prolemList = await Prolem.find({}).populate('user order').skip(skip).limit(limit);
        const totalCount = await Prolem.find({}).count();
        return NextResponse.json({ prolemList, totalCount });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
