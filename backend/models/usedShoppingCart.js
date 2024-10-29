import mongoose from 'mongoose';

const UsedShoppingCartSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UsedItem' }]
});

export default mongoose.model('UsedShoppingCart', UsedShoppingCartSchema);