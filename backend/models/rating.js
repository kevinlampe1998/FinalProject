import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    user_who_rates: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user_rating: Number,
    user_comment: String
});

export default mongoose.model('Rating', ratingSchema);