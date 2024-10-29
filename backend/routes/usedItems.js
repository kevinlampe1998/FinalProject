import express from 'express';
import UsedItem from '../models/usedItem.js';
import User from '../models/user.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await UsedItem.find().populate('main_picture').limit(10);

        res.json({ message: 'Here are the products!', products });
        return;

    } catch (err) {
        console.log('Error on POST /used-items');
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

router.post('/set-used-item/:user_who_sells', async (req, res) => {
    try {
        const { product_name, description, price } = req.body;

        const { user_who_sells } = req.params;

        if (!product_name || !description || !price ) {
            res.json({ message: 'At least one input is missing!' });
            return;
        };

        const existAlready = await UsedItem.findOne({ product_name });

        if (existAlready) {
            res.json({ message: 'Used item name exists already!' });
            return;
        };

        const user = await User.findOne({ _id: user_who_sells });
        const seller_name = `${user.firstName} ${user.lastName}`;

        const newProduct = new UsedItem({
            seller_name, product_name, description, price, user_who_sells
        });

        const savedProduct = await newProduct.save();

        res.json({ message: 'Product successful saved!', savedProduct });
        return;

    } catch (err) {
        console.log('Error on POST /used-items/set-used-item/:user_who_sells');
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;