import Merchandise from '@/models/Merchandise';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        await Merchandise.deleteOne({ _id: params.id });
        return NextResponse.json({ message: 'Xoá thành công' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
