import mongoose from 'mongoose';
import './User';
import './Merchandise';
import './CarType';
import './Car';

const orderSchema = new mongoose.Schema(
    {
        code: {
            type: String,
        },
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        pickup_information: {
            firstName: {
                type: String,
                require: true,
            },
            lastName: {
                type: String,
                require: true,
            },
            phone: {
                type: String,
            },
            address: {
                type: String,
            },
            time: {
                type: String,
            },
        },
        return_information: {
            firstName: {
                type: String,
                require: true,
            },
            lastName: {
                type: String,
                require: true,
            },
            phone: {
                type: String,
            },
            address: {
                type: String,
            },
        },
        merchandise_list: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Merchandise',
            },
        ],
        vehicle_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CarType',
        },
        promotion_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Promotion',
        },
        status: {
            type: String,
            enum: ['WAIT', 'CONFIRMED', 'PICKUP', 'TRANSPORT', 'RETURNS', 'COMPLETED', 'CANCEL'],
            default: 'WAIT',
        },
        note: {
            type: String,
        },
        payment_menthods: {
            type: String,
            enum: ['CARSH', 'CARD'],
            default: 'CARSH',
        },
        total_payment: {
            type: Number,
        },
        // Phan cong
        driver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        car_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
        },
    },
    { timestamps: true },
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
