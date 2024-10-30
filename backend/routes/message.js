import express from 'express';
const router = express.Router();

router.post('/message', async (req, res) => {
    try {
        console.log(req.body);

        res.json({ message: 'Message successful saved!' });
        return;

    } catch (err) {
        console.log('Error POST /message', err);
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;