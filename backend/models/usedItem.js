import mongoose from 'mongoose';

const usedItemSchema = new mongoose.Schema({
    user_who_sells: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seller_name: String,
    product_name: String,
    main_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    other_pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    description: String,
    price: String,
    rating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('UsedItem', usedItemSchema);