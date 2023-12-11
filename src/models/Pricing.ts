import mongoose from 'mongoose';
import './CarType';

const pricingSchema = new mongoose.Schema(
    {
        vehicle_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CarType',
        },
        init_price: {
            type: Number,
        },
        rates: [
            {
                from_km: Number,
                to_km: Number,
                price: Number,
            },
        ],
        // effective_date: {
        //     type: Date,
        // },
        // expiration_date: {
        //     type: Date,
        // },
    },
    { timestamps: true },
);

export default mongoose.models.Pricing || mongoose.model('Pricing', pricingSchema);
