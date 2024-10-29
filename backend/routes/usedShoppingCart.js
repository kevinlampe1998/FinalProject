import express from 'express';
import usedShoppingCart from '../models/usedShoppingCart.js';
const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    console.log(req.body);
    const { productId, userId } = req.body;

    const existShoppingCart = await usedShoppingCart.findOne({ user_id: userId });

    if (!existShoppingCart) {
        const newShoppingCart = new usedShoppingCart({ user_id: userId });
        !newShoppingCart && console.log('Error creating new shopping cart!');

        const savedShoppingCart = newShoppingCart.save();
        !savedShoppingCart && console.log('Error on saving new shopping cart!');
    };

    const updatedShoppingCart = await usedShoppingCart.updateOne({
        user_id: userId
    }, {
        $push: { products: productId }
    });
    !updatedShoppingCart && console.log('Error pushing product to shopping cart!');

    res.json({ message: 'Your product is added to shopping cart!' });
    return;

  } catch (err) {
    console.log('Error on POST /shopping-cart', err);
    res.json({ message: 'Something went wrong!' });
    return;
  }
})

.get(async (req, res) => {
    try {
        console.log(req.body);

        res.json({ message: 'Here is your shopping cart!' });
        return;

    } catch (err) {
        console.log('Error on GET /shopping-cart', err);
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;