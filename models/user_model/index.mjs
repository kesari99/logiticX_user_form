import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    aadharId: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    aadharImg: {
        type: {
            publicId: {
                type: String,
                required: true,
            },
            secureUrl: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    aadharDoc: {
        type: {
            publicId: {
                type: String,
                required: true,
            },
            secureUrl: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
