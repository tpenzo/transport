import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

export type AnyObject<T = any> = { [key: string]: T };

let cached: AnyObject = {};

export const connectDB = async () => {
    if (Object.keys(cached).length !== 0) {
        return;
    }

    const uri = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.ubwnrjm.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

    const uri2 = 'mongodb://localhost:27017/transport';

    const db = await mongoose.connect(uri, {});

    cached = db;

    console.log('==> Database connection successful');
};
