import mongoose from 'mongoose';
import './User';
import './Order';
import './Car';

const assignmentSchema = new mongoose.Schema(
    {
        code: {
            type: String,
        },
        assignment_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
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

export default mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
