import mongoose from 'mongoose';
import './User';
import './Car';

const calendarSchema = new mongoose.Schema(
    {
        title: {
            type: String, // Don hàng và thông tin xe
        },
        driver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        car_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
        },
        start: {
            type: Date,
        },
        end: {
            type: Date,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export default mongoose.models.Calendar || mongoose.model('Calendar', calendarSchema);
