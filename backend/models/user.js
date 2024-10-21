import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    town: { type: String, required: true },
    birthDay: { type: String, required: true },
    hash: { type: String, required: true },
});

export default mongoose.model('User', userSchema);