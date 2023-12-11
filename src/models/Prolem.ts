import mongoose from 'mongoose';
import './User';
import './Order';

const prolemSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        title: {
            type: String,
        },
        content: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: ['NEW', 'DONE'],
            default: 'NEW',
        },
    },
    { timestamps: true },
);

export default mongoose.models.Prolem || mongoose.model('Prolem', prolemSchema);
