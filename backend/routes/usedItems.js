import express from 'express';
import UsedItem from '../models/usedItem.js';
import User from '../models/user.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const aggregateProducts = await UsedItem.aggregate([{ $sample: { size: 10 } }]);
        const products = await UsedItem.populate(aggregateProducts, { path: 'main_picture' });
        

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
        if (!product_name || !description || !price) return
            res.json({ message: 'product_name, description or/and price is missing!', error: true });
        
        const { user_who_sells } = req.params;
        if (!user_who_sells) return res.json({ message: 'user_who_sells is missing!', error: true });

        const existAlready = await UsedItem.findOne({ product_name });

        if (existAlready) {
            res.json({ message: 'Used item name exists already!', error: true });
            return;
        };

        const user = await User.findOne({ _id: user_who_sells });
        if (!user) return res.json({ message: 'No user found!', error: true });

        const seller_name = `${user.firstName} ${user.lastName}`;

        const newProduct = new UsedItem({
            seller_name, product_name, description, price, user_who_sells
        });
        if (!newProduct) return res.json({ message: 'Error creating newProduct', error: true });

        const savedProduct = await newProduct.save();
        if (!savedProduct) return res.json({ message: 'Error saving new product!', error: true });

        res.json({ message: 'Product successful saved!', savedProduct });
        return;

    } catch (err) {
        console.log('Error on POST /used-items/set-used-item/:user_who_sells');
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

router.get('/get-my-products/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        // console.log(_id);
        if (!_id) {
            console.log('_id not found!');
            res.json({ message: '_id not found!', error: true });
            return;
        }

        const usedItems = await UsedItem.find({ user_who_sells: _id }).populate('main_picture');
        // console.log(usedItems);
        if (!usedItems) {
            console.log('usedItems not found!');
            res.json({ message: 'usedItems not found!', error: true });
            return;
        }

        res.json({ message: 'Here are your products!', usedItems });
        return;

    } catch (err) {
        console.log('Error on POST /used-items/get-my-products/:_id');
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        console.log(_id);

        const deletedProduct = await UsedItem.deleteOne({ _id });
        console.log(deletedProduct);
        if (!deletedProduct) {
            console.log('Error deleting used item!');
            return res.json({ message: 'Error deleting used item!', error: true });
        }

        res.json({ message: 'Your Product is successful deleted!' });
        return;

    } catch (err) {
        console.log('Error on DELETE /used-items');
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;