import mongoose from 'mongoose';

const merchandiseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        weight: {
            type: String,
        },
        type: {
            type: String,
        },
        image: {
            type: String,
        },
        note: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.models.Merchandise || mongoose.model('Merchandise', merchandiseSchema);
