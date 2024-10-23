import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    user_who_sells: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_name: String,
    main_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    other_pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    description: String,
    price: String,
    quantity: Number,
    rating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }]
});

export default mongoose.model('Product', productSchema);

// name
// pictures
// description
// price
// quantity
// rating