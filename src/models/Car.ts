import mongoose from 'mongoose';
import './CarType';

const carSchema = new mongoose.Schema(
    {
        license_plate: {
            // Bien so xe
            type: String,
            require: true,
        },
        make: {
            type: String,
        },
        vehicle_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CarType',
        },
        description: {
            type: String,
        },
        image_url: String,
        location: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export default mongoose.models.Car || mongoose.model('Car', carSchema);

// merchandise_size: {
//     type: String, // 300cm x 160cm x 160cm (Dài x Rộng x Cao)
// },
// cargo_capacity: {
//     type: String,
//     require: true,
// },
