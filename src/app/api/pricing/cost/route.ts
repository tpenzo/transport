import Pricing from '@/models/Pricing';
import { withSetupHandler } from '@/utils/withSetupHandler';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withSetupHandler(async (req: NextRequest) => {
    try {
        const { distance, vehicleType } = await req.json();
        const pricing = await Pricing.findOne({ vehicle_type: vehicleType });

        const priceList = pricing.rates.map((rate: any) => rate.price);

        /**
         * 1-4km --> priceList[0]
         * 5-15km --> priceList[1]
         * 16-50km --> priceList[2]
         * >=51km --> priceList[3]
         */
        let price = 0;
        if (distance <= 4) {
            price = priceList[0];
        } else if (distance <= 15) {
            price = priceList[0] + (distance - 4) * priceList[1];
        } else if (distance <= 50) {
            price = priceList[0] + 11 * priceList[1] + (distance - 15) * priceList[2];
        } else {
            price =
                priceList[0] +
                11 * priceList[1] +
                35 * priceList[2] +
                (distance - 50) * priceList[3];
        }
        price += pricing.init_price;
        return NextResponse.json(price);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
