import { NextRequest, NextResponse } from 'next/server';
import { AnyObject, connectDB } from '@/lib/db';

type NextHandler = (
    _req: NextRequest,
    _res: NextResponse,
    _params: AnyObject,
) => Promise<NextResponse> | void;

export const withSetupHandler =
    (handler: NextHandler) => async (req: NextRequest, res: NextResponse, params: AnyObject) => {
        try {
            await connectDB();
            return await handler(req, res, params);
        } catch (err) {
            return NextResponse.json(err, { status: 500 });
        }
    };
