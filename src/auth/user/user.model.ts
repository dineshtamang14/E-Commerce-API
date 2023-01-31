import mongoose from "mongoose";
import { UserModel, UserDoc } from 'common-usage.js';

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id 
            delete ret.password
        }
    }
})

export const User = mongoose.model<UserModel, UserDoc>('User', schema);