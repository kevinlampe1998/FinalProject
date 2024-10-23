import express from 'express';
const router = express.Router();
import Product from '../models/product.js';

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('main_picture');

        res.json({ message: 'Here are the products!', products });
        return;

    } catch (err) {
        console.log('Error on POST /set-product');
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

router.post('/set-product/:user_who_sells', async (req, res) => {
    try {
        console.log(req.body);
        const { product_name, description, price, quantity } = req.body;
        const { user_who_sells } = req.params;

        if (!product_name || !description || !price || !quantity) {
            res.json({ message: 'At least one input is missing!' });
            return;
        };

        const existAlready = await Product.findOne({ product_name });
        console.log(existAlready);

        if (existAlready) {
            res.json({ message: 'Product name exists already' });
            return;
        };

        const newProduct = new Product({
            product_name, description, price, quantity, user_who_sells
        });
        console.log(newProduct);

        const savedProduct = await newProduct.save();
        console.log(savedProduct);


        res.json({ message: 'Product successful saved!', savedProduct });
        return;

    } catch (err) {
        console.log('Error on POST /set-product');
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;