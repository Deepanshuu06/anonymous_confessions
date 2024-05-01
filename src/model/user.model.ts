import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema(
    {
        content: {
            type: String,   
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

export interface User extends Document {
    name: string;
    username: string;
    password: string;
    email: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean; // Changed to boolean type
    messages: Message[];
    isAdmin: boolean; // New field for admin status
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true, // Ensures uniqueness
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address."],
    },

    password: {
        type: String,
        required: [true, "password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verificatin code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false, // Default value set to true
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true, // Default value set to true
    },
    messages: [MessageSchema],
    isAdmin: {
        type: Boolean,
        default: false, // Default value set to false
    },
});

// Check if UserModel already exists before defining it
export const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export const MessageModel = mongoose.models.Message as Model<Message> || mongoose.model<Message>('Message', MessageSchema);
