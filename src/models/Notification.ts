import mongoose from 'mongoose';
import './User';

const notificationSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
        },
        is_read: {
            type: Boolean,
        },
    },
    { timestamps: true },
);

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
