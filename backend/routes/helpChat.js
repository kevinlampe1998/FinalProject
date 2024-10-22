import express from 'express';
const router = express.Router();

router.post('/:_id', async (req, res) => {
    try {
        console.log(req.body);

        res.json({ message: 'Got your help request!' });
        return;

    } catch (err) {
        console.log('Error on POST /help-chat');
        res.json({ message: 'Image: Something went wrong!' });
        return;
    }
});

export default router;