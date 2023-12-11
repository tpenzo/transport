import Merchandise from '@/models/Merchandise';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const merchandiselist = await Merchandise.find({ _id: { $in: data } });
        return NextResponse.json(merchandiselist);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
