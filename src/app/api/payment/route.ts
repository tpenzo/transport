import Calendar from '@/models/Calendar';
import Order from '@/models/Order';
import { withSetupHandler } from '@/utils/withSetupHandler';
import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server';

// Create
export const POST = withSetupHandler(async (req: NextRequest, { params }: any) => {
    try {
        return NextResponse.json({ message: '' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
