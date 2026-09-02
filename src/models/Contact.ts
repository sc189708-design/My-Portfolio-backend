import { Schema, model, Document } from "mongoose";

export interface IContact extends Document {
    name: string,
    email: string,
    message: string,
    createdAt: Date;
};

const ContactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default model<IContact>('Contact', ContactSchema);