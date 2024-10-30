import express from 'express';
import UsedItem from '../models/usedItem.js';
const router = express.Router();

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        console.log('_id', _id);

        const product = await UsedItem.findOne({ _id })
            .populate('main_picture');

        res.json({ message: 'Here is the used item!', product });
        return;

    } catch (err) {
        console.log('Error on GET /used-item/:id', err);
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;
