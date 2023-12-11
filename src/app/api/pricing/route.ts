import Pricing from '@/models/Pricing';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newPricing = new Pricing(data);
        await newPricing.save();
        const pricing = await Pricing.findOne({ _id: newPricing._id });
        return NextResponse.json({ message: 'Thêm thành công', data: pricing });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const GET = withSetupHandler(async (req: NextRequest) => {
    try {
        const pricings = await Pricing.find().populate('vehicle_type');
        return NextResponse.json(pricings);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
