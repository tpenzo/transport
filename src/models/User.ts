import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['CUSTOMER', 'ADMIN', 'COORDINATOR', 'DRIVER'],
            default: 'CUSTOMER',
        },
        url_avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        },

        // For DRIVER
        driver_license: {
            type: String,
        },
        driver_license_class: {
            // B1, B2: < 3,5T -- C >=3.5T
            type: String,
        },
        expiration_date: {
            type: String,
        },
        image_driver_license: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

// Hash password here
userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.User || mongoose.model('User', userSchema);
