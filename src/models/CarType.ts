import mongoose from 'mongoose';

const carTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        maximum_load: {
            type: String,
            require: true,
        },
        maximum_cargo_size: {
            type: String,
            require: true,
        },
        suitable_for: {
            type: String,
        },
        url_img: {
            type: String,
        },
        note: {
            type: String,
        },
        license_class: [
            {
                type: String, // B1, B2: < 3,5T -- C >=3.5T
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.models.CarType || mongoose.model('CarType', carTypeSchema);
